window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "PowerShell and Python Examples: Preserve Collections and Findings",
  "codeExamples": [
    {
      "title": "Create a Deterministic, Nonempty Collection Manifest",
      "language": "powershell",
      "code": String.raw`Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$Run = $env:DFIR_RUN
$Collection = Join-Path $Run "collected"
$Manifest = Join-Path $Run "collection-manifest.csv"
$CollectionItem = Get-Item -LiteralPath $Collection -Force
if (-not ($CollectionItem -is [IO.DirectoryInfo]) -or
    ($CollectionItem.Attributes -band [IO.FileAttributes]::ReparsePoint)) {
  throw "Collection must be a real directory"
}

$Paths = New-Object Collections.Generic.List[string]
$Pending = New-Object 'Collections.Generic.Stack[string]'
$Pending.Push($CollectionItem.FullName)
while ($Pending.Count -gt 0) {
  $Directory = $Pending.Pop()
  try { $Children = Get-ChildItem -LiteralPath $Directory -Force -ErrorAction Stop }
  catch {
    [pscustomobject]@{
      stage="collection-manifest"
      path=$Directory
      error=$_.Exception.Message
    } |
      ConvertTo-Json -Compress |
      Out-File -FilePath (Join-Path $Run "errors.jsonl") -Append -Encoding utf8
    throw
  }
  foreach ($Child in $Children) {
    if ($Child.Attributes -band [IO.FileAttributes]::ReparsePoint) {
      [pscustomobject]@{
        stage="collection-manifest"
        path=$Child.FullName
        limitation="reparse point skipped"
      } |
        ConvertTo-Json -Compress |
        Out-File -FilePath (Join-Path $Run "limitations.jsonl") -Append -Encoding utf8
    }
    elseif ($Child.PSIsContainer) { $Pending.Push($Child.FullName) }
    else { $Paths.Add($Child.FullName) }
  }
}
if ($Paths.Count -eq 0) { throw "Collection contains no regular files" }
$PathArray = $Paths.ToArray()
[Array]::Sort($PathArray, [StringComparer]::Ordinal)
$Rows = New-Object Collections.Generic.List[object]
foreach ($Path in $PathArray) {
  $Before = Get-Item -LiteralPath $Path -Force
  $Stream = $null
  $Hasher = $null
  try {
    $Stream = [IO.File]::Open(
      $Path, [IO.FileMode]::Open, [IO.FileAccess]::Read, [IO.FileShare]::Read
    )
    $Hasher = [Security.Cryptography.SHA256]::Create()
    $Digest = $Hasher.ComputeHash($Stream)
    $HashText = ([BitConverter]::ToString($Digest)).Replace("-", "")
  }
  catch {
    [pscustomobject]@{stage="collection-manifest";path=$Path;error=$_.Exception.Message} |
      ConvertTo-Json -Compress |
      Out-File -FilePath (Join-Path $Run "errors.jsonl") -Append -Encoding utf8
    throw
  }
  finally {
    if ($null -ne $Hasher) { $Hasher.Dispose() }
    if ($null -ne $Stream) { $Stream.Dispose() }
  }
  $After = Get-Item -LiteralPath $Path -Force
  if ($Before.Length -ne $After.Length -or
      $Before.LastWriteTimeUtc -ne $After.LastWriteTimeUtc) {
    throw "File changed while manifest was generated: $Path"
  }
  $Rows.Add([pscustomobject]@{
    Path = $After.FullName
    Length = $After.Length
    LastWriteTimeUtc = $After.LastWriteTimeUtc.ToString("o")
    SHA256 = $HashText
    HashMethod = "SHA-256 over an exclusive non-write-shared read handle"
  })
}
$Rows | Export-Csv -Path $Manifest -NoTypeInformation -Encoding UTF8 -NoClobber`
    },
    {
      "title": "Record Collection Scope and Timestamp Assumptions",
      "language": "powershell",
      "code": String.raw`Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$HelperPath = Join-Path $PSScriptRoot "dfir-run-context.ps1"
. $HelperPath
$Context = Get-VerifiedDfirContext
$Run = $Context.Run
$Record = [ordered]@{
  case_id = "case-2026-06-26"
  run_path = (Resolve-Path -LiteralPath $Run).Path
  source = $Context.Root
  collection_type = "targeted Windows artifact collection"
  collected_utc = (Get-Date).ToUniversalTime().ToString("o")
  analyst_timezone = [TimeZoneInfo]::Local.Id
  evidence_timezone_source = "offline-time-context.json from SYSTEM hive"
  clock_skew = "unknown unless separately measured"
  limitations = @(
    "targeted collection, not a full forensic image",
    "manifest consistency assumes source metadata is not maliciously restored"
  )
}
$Record | ConvertTo-Json -Depth 4 |
  Out-File -FilePath (Join-Path $Run "collection-record.json") -Encoding utf8 -NoClobber`
    },
    {
      "title": "Create an Exclusive Findings Table",
      "language": "python",
      "code": String.raw`import csv
import os
from pathlib import Path


run = Path(os.environ["DFIR_RUN"])
if not run.is_dir():
    raise FileNotFoundError("selected DFIR run does not exist")
if not (run / "acquisition-record.json").is_file():
    raise FileNotFoundError("selected run lacks acquisition provenance")
rows = [{
    "finding_id": "F-001",
    "evidence": "Security.evtx contains a successful interactive logon",
    "source_record": "security-logons.csv RecordId=<record-id>",
    "method": "Get-WinEvent offline EVTX query plus preserved RawXml",
    "confidence": "medium",
    "limitation": "Logon event does not prove who physically used the account",
}]

with (run / "findings.csv").open("x", newline="", encoding="utf-8") as output:
    writer = csv.DictWriter(output, fieldnames=rows[0].keys())
    writer.writeheader()
    writer.writerows(rows)`
    }
  ]
};
