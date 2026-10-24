window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Bash Invocation Patterns and Argument Safety\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Keep scp options and operands separate",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\ncase \"${1-}\" in staging) host=\u0027stage-files\u0027 ;; production) host=\u0027prod-files\u0027 ;; *) exit 64 ;; esac\nfile=\"$(realpath -e -- \"${2:?file required}\")\"\n[[ \"$file\" =~ ^/srv/orders/export/[a-z0-9][a-z0-9_-]{0,63}\\.csv$ \u0026\u0026 -f \"$file\" ]] || exit 64\noptions=(-F /etc/orders-transfer/ssh_config -p -q)\n/usr/bin/scp \"${options[@]}\" -- \"$file\" \"$host:/srv/orders/import/\"",
                             "blurb":  "An allowlisted environment maps to a fixed host; -- ends option parsing before the validated local pathname."
                         },
                         {
                             "title":  "Protect rsync arguments from remote-shell reinterpretation",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nsource=\"${1:?source directory required}\"\n[[ \"$source\" == \u0027/srv/orders/publish\u0027 \u0026\u0026 -d \"$source\" \u0026\u0026 ! -L \"$source\" ]] || exit 64\nssh=\u0027/usr/bin/ssh -F /etc/orders-transfer/ssh_config\u0027\n/usr/bin/rsync --archive --protect-args --rsh=\"$ssh\" -- \\\n  \"$source/\" \u0027publish-host:/srv/orders/current/\u0027",
                             "blurb":  "A fixed host and path pair is used with protect-args, strict host verification, and an explicit end to local option parsing."
                         }
                     ]
};
