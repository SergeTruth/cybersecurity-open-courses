window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Source and Destination Validation\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Open and validate a local transfer source",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nexec {source_fd}\u003c\"${1:?source file required}\"\nopened=\"$(realpath -e -- \"/proc/$$/fd/$source_fd\")\" || exit 77\n[[ \"$opened\" =~ ^/srv/orders/uploads/[a-zA-Z0-9][a-zA-Z0-9._-]{0,127}$ ]] || exit 77\nmetadata=\"$(stat -Lc \u0027%u %a %s %F\u0027 \"/proc/$$/fd/$source_fd\")\" || exit 77\nread -r owner mode size kind \u003c\u003c\u003c\"$metadata\"\n[[ \"$owner\" == \"$(id -u)\" \u0026\u0026 \"$kind\" == \u0027regular file\u0027 ]] || exit 77\n(( size \u003e 0 \u0026\u0026 size \u003c= 104857600 )) || exit 65\n/usr/bin/scp -F /etc/orders-transfer/ssh_config \\\n  \"/proc/$$/fd/$source_fd\" \u0027archive-host:/srv/orders/incoming/upload.bin\u0027",
                             "blurb":  "The file is opened once, descriptor metadata is checked, and scp reads the stable procfs descriptor rather than reopening a mutable pathname."
                         },
                         {
                             "title":  "Validate a remote destination as a host and path pair",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nhost=\"${1:?host required}\"; remote_dir=\"${2:?remote directory required}\"\n[[ \"$host\" =~ ^(stage-files|prod-files)$ ]] || exit 64\n[[ \"$remote_dir\" =~ ^/srv/orders/releases/[0-9]+\\.[0-9]+\\.[0-9]+/$ ]] || exit 64\n/usr/bin/rsync --archive --protect-args --rsh=\u0027/usr/bin/ssh -F /etc/orders-transfer/ssh_config\u0027 \\\n  -- /srv/orders/package/ \"$host:$remote_dir\"",
                             "blurb":  "The host is allowlisted and the path grammar permits only one release directory below the approved remote root, excluding dot segments."
                         }
                     ]
};
