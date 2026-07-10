window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Review Registry Evidence",
  "codeExamples": [
    {
      "title": "Load and Query Common Autorun Keys",
      "language": "powershell",
      "code": "$Root = \"E:\\Mount\\C\"\n$SoftwareHive = Join-Path $Root \"Windows\\System32\\config\\SOFTWARE\"\n\nreg.exe load HKU\\DFIR_SOFTWARE $SoftwareHive\nreg.exe query \"HKU\\DFIR_SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run\"\nreg.exe query \"HKU\\DFIR_SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\RunOnce\"\nreg.exe unload HKU\\DFIR_SOFTWARE"
    },
    {
      "title": "Review Services Configuration",
      "language": "powershell",
      "code": "$Root = \"E:\\Mount\\C\"\n$SystemHive = Join-Path $Root \"Windows\\System32\\config\\SYSTEM\"\n\nreg.exe load HKU\\DFIR_SYSTEM $SystemHive\nreg.exe query \"HKU\\DFIR_SYSTEM\\ControlSet001\\Services\" /s |\n  Select-String -Pattern \"ImagePath|ServiceDll|Start\"\nreg.exe unload HKU\\DFIR_SYSTEM"
    },
    {
      "title": "Hash Registry Hives Before Parsing",
      "language": "powershell",
      "code": "$Root = \"E:\\Mount\\C\"\n\nGet-ChildItem -LiteralPath \"$Root\\Windows\\System32\\config\" -Force |\n  Where-Object { $_.Name -in @(\"SAM\",\"SECURITY\",\"SOFTWARE\",\"SYSTEM\") } |\n  Get-FileHash -Algorithm SHA256 |\n  Export-Csv \"case-registry-hive-hashes.csv\" -NoTypeInformation"
    }
  ]
};
