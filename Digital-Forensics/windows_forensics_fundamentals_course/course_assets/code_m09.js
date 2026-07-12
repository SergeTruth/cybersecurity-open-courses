window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Python and PowerShell Examples: Correlate Parsed UTC Records",
  "codeExamples": [
    {
      "title": "Build a Traceable Cross-Artifact UTC Timeline",
      "language": "python",
      "code": String.raw`import csv
import json
import os
import re
from datetime import datetime, timedelta, timezone
from pathlib import Path


run = Path(os.environ["DFIR_RUN"])
limitations = run / "limitations.jsonl"
epoch = datetime(1970, 1, 1, tzinfo=timezone.utc)
windows_time = re.compile(
    r"^(?P<whole>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})"
    r"(?:\.(?P<fraction>\d{1,7}))?(?P<offset>Z|[+-]\d{2}:\d{2})$"
)
events = []


def add_limitation(record: dict) -> None:
    with limitations.open("a", encoding="utf-8") as output:
        output.write(json.dumps(record, ensure_ascii=True) + "\n")


def timestamp_100ns(value: str, source: Path, row_number: int) -> int:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{source}: row {row_number} has a blank timestamp")
    text = value.strip()
    match = windows_time.fullmatch(text)
    if match is None:
        raise ValueError(
            f"{source}: row {row_number} timestamp is not offset-aware ISO 8601"
        )
    offset = "+00:00" if match["offset"] == "Z" else match["offset"]
    whole = datetime.fromisoformat(match["whole"] + offset).astimezone(timezone.utc)
    delta = whole - epoch
    seconds = delta.days * 86_400 + delta.seconds
    fraction = int((match["fraction"] or "").ljust(7, "0"))
    return seconds * 10_000_000 + fraction


def format_utc_100ns(ticks: int) -> str:
    seconds, fraction = divmod(ticks, 10_000_000)
    whole = epoch + timedelta(seconds=seconds)
    return whole.strftime("%Y-%m-%dT%H:%M:%S") + f".{fraction:07d}Z"


sources = [
    {
        "path": run / "security-logons.csv",
        "kind": "logon",
        "time": "TimeUtc",
        "required": {"TimeUtc", "Id", "RecordId", "Channel", "SourceEvtxHash"},
        "detail": lambda row: {
            "event_id": row["Id"],
            "record_id": row["RecordId"],
            "channel": row["Channel"],
            "source_evtx_hash": row["SourceEvtxHash"],
        },
    },
    {
        "path": run / "mounted-filesystem-metadata.csv",
        "kind": "file_last_write",
        "time": "LastWriteTimeUtc",
        "required": {"LastWriteTimeUtc", "FullName", "Length", "TimestampSource"},
        "detail": lambda row: {
            "path": row["FullName"],
            "length": row["Length"],
            "timestamp_source": row["TimestampSource"],
        },
    },
    {
        "path": run / "execution-artifact-file-inventory.csv",
        "kind": "execution_artifact_file",
        "time": "LastWriteTimeUtc",
        "required": {"LastWriteTimeUtc", "FullName", "ArtifactFamily", "Interpretation"},
        "detail": lambda row: {
            "path": row["FullName"],
            "family": row["ArtifactFamily"],
            "interpretation": row["Interpretation"],
        },
    },
]

for source in sources:
    path = source["path"]
    if not path.is_file():
        add_limitation({
            "stage": "cross-artifact-timeline",
            "source": str(path),
            "limitation": "source derivative missing",
        })
        continue
    with path.open(newline="", encoding="utf-8-sig") as input_file:
        reader = csv.DictReader(input_file)
        if reader.fieldnames is None or not source["required"].issubset(reader.fieldnames):
            raise ValueError(f"{path}: required provenance fields are absent")
        for row_number, row in enumerate(reader, start=2):
            raw_time = row[source["time"]]
            ticks = timestamp_100ns(raw_time, path, row_number)
            original_time = raw_time.strip()
            events.append({
                "_ticks": ticks,
                "timestamp_100ns": ticks,
                "timestamp_ns": ticks * 100,
                "timestamp_utc": format_utc_100ns(ticks),
                "timestamp_original": original_time,
                "kind": source["kind"],
                "source_derivative": path.name,
                "source_row": row_number,
                "detail": source["detail"](row),
            })

if not events:
    raise ValueError("no timeline events were available; review limitations.jsonl")

events.sort(
    key=lambda event: (
        event["_ticks"], event["source_derivative"], event["source_row"]
    )
)
with (run / "correlated-timeline.jsonl").open("x", encoding="utf-8") as output:
    for event in events:
        event = dict(event)
        event.pop("_ticks")
        output.write(json.dumps(event, ensure_ascii=True, sort_keys=True) + "\n")

for event in events[-50:]:
    print(f"{event['timestamp_utc']} [{event['kind']}] {event['detail']}")`
    },
    {
      "title": "Verify Read-Only State Before a Limited Triage Snapshot",
      "language": "powershell",
      "code": String.raw`Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$Run = $null
try {
  $HelperPath = Join-Path $PSScriptRoot "dfir-run-context.ps1"
  . $HelperPath
  $Context = Get-VerifiedDfirContext
  $Run = $Context.Run
$Root = $Context.Root
$RootPrefix = $Context.RootPrefix
$Volume = $Context.Volume
$Partition = $Context.Partition
$Disk = $Context.Disk
$Limitations = Join-Path $Run "limitations.jsonl"
function Add-Limitation([string]$Path, [string]$Reason) {
  [pscustomobject]@{stage="limited-triage";path=$Path;limitation=$Reason} |
    ConvertTo-Json -Compress |
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
$PartitionReadOnly = $false
if ($Partition.PSObject.Properties.Name -contains "IsReadOnly") {
  $PartitionReadOnly = [bool]$Partition.IsReadOnly
}
if (-not [bool]$Disk.IsReadOnly -and -not $PartitionReadOnly) {
  throw "Mounted evidence root is not read-only"
}
$VerificationOutput = Join-Path $Run "triage-readonly-verification.json"
[ordered]@{
  verified_utc = (Get-Date).ToUniversalTime().ToString("o")
  mounted_root = $Root
  volume_unique_id = $Volume.UniqueId
  disk_number = $Disk.Number
  disk_unique_id = $Disk.UniqueId
  disk_read_only = [bool]$Disk.IsReadOnly
  partition_read_only = $PartitionReadOnly
  scope = "limited selected-artifact preview; use full module outputs for correlation"
} | ConvertTo-Json |
  Out-File -FilePath $VerificationOutput -Encoding utf8 -NoClobber

$Rows = New-Object Collections.Generic.List[object]
foreach ($Relative in @(
  "Users", "Windows\System32\winevt\Logs",
  "Windows\Prefetch", "Windows\System32\Tasks"
)) {
  $Path = Join-Path $Root $Relative
  if (-not (Test-ContainedDirectoryWithoutReparse $Path)) { continue }
  try {
    $Items = Get-ChildItem -LiteralPath $Path -Force -ErrorAction Stop |
      Sort-Object FullName
  }
  catch {
    [pscustomobject]@{stage="limited-triage";path=$Path;error=$_.Exception.Message} |
      ConvertTo-Json -Compress |
      Out-File -FilePath (Join-Path $Run "errors.jsonl") -Append -Encoding utf8
    throw
  }
  foreach ($Item in $Items) {
    if ($Item.Attributes -band [IO.FileAttributes]::ReparsePoint) {
      [pscustomobject]@{
        stage="limited-triage"
        path=$Item.FullName
        limitation="reparse point skipped"
      } |
        ConvertTo-Json -Compress |
        Out-File -FilePath (Join-Path $Run "limitations.jsonl") -Append -Encoding utf8
      continue
    }
    $Rows.Add([pscustomobject]@{
      SourceDirectory=$Relative
      FullName=$Item.FullName
      ItemType=if ($Item.PSIsContainer) { "directory" } else { "file" }
      LastWriteTimeUtc=$Item.LastWriteTimeUtc.ToString("o")
      TimeSemantic="mounted-view last-write time"
    })
  }
}
if ($Rows.Count -gt 0) {
  $TriageOutput = Join-Path $Run "limited-triage-inventory.csv"
  $Rows | Export-Csv -Path $TriageOutput -NoTypeInformation -Encoding UTF8 -NoClobber
  }
}
catch {
  $PrimaryError = $_
  if ($null -ne $Run -and
      (Test-Path -LiteralPath $Run -PathType Container)) {
    try {
      [pscustomobject]@{
        stage="limited-triage"
        time_utc=(Get-Date).ToUniversalTime().ToString("o")
        error=$PrimaryError.Exception.Message
      } | ConvertTo-Json -Compress |
        Out-File -FilePath (Join-Path $Run "errors.jsonl") -Append -Encoding utf8
    }
    catch {
      Write-Warning "Could not append the limited-triage error record"
    }
  }
  throw $PrimaryError
}`
    }
  ]
};
