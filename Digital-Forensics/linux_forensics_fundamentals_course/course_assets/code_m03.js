window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Review User and Account Evidence",
  "codeExamples": [
    {
      "title": "Find Shell-Enabled Local Accounts",
      "language": "shell",
      "code": "ROOT=/mnt/evidence/rootfs\n\nawk -F: '$7 !~ /(false|nologin)$/ {\n  printf \"user=%s uid=%s gid=%s home=%s shell=%s\\n\", $1, $3, $4, $6, $7\n}' \"$ROOT/etc/passwd\""
    },
    {
      "title": "Review Administrative Group Membership",
      "language": "shell",
      "code": "ROOT=/mnt/evidence/rootfs\n\ngrep -E '^(sudo|wheel|adm):' \"$ROOT/etc/group\" 2>/dev/null\nfind \"$ROOT/etc/sudoers\" \"$ROOT/etc/sudoers.d\" -maxdepth 1 -type f -print 2>/dev/null"
    },
    {
      "title": "List SSH Keys and Shell Histories",
      "language": "shell",
      "code": "ROOT=/mnt/evidence/rootfs\n\nfind \"$ROOT/home\" \"$ROOT/root\" -xdev \\( -name authorized_keys -o -name known_hosts -o -name '.*history' \\) \\\n  -type f -printf '%TY-%Tm-%Td %TH:%TM %u:%g %m %p\\n' 2>/dev/null"
    },
    {
      "title": "Parse /etc/passwd Into Structured Rows",
      "language": "python",
      "code": "from pathlib import Path\n\npasswd = Path(\"/mnt/evidence/rootfs/etc/passwd\")\nfor line in passwd.read_text(encoding=\"utf-8\", errors=\"replace\").splitlines():\n    user, _, uid, gid, comment, home, shell = line.split(\":\", 6)\n    if shell.endswith((\"nologin\", \"false\")):\n        continue\n    print({\"user\": user, \"uid\": int(uid), \"gid\": int(gid), \"home\": home, \"shell\": shell})"
    }
  ]
};
