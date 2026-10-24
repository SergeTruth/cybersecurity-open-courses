window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Remote Commands, Quoting, and Exit Handling\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Invoke SSH with a fixed option array",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\ncase \"${1-}\" in worker01|worker02) host=\"$1\" ;; *) exit 64 ;; esac\noptions=(-F /etc/orders-automation/ssh_config -oBatchMode=yes -oConnectTimeout=10)\n/usr/bin/ssh \"${options[@]}\" \"$host\" -- /usr/local/bin/orders-health",
                             "blurb":  "Connection behavior is visible and reviewable; the caller selects only an allowlisted host alias."
                         },
                         {
                             "title":  "Bound unattended SSH startup and execution",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\n/usr/bin/timeout --signal=TERM --kill-after=3s 30s \\\n  /usr/bin/ssh -oBatchMode=yes -oConnectTimeout=8 \\\n  -F /etc/orders-automation/ssh_config worker01 -- /usr/local/bin/orders-readiness",
                             "blurb":  "Batch mode forbids prompts, ConnectTimeout bounds establishment, and timeout limits the complete remote check."
                         }
                     ]
};
