window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Query macOS Logs",
  "codeExamples": [
    {
      "title": "Filter an Exported Unified Log Archive",
      "language": "shell",
      "code": "LOGARCHIVE=/Volumes/Evidence/SystemLogs.logarchive\n\nlog show --archive \"$LOGARCHIVE\" \\\n  --style json \\\n  --predicate 'process == \"loginwindow\" OR process == \"securityd\" OR process == \"syspolicyd\"' \\\n  --start '2026-06-01 00:00:00' \\\n  --end '2026-06-02 00:00:00' |\n  tee unified-log-security-events.jsonl"
    },
    {
      "title": "Review Install and Application Logs",
      "language": "shell",
      "code": "ROOT=/Volumes/Evidence/MacintoshHD\n\ngrep -E 'Install|Package|Succeeded|Failed' \"$ROOT/var/log/install.log\" 2>/dev/null |\n  tee install-log-interesting.txt\n\nfind \"$ROOT/Library/Logs\" \"$ROOT/Users\" -path '*/Library/Logs/*' -type f \\\n  -print 2>/dev/null | sort | tee application-log-paths.txt"
    },
    {
      "title": "Count Unified Log Events by Process",
      "language": "python",
      "code": "import json\nfrom collections import Counter\nfrom pathlib import Path\n\ncounts = Counter()\nevents = Path(\"unified-log-security-events.jsonl\")\n\nfor line in events.read_text(encoding=\"utf-8\", errors=\"replace\").splitlines():\n    if not line.strip():\n        continue\n    item = json.loads(line)\n    counts[item.get(\"processImagePath\") or item.get(\"process\") or \"unknown\"] += 1\n\nfor process, count in counts.most_common(20):\n    print(f\"{count:5} {process}\")"
    }
  ]
};
