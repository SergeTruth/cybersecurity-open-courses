window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Preserve Evidence and Build Notes",
  "codeExamples": [
    {
      "title": "Create a Collection Manifest",
      "language": "shell",
      "code": "COLLECTION=case-2026-06-27/collected\nMANIFEST=case-2026-06-27/collection-manifest.tsv\n\nfind \"$COLLECTION\" -type f -print0 |\n  sort -z |\n  while IFS= read -r -d '' file; do\n    hash=$(shasum -a 256 \"$file\" | awk '{print $1}')\n    size=$(stat -f '%z' \"$file\")\n    printf '%s\\t%s\\t%s\\n' \"$hash\" \"$size\" \"$file\"\n  done | tee \"$MANIFEST\""
    },
    {
      "title": "Write Chain of Custody Rows",
      "language": "python",
      "code": "import csv\nfrom datetime import datetime, timezone\nfrom pathlib import Path\n\nrow = {\n    \"case_id\": \"case-2026-06-27\",\n    \"item\": \"macbook-targeted-collection\",\n    \"action\": \"transferred to evidence storage\",\n    \"actor\": \"analyst01\",\n    \"timestamp_utc\": datetime.now(timezone.utc).isoformat(),\n    \"location\": \"evidence-locker-01\",\n}\n\npath = Path(\"case-2026-06-27/chain-of-custody.csv\")\npath.parent.mkdir(parents=True, exist_ok=True)\nexists = path.exists()\n\nwith path.open(\"a\", newline=\"\", encoding=\"utf-8\") as handle:\n    writer = csv.DictWriter(handle, fieldnames=row)\n    if not exists:\n        writer.writeheader()\n    writer.writerow(row)"
    },
    {
      "title": "Create a Report Evidence Table",
      "language": "python",
      "code": "from pathlib import Path\n\nfindings = [\n    (\"F-001\", \"LaunchDaemon added\", \"Library/LaunchDaemons/com.example.agent.plist\", \"medium\"),\n    (\"F-002\", \"Downloaded archive observed\", \"Users/alice/Downloads/toolkit.zip\", \"high\"),\n]\n\nlines = [\"| ID | Finding | Evidence | Confidence |\", \"|---|---|---|---|\"]\nfor finding_id, summary, evidence, confidence in findings:\n    lines.append(f\"| {finding_id} | {summary} | `{evidence}` | {confidence} |\")\n\nPath(\"case-2026-06-27/report-evidence-table.md\").write_text(\"\\n\".join(lines), encoding=\"utf-8\")"
    }
  ]
};
