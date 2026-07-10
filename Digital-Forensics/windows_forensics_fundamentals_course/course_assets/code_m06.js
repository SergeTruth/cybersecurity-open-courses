window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Build File and Execution Timelines",
  "codeExamples": [
    {
      "title": "Create a File Metadata Timeline",
      "language": "powershell",
      "code": "$Root = \"E:\\Mount\\C\"\n\nGet-ChildItem -LiteralPath $Root -Force -Recurse -File -ErrorAction SilentlyContinue |\n  Select-Object FullName, Length, CreationTimeUtc, LastWriteTimeUtc, LastAccessTimeUtc |\n  Export-Csv \"case-file-timeline.csv\" -NoTypeInformation"
    },
    {
      "title": "Collect Execution Artifact Leads",
      "language": "powershell",
      "code": "$Root = \"E:\\Mount\\C\"\n\nGet-ChildItem -LiteralPath \"$Root\\Windows\\Prefetch\" -Filter \"*.pf\" -ErrorAction SilentlyContinue |\n  Select-Object FullName, Length, LastWriteTimeUtc |\n  Export-Csv \"case-prefetch-leads.csv\" -NoTypeInformation\n\nGet-ChildItem -LiteralPath \"$Root\\Windows\\AppCompat\\Programs\" -Force -ErrorAction SilentlyContinue |\n  Select-Object FullName, Length, LastWriteTimeUtc |\n  Export-Csv \"case-amcache-shimcache-leads.csv\" -NoTypeInformation"
    },
    {
      "title": "Print Recent Timeline Rows",
      "language": "python",
      "code": "import csv\nfrom pathlib import Path\n\nrows = list(csv.DictReader(Path(\"case-file-timeline.csv\").open(encoding=\"utf-8\")))\nrows.sort(key=lambda row: row[\"LastWriteTimeUtc\"])\n\nfor row in rows[-25:]:\n    print(f\"{row['LastWriteTimeUtc']} {row['Length']:>10} {row['FullName']}\")"
    }
  ]
};
