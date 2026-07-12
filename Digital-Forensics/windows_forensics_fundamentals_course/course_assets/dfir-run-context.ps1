Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-VerifiedDfirContext {
  [CmdletBinding()]
  param([string]$SelectedRun = $env:DFIR_RUN)

  if ([string]::IsNullOrWhiteSpace($SelectedRun)) {
    throw "DFIR_RUN does not select a case run"
  }
  $RunItem = Get-Item -LiteralPath $SelectedRun -Force
  if (-not ($RunItem -is [IO.DirectoryInfo]) -or
      ($RunItem.Attributes -band [IO.FileAttributes]::ReparsePoint)) {
    throw "DFIR_RUN must select a real non-reparse directory"
  }
  $Run = $RunItem.FullName.TrimEnd('\')
  $AcquisitionPath = Join-Path $Run "acquisition-record.json"
  if (-not (Test-Path -LiteralPath $AcquisitionPath -PathType Leaf)) {
    throw "Selected run lacks acquisition-record.json"
  }
  $AcquisitionItem = Get-Item -LiteralPath $AcquisitionPath -Force
  if (-not ($AcquisitionItem -is [IO.FileInfo]) -or
      ($AcquisitionItem.Attributes -band [IO.FileAttributes]::ReparsePoint)) {
    throw "Acquisition record must be a regular non-reparse file"
  }
  $Acquisition = Get-Content -LiteralPath $AcquisitionPath -Raw |
    ConvertFrom-Json
  foreach ($Name in @(
    "run_id", "source_type", "mounted_root", "mounted_volume",
    "mounted_disk_unique_id"
  )) {
    if (-not ($Acquisition.PSObject.Properties.Name -contains $Name) -or
        [string]::IsNullOrWhiteSpace([string]$Acquisition.$Name)) {
      throw "Acquisition record lacks required field: $Name"
    }
  }
  if ((Split-Path -Leaf $Run) -ne [string]$Acquisition.run_id) {
    throw "Run directory does not match acquisition record"
  }
  if ([string]$Acquisition.source_type -ne "offline_image") {
    throw "Selected run is not an offline-image run"
  }

  $RootItem = Get-Item -LiteralPath ([string]$Acquisition.mounted_root) -Force
  if (-not ($RootItem -is [IO.DirectoryInfo]) -or
      ($RootItem.Attributes -band [IO.FileAttributes]::ReparsePoint)) {
    throw "Recorded evidence root is not a real directory"
  }
  $Root = $RootItem.FullName.TrimEnd('\')
  $Volume = Get-Volume -FilePath $Root
  if ($null -eq $Volume.DriveLetter) {
    throw "Cannot map the recorded evidence root to a drive-letter partition"
  }
  $Partitions = @(Get-Partition -DriveLetter $Volume.DriveLetter)
  if ($Partitions.Count -ne 1) {
    throw "Recorded evidence root did not resolve to exactly one partition"
  }
  $Partition = $Partitions[0]
  $Disks = @($Partition | Get-Disk)
  if ($Disks.Count -ne 1) {
    throw "Recorded evidence root did not resolve to exactly one disk"
  }
  $Disk = $Disks[0]
  if ([string]$Volume.UniqueId -ne [string]$Acquisition.mounted_volume -or
      [string]$Disk.UniqueId -ne
        [string]$Acquisition.mounted_disk_unique_id) {
    throw "Current evidence mount does not match the selected run"
  }
  $PartitionReadOnly = $false
  if ($Partition.PSObject.Properties.Name -contains "IsReadOnly") {
    $PartitionReadOnly = [bool]$Partition.IsReadOnly
  }
  if (-not [bool]$Disk.IsReadOnly -and -not $PartitionReadOnly) {
    throw "Current evidence mount is not read-only"
  }

  return [pscustomobject]@{
    Run = $Run
    Root = $Root
    RootPrefix = $Root + '\'
    Acquisition = $Acquisition
    Volume = $Volume
    Partition = $Partition
    Disk = $Disk
  }
}
