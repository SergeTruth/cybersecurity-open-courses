window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "PowerShell Examples: Query Verified Offline Registry Working Copies",
  "codeExamples": [
    {
      "title": "Export Machine Run and RunOnce Values",
      "language": "powershell",
      "code": String.raw`Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$HelperPath = Join-Path $PSScriptRoot "dfir-run-context.ps1"
. $HelperPath
$Context = Get-VerifiedDfirContext
$Run = $Context.Run
$Root = $Context.Root
$RootPrefix = $Context.RootPrefix
$SourceDirectory = Join-Path $Root "Windows\System32\config"
$Limitations = Join-Path $Run "limitations.jsonl"
function Add-Limitation([string]$Path, [string]$Reason) {
  [pscustomobject]@{stage="offline-autoruns";path=$Path;limitation=$Reason} |
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
    Add-Limitation $Full "regular file missing"
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
if (-not (Test-ContainedDirectoryWithoutReparse $SourceDirectory)) {
  throw "Registry source directory failed containment validation"
}
$SourceHive = Join-Path $SourceDirectory "SOFTWARE"
if (-not (Test-ContainedRegularFileWithoutReparse $SourceHive)) {
  throw "SOFTWARE failed containment validation"
}
$WorkingId = [guid]::NewGuid().ToString("N")
$WorkingDirectory = Join-Path $Run "registry-working-autoruns-$WorkingId"
[IO.Directory]::CreateDirectory($WorkingDirectory) | Out-Null

$CopyManifest = New-Object Collections.Generic.List[object]
foreach ($Source in Get-ChildItem -LiteralPath $SourceDirectory -Force |
    Where-Object {
      $_.Name -eq "SOFTWARE" -or $_.Name -match '^SOFTWARE\.LOG[0-9]+$'
    }) {
  if (-not (Test-ContainedRegularFileWithoutReparse $Source.FullName)) {
    throw "Registry source is not a regular evidence file: $($Source.FullName)"
  }
  Copy-Item -LiteralPath $Source.FullName -Destination $WorkingDirectory
  $Copy = Join-Path $WorkingDirectory $Source.Name
  $SourceHash = (Get-FileHash $Source.FullName -Algorithm SHA256).Hash
  $CopyHash = (Get-FileHash $Copy -Algorithm SHA256).Hash
  if ($SourceHash -ne $CopyHash) {
    throw "Working-copy hash mismatch: $($Source.Name)"
  }
  $CopyManifest.Add([pscustomobject]@{
    EvidenceSourcePath = $Source.FullName
    EvidenceSourceSHA256 = $SourceHash
    CopiedPath = $Copy
    CopiedSHA256 = $CopyHash
    Length = $Source.Length
    LastWriteTimeUtc = $Source.LastWriteTimeUtc.ToString("o")
    CopyTimeUtc = (Get-Date).ToUniversalTime().ToString("o")
    Role = if ($Source.Name -eq "SOFTWARE") { "hive" } else { "transaction_log" }
  })
}
$ManifestPath = Join-Path $Run "autorun-working-copy-manifest.csv"
$CopyManifest | Export-Csv $ManifestPath -NoTypeInformation -Encoding UTF8 -NoClobber
$WorkingHive = Join-Path $WorkingDirectory "SOFTWARE"
$MountName = "DFIR_SOFTWARE_" + [guid]::NewGuid().ToString("N")
$MountPath = "HKU\$MountName"
$Loaded = $false
$Rows = New-Object Collections.Generic.List[object]
$PrimaryFailure = $null
try {
  $LoadOutput = & reg.exe load $MountPath $WorkingHive 2>&1
  if ($LASTEXITCODE -ne 0) { throw "Unable to load SOFTWARE hive: $LoadOutput" }
  $Loaded = $true
  foreach ($Relative in @(
    "Microsoft\Windows\CurrentVersion\Run",
    "Microsoft\Windows\CurrentVersion\RunOnce"
  )) {
    $ProviderPath = "Registry::HKEY_USERS\$MountName\$Relative"
    if (-not (Test-Path -LiteralPath $ProviderPath)) {
      [pscustomobject]@{stage="autoruns";path=$Relative;limitation="key absent"} |
        ConvertTo-Json -Compress |
        Out-File -FilePath (Join-Path $Run "limitations.jsonl") -Append -Encoding utf8
      continue
    }
    $Key = Get-Item -LiteralPath $ProviderPath
    foreach ($ValueName in $Key.GetValueNames()) {
      $Rows.Add([pscustomobject]@{
        RegistryPath = $Relative
        ValueName = $ValueName
        ValueKind = [string]$Key.GetValueKind($ValueName)
        ValueData = [string]$Key.GetValue($ValueName, $null, "DoNotExpandEnvironmentNames")
        SourceHive = $WorkingHive
      })
    }
  }
  $AutorunOutput = Join-Path $Run "offline-autoruns.csv"
  $Rows | Sort-Object RegistryPath, ValueName |
    Export-Csv -Path $AutorunOutput -NoTypeInformation -Encoding UTF8 -NoClobber
}
catch {
  $PrimaryFailure = $_.Exception
  [pscustomobject]@{stage="offline-autoruns";error=$_.Exception.Message} |
    ConvertTo-Json -Compress |
    Out-File -FilePath (Join-Path $Run "errors.jsonl") -Append -Encoding utf8
  throw
}
finally {
  if ($Loaded) {
    $UnloadOutput = & reg.exe unload $MountPath 2>&1
    if ($LASTEXITCODE -ne 0) {
      $UnloadMessage = "Unable to unload $($MountPath): $UnloadOutput"
      [pscustomobject]@{stage="offline-autoruns-unload";error=$UnloadMessage} |
        ConvertTo-Json -Compress |
        Out-File -FilePath (Join-Path $Run "errors.jsonl") -Append -Encoding utf8
      if ($null -eq $PrimaryFailure) { throw $UnloadMessage }
    }
  }
}`
    },
    {
      "title": "Export Active-Control-Set Services With Service Context",
      "language": "powershell",
      "code": String.raw`Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$HelperPath = Join-Path $PSScriptRoot "dfir-run-context.ps1"
. $HelperPath
$Context = Get-VerifiedDfirContext
$Run = $Context.Run
$Root = $Context.Root
$RootPrefix = $Context.RootPrefix
$SourceDirectory = Join-Path $Root "Windows\System32\config"
$Limitations = Join-Path $Run "limitations.jsonl"
function Add-Limitation([string]$Path, [string]$Reason) {
  [pscustomobject]@{stage="offline-services";path=$Path;limitation=$Reason} |
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
    Add-Limitation $Full "regular file missing"
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
if (-not (Test-ContainedDirectoryWithoutReparse $SourceDirectory)) {
  throw "Registry source directory failed containment validation"
}
$SourceHive = Join-Path $SourceDirectory "SYSTEM"
if (-not (Test-ContainedRegularFileWithoutReparse $SourceHive)) {
  throw "SYSTEM failed containment validation"
}
$WorkingId = [guid]::NewGuid().ToString("N")
$WorkingDirectory = Join-Path $Run "registry-working-services-$WorkingId"
[IO.Directory]::CreateDirectory($WorkingDirectory) | Out-Null
$CopyManifest = New-Object Collections.Generic.List[object]
foreach ($Source in Get-ChildItem -LiteralPath $SourceDirectory -Force |
    Where-Object {
      $_.Name -eq "SYSTEM" -or $_.Name -match '^SYSTEM\.LOG[0-9]+$'
    }) {
  if (-not (Test-ContainedRegularFileWithoutReparse $Source.FullName)) {
    throw "Registry source is not a regular evidence file: $($Source.FullName)"
  }
  Copy-Item -LiteralPath $Source.FullName -Destination $WorkingDirectory
  $Copy = Join-Path $WorkingDirectory $Source.Name
  $SourceHash = (Get-FileHash $Source.FullName -Algorithm SHA256).Hash
  $CopyHash = (Get-FileHash $Copy -Algorithm SHA256).Hash
  if ($SourceHash -ne $CopyHash) {
    throw "Working-copy hash mismatch: $($Source.Name)"
  }
  $CopyManifest.Add([pscustomobject]@{
    EvidenceSourcePath = $Source.FullName
    EvidenceSourceSHA256 = $SourceHash
    CopiedPath = $Copy
    CopiedSHA256 = $CopyHash
    Length = $Source.Length
    LastWriteTimeUtc = $Source.LastWriteTimeUtc.ToString("o")
    CopyTimeUtc = (Get-Date).ToUniversalTime().ToString("o")
    Role = if ($Source.Name -eq "SYSTEM") { "hive" } else { "transaction_log" }
  })
}
$ManifestPath = Join-Path $Run "service-working-copy-manifest.csv"
$CopyManifest | Export-Csv $ManifestPath -NoTypeInformation -Encoding UTF8 -NoClobber
$WorkingHive = Join-Path $WorkingDirectory "SYSTEM"
$MountName = "DFIR_SYSTEM_" + [guid]::NewGuid().ToString("N")
$MountPath = "HKU\$MountName"
$Loaded = $false
$Rows = New-Object Collections.Generic.List[object]
$PrimaryFailure = $null
try {
  $LoadOutput = & reg.exe load $MountPath $WorkingHive 2>&1
  if ($LASTEXITCODE -ne 0) { throw "Unable to load SYSTEM hive: $LoadOutput" }
  $Loaded = $true
  $Select = Get-ItemProperty -LiteralPath "Registry::HKEY_USERS\$MountName\Select"
  $ControlSet = "ControlSet{0:D3}" -f [int]$Select.Current
  $ServicesPath = "Registry::HKEY_USERS\$MountName\$ControlSet\Services"
  foreach ($Service in Get-ChildItem -LiteralPath $ServicesPath -ErrorAction Stop) {
    foreach ($Location in @($Service.PSPath, (Join-Path $Service.PSPath "Parameters"))) {
      if (-not (Test-Path -LiteralPath $Location)) { continue }
      $Key = Get-Item -LiteralPath $Location
      foreach ($Name in @("ImagePath", "ServiceDll", "Start", "ObjectName")) {
        if ($Key.GetValueNames() -notcontains $Name) { continue }
        $Value = $Key.GetValue($Name, $null, "DoNotExpandEnvironmentNames")
        $Rows.Add([pscustomobject]@{
          ActiveControlSet = $ControlSet
          ServiceName = $Service.PSChildName
          RegistryPath = $Location
          ValueName = $Name
          ValueKind = [string]$Key.GetValueKind($Name)
          ValueData = if ($Value -is [array]) { $Value -join " | " } else { [string]$Value }
          SourceHive = $WorkingHive
        })
      }
    }
  }
  $ServiceOutput = Join-Path $Run "offline-services.csv"
  $Rows | Sort-Object ServiceName, RegistryPath, ValueName |
    Export-Csv -Path $ServiceOutput -NoTypeInformation -Encoding UTF8 -NoClobber

  $TimeZonePath = "Registry::HKEY_USERS\$MountName\$ControlSet\Control\TimeZoneInformation"
  $TimeZone = Get-ItemProperty -LiteralPath $TimeZonePath -ErrorAction Stop
  $TimeContextOutput = Join-Path $Run "offline-time-context.json"
  [ordered]@{
    active_control_set = $ControlSet
    time_zone_key_name = $TimeZone.TimeZoneKeyName
    dynamic_daylight_time_disabled = $TimeZone.DynamicDaylightTimeDisabled
    known_clock_skew = "unknown unless measured against an external reference"
    source_hive = $WorkingHive
  } | ConvertTo-Json |
    Out-File -FilePath $TimeContextOutput -Encoding utf8 -NoClobber
}
catch {
  $PrimaryFailure = $_.Exception
  [pscustomobject]@{stage="offline-services";error=$_.Exception.Message} |
    ConvertTo-Json -Compress |
    Out-File -FilePath (Join-Path $Run "errors.jsonl") -Append -Encoding utf8
  throw
}
finally {
  if ($Loaded) {
    $UnloadOutput = & reg.exe unload $MountPath 2>&1
    if ($LASTEXITCODE -ne 0) {
      $UnloadMessage = "Unable to unload $($MountPath): $UnloadOutput"
      [pscustomobject]@{stage="offline-services-unload";error=$UnloadMessage} |
        ConvertTo-Json -Compress |
        Out-File -FilePath (Join-Path $Run "errors.jsonl") -Append -Encoding utf8
      if ($null -eq $PrimaryFailure) { throw $UnloadMessage }
    }
  }
}`
    },
    {
      "title": "Hash a Limited Core-Hive Set and Associated Logs",
      "language": "powershell",
      "code": String.raw`Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$HelperPath = Join-Path $PSScriptRoot "dfir-run-context.ps1"
. $HelperPath
$Context = Get-VerifiedDfirContext
$Run = $Context.Run
$Root = $Context.Root
$RootPrefix = $Context.RootPrefix
$Config = Join-Path $Root "Windows\System32\config"
$Limitations = Join-Path $Run "limitations.jsonl"
function Add-Limitation([string]$Path, [string]$Reason) {
  [pscustomobject]@{stage="registry-hash-inventory";path=$Path;limitation=$Reason} |
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
    Add-Limitation $Full "regular file missing"
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
if (-not (Test-ContainedDirectoryWithoutReparse $Config)) {
  throw "Registry source directory failed containment validation"
}
$Rows = @(foreach ($Item in Get-ChildItem -LiteralPath $Config -Force -ErrorAction Stop |
    Where-Object { $_.Name -match '^(SAM|SECURITY|SOFTWARE|SYSTEM)(\.LOG[0-9]+)?$' } |
    Sort-Object Name) {
  if (-not (Test-ContainedRegularFileWithoutReparse $Item.FullName)) {
    throw "Hive artifact must be a regular, non-reparse file: $($Item.FullName)"
  }
  $Hash = Get-FileHash -LiteralPath $Item.FullName -Algorithm SHA256
  [pscustomobject]@{
    Name = $Item.Name
    FullName = $Item.FullName
    Length = $Item.Length
    LastWriteTimeUtc = $Item.LastWriteTimeUtc.ToString("o")
    SHA256 = $Hash.Hash
    Scope = "core hive and adjacent LOG files; collect user hives and TxR separately"
  }
})
if ($Rows.Count -eq 0) { throw "No selected hive artifacts were found" }
$HashOutput = Join-Path $Run "registry-hive-artifact-hashes.csv"
$Rows | Export-Csv -Path $HashOutput -NoTypeInformation -Encoding UTF8 -NoClobber`
    }
  ]
};
