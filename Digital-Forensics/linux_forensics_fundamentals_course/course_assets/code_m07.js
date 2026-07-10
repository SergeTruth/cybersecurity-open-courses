window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Correlate Remote Access Evidence",
  "codeExamples": [
    {
      "title": "Extract SSH Login Sources",
      "language": "shell",
      "code": "ROOT=/mnt/evidence/rootfs\n\nzgrep -hE 'Accepted|Failed' \"$ROOT\"/var/log/auth.log* \"$ROOT\"/var/log/secure* 2>/dev/null | \\\n  awk 'match($0, /from [0-9.]+/) { print substr($0, RSTART + 5, RLENGTH - 5) }' | \\\n  sort | uniq -c | sort -nr"
    },
    {
      "title": "Fingerprint Authorized SSH Keys",
      "language": "shell",
      "code": "ROOT=/mnt/evidence/rootfs\n\nfind \"$ROOT/home\" \"$ROOT/root\" -path '*/.ssh/authorized_keys' -type f -print0 2>/dev/null | \\\n  while IFS= read -r -d '' keys; do\n    printf '\\n[%s]\\n' \"$keys\"\n    ssh-keygen -lf \"$keys\" 2>/dev/null\n  done"
    },
    {
      "title": "Review SSH and Firewall Configuration",
      "language": "shell",
      "code": "ROOT=/mnt/evidence/rootfs\n\ngrep -RHE '^(Port|ListenAddress|PermitRootLogin|PasswordAuthentication|AllowUsers|AllowGroups)' \\\n  \"$ROOT/etc/ssh/sshd_config\" \"$ROOT/etc/ssh/sshd_config.d\" 2>/dev/null\n\nfind \"$ROOT/etc\" -maxdepth 3 \\( -name '*iptables*' -o -name '*nft*' -o -name '*ufw*' \\) -type f -print"
    }
  ]
};
