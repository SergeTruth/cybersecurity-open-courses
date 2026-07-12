window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "PowerShell Examples: Preserve Live and Offline Persistence Leads",
  "codeExamples": [
    {
      "title": "Capture a Named Remote Host Into a Separate Live Run",
      "language": "powershell",
      "code": String.raw`Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$LiveCaseRoot = "D:\DFIR\Cases\case-2026-06-26-live"
$TargetComputer = $env:DFIR_LIVE_TARGET
$CaptureAuthority = $env:DFIR_CAPTURE_AUTHORITY

if (-not [string]::IsNullOrWhiteSpace($env:DFIR_RUN)) {
  $OfflineAcquisition = Join-Path $env:DFIR_RUN "acquisition-record.json"
  if (Test-Path -LiteralPath $OfflineAcquisition -PathType Leaf) {
    $Selected = Get-Content -LiteralPath $OfflineAcquisition -Raw |
      ConvertFrom-Json
    if ([string]$Selected.source_type -eq "offline_image") {
      throw "Clear DFIR_RUN; live evidence cannot enter an offline-image run"
    }
  }
  throw "Clear DFIR_RUN before starting a separate live-host run"
}
if ([string]::IsNullOrWhiteSpace($TargetComputer) -or
    [string]::IsNullOrWhiteSpace($CaptureAuthority)) {
  throw "Set DFIR_LIVE_TARGET and DFIR_CAPTURE_AUTHORITY"
}
$LocalNames = @(".", "localhost", [Environment]::MachineName)
if ($LocalNames -contains $TargetComputer) {
  throw "This example requires an explicit remote incident-host target"
}
$CaseParent = Split-Path -Parent $LiveCaseRoot
if (-not (Test-Path -LiteralPath $CaseParent -PathType Container)) {
  throw "Create the analyst-controlled live-case parent first: $CaseParent"
}

$Session = $null
$Metadata = New-Object Collections.Generic.List[object]
$Run = $null
$StatusPath = $null
$PrimaryError = $null
$CaptureCompleted = $false
$MetadataWritten = $false
try {
  $Session = New-CimSession -ComputerName $TargetComputer -ErrorAction Stop
  $CimArguments = @{CimSession=$Session;ErrorAction="Stop"}
  $OperatingSystem = Get-CimInstance -ClassName Win32_OperatingSystem @CimArguments
  $ComputerSystem = Get-CimInstance -ClassName Win32_ComputerSystem @CimArguments
  $ProductClass = "Win32_ComputerSystemProduct"
  $SystemProduct = Get-CimInstance -ClassName $ProductClass @CimArguments
  $Bios = Get-CimInstance -ClassName Win32_BIOS @CimArguments
  $LocalProduct = Get-CimInstance -ClassName $ProductClass -ErrorAction Stop
  $SameReportedName = [string]::Equals(
    [string]$ComputerSystem.Name,
    [Environment]::MachineName,
    [StringComparison]::OrdinalIgnoreCase
  )
  $SameHardware = (
    -not [string]::IsNullOrWhiteSpace([string]$SystemProduct.UUID) -and
    -not [string]::IsNullOrWhiteSpace([string]$LocalProduct.UUID) -and
    [string]::Equals(
      [string]$SystemProduct.UUID,
      [string]$LocalProduct.UUID,
      [StringComparison]::OrdinalIgnoreCase
    )
  )
  if ($SameReportedName -or $SameHardware) {
    throw "Target resolves to the analyst host"
  }

  $RunId = "{0}-{1}" -f (
    (Get-Date).ToUniversalTime().ToString("yyyyMMddTHHmmssZ")
  ), ([guid]::NewGuid().ToString("N"))
  $Run = Join-Path (Join-Path $LiveCaseRoot "runs") $RunId
  [IO.Directory]::CreateDirectory($Run) | Out-Null
  $StatusPath = Join-Path $Run "live-capture-status.json"

  $SourceRecord = [ordered]@{
      run_id = $RunId
      source_type = "live_host"
      target_requested = $TargetComputer
      target_reported = $ComputerSystem.Name
      source_scope = "explicit remote CIM session"
      capture_authority = $CaptureAuthority
      analyst_identity = [Security.Principal.WindowsIdentity]::GetCurrent().Name
      analyst_host = [Environment]::MachineName
      operating_system = $OperatingSystem.Caption
      os_version = $OperatingSystem.Version
      os_build = $OperatingSystem.BuildNumber
      boot_time_utc = $OperatingSystem.LastBootUpTime.ToUniversalTime().ToString("o")
      manufacturer = $ComputerSystem.Manufacturer
      model = $ComputerSystem.Model
      hardware_or_vm_uuid = $SystemProduct.UUID
      bios_serial = $Bios.SerialNumber
      cim_protocol = $Session.Protocol
      cim_session_id = $Session.InstanceId
      started_utc = (Get-Date).ToUniversalTime().ToString("o")
  }
  $SourceRecordPath = Join-Path $Run "live-source-record.json"
  $SourceRecord | ConvertTo-Json -Depth 4 |
    Out-File -FilePath $SourceRecordPath -Encoding utf8 -NoClobber

  $Started = (Get-Date).ToUniversalTime()
  $ProcessProperties = @(
    @{Name="SourceType";Expression={"live_host"}}
    @{Name="TargetComputer";Expression={$TargetComputer}}
    "ProcessId", "ParentProcessId", "Name", "ExecutablePath", "CommandLine"
  )
  $ProcessRows = Get-CimInstance -ClassName Win32_Process @CimArguments
  $Processes = @($ProcessRows | Select-Object -Property $ProcessProperties)
  $Finished = (Get-Date).ToUniversalTime()
  $ProcessOutput = Join-Path $Run "live-processes.csv"
  $Processes | Export-Csv $ProcessOutput -NoTypeInformation -Encoding UTF8 -NoClobber
  $Metadata.Add([pscustomobject]@{
    capture="processes"
    target=$TargetComputer
    started_utc=$Started.ToString("o")
    finished_utc=$Finished.ToString("o")
    rows=$Processes.Count
  })

  $Started = (Get-Date).ToUniversalTime()
  $NetworkArguments = @{
    CimSession=$Session;State=@("Listen", "Established");ErrorAction="Stop"
  }
  $NetworkProperties = @(
    @{Name="SourceType";Expression={"live_host"}}
    @{Name="TargetComputer";Expression={$TargetComputer}}
    "*"
  )
  $NetworkRows = Get-NetTCPConnection @NetworkArguments
  $Connections = @($NetworkRows | Select-Object -Property $NetworkProperties)
  $Finished = (Get-Date).ToUniversalTime()
  $NetworkOutput = Join-Path $Run "live-network-connections.csv"
  $Connections | Export-Csv $NetworkOutput -NoTypeInformation -Encoding UTF8 -NoClobber
  $Metadata.Add([pscustomobject]@{
    capture="network"
    target=$TargetComputer
    started_utc=$Started.ToString("o")
    finished_utc=$Finished.ToString("o")
    rows=$Connections.Count
  })
  $CaptureCompleted = $true
}
catch {
  $PrimaryError = $_
  if ($null -ne $Run) {
    try {
      [pscustomobject]@{
        stage="live-capture"
        target=$TargetComputer
        time_utc=(Get-Date).ToUniversalTime().ToString("o")
        error=$PrimaryError.Exception.Message
      } | ConvertTo-Json -Compress |
        Out-File -FilePath (Join-Path $Run "errors.jsonl") -Append -Encoding utf8
    }
    catch {
      Write-Warning "Could not append the primary live-capture error record"
    }
  }
}
finally {
  if ($Metadata.Count -gt 0 -and $null -ne $Run) {
    try {
      $MetadataOutput = Join-Path $Run "live-capture-windows.json"
      $Metadata | ConvertTo-Json |
        Out-File -FilePath $MetadataOutput -Encoding utf8 -NoClobber
      $MetadataWritten = $true
    }
    catch {
      if ($null -eq $PrimaryError) { $PrimaryError = $_ }
      else { Write-Warning "Metadata finalization also failed: $($_.Exception.Message)" }
    }
  }
  if ($null -ne $Session) {
    try { Remove-CimSession -CimSession $Session -ErrorAction Stop }
    catch {
      if ($null -eq $PrimaryError) { $PrimaryError = $_ }
      else { Write-Warning "CIM session cleanup also failed: $($_.Exception.Message)" }
    }
  }
  if ($null -ne $StatusPath) {
    $Succeeded = (
      $CaptureCompleted -and $MetadataWritten -and $null -eq $PrimaryError
    )
    $ExitStatus = if ($Succeeded) { 0 } else { 1 }
    try {
      [pscustomobject]@{
        stage="live_capture"
        exit_status=$ExitStatus
        finished_utc=(Get-Date).ToUniversalTime().ToString("o")
      } | ConvertTo-Json |
        Out-File -FilePath $StatusPath -Encoding utf8 -NoClobber
    }
    catch {
      if ($null -eq $PrimaryError) { $PrimaryError = $_ }
      else { Write-Warning "Status finalization also failed: $($_.Exception.Message)" }
    }
  }
}
if ($null -ne $PrimaryError) { throw $PrimaryError }
$env:DFIR_LIVE_RUN = $Run
Write-Output "Live-host run: $Run"`
    },
    {
      "title": "Inventory Offline Scheduled-Task Files",
      "language": "powershell",
      "code": String.raw`Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$HelperPath = Join-Path $PSScriptRoot "dfir-run-context.ps1"
. $HelperPath
$Context = Get-VerifiedDfirContext
$Run = $Context.Run
$Root = $Context.Root
$RootPrefix = $Context.RootPrefix
$TaskRoot = Join-Path $Root "Windows\System32\Tasks"
$Limitations = Join-Path $Run "limitations.jsonl"
function Add-Limitation([string]$Path, [string]$Reason) {
  [pscustomobject]@{stage="scheduled-task-inventory";path=$Path;limitation=$Reason} |
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
if (-not (Test-ContainedDirectoryWithoutReparse $TaskRoot)) {
  return
}
$Rows = New-Object Collections.Generic.List[object]
$Pending = New-Object 'Collections.Generic.Stack[string]'
$Pending.Push($TaskRoot)
while ($Pending.Count -gt 0) {
  $Directory = $Pending.Pop()
  try { $Children = Get-ChildItem -LiteralPath $Directory -Force -ErrorAction Stop }
  catch {
    [pscustomobject]@{
      stage="scheduled-task-inventory"
      path=$Directory
      error=$_.Exception.Message
    } |
      ConvertTo-Json -Compress |
      Out-File -FilePath (Join-Path $Run "errors.jsonl") -Append -Encoding utf8
    continue
  }
  foreach ($Child in $Children) {
    if ($Child.Attributes -band [IO.FileAttributes]::ReparsePoint) {
      [pscustomobject]@{
        stage="scheduled-task-inventory"
        path=$Child.FullName
        limitation="reparse point skipped"
      } |
        ConvertTo-Json -Compress |
        Out-File -FilePath (Join-Path $Run "limitations.jsonl") -Append -Encoding utf8
    }
    elseif ($Child.PSIsContainer) { $Pending.Push($Child.FullName) }
    else {
      $Rows.Add([pscustomobject]@{
        FullName=$Child.FullName
        Length=$Child.Length
        LastWriteTimeUtc=$Child.LastWriteTimeUtc.ToString("o")
        Interpretation="task-file inventory; task XML has not been parsed"
      })
    }
  }
}
if ($Rows.Count -gt 0) {
  $TaskOutput = Join-Path $Run "scheduled-task-file-inventory.csv"
  $Rows | Sort-Object FullName |
    Export-Csv -Path $TaskOutput -NoTypeInformation -Encoding UTF8 -NoClobber
}`
    },
    {
      "title": "Hash Explicit Regular-File Leads Without Executing Them",
      "language": "powershell",
      "code": String.raw`Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$HelperPath = Join-Path $PSScriptRoot "dfir-run-context.ps1"
. $HelperPath
$Context = Get-VerifiedDfirContext
$Run = $Context.Run
$Root = $Context.Root
$RootPrefix = $Context.RootPrefix
$Limitations = Join-Path $Run "limitations.jsonl"
$Rows = New-Object Collections.Generic.List[object]
function Add-Limitation([string]$Path, [string]$Reason) {
  [pscustomobject]@{stage="file-lead-hash";path=$Path;limitation=$Reason} |
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
function Test-ContainedRegularFileWithoutReparse([string]$Candidate) {
  $Full = [IO.Path]::GetFullPath($Candidate)
  if (-not (Test-ContainedDirectoryWithoutReparse (Split-Path -Parent $Full))) {
    return $false
  }
  if (-not (Test-Path -LiteralPath $Full -PathType Leaf)) {
    Add-Limitation $Full "lead absent"
    return $false
  }
  $Item = Get-Item -LiteralPath $Full -Force
  if (-not ($Item -is [IO.FileInfo]) -or
      ($Item.Attributes -band [IO.FileAttributes]::ReparsePoint)) {
    Add-Limitation $Full "final object is not a regular non-reparse file"
    return $false
  }
  return $true
}
foreach ($Path in @(
  (Join-Path $Root "ProgramData\example.exe"),
  (Join-Path $Root "Users\Public\script.ps1")
)) {
  if (-not (Test-ContainedRegularFileWithoutReparse $Path)) { continue }
  $Item = Get-Item -LiteralPath $Path -Force
  $Hash = Get-FileHash -Algorithm SHA256 -LiteralPath $Item.FullName -ErrorAction Stop
  $Rows.Add([pscustomobject]@{Path=$Item.FullName;Length=$Item.Length;SHA256=$Hash.Hash})
}
if ($Rows.Count -gt 0) {
  $HashOutput = Join-Path $Run "file-lead-hashes.csv"
  $Rows | Export-Csv -Path $HashOutput -NoTypeInformation -Encoding UTF8 -NoClobber
}`
    }
  ]
};
