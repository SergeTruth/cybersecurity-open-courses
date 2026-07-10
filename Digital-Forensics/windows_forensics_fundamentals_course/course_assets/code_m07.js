window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Review Process and Persistence Clues",
  "codeExamples": [
    {
      "title": "Capture Live Process Context When Authorized",
      "language": "powershell",
      "code": "$Case = \"case-2026-06-26\"\n\nGet-CimInstance Win32_Process |\n  Select-Object ProcessId, ParentProcessId, Name, ExecutablePath, CommandLine |\n  Export-Csv \"$Case\\live-processes.csv\" -NoTypeInformation\n\nGet-NetTCPConnection -State Listen,Established |\n  Export-Csv \"$Case\\live-network-connections.csv\" -NoTypeInformation"
    },
    {
      "title": "Review Scheduled Tasks From Mounted Evidence",
      "language": "powershell",
      "code": "$Root = \"E:\\Mount\\C\"\n\nGet-ChildItem -LiteralPath \"$Root\\Windows\\System32\\Tasks\" -Recurse -File -ErrorAction SilentlyContinue |\n  Select-Object FullName, Length, LastWriteTimeUtc |\n  Export-Csv \"case-scheduled-task-files.csv\" -NoTypeInformation"
    },
    {
      "title": "Hash Suspicious File Leads Without Running Them",
      "language": "powershell",
      "code": "$Leads = @(\n  \"E:\\Mount\\C\\ProgramData\\example.exe\",\n  \"E:\\Mount\\C\\Users\\Public\\script.ps1\"\n)\n\n$Leads |\n  Where-Object { Test-Path -LiteralPath $_ } |\n  ForEach-Object { Get-FileHash -Algorithm SHA256 -LiteralPath $_ } |\n  Export-Csv \"case-file-lead-hashes.csv\" -NoTypeInformation"
    }
  ]
};
