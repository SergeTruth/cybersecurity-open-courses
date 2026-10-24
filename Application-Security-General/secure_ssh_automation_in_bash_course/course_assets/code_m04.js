window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Bash Invocation Patterns for SSH\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Restrict an automation key to one account and identity",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nexec {key_fd}\u003c\"${1:?automation key required}\"\nread -r owner mode kind \u003c\u003c\u003c\"$(stat -Lc \u0027%u %a %F\u0027 \"/proc/$$/fd/$key_fd\")\"\n[[ \"$owner\" == \"$(id -u)\" \u0026\u0026 \"$mode\" == 600 \u0026\u0026 \"$kind\" == \u0027regular file\u0027 ]] || exit 77\n/usr/bin/ssh -oBatchMode=yes -oIdentitiesOnly=yes -oIdentityFile=\"/proc/$$/fd/$key_fd\" \\\n  -F /etc/orders-automation/ssh_config worker01 -- /usr/local/bin/orders-health",
                             "blurb":  "The descriptor-validated key is the only identity offered, and the remote account and host are fixed by the job."
                         },
                         {
                             "title":  "Reject an expired SSH user certificate",
                             "code": "#!/usr/bin/env bash\nset -euo pipefail\nexport LC_ALL=C TZ=UTC\n\ncertificate=\"${1:?certificate required}\"\ndetails=\"$(/usr/bin/ssh-keygen -L -f \"$certificate\")\" || exit 65\n# Reject injected/duplicate display headings; key IDs can contain newlines.\nfor heading in 'Type:' 'Public key:' 'Signing CA:' 'Key ID:' 'Serial:' 'Valid:' 'Principals:' 'Critical Options:' 'Extensions:'; do\n  count=\"$(/usr/bin/awk -v prefix=\"        $heading\" 'index($0,prefix)==1 {n++} END {print n+0}' <<<\"$details\")\"\n  [[ \"$count\" == 1 ]] || exit 65\ndone\nvalidity=\"$(/usr/bin/awk '/^        Valid: from /{print $3, $5}' <<<\"$details\")\"\n[[ -n \"$validity\" ]] || exit 65\nread -r start end <<<\"$validity\"\nstart_epoch=\"$(date -u -d \"$start\" +%s)\"; end_epoch=\"$(date -u -d \"$end\" +%s)\"; now=\"$(date -u +%s)\"\n(( now >= start_epoch && now < end_epoch )) || exit 77",
                             "blurb": "The certificate validity interval is parsed before a job uses it, providing a clear failure when short-lived automation identity has expired. Certificate display and date parsing both use UTC."
                         }
                     ]
};
