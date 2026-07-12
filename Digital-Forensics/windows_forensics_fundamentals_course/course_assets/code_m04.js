window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "PowerShell and Python Examples: Preserve Offline Event Provenance",
  "codeExamples": [
    {
      "title": "Export Structured Security Logon Events With Raw XML",
      "language": "powershell",
      "code": String.raw`Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$HelperPath = Join-Path $PSScriptRoot "dfir-run-context.ps1"
. $HelperPath
$Context = Get-VerifiedDfirContext
$Run = $Context.Run
$Root = $Context.Root
$RootPrefix = $Context.RootPrefix
$SecurityLog = Join-Path $Root "Windows\System32\winevt\Logs\Security.evtx"
$Limitations = Join-Path $Run "limitations.jsonl"
$Errors = Join-Path $Run "errors.jsonl"

function Add-JsonLine([string]$Path, [hashtable]$Record) {
  [pscustomobject]$Record | ConvertTo-Json -Compress |
    Out-File -FilePath $Path -Append -Encoding utf8
}
function Test-ContainedDirectoryWithoutReparse([string]$Candidate) {
  $Full = [IO.Path]::GetFullPath($Candidate).TrimEnd('\')
  if (-not $Full.StartsWith($RootPrefix, [StringComparison]::OrdinalIgnoreCase)) {
    $Record = @{stage="security-evtx";path=$Full}
    $Record.limitation = "directory is outside evidence root"
    Add-JsonLine $Limitations $Record
    return $false
  }
  $Current = $Root
  foreach ($Part in $Full.Substring($RootPrefix.Length).Split('\')) {
    if ([string]::IsNullOrWhiteSpace($Part)) { continue }
    $Current = Join-Path $Current $Part
    if (-not (Test-Path -LiteralPath $Current -PathType Container)) {
      $Record = @{stage="security-evtx";path=$Current}
      $Record.limitation = "directory component missing"
      Add-JsonLine $Limitations $Record
      return $false
    }
    $Item = Get-Item -LiteralPath $Current -Force
    if ($Item.Attributes -band [IO.FileAttributes]::ReparsePoint) {
      $Record = @{stage="security-evtx";path=$Current}
      $Record.limitation = "directory component is a reparse point"
      Add-JsonLine $Limitations $Record
      return $false
    }
  }
  return $true
}
function Test-ContainedRegularFileWithoutReparse([string]$Candidate) {
  $Full = [IO.Path]::GetFullPath($Candidate)
  if (-not (Test-ContainedDirectoryWithoutReparse (Split-Path -Parent $Full))) {
    return $false
  }
  if (-not (Test-Path -LiteralPath $Full -PathType Leaf)) {
    Add-JsonLine $Limitations @{stage="security-evtx";path=$Full;limitation="log absent"}
    return $false
  }
  $Item = Get-Item -LiteralPath $Full -Force
  if (-not ($Item -is [IO.FileInfo]) -or
      ($Item.Attributes -band [IO.FileAttributes]::ReparsePoint)) {
    $Record = @{stage="security-evtx";path=$Full}
    $Record.limitation = "final object is not a regular non-reparse file"
    Add-JsonLine $Limitations $Record
    return $false
  }
  return $true
}
function Convert-EventDataToJson($EventXml) {
  $Fields = New-Object Collections.Generic.List[object]
  $Index = 0
  foreach ($Node in @($EventXml.Event.EventData.Data)) {
    $Name = [string]$Node.GetAttribute("Name")
    if ([string]::IsNullOrWhiteSpace($Name)) { $Name = "unnamed_$Index" }
    $Fields.Add([pscustomobject]@{
      name = $Name
      value = [string]$Node.InnerText
      index = $Index
    })
    $Index++
  }
  return (ConvertTo-Json -InputObject $Fields.ToArray() -Compress)
}

if (-not (Test-ContainedRegularFileWithoutReparse $SecurityLog)) { return }
$LogItem = Get-Item -LiteralPath $SecurityLog -Force
if ($LogItem.Length -eq 0) {
  $Record = @{stage="security-evtx";source=$SecurityLog;limitation="log file empty"}
  Add-JsonLine $Limitations $Record
  return
}
$SourceHash = (Get-FileHash -LiteralPath $SecurityLog -Algorithm SHA256).Hash
try {
  $Filter = "*[System[(EventID=4624 or EventID=4625 or EventID=4672)]]"
  $Events = @(Get-WinEvent -Path $SecurityLog -FilterXPath $Filter -ErrorAction Stop)
}
catch {
  if ($_.FullyQualifiedErrorId -like "NoMatchingEventsFound*") {
    $Record = @{stage="security-evtx";source=$SecurityLog}
    $Record.limitation = "zero matching events"
    Add-JsonLine $Limitations $Record
    $Events = @()
  }
  else {
    $Record = @{stage="security-evtx";source=$SecurityLog;error=$_.Exception.Message}
    Add-JsonLine $Errors $Record
    throw
  }
}
$Rows = @(foreach ($Event in $Events) {
  $RawXml = $Event.ToXml()
  $Xml = [xml]$RawXml
  $Message = $null
  $MessageError = $null
  try { $Message = $Event.Message } catch { $MessageError = $_.Exception.Message }
  [pscustomobject]@{
    TimeUtc = $Event.TimeCreated.ToUniversalTime().ToString("o")
    TimeSemantic = "event System/TimeCreated normalized to UTC"
    Id = $Event.Id
    RecordId = $Event.RecordId
    Channel = $Event.LogName
    ProviderName = $Event.ProviderName
    MachineName = $Event.MachineName
    ProcessId = $Event.ProcessId
    ThreadId = $Event.ThreadId
    Level = $Event.Level
    Keywords = [string]$Event.Keywords
    SourceEvtxPath = $SecurityLog
    SourceEvtxHash = $SourceHash
    EventDataJson = Convert-EventDataToJson $Xml
    RawXml = $RawXml
    RenderedMessage = $Message
    MessageRenderingError = $MessageError
  }
})
if ($Rows.Count -gt 0) {
  $OutputPath = Join-Path $Run "security-logons.csv"
  $Rows | Export-Csv -Path $OutputPath -NoTypeInformation -Encoding UTF8 -NoClobber
}`
    },
    {
      "title": "Export PowerShell Operational Events With Explicit Outcomes",
      "language": "powershell",
      "code": String.raw`Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$HelperPath = Join-Path $PSScriptRoot "dfir-run-context.ps1"
. $HelperPath
$Context = Get-VerifiedDfirContext
$Run = $Context.Run
$Root = $Context.Root
$RootPrefix = $Context.RootPrefix
$LogName = "Microsoft-Windows-PowerShell%4Operational.evtx"
$Log = Join-Path $Root "Windows\System32\winevt\Logs\$LogName"
$Limitations = Join-Path $Run "limitations.jsonl"
$Errors = Join-Path $Run "errors.jsonl"
function Add-JsonLine([string]$Path, [hashtable]$Record) {
  [pscustomobject]$Record | ConvertTo-Json -Compress |
    Out-File -FilePath $Path -Append -Encoding utf8
}
function Test-ContainedDirectoryWithoutReparse([string]$Candidate) {
  $Full = [IO.Path]::GetFullPath($Candidate).TrimEnd('\')
  if (-not $Full.StartsWith($RootPrefix, [StringComparison]::OrdinalIgnoreCase)) {
    $Record = @{stage="powershell-evtx";path=$Full}
    $Record.limitation = "directory is outside evidence root"
    Add-JsonLine $Limitations $Record
    return $false
  }
  $Current = $Root
  foreach ($Part in $Full.Substring($RootPrefix.Length).Split('\')) {
    if ([string]::IsNullOrWhiteSpace($Part)) { continue }
    $Current = Join-Path $Current $Part
    if (-not (Test-Path -LiteralPath $Current -PathType Container)) {
      $Record = @{stage="powershell-evtx";path=$Current}
      $Record.limitation = "directory component missing"
      Add-JsonLine $Limitations $Record
      return $false
    }
    $Item = Get-Item -LiteralPath $Current -Force
    if ($Item.Attributes -band [IO.FileAttributes]::ReparsePoint) {
      $Record = @{stage="powershell-evtx";path=$Current}
      $Record.limitation = "directory component is a reparse point"
      Add-JsonLine $Limitations $Record
      return $false
    }
  }
  return $true
}
function Test-ContainedRegularFileWithoutReparse([string]$Candidate) {
  $Full = [IO.Path]::GetFullPath($Candidate)
  if (-not (Test-ContainedDirectoryWithoutReparse (Split-Path -Parent $Full))) {
    return $false
  }
  if (-not (Test-Path -LiteralPath $Full -PathType Leaf)) {
    Add-JsonLine $Limitations @{stage="powershell-evtx";path=$Full;limitation="log absent"}
    return $false
  }
  $Item = Get-Item -LiteralPath $Full -Force
  if (-not ($Item -is [IO.FileInfo]) -or
      ($Item.Attributes -band [IO.FileAttributes]::ReparsePoint)) {
    $Record = @{stage="powershell-evtx";path=$Full}
    $Record.limitation = "final object is not a regular non-reparse file"
    Add-JsonLine $Limitations $Record
    return $false
  }
  return $true
}

if (-not (Test-ContainedRegularFileWithoutReparse $Log)) { return }
$Item = Get-Item -LiteralPath $Log -Force
if ($Item.Length -eq 0) {
  $Record = @{stage="powershell-evtx";source=$Log;limitation="log file empty"}
  Add-JsonLine $Limitations $Record
  return
}
$Hash = (Get-FileHash -LiteralPath $Log -Algorithm SHA256).Hash
try {
  $Filter = "*[System[(EventID=4103 or EventID=4104 or EventID=53504)]]"
  $Events = @(Get-WinEvent -Path $Log -FilterXPath $Filter -ErrorAction Stop)
}
catch {
  if ($_.FullyQualifiedErrorId -like "NoMatchingEventsFound*") {
    $Record = @{stage="powershell-evtx";source=$Log}
    $Record.limitation = "zero matching events"
    Add-JsonLine $Limitations $Record
    $Events = @()
  }
  else {
    Add-JsonLine $Errors @{stage="powershell-evtx";source=$Log;error=$_.Exception.Message}
    throw
  }
}
$Rows = @(foreach ($Event in $Events) {
  $RawXml = $Event.ToXml()
  [pscustomobject]@{
    TimeUtc = $Event.TimeCreated.ToUniversalTime().ToString("o")
    TimeSemantic = "event System/TimeCreated normalized to UTC"
    Id = $Event.Id
    RecordId = $Event.RecordId
    Channel = $Event.LogName
    ProviderName = $Event.ProviderName
    MachineName = $Event.MachineName
    ProcessId = $Event.ProcessId
    ThreadId = $Event.ThreadId
    Level = $Event.Level
    Keywords = [string]$Event.Keywords
    SourceEvtxPath = $Log
    SourceEvtxHash = $Hash
    RawXml = $RawXml
  }
})
if ($Rows.Count -gt 0) {
  $OutputPath = Join-Path $Run "powershell-events.csv"
  $Rows | Export-Csv -Path $OutputPath -NoTypeInformation -Encoding UTF8 -NoClobber
}`
    },
    {
      "title": "Validate and Count Exported Logon Events",
      "language": "python",
      "code": String.raw`import csv
import os
import re
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path


path = Path(os.environ["DFIR_RUN"]) / "security-logons.csv"
required = {"TimeUtc", "Id", "RecordId", "Channel", "SourceEvtxHash", "RawXml"}
windows_time = re.compile(
    r"^(?P<whole>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})"
    r"(?:\.(?P<fraction>\d{1,7}))?(?P<offset>Z|[+-]\d{2}:\d{2})$"
)
epoch = datetime(1970, 1, 1, tzinfo=timezone.utc)
if not path.is_file():
    raise FileNotFoundError("security-logons.csv is absent; review limitations.jsonl")


def timestamp_100ns(value: str) -> int:
    if not isinstance(value, str) or not value.strip():
        raise ValueError("blank event timestamp")
    match = windows_time.fullmatch(value.strip())
    if match is None:
        raise ValueError("event timestamp is not offset-aware ISO 8601")
    offset = "+00:00" if match["offset"] == "Z" else match["offset"]
    whole = datetime.fromisoformat(match["whole"] + offset).astimezone(timezone.utc)
    delta = whole - epoch
    seconds = delta.days * 86_400 + delta.seconds
    fraction = int((match["fraction"] or "").ljust(7, "0"))
    return seconds * 10_000_000 + fraction


counts = Counter()
with path.open(newline="", encoding="utf-8-sig") as source:
    reader = csv.DictReader(source)
    if reader.fieldnames is None or not required.issubset(reader.fieldnames):
        raise ValueError("security-logons.csv schema is incomplete")
    for row in reader:
        timestamp_100ns(row["TimeUtc"])
        if not row["RecordId"] or not row["RawXml"]:
            raise ValueError("event row lacks timestamp or provenance")
        counts[int(row["Id"])] += 1

for event_id, count in counts.most_common():
    print(f"event_id={event_id} count={count}")`
    }
  ]
};
