window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "PowerShell Examples: Start One Verified, Non-Overwriting Case Run",
  "codeExamples": [
    {
      "title": "Create a Run and Verify the Mounted Evidence Root",
      "language": "powershell",
      "code": String.raw`Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$CaseRoot = "D:\DFIR\Cases\case-2026-06-26"
$Image = "E:\Evidence\win10-disk.E01"
$RootInput = "E:\Mount\C"
$MountTool = $env:DFIR_MOUNT_TOOL
$MountToolVersion = $env:DFIR_MOUNT_TOOL_VERSION
$MountTimeText = $env:DFIR_MOUNT_TIME_UTC
$MountSessionLog = $env:DFIR_MOUNT_SESSION_LOG
$MountImageId = $env:DFIR_MOUNT_IMAGE_ID
$MountDeviceId = $env:DFIR_MOUNT_DEVICE_ID

if ([string]::IsNullOrWhiteSpace($MountTool) -or
    [string]::IsNullOrWhiteSpace($MountToolVersion) -or
    [string]::IsNullOrWhiteSpace($MountTimeText) -or
    [string]::IsNullOrWhiteSpace($MountSessionLog) -or
    [string]::IsNullOrWhiteSpace($MountImageId) -or
    [string]::IsNullOrWhiteSpace($MountDeviceId)) {
  throw "Set all DFIR_MOUNT_* provenance variables before initialization"
}
$MountTime = [datetimeoffset]::Parse(
  $MountTimeText,
  [Globalization.CultureInfo]::InvariantCulture
).ToUniversalTime()

$ImageItem = Get-Item -LiteralPath $Image -Force
$RootItem = Get-Item -LiteralPath $RootInput -Force
$MountLogItem = Get-Item -LiteralPath $MountSessionLog -Force
if (-not ($ImageItem -is [IO.FileInfo]) -or
    ($ImageItem.Attributes -band [IO.FileAttributes]::ReparsePoint)) {
  throw "Evidence image must be a regular, non-reparse file"
}
if (-not ($RootItem -is [IO.DirectoryInfo]) -or
    ($RootItem.Attributes -band [IO.FileAttributes]::ReparsePoint)) {
  throw "Mounted evidence root must be a real directory"
}
if (-not ($MountLogItem -is [IO.FileInfo]) -or
    ($MountLogItem.Attributes -band [IO.FileAttributes]::ReparsePoint)) {
  throw "Mount-session log must be a regular, non-reparse file"
}
$Root = $RootItem.FullName.TrimEnd('\')
$CaseRootFull = [IO.Path]::GetFullPath($CaseRoot).TrimEnd('\')
$RootPrefix = $Root + '\'
if ($CaseRootFull.Equals($Root, [StringComparison]::OrdinalIgnoreCase) -or
    $CaseRootFull.StartsWith($RootPrefix, [StringComparison]::OrdinalIgnoreCase)) {
  throw "Case output must not be stored beneath the evidence root"
}

$ImageVolume = Get-Volume -FilePath $Image
$RootVolume = Get-Volume -FilePath $Root
if ($null -eq $RootVolume.DriveLetter) {
  throw "Record directory-mount mapping explicitly; this example expects a drive letter"
}
$RootPartitions = @(Get-Partition -DriveLetter $RootVolume.DriveLetter)
if ($RootPartitions.Count -ne 1) {
  throw "Mounted root did not resolve to exactly one partition"
}
$RootPartition = $RootPartitions[0]
$RootDisks = @($RootPartition | Get-Disk)
if ($RootDisks.Count -ne 1) {
  throw "Mounted root did not resolve to exactly one disk"
}
$RootDisk = $RootDisks[0]
$PartitionReadOnly = $false
if ($RootPartition.PSObject.Properties.Name -contains "IsReadOnly") {
  $PartitionReadOnly = [bool]$RootPartition.IsReadOnly
}
if (-not [bool]$RootDisk.IsReadOnly -and -not $PartitionReadOnly) {
  throw "Mounted evidence root is not backed by a read-only disk or partition"
}
if (-not ([string]$RootDisk.UniqueId).Equals(
    $MountDeviceId, [StringComparison]::OrdinalIgnoreCase
)) {
  throw "Mount-tool device identifier does not match the observed disk"
}

function Assert-ExistingPathHasNoReparseComponent([string]$Path) {
  $Full = [IO.Path]::GetFullPath($Path).TrimEnd('\')
  $PathRoot = [IO.Path]::GetPathRoot($Full)
  $Current = $PathRoot
  foreach ($Part in $Full.Substring($PathRoot.Length).Split('\')) {
    if ([string]::IsNullOrWhiteSpace($Part)) { continue }
    $Current = Join-Path $Current $Part
    $Item = Get-Item -LiteralPath $Current -Force
    if ($Item.Attributes -band [IO.FileAttributes]::ReparsePoint) {
      throw "Case storage path contains a reparse point: $Current"
    }
  }
}
$MountLogFull = $MountLogItem.FullName
$MountLogParent = Split-Path -Parent $MountLogFull
Assert-ExistingPathHasNoReparseComponent $MountLogParent
if ($MountLogFull.StartsWith($RootPrefix, [StringComparison]::OrdinalIgnoreCase)) {
  throw "Mount-session log must be stored outside the evidence root"
}
$MountLogText = Get-Content -LiteralPath $MountLogFull -Raw
if ($MountLogText.IndexOf(
    $MountImageId, [StringComparison]::OrdinalIgnoreCase
  ) -lt 0 -or
    $MountLogText.IndexOf(
      $MountDeviceId, [StringComparison]::OrdinalIgnoreCase
    ) -lt 0) {
  throw "Mount-session log does not contain the supplied image and device IDs"
}
$CaseParent = Split-Path -Parent $CaseRootFull
if (-not (Test-Path -LiteralPath $CaseParent -PathType Container)) {
  throw "Create the analyst-controlled case parent before collection: $CaseParent"
}
Assert-ExistingPathHasNoReparseComponent $CaseParent
if (Test-Path -LiteralPath $CaseRootFull) {
  Assert-ExistingPathHasNoReparseComponent $CaseRootFull
}

$RunId = "{0}-{1}" -f (
  (Get-Date).ToUniversalTime().ToString("yyyyMMddTHHmmssZ")
), ([guid]::NewGuid().ToString("N"))
$Run = Join-Path (Join-Path $CaseRootFull "runs") $RunId
[IO.Directory]::CreateDirectory($Run) | Out-Null
$StatusPath = Join-Path $Run "initialization-status.json"

try {
  $ImageHash = Get-FileHash -Algorithm SHA256 -LiteralPath $Image
  $MountLogHash = Get-FileHash -Algorithm SHA256 -LiteralPath $MountLogFull
  $PreservedMountLogPath = Join-Path $Run "mount-session.log"
  Copy-Item -LiteralPath $MountLogFull -Destination $PreservedMountLogPath
  $PreservedMountLogHash = Get-FileHash -Algorithm SHA256 -LiteralPath (
    $PreservedMountLogPath
  )
  if ($PreservedMountLogHash.Hash -ne $MountLogHash.Hash) {
    throw "Preserved mount-session log hash does not match its source"
  }
  $Analyst = [Security.Principal.WindowsIdentity]::GetCurrent().Name
  $MappingPath = Join-Path $Run "mount-mapping.json"
  $MappingRecord = [ordered]@{
    image_identifier = $MountImageId
    image_path = $ImageItem.FullName
    image_sha256 = $ImageHash.Hash
    mount_tool = $MountTool
    mount_tool_version = $MountToolVersion
    mount_session_log_source = $MountLogFull
    mount_session_log_source_sha256 = $MountLogHash.Hash
    preserved_mount_session_log = $PreservedMountLogPath
    preserved_mount_session_log_sha256 = $PreservedMountLogHash.Hash
    supplied_device_identifier = $MountDeviceId
    observed_disk_unique_id = $RootDisk.UniqueId
    observed_volume_unique_id = $RootVolume.UniqueId
    mounted_root = $Root
    mount_time_utc = $MountTime.ToString("o")
  }
  $MappingRecord | ConvertTo-Json -Depth 4 |
    Out-File -FilePath $MappingPath -Encoding utf8 -NoClobber
  $MappingHash = Get-FileHash -Algorithm SHA256 -LiteralPath $MappingPath
  $MappingHashPath = Join-Path $Run "mount-mapping-hash.csv"
  $MappingHash | Export-Csv $MappingHashPath -NoTypeInformation -Encoding UTF8 -NoClobber
  $Record = [ordered]@{
    case_id = "case-2026-06-26"
    run_id = $RunId
    source_type = "offline_image"
    collected_utc = (Get-Date).ToUniversalTime().ToString("o")
    analyst_identity = $Analyst
    analyst_host = [Environment]::MachineName
    analyst_timezone = [TimeZoneInfo]::Local.Id
    evidence_timezone = "derive from the offline SYSTEM hive before interpretation"
    daylight_saving_assumption = "use offline time-zone configuration for local artifacts"
    known_clock_skew = "unknown; record any measured skew before correlation"
    image_path = $ImageItem.FullName
    image_sha256 = $ImageHash.Hash
    image_storage_volume = $ImageVolume.UniqueId
    mounted_root = $RootItem.FullName
    mounted_volume = $RootVolume.UniqueId
    mounted_disk_number = $RootDisk.Number
    mounted_disk_unique_id = $RootDisk.UniqueId
    disk_read_only = [bool]$RootDisk.IsReadOnly
    partition_read_only = $PartitionReadOnly
    mount_tool = $MountTool
    mount_tool_version = $MountToolVersion
    mount_time_utc = $MountTime.ToString("o")
    mount_image_identifier = $MountImageId
    mount_device_identifier = $MountDeviceId
    mount_session_log_source = $MountLogFull
    mount_session_log_source_sha256 = $MountLogHash.Hash
    preserved_mount_session_log = $PreservedMountLogPath
    preserved_mount_session_log_sha256 = $PreservedMountLogHash.Hash
    mount_mapping_record = $MappingPath
    mount_mapping_sha256 = $MappingHash.Hash
    source_to_mount_mapping = "$Image -> disk $($RootDisk.Number) -> $Root"
    mapping_verification = "session log contains image and observed device IDs"
    powershell_version = $PSVersionTable.PSVersion.ToString()
    command = "Get-FileHash -Algorithm SHA256 -LiteralPath <image>"
  }
  $AcquisitionPath = Join-Path $Run "acquisition-record.json"
  $Record | ConvertTo-Json -Depth 4 |
    Out-File -FilePath $AcquisitionPath -Encoding utf8 -NoClobber
  $AcquisitionHash = Get-FileHash -Algorithm SHA256 -LiteralPath $AcquisitionPath
  $AcquisitionHashPath = Join-Path $Run "acquisition-record-hash.csv"
  $AcquisitionHash |
    Export-Csv $AcquisitionHashPath -NoTypeInformation -Encoding UTF8 -NoClobber
  $HashPath = Join-Path $Run "evidence-hash.csv"
  $ImageHash | Export-Csv -Path $HashPath -NoTypeInformation -Encoding UTF8 -NoClobber
  "DFIR_RUN=$Run" |
    Out-File -FilePath (Join-Path $Run "select-this-run.txt") -Encoding utf8 -NoClobber
  [pscustomobject]@{
    stage = "initialization"
    exit_status = 0
    finished_utc = (Get-Date).ToUniversalTime().ToString("o")
  } | ConvertTo-Json |
    Out-File -FilePath $StatusPath -Encoding utf8 -NoClobber

  $env:DFIR_RUN = (Resolve-Path -LiteralPath $Run).Path
  Write-Output "Selected run: $env:DFIR_RUN"
}
catch {
  [pscustomobject]@{
    time_utc = (Get-Date).ToUniversalTime().ToString("o")
    stage = "initialize-run"
    exit_status = 1
    error = $_.Exception.Message
  } | ConvertTo-Json -Compress |
    Out-File -FilePath (Join-Path $Run "errors.jsonl") -Append -Encoding utf8
  [pscustomobject]@{
    stage = "initialization"
    exit_status = 1
    finished_utc = (Get-Date).ToUniversalTime().ToString("o")
  } | ConvertTo-Json |
    Out-File -FilePath $StatusPath -Encoding utf8 -NoClobber
  throw
}`
    },
    {
      "title": "Create an Exclusive Case Note in the Selected Run",
      "language": "powershell",
      "code": String.raw`Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Run = $env:DFIR_RUN
if ([string]::IsNullOrWhiteSpace($Run) -or
    -not (Test-Path -LiteralPath $Run -PathType Container)) {
  throw "Select the run by setting DFIR_RUN to its full path"
}
$Note = [ordered]@{
  case_id = "case-2026-06-26"
  run_path = (Resolve-Path -LiteralPath $Run).Path
  analyst = [Security.Principal.WindowsIdentity]::GetCurrent().Name
  started_utc = (Get-Date).ToUniversalTime().ToString("o")
  scope = "Authorized Windows forensic review"
  limitations = "Add known acquisition, access, clock, and parser limitations"
}
$Note | ConvertTo-Json -Depth 3 |
  Out-File -FilePath (Join-Path $Run "case-notes.json") -Encoding utf8 -NoClobber`
    }
  ]
};
