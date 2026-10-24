window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Logging, Secrets, Monitoring, and Review\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Record a sanitized remote administration event",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nhost=\"${1:?host required}\"\naction=\"${2:?action required}\"\nresult=\"${3:?result required}\"\nactor=\"${REMOTE_ADMIN_ID:?actor required}\"\n[[ \"$host\" =~ ^(db01|db02|db03)$ ]] || exit 64\n[[ \"$action\" =~ ^(status|reload|drain)$ \u0026\u0026 \"$result\" =~ ^(ok|failed)$ ]] || exit 64\n[[ \"$actor\" =~ ^[A-Za-z0-9][A-Za-z0-9._@-]{0,63}$ ]] || exit 64\n/usr/bin/logger --tag remote-admin -- \\\n  \"event=remote_action host=$host action=$action result=$result actor=$actor\"",
                             "blurb":  "Every public event field, including the bounded actor identifier, must match a closed grammar before the structured record reaches the system logger."
                         },
                         {
                             "title":  "Alert on failed privileged remote commands",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nwork=\"$(mktemp)\"; trap \u0027/usr/bin/rm -f -- \"$work\"\u0027 EXIT\n/usr/bin/journalctl -t remote-admin --since \u0027-10 minutes\u0027 --output=cat \u003e\"$work\" || exit 70\nstatus=0\nfailures=\"$(/usr/bin/grep -Fc \u0027result=failed\u0027 \"$work\")\" || status=$?\n(( status == 0 || status == 1 )) || exit 70\nif (( failures \u003e= 3 )); then\n  /usr/bin/logger --priority auth.warning --tag remote-admin-monitor -- \\\n    \"event=remote_failure_threshold count=$failures window_minutes=10\"\n  exit 75\nfi",
                             "blurb":  "The monitor reads structured journal fields, counts a bounded time window, and emits an alert without including remote command text or secrets."
                         }
                     ]
};
