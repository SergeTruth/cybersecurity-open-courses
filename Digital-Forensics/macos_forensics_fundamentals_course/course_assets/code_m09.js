window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Correlate macOS Artifacts",
  "codeExamples": [
    {
      "title": "Build a Small Cross-Artifact Timeline",
      "language": "python",
      "code": "import csv\nfrom pathlib import Path\n\nevents = []\n\nfor row in csv.DictReader(Path(\"combined-macos-timeline.csv\").open(encoding=\"utf-8\")):\n    events.append({\"time\": row[\"time\"], \"source\": row[\"source\"], \"summary\": row[\"path\"]})\n\nfor line in Path(\"install-log-interesting.txt\").read_text(encoding=\"utf-8\", errors=\"replace\").splitlines():\n    events.append({\"time\": \"\", \"source\": \"install.log\", \"summary\": line})\n\nfor line in Path(\"launch-items.txt\").read_text(encoding=\"utf-8\", errors=\"replace\").splitlines():\n    events.append({\"time\": \"\", \"source\": \"launch_item\", \"summary\": line})\n\nfor event in sorted(events, key=lambda item: item[\"time\"] or \"9999\"):\n    print(f\"{event['time']}\\t{event['source']}\\t{event['summary']}\")"
    },
    {
      "title": "Track Evidence Coverage and Gaps",
      "language": "python",
      "code": "from pathlib import Path\n\nrequired_sources = {\n    \"hash_manifest\": \"case-2026-06-27/collection-manifest.tsv\",\n    \"user_accounts\": \"user-accounts.jsonl\",\n    \"unified_logs\": \"unified-log-security-events.jsonl\",\n    \"launch_items\": \"launch-items.txt\",\n    \"file_timeline\": \"combined-macos-timeline.csv\",\n    \"chain_of_custody\": \"case-2026-06-27/chain-of-custody.csv\",\n}\n\nfor name, path in required_sources.items():\n    status = \"present\" if Path(path).exists() else \"missing\"\n    print({\"source\": name, \"path\": path, \"status\": status})"
    }
  ]
};
