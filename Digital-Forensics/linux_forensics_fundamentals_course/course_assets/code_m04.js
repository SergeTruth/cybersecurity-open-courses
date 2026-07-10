window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Query Linux Logs Safely",
  "codeExamples": [
    {
      "title": "Search Rotated Authentication Logs",
      "language": "shell",
      "code": "ROOT=/mnt/evidence/rootfs\n\nzgrep -hE 'Accepted|Failed|sudo|session opened|session closed' \\\n  \"$ROOT\"/var/log/auth.log* \"$ROOT\"/var/log/secure* 2>/dev/null | \\\n  tee case-auth-events.txt"
    },
    {
      "title": "Read an Offline systemd Journal",
      "language": "shell",
      "code": "ROOT=/mnt/evidence/rootfs\n\njournalctl --directory \"$ROOT/var/log/journal\" \\\n  --since '2026-06-01 00:00:00' \\\n  --output short-iso \\\n  --no-pager | tee case-journal-events.txt"
    },
    {
      "title": "Count SSH Login Outcomes by Source",
      "language": "python",
      "code": "import re\nfrom collections import Counter\nfrom pathlib import Path\n\npattern = re.compile(r\"(Accepted|Failed).* from (?P<ip>\\S+)\")\ncounts = Counter()\n\nfor path in Path(\"/mnt/evidence/rootfs/var/log\").glob(\"auth.log*\"):\n    text = path.read_text(encoding=\"utf-8\", errors=\"replace\")\n    for match in pattern.finditer(text):\n        counts[(match.group(1), match.group(\"ip\"))] += 1\n\nfor (result, ip), count in counts.most_common(20):\n    print(f\"{result:8} {ip:>15} {count}\")"
    }
  ]
};
