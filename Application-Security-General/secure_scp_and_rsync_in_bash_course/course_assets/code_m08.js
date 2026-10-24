window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Secrets, Logs, Monitoring, and Failure Handling\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Use one validated SSH agent for transfer authentication",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nsocket=\"${SSH_AUTH_SOCK:?agent socket required}\"\nmetadata=\"$(stat -Lc \u0027%u %F\u0027 \"$socket\")\" || exit 77\nread -r owner kind \u003c\u003c\u003c\"$metadata\"\n[[ \"$owner\" == \"$(id -u)\" \u0026\u0026 \"$kind\" == \u0027socket\u0027 ]] || exit 77\n/usr/bin/env -i PATH=\u0027/usr/bin:/bin\u0027 LANG=C SSH_AUTH_SOCK=\"$socket\" \\\n  /usr/bin/rsync --archive --rsh=\u0027/usr/bin/ssh -F /etc/orders-transfer/ssh_config\u0027 \\\n  -- /srv/orders/outgoing/ \u0027archive-host:/srv/orders/incoming/\u0027",
                             "blurb":  "The agent socket is checked for owner and socket type; the child receives only that socket and a minimal nonsecret environment."
                         },
                         {
                             "title":  "Classify rsync failure without logging sensitive paths",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nstatus=0\n/usr/bin/rsync --archive --quiet -- /srv/orders/outgoing/ \u0027archive-host:/srv/orders/incoming/\u0027 || status=$?\ncase \"$status\" in 0) result=ok ;; 23|24) result=partial ;; 30|35) result=timeout ;; *) result=failed ;; esac\n/usr/bin/logger --tag orders-transfer -- \"event=rsync_complete result=$result status=$status\"\n(( status == 0 ))",
                             "blurb":  "The wrapper maps public rsync status classes to a bounded event and omits command output, usernames, and transferred filenames."
                         }
                     ]
};
