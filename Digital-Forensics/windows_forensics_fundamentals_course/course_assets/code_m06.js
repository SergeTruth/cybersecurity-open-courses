window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "PowerShell and Python Examples: Build a Mounted-View Metadata Inventory",
  "codeExamples": [
    {
      "title": "Create a Mounted Filesystem Metadata Inventory",
      "language": "powershell",
      "code": String.raw`Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$HelperPath = Join-Path $PSScriptRoot "dfir-run-context.ps1"
. $HelperPath
$Context = Get-VerifiedDfirContext
$Run = $Context.Run
$Root = $Context.Root
$MetadataOutput = Join-Path $Run "mounted-filesystem-metadata.csv"
$Writer = $null
$RecordCount = 0
$Pending = New-Object 'Collections.Generic.Stack[string]'
$Pending.Push($Root)
try {
  while ($Pending.Count -gt 0) {
    $Directory = $Pending.Pop()
    try { $Children = Get-ChildItem -LiteralPath $Directory -Force -ErrorAction Stop }
    catch {
      [pscustomobject]@{
        stage="mounted-metadata";path=$Directory;error=$_.Exception.Message
      } |
        ConvertTo-Json -Compress |
        Out-File -FilePath (Join-Path $Run "errors.jsonl") -Append -Encoding utf8
      continue
    }
    foreach ($Child in $Children) {
      if ($Child.Attributes -band [IO.FileAttributes]::ReparsePoint) {
        [pscustomobject]@{
          stage="mounted-metadata"
          path=$Child.FullName
          limitation="reparse point recorded but not traversed"
        } |
          ConvertTo-Json -Compress |
          Out-File -FilePath (Join-Path $Run "limitations.jsonl") -Append -Encoding utf8
      }
      elseif ($Child.PSIsContainer) { $Pending.Push($Child.FullName) }
      else {
        $Record = [pscustomobject]@{
          FullName = $Child.FullName
          Length = $Child.Length
          CreationTimeUtc = $Child.CreationTimeUtc.ToString("o")
          LastWriteTimeUtc = $Child.LastWriteTimeUtc.ToString("o")
          LastAccessTimeUtc = $Child.LastAccessTimeUtc.ToString("o")
          TimestampSource = "mounted filesystem API"
          LastWriteSemantic = "content last-write time from mounted view"
          LastAccessCaveat = "may be stale or affected by acquisition conditions"
        }
        $CsvLines = @($Record | ConvertTo-Csv -NoTypeInformation)
        if ($null -eq $Writer) {
          $Encoding = New-Object Text.UTF8Encoding($false)
          $Stream = [IO.File]::Open(
            $MetadataOutput, [IO.FileMode]::CreateNew,
            [IO.FileAccess]::Write, [IO.FileShare]::None
          )
          $Writer = New-Object IO.StreamWriter($Stream, $Encoding)
          $Writer.WriteLine($CsvLines[0])
        }
        $Writer.WriteLine($CsvLines[1])
        $RecordCount++
      }
    }
  }
}
finally {
  if ($null -ne $Writer) { $Writer.Dispose() }
}
if ($RecordCount -eq 0) { throw "Mounted filesystem inventory produced zero files" }
[pscustomobject]@{
  stage = "mounted-metadata"
  limitation = "triage inventory only; not full MFT, ADS, USN, or deleted-file analysis"
} | ConvertTo-Json -Compress |
  Out-File -FilePath (Join-Path $Run "limitations.jsonl") -Append -Encoding utf8`
    },
    {
      "title": "Inventory Prefetch and AppCompat Artifacts for Later Parsing",
      "language": "powershell",
      "code": String.raw`Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$HelperPath = Join-Path $PSScriptRoot "dfir-run-context.ps1"
. $HelperPath
$Context = Get-VerifiedDfirContext
$Run = $Context.Run
$Root = $Context.Root
$RootPrefix = $Context.RootPrefix
$Rows = New-Object Collections.Generic.List[object]
$Limitations = Join-Path $Run "limitations.jsonl"
function Add-Limitation([string]$Path, [string]$Reason) {
  [pscustomobject]@{
    stage="execution-artifact-inventory";path=$Path;limitation=$Reason
  } | ConvertTo-Json -Compress |
    Out-File -FilePath $Limitations -Append -Encoding utf8
}
function Test-ContainedDirectoryWithoutReparse([string]$Candidate) {
  $Full = [IO.Path]::GetFullPath($Candidate).TrimEnd('\')
  if (-not $Full.StartsWith($RootPrefix, [StringComparison]::OrdinalIgnoreCase)) {
    Add-Limitation $Full "directory is outside the evidence root"
    return $false
  }
  $Current = $Root
  foreach ($Part in $Full.Substring($RootPrefix.Length).Split('\')) {
    if ([string]::IsNullOrWhiteSpace($Part)) { continue }
    $Current = Join-Path $Current $Part
    if (-not (Test-Path -LiteralPath $Current -PathType Container)) {
      Add-Limitation $Current "directory component missing"
      return $false
    }
    $Item = Get-Item -LiteralPath $Current -Force
    if ($Item.Attributes -band [IO.FileAttributes]::ReparsePoint) {
      Add-Limitation $Current "directory component is a reparse point"
      return $false
    }
  }
  return $true
}
$Sources = @(
  [pscustomobject]@{
    Family="Prefetch"
    Path=(Join-Path $Root "Windows\Prefetch")
    Pattern="*.pf"
  },
  [pscustomobject]@{
    Family="AppCompatPrograms"
    Path=(Join-Path $Root "Windows\AppCompat\Programs")
    Pattern="*"
  }
)
foreach ($Source in $Sources) {
  if (-not (Test-ContainedDirectoryWithoutReparse $Source.Path)) { continue }
  try {
    $Items = Get-ChildItem -LiteralPath $Source.Path -Force -File -ErrorAction Stop |
      Where-Object { $_.Name -like $Source.Pattern } | Sort-Object FullName
  }
  catch {
    [pscustomobject]@{
      stage="execution-artifact-inventory"
      path=$Source.Path
      error=$_.Exception.Message
    } |
      ConvertTo-Json -Compress |
      Out-File -FilePath (Join-Path $Run "errors.jsonl") -Append -Encoding utf8
    throw
  }
  foreach ($Item in $Items) {
    if (-not ($Item -is [IO.FileInfo]) -or
        ($Item.Attributes -band [IO.FileAttributes]::ReparsePoint)) {
      Add-Limitation $Item.FullName "final object is not a regular non-reparse file"
      continue
    }
    $Rows.Add([pscustomobject]@{
      ArtifactFamily = $Source.Family
      FullName = $Item.FullName
      Length = $Item.Length
      LastWriteTimeUtc = $Item.LastWriteTimeUtc.ToString("o")
      TimeSemantic = "container-file last-write time; artifact content not parsed"
      Interpretation = "file inventory lead only"
    })
  }
}
if ($Rows.Count -eq 0) {
  [pscustomobject]@{
    stage="execution-artifact-inventory"
    limitation="zero artifact files inventoried"
  } |
    ConvertTo-Json -Compress |
    Out-File -FilePath (Join-Path $Run "limitations.jsonl") -Append -Encoding utf8
}
else {
  $InventoryOutput = Join-Path $Run "execution-artifact-file-inventory.csv"
  $Rows | Sort-Object ArtifactFamily, FullName |
    Export-Csv -Path $InventoryOutput -NoTypeInformation -Encoding UTF8 -NoClobber
}`
    },
    {
      "title": "Sort Mounted Metadata by Parsed UTC Time",
      "language": "python",
      "code": String.raw`import csv
import os
import re
from datetime import datetime, timezone
from pathlib import Path


path = Path(os.environ["DFIR_RUN"]) / "mounted-filesystem-metadata.csv"
windows_time = re.compile(
    r"^(?P<whole>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})"
    r"(?:\.(?P<fraction>\d{1,7}))?(?P<offset>Z|[+-]\d{2}:\d{2})$"
)
epoch = datetime(1970, 1, 1, tzinfo=timezone.utc)


def timestamp_100ns(value: str) -> int:
    if not isinstance(value, str) or not value.strip():
        raise ValueError("blank filesystem timestamp")
    match = windows_time.fullmatch(value.strip())
    if match is None:
        raise ValueError("filesystem timestamp is not offset-aware ISO 8601")
    offset = "+00:00" if match["offset"] == "Z" else match["offset"]
    whole = datetime.fromisoformat(match["whole"] + offset).astimezone(timezone.utc)
    delta = whole - epoch
    seconds = delta.days * 86_400 + delta.seconds
    fraction = int((match["fraction"] or "").ljust(7, "0"))
    return seconds * 10_000_000 + fraction


with path.open(newline="", encoding="utf-8-sig") as source:
    reader = csv.DictReader(source)
    required = {"FullName", "Length", "LastWriteTimeUtc", "TimestampSource"}
    if reader.fieldnames is None or not required.issubset(reader.fieldnames):
        raise ValueError("mounted metadata CSV schema is incomplete")
    rows = list(reader)

rows.sort(key=lambda row: (timestamp_100ns(row["LastWriteTimeUtc"]), row["FullName"]))
for row in rows[-25:]:
    when = row["LastWriteTimeUtc"].strip()
    timestamp_100ns(when)
    print(f"{when} {int(row['Length']):>10} {row['FullName']}")`
    }
  ]
};
