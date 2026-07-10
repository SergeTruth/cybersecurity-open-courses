window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Query Windows Event Logs",
  "codeExamples": [
    {
      "title": "Query Offline Security.evtx for Logons",
      "language": "powershell",
      "code": "$SecurityLog = \"E:\\Mount\\C\\Windows\\System32\\winevt\\Logs\\Security.evtx\"\n\nGet-WinEvent -Path $SecurityLog -FilterXPath \"*[System[(EventID=4624 or EventID=4625 or EventID=4672)]]\" |\n  Select-Object TimeCreated, Id, ProviderName, MachineName, Message |\n  Export-Csv \"case-security-logons.csv\" -NoTypeInformation"
    },
    {
      "title": "Review PowerShell Operational Events",
      "language": "powershell",
      "code": "$PowerShellLog = \"E:\\Mount\\C\\Windows\\System32\\winevt\\Logs\\Microsoft-Windows-PowerShell%4Operational.evtx\"\n\nGet-WinEvent -Path $PowerShellLog -ErrorAction SilentlyContinue |\n  Where-Object { $_.Id -in 4103, 4104, 53504 } |\n  Select-Object TimeCreated, Id, Message |\n  Export-Csv \"case-powershell-events.csv\" -NoTypeInformation"
    },
    {
      "title": "Count Logon Events by Event ID",
      "language": "python",
      "code": "import csv\nfrom collections import Counter\nfrom pathlib import Path\n\ncounts = Counter()\nfor row in csv.DictReader(Path(\"case-security-logons.csv\").open(encoding=\"utf-8\")):\n    counts[row[\"Id\"]] += 1\n\nfor event_id, count in counts.most_common():\n    print(f\"event_id={event_id} count={count}\")"
    }
  ]
};
