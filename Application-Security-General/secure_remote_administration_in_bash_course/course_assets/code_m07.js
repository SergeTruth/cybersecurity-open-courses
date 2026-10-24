window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Multi-Host Automation and Concurrency\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Run a bounded number of host checks",
                             "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nhosts=(db01 db02 db03)\numask 077\nwork=\"$(mktemp -d)\"\ntrap '/usr/bin/rm -rf -- \"$work\"' EXIT\npids=()\nfor host in \"${hosts[@]}\"; do\n  /usr/bin/timeout --signal=TERM --kill-after=2s 20s /usr/bin/ssh -F /etc/remote-admin/read_only_config \\\n    \"$host\" -- /usr/local/sbin/orders-readiness >\"$work/$host.readiness\" &\n  pids+=(\"$!\")\ndone\nfailed=0\nfor pid in \"${pids[@]}\"; do wait \"$pid\" || failed=1; done\n(( failed == 0 )) || exit 70",
                             "blurb": "The fixed host checks run with limited concurrency and TERM-to-KILL escalation, and every local child is waited for. Stopping an SSH client is not proof that remote work stopped; the remote readiness operation must be read-only and independently bounded."
                         },
                         {
                             "title":  "Stop a host wave after the first failed batch",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nfor batch in \u0027web01 web02\u0027 \u0027web03 web04\u0027; do\n  failed=0\n  for host in $batch; do\n    /usr/bin/ssh -F /etc/remote-admin/ssh_config \"$host\" -- \\\n      /usr/local/sbin/orders-maintenance-check || failed=1\n  done\n  (( failed == 0 )) || { printf \u0027administration wave stopped\\n\u0027 \u003e\u00262; exit 70; }\ndone",
                             "blurb":  "Hosts are processed in reviewed batches, and a failed readiness command prevents the next administrative wave from starting."
                         }
                     ]
};
