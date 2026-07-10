window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Correlate Windows Artifacts",
  "codeExamples": [
    {
      "title": "Build a Small Cross-Artifact Timeline",
      "language": "python",
      "code": "import csv\nfrom pathlib import Path\n\nevents = []\n\nfor csv_name, label, time_field, detail_field in [\n    (\"case-security-logons.csv\", \"logon\", \"TimeCreated\", \"Id\"),\n    (\"case-file-timeline.csv\", \"file\", \"LastWriteTimeUtc\", \"FullName\"),\n    (\"case-prefetch-leads.csv\", \"prefetch\", \"LastWriteTimeUtc\", \"FullName\"),\n]:\n    path = Path(csv_name)\n    if not path.exists():\n        continue\n    for row in csv.DictReader(path.open(encoding=\"utf-8\")):\n        events.append((row.get(time_field, \"\"), label, row.get(detail_field, \"\")))\n\nfor when, label, detail in sorted(events)[-50:]:\n    print(f\"{when} [{label}] {detail}\")"
    },
    {
      "title": "Read-Only Windows Triage Checklist",
      "language": "powershell",
      "code": "$Root = \"E:\\Mount\\C\"\n\nGet-ChildItem \"$Root\\Users\" -Directory -Force | Select-Object Name, LastWriteTimeUtc\nGet-ChildItem \"$Root\\Windows\\System32\\winevt\\Logs\" -Filter \"*.evtx\" | Select-Object Name, Length, LastWriteTimeUtc\nGet-ChildItem \"$Root\\Windows\\Prefetch\" -Filter \"*.pf\" -ErrorAction SilentlyContinue | Select-Object Name, LastWriteTimeUtc\nGet-ChildItem \"$Root\\Windows\\System32\\Tasks\" -Recurse -File -ErrorAction SilentlyContinue | Select-Object FullName, LastWriteTimeUtc\nGet-FileHash -Algorithm SHA256 \"$Root\\Windows\\System32\\config\\SYSTEM\""
    }
  ]
};
