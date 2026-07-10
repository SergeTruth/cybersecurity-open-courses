window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "Code Examples: Review Services and Persistence",
  "codeExamples": [
    {
      "title": "Capture Live Process Context When Authorized",
      "language": "shell",
      "code": "CASE=case-2026-06-26\n\nps -eo pid,ppid,user,lstart,cmd --forest | tee \"$CASE/process-tree.txt\"\nss -tulpn | tee \"$CASE/listening-sockets.txt\""
    },
    {
      "title": "Inspect systemd Unit Files in Evidence",
      "language": "shell",
      "code": "ROOT=/mnt/evidence/rootfs\n\nfind \"$ROOT/etc/systemd/system\" \"$ROOT/usr/lib/systemd/system\" \\\n  -type f -name '*.service' -printf '%TY-%Tm-%Td %TH:%TM %p\\n' 2>/dev/null | sort\n\ngrep -RHE '^(ExecStart|User|Group|WantedBy)=' \\\n  \"$ROOT/etc/systemd/system\" \"$ROOT/usr/lib/systemd/system\" 2>/dev/null"
    },
    {
      "title": "Review Scheduled Task Locations",
      "language": "shell",
      "code": "ROOT=/mnt/evidence/rootfs\n\nfind \"$ROOT/etc/cron.d\" \"$ROOT/etc/cron.daily\" \"$ROOT/etc/cron.hourly\" \\\n     \"$ROOT/etc/cron.monthly\" \"$ROOT/etc/cron.weekly\" \"$ROOT/var/spool/cron\" \\\n  -type f -printf '%TY-%Tm-%Td %TH:%TM %u:%g %m %p\\n' 2>/dev/null | sort"
    }
  ]
};
