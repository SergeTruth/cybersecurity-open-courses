window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Preserve Evidence and Build Notes",
  "codeExamples": [
    {
      "title": "Create a Collection Manifest",
      "language": "powershell",
      "code": "$Collection = \"case-2026-06-26\\collected\"\n$Manifest = \"case-2026-06-26\\collection-manifest.csv\"\n\nGet-ChildItem -LiteralPath $Collection -Recurse -File |\n  ForEach-Object {\n    $Hash = Get-FileHash -Algorithm SHA256 -LiteralPath $_.FullName\n    [pscustomobject]@{\n      Path = $_.FullName\n      Length = $_.Length\n      LastWriteTimeUtc = $_.LastWriteTimeUtc\n      SHA256 = $Hash.Hash\n    }\n  } | Export-Csv $Manifest -NoTypeInformation"
    },
    {
      "title": "Record Collection Metadata",
      "language": "powershell",
      "code": "$Record = [ordered]@{\n  case_id = \"case-2026-06-26\"\n  source = \"E:\\Mount\\C\"\n  collection_type = \"targeted Windows artifact collection\"\n  collected_utc = (Get-Date).ToUniversalTime().ToString(\"o\")\n  limitations = \"Targeted collection; not a full forensic image\"\n}\n\n$Record | ConvertTo-Json |\n  Set-Content \"case-2026-06-26\\collection-record.json\" -Encoding UTF8"
    },
    {
      "title": "Start a Findings Table",
      "language": "python",
      "code": "import csv\nfrom pathlib import Path\n\nrows = [{\n    \"finding_id\": \"F-001\",\n    \"evidence\": \"Security.evtx contains successful interactive logon\",\n    \"method\": \"Get-WinEvent offline EVTX query\",\n    \"confidence\": \"medium\",\n    \"limitation\": \"Logon event does not prove who physically used the account\",\n}]\n\nwith Path(\"case-2026-06-26/findings.csv\").open(\"w\", newline=\"\", encoding=\"utf-8\") as handle:\n    writer = csv.DictWriter(handle, fieldnames=rows[0].keys())\n    writer.writeheader()\n    writer.writerows(rows)"
    }
  ]
};
