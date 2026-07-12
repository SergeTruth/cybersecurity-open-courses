window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "PowerShell and Python Examples: Inventory User-Activity Leads",
  "codeExamples": [
    {
      "title": "Inventory Profile Artifacts Without Traversing Reparse Points",
      "language": "powershell",
      "code": String.raw`Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$HelperPath = Join-Path $PSScriptRoot "dfir-run-context.ps1"
. $HelperPath
$Context = Get-VerifiedDfirContext
$Run = $Context.Run
$Root = $Context.Root
$RootPrefix = $Context.RootPrefix
$ProfileCsv = Join-Path $Run "offline-profile-list.csv"
if (-not (Test-Path -LiteralPath $ProfileCsv -PathType Leaf)) {
  throw "Run the offline ProfileList exporter first"
}
$Rows = New-Object Collections.Generic.List[object]
$Limitations = Join-Path $Run "limitations.jsonl"

function Add-Limitation([string]$Path, [string]$Reason) {
  [pscustomobject]@{stage="profile-artifact-inventory";path=$Path;limitation=$Reason} |
    ConvertTo-Json -Compress |
    Out-File -FilePath $Limitations -Append -Encoding utf8
}
function Test-ContainedDirectoryWithoutReparse([string]$Candidate) {
  $Full = [IO.Path]::GetFullPath($Candidate).TrimEnd('\')
  if (-not $Full.StartsWith($RootPrefix, [StringComparison]::OrdinalIgnoreCase)) {
    Add-Limitation $Full "directory is outside the evidence root"
    return $false
  }
  $Relative = $Full.Substring($RootPrefix.Length)
  $Current = $Root
  foreach ($Part in $Relative.Split('\')) {
    if ([string]::IsNullOrWhiteSpace($Part)) { continue }
    $Current = Join-Path $Current $Part
    if (-not (Test-Path -LiteralPath $Current -PathType Container)) {
      Add-Limitation $Current "directory component missing"
      return $false
    }
    $Item = Get-Item -LiteralPath $Current -Force
    if ($Item.Attributes -band [IO.FileAttributes]::ReparsePoint) {
      Add-Limitation $Current "directory component is a reparse point and was not traversed"
      return $false
    }
  }
  return $true
}
function Get-FilesWithoutReparse([string]$Start) {
  $Pending = New-Object 'Collections.Generic.Stack[string]'
  $Pending.Push($Start)
  while ($Pending.Count -gt 0) {
    $Directory = $Pending.Pop()
    try { $Children = Get-ChildItem -LiteralPath $Directory -Force -ErrorAction Stop }
    catch { Add-Limitation $Directory ("unreadable: " + $_.Exception.Message); continue }
    foreach ($Child in $Children) {
      if ($Child.Attributes -band [IO.FileAttributes]::ReparsePoint) {
        Add-Limitation $Child.FullName "reparse point recorded but not traversed"
      }
      elseif ($Child.PSIsContainer) { $Pending.Push($Child.FullName) }
      else { Write-Output $Child }
    }
  }
}

foreach ($Profile in Import-Csv -LiteralPath $ProfileCsv -Encoding UTF8) {
  $ProfilePath = [IO.Path]::GetFullPath($Profile.MountedPath).TrimEnd('\')
  if (-not (Test-ContainedDirectoryWithoutReparse $ProfilePath)) { continue }
  foreach ($File in Get-FilesWithoutReparse $ProfilePath) {
    if ($File.Name -like "*.lnk" -or
        $File.Name -like "*.automaticDestinations-ms" -or
        $File.Name -in @("NTUSER.DAT", "UsrClass.dat")) {
      $Rows.Add([pscustomobject]@{
        ProfileSid = $Profile.Sid
        ProfilePath = $Profile.ProfileImagePath
        FullName = $File.FullName
        Length = $File.Length
        LastWriteTimeUtc = $File.LastWriteTimeUtc.ToString("o")
        TimeSemantic = "filesystem last-write time; artifact not parsed"
      })
    }
  }
}
$ArtifactOutput = Join-Path $Run "profile-artifact-leads.csv"
$Rows | Sort-Object FullName |
  Export-Csv -Path $ArtifactOutput -NoTypeInformation -Encoding UTF8 -NoClobber`
    },
    {
      "title": "Inventory Standard and OneDrive User-Folder Leads",
      "language": "powershell",
      "code": String.raw`Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$HelperPath = Join-Path $PSScriptRoot "dfir-run-context.ps1"
. $HelperPath
$Context = Get-VerifiedDfirContext
$Run = $Context.Run
$Root = $Context.Root
$RootPrefix = $Context.RootPrefix
$ProfileSource = Join-Path $Run "offline-profile-list.csv"
$Profiles = Import-Csv -LiteralPath $ProfileSource -Encoding UTF8
$Rows = New-Object Collections.Generic.List[object]
$Limitations = Join-Path $Run "limitations.jsonl"

function Add-Limitation([string]$Path, [string]$Reason) {
  [pscustomobject]@{stage="user-folder-leads";path=$Path;limitation=$Reason} |
    ConvertTo-Json -Compress |
    Out-File -FilePath $Limitations -Append -Encoding utf8
}
function Test-ContainedDirectoryWithoutReparse([string]$Candidate) {
  $Full = [IO.Path]::GetFullPath($Candidate).TrimEnd('\')
  if (-not $Full.StartsWith($RootPrefix, [StringComparison]::OrdinalIgnoreCase)) {
    Add-Limitation $Full "directory is outside the evidence root"
    return $false
  }
  $Relative = $Full.Substring($RootPrefix.Length)
  $Current = $Root
  foreach ($Part in $Relative.Split('\')) {
    if ([string]::IsNullOrWhiteSpace($Part)) { continue }
    $Current = Join-Path $Current $Part
    if (-not (Test-Path -LiteralPath $Current -PathType Container)) {
      Add-Limitation $Current "directory component missing"
      return $false
    }
    $Item = Get-Item -LiteralPath $Current -Force
    if ($Item.Attributes -band [IO.FileAttributes]::ReparsePoint) {
      Add-Limitation $Current "directory component is a reparse point and was not entered"
      return $false
    }
  }
  return $true
}

foreach ($Profile in $Profiles) {
  if (-not (Test-ContainedDirectoryWithoutReparse $Profile.MountedPath)) { continue }
  $Candidates = @(
    (Join-Path $Profile.MountedPath "Downloads"),
    (Join-Path $Profile.MountedPath "Desktop"),
    (Join-Path $Profile.MountedPath "Documents")
  )
  $ChildArguments = @{
    LiteralPath=$Profile.MountedPath;Directory=$true;Force=$true;ErrorAction="Stop"
  }
  $Candidates += Get-ChildItem @ChildArguments |
    Where-Object { $_.Name -like "OneDrive*" } |
    ForEach-Object { $_.FullName }
  foreach ($Folder in $Candidates) {
    if (-not (Test-ContainedDirectoryWithoutReparse $Folder)) { continue }
    foreach ($Item in Get-ChildItem -LiteralPath $Folder -Force -ErrorAction Stop |
        Sort-Object FullName) {
      if ($Item.Attributes -band [IO.FileAttributes]::ReparsePoint) {
        [pscustomobject]@{
          stage="user-folder-leads"
          path=$Item.FullName
          limitation="reparse point skipped"
        } |
          ConvertTo-Json -Compress |
          Out-File -FilePath $Limitations -Append -Encoding utf8
        continue
      }
      $Rows.Add([pscustomobject]@{
        ProfileSid = $Profile.Sid
        FolderLead = $Folder
        FullName = $Item.FullName
        ItemType = if ($Item.PSIsContainer) { "directory" } else { "file" }
        Length = if ($Item.PSIsContainer) { $null } else { $Item.Length }
        LastWriteTimeUtc = $Item.LastWriteTimeUtc.ToString("o")
      })
    }
  }
}
[pscustomobject]@{
  stage = "user-folder-leads"
  limitation = "lead list only; known folders may be redirected elsewhere"
} | ConvertTo-Json -Compress |
  Out-File -FilePath $Limitations -Append -Encoding utf8
$LeadOutput = Join-Path $Run "user-folder-leads.csv"
$Rows | Sort-Object FullName |
  Export-Csv -Path $LeadOutput -NoTypeInformation -Encoding UTF8 -NoClobber`
    },
    {
      "title": "Build a Profile Review List From Authoritative SID Context",
      "language": "python",
      "code": String.raw`import csv
import os
import re
from datetime import datetime, timezone
from pathlib import Path


run = Path(os.environ["DFIR_RUN"])
source_path = run / "profile-artifact-leads.csv"
required = {
    "ProfileSid", "ProfilePath", "FullName", "Length",
    "LastWriteTimeUtc", "TimeSemantic",
}
windows_time = re.compile(
    r"^(?P<whole>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})"
    r"(?:\.(?P<fraction>\d{1,7}))?(?P<offset>Z|[+-]\d{2}:\d{2})$"
)
epoch = datetime(1970, 1, 1, tzinfo=timezone.utc)


def timestamp_100ns(value: str) -> int:
    if not isinstance(value, str) or not value.strip():
        raise ValueError("blank artifact timestamp")
    match = windows_time.fullmatch(value.strip())
    if match is None:
        raise ValueError("artifact timestamp is not offset-aware ISO 8601")
    offset = "+00:00" if match["offset"] == "Z" else match["offset"]
    whole = datetime.fromisoformat(match["whole"] + offset).astimezone(timezone.utc)
    delta = whole - epoch
    seconds = delta.days * 86_400 + delta.seconds
    fraction = int((match["fraction"] or "").ljust(7, "0"))
    return seconds * 10_000_000 + fraction


with source_path.open(newline="", encoding="utf-8-sig") as source:
    reader = csv.DictReader(source)
    if reader.fieldnames is None or not required.issubset(reader.fieldnames):
        raise ValueError("profile artifact CSV schema is incomplete")
    rows = list(reader)

rows.sort(key=lambda row: (timestamp_100ns(row["LastWriteTimeUtc"]), row["FullName"]))
with (run / "profile-review.txt").open("x", encoding="utf-8") as output:
    for row in rows:
        when = row["LastWriteTimeUtc"].strip()
        timestamp_100ns(when)
        output.write(
            f"{when} sid={row['ProfileSid']} "
            f"profile={row['ProfilePath']} artifact={row['FullName']}\n"
        )`
    }
  ]
};
