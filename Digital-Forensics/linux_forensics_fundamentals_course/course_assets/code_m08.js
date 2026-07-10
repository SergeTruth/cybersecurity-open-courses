window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Preserve Evidence and Notes",
  "codeExamples": [
    {
      "title": "Create a Manifest for a Targeted Collection",
      "language": "shell",
      "code": "COLLECTION=case-2026-06-26/collected\n\nfind \"$COLLECTION\" -type f -print0 | sort -z | \\\n  xargs -0 sha256sum > case-2026-06-26/collection-manifest.sha256\n\nsha256sum case-2026-06-26/collection-manifest.sha256"
    },
    {
      "title": "Record Collection Metadata",
      "language": "python",
      "code": "import json\nfrom datetime import datetime, timezone\nfrom pathlib import Path\n\nrecord = {\n    \"case_id\": \"case-2026-06-26\",\n    \"source\": \"/mnt/evidence/rootfs\",\n    \"collection\": \"targeted Linux artifact collection\",\n    \"timestamp_utc\": datetime.now(timezone.utc).isoformat(),\n    \"limitations\": [\"live system state may differ from mounted evidence\"],\n}\n\nPath(\"case-2026-06-26/collection-record.json\").write_text(\n    json.dumps(record, indent=2),\n    encoding=\"utf-8\",\n)"
    },
    {
      "title": "Start a Findings Table",
      "language": "shell",
      "code": "CASE=case-2026-06-26\n\nprintf 'finding_id,evidence,method,confidence,limitation\\n' > \"$CASE/findings.csv\"\nprintf 'F-001,%s,%s,%s,%s\\n' \\\n  'auth.log shows accepted SSH login' \\\n  'zgrep accepted logins across rotated logs' \\\n  'medium' \\\n  'source IP alone is not attribution' >> \"$CASE/findings.csv\""
    }
  ]
};
