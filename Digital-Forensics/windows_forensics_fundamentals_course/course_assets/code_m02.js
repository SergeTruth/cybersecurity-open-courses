window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "PowerShell Examples: Map Evidence Within the Selected Case Run",
  "codeExamples": [
    {
      "title": "Create a Sorted Core-Directory Inventory",
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
  [pscustomobject]@{stage="directory-inventory";path=$Path;limitation=$Reason} |
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

foreach ($Relative in @(
  "Windows\System32\winevt\Logs", "Windows\System32\config",
  "Users", "ProgramData", "Windows\Prefetch", '$Recycle.Bin'
)) {
  $Path = Join-Path $Root $Relative
  if (-not (Test-ContainedDirectoryWithoutReparse $Path)) { continue }
  try {
    $Children = Get-ChildItem -LiteralPath $Path -Force -ErrorAction Stop |
      Sort-Object FullName
  }
  catch {
    [pscustomobject]@{stage="directory-inventory";path=$Path;error=$_.Exception.Message} |
      ConvertTo-Json -Compress |
      Out-File -FilePath (Join-Path $Run "errors.jsonl") -Append -Encoding utf8
    throw
  }
  foreach ($Item in $Children) {
    $Rows.Add([pscustomobject]@{
      SourceDirectory = $Relative
      FullName = $Item.FullName
      ItemType = if ($Item.PSIsContainer) { "directory" } else { "file" }
      IsReparsePoint = [bool]($Item.Attributes -band [IO.FileAttributes]::ReparsePoint)
      Length = if ($Item.PSIsContainer) { $null } else { $Item.Length }
      LastWriteTimeUtc = $Item.LastWriteTimeUtc.ToString("o")
      TimeSemantic = "filesystem last-write time from mounted view"
    })
  }
}
$OutputPath = Join-Path $Run "core-directory-inventory.csv"
$Rows | Export-Csv -Path $OutputPath -NoTypeInformation -Encoding UTF8 -NoClobber`
    },
    {
      "title": "Query OS and ProfileList From a Verified SOFTWARE Working Copy",
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
function Add-Limitation([string]$Path, [string]$Reason) {
  [pscustomobject]@{stage="offline-software";path=$Path;limitation=$Reason} |
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
$SourceDirectory = Join-Path $Root "Windows\System32\config"
$SourceHive = Join-Path $SourceDirectory "SOFTWARE"
if (-not (Test-ContainedDirectoryWithoutReparse $SourceDirectory)) {
  throw "Registry source directory failed containment validation"
}
if (-not (Test-ContainedRegularFileWithoutReparse $SourceHive)) {
  throw "SOFTWARE failed containment validation"
}

$WorkingId = [guid]::NewGuid().ToString("N")
$WorkingDirectory = Join-Path $Run "registry-working-software-$WorkingId"
[IO.Directory]::CreateDirectory($WorkingDirectory) | Out-Null
$SourceFiles = Get-ChildItem -LiteralPath $SourceDirectory -Force |
  Where-Object {
    $_.Name -eq "SOFTWARE" -or $_.Name -match '^SOFTWARE\.LOG[0-9]+$'
  } |
  Sort-Object Name
$CopyManifest = New-Object Collections.Generic.List[object]
foreach ($Source in $SourceFiles) {
  if (-not (Test-ContainedRegularFileWithoutReparse $Source.FullName)) {
    throw "Registry source is not a regular evidence file: $($Source.FullName)"
  }
  Copy-Item -LiteralPath $Source.FullName -Destination $WorkingDirectory -ErrorAction Stop
  $Copy = Join-Path $WorkingDirectory $Source.Name
  $SourceHash = (Get-FileHash $Source.FullName -Algorithm SHA256).Hash
  $CopyHash = (Get-FileHash $Copy -Algorithm SHA256).Hash
  if ($SourceHash -ne $CopyHash) {
    throw "Registry working-copy verification failed: $($Source.Name)"
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
$ManifestPath = Join-Path $Run "software-working-copy-manifest.csv"
$CopyManifest | Export-Csv $ManifestPath -NoTypeInformation -Encoding UTF8 -NoClobber
$WorkingHive = Join-Path $WorkingDirectory "SOFTWARE"
$MountName = "DFIR_SOFTWARE_" + [guid]::NewGuid().ToString("N")
$MountPath = "HKU\$MountName"
$Loaded = $false
$PrimaryFailure = $null
try {
  $LoadOutput = & reg.exe load $MountPath $WorkingHive 2>&1
  if ($LASTEXITCODE -ne 0) { throw "Unable to load SOFTWARE hive: $LoadOutput" }
  $Loaded = $true

  $VersionPath = "Registry::HKEY_USERS\$MountName\Microsoft\Windows NT\CurrentVersion"
  $Version = Get-ItemProperty -LiteralPath $VersionPath -ErrorAction Stop
  $VersionOutput = Join-Path $Run "offline-os-version.csv"
  [pscustomobject]@{
    ProductName = $Version.ProductName
    DisplayVersion = $Version.DisplayVersion
    CurrentBuild = $Version.CurrentBuild
    SourceHive = $SourceHive
    WorkingHive = $WorkingHive
  } | Export-Csv -Path $VersionOutput -NoTypeInformation -Encoding UTF8 -NoClobber

  $ProfileListRelative = "Microsoft\Windows NT\CurrentVersion\ProfileList"
  $ProfileList = "Registry::HKEY_USERS\$MountName\$ProfileListRelative"
  $Profiles = foreach ($Key in Get-ChildItem -LiteralPath $ProfileList -ErrorAction Stop) {
    $Profile = Get-ItemProperty -LiteralPath $Key.PSPath -ErrorAction Stop
    $RawPath = [string]$Profile.ProfileImagePath
    $RelativePath = $RawPath -replace '^(?i)%SystemDrive%\\', ''
    $RelativePath = $RelativePath -replace '^(?i)[a-z]:\\', ''
    [pscustomobject]@{
      Sid = $Key.PSChildName
      ProfileImagePath = $RawPath
      MountedPath = Join-Path $Root $RelativePath
      Source = "offline SOFTWARE ProfileList"
    }
  }
  $ProfileOutput = Join-Path $Run "offline-profile-list.csv"
  $Profiles | Sort-Object Sid |
    Export-Csv -Path $ProfileOutput -NoTypeInformation -Encoding UTF8 -NoClobber
}
catch {
  $PrimaryFailure = $_.Exception
  [pscustomobject]@{stage="offline-software";error=$_.Exception.Message} |
    ConvertTo-Json -Compress |
    Out-File -FilePath (Join-Path $Run "errors.jsonl") -Append -Encoding utf8
  throw
}
finally {
  if ($Loaded) {
    $UnloadOutput = & reg.exe unload $MountPath 2>&1
    if ($LASTEXITCODE -ne 0) {
      $UnloadMessage = "Unable to unload $($MountPath): $UnloadOutput"
      [pscustomobject]@{stage="offline-software-unload";error=$UnloadMessage} |
        ConvertTo-Json -Compress |
        Out-File -FilePath (Join-Path $Run "errors.jsonl") -Append -Encoding utf8
      if ($null -eq $PrimaryFailure) { throw $UnloadMessage }
    }
  }
}`
    }
  ]
};
