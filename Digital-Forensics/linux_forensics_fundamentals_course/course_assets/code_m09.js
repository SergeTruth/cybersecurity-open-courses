window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Correlate Artifacts Into a Timeline",
  "codeExamples": [
    {
      "title": "Build a Small Cross-Artifact Timeline",
      "language": "python",
      "code": "from pathlib import Path\n\nevents = []\n\nfor path in Path(\"case\").glob(\"*auth-events.txt\"):\n    for line in path.read_text(errors=\"replace\").splitlines():\n        if \"Accepted\" in line or \"Failed\" in line:\n            events.append((\"auth\", line[:15], line))\n\nfor line in Path(\"case-file-timeline.tsv\").read_text(errors=\"replace\").splitlines():\n    parts = line.split(\"|\", 7)\n    if len(parts) == 8 and (\"/.ssh/\" in parts[7] or \"/systemd/\" in parts[7]):\n        events.append((\"file\", parts[2], parts[7]))\n\nfor kind, when, detail in sorted(events, key=lambda item: item[1]):\n    print(f\"{when} [{kind}] {detail}\")"
    },
    {
      "title": "Quick Read-Only Triage Checklist",
      "language": "shell",
      "code": "ROOT=/mnt/evidence/rootfs\n\nprintf '\\n== OS ==\\n'; cat \"$ROOT/etc/os-release\" 2>/dev/null\nprintf '\\n== Shell users ==\\n'; awk -F: '$7 !~ /(false|nologin)$/ {print $1,$3,$6,$7}' \"$ROOT/etc/passwd\"\nprintf '\\n== Recent auth events ==\\n'; zgrep -hE 'Accepted|Failed|sudo' \"$ROOT\"/var/log/auth.log* 2>/dev/null | tail -50\nprintf '\\n== Service changes ==\\n'; find \"$ROOT/etc/systemd/system\" -type f -mtime -30 -print 2>/dev/null\nprintf '\\n== SSH keys ==\\n'; find \"$ROOT/home\" \"$ROOT/root\" -path '*/.ssh/authorized_keys' -type f -print 2>/dev/null"
    }
  ]
};
