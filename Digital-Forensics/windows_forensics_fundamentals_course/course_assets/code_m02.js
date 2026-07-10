window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Map Windows Evidence Locations",
  "codeExamples": [
    {
      "title": "Inventory Core Evidence Directories",
      "language": "powershell",
      "code": "$Root = \"E:\\Mount\\C\"\n$Paths = @(\n  \"Windows\\System32\\winevt\\Logs\",\n  \"Windows\\System32\\config\",\n  \"Users\",\n  \"ProgramData\",\n  \"Windows\\Prefetch\",\n  \"`$Recycle.Bin\"\n)\n\nforeach ($Path in $Paths) {\n  $Full = Join-Path $Root $Path\n  Get-ChildItem -LiteralPath $Full -Force -ErrorAction SilentlyContinue |\n    Select-Object FullName, Length, LastWriteTimeUtc |\n    Select-Object -First 25\n}"
    },
    {
      "title": "Capture OS Version From Mounted Evidence",
      "language": "powershell",
      "code": "$Root = \"E:\\Mount\\C\"\n$SoftwareHive = Join-Path $Root \"Windows\\System32\\config\\SOFTWARE\"\n\nreg.exe load HKU\\DFIR_SOFTWARE $SoftwareHive\nreg.exe query \"HKU\\DFIR_SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\"\nreg.exe unload HKU\\DFIR_SOFTWARE"
    },
    {
      "title": "Summarize User Profiles",
      "language": "powershell",
      "code": "$Root = \"E:\\Mount\\C\"\n\nGet-ChildItem -LiteralPath \"$Root\\Users\" -Directory -Force |\n  Select-Object Name, FullName, CreationTimeUtc, LastWriteTimeUtc |\n  Export-Csv \"case-user-profiles.csv\" -NoTypeInformation"
    }
  ]
};
