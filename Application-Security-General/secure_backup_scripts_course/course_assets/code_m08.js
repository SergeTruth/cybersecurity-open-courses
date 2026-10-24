window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Scheduling, Logging, Monitoring, and Alerting\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Prevent overlapping scheduled backup runs",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nexec {lock_fd}\u003e/run/lock/orders-backup.lock\n/usr/bin/flock --nonblock \"$lock_fd\" || { printf \u0027backup already running\\n\u0027 \u003e\u00262; exit 75; }\n/usr/bin/timeout --signal=TERM --kill-after=30s 45m \\\n  /usr/local/sbin/orders-backup-run --scheduled",
                             "blurb":  "A kernel lock serializes the fixed backup entry point, while timeout gives the scheduler a clear failure result instead of leaving an unbounded job."
                         },
                         {
                             "title":  "Emit bounded backup health evidence without secret data",
                             "code": "#!/usr/bin/env bash\nset -euo pipefail\n\narchive_bytes=\"${1:?archive byte count required}\"\nduration_seconds=\"${2:?duration required}\"\n[[ \"$archive_bytes\" =~ ^(0|[1-9][0-9]{0,14})$ && \"$duration_seconds\" =~ ^(0|[1-9][0-9]{0,5})$ ]] || exit 64\nresult='ok'\n(( archive_bytes >= 1048576 )) || result='suspiciously_small'\n/usr/bin/logger --tag orders-backup -- \\\n  \"event=backup_complete result=$result bytes=$archive_bytes duration_seconds=$duration_seconds\"\n[[ \"$result\" == 'ok' ]] || exit 75",
                             "blurb": "The monitor validates public numeric measurements and records a structured status event that an alerting system can aggregate safely. Canonical decimal text excludes leading-zero octal interpretation."
                         }
                     ]
};
