window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Credentials, Permissions, and Least Privilege\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Give restic one validated password descriptor",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\npassword_file=\"${1:?password file required}\"\nrestic=/usr/bin/restic\n[[ -x \"$restic\" ]] || exit 69\nexec {password_fd}\u003c\"$password_file\"\nmetadata=\"$(FD=\"$password_fd\" /usr/bin/python3 -c \u0027import os, stat; s=os.fstat(int(os.environ[\"FD\"])); print(s.st_uid, oct(stat.S_IMODE(s.st_mode))[2:], s.st_size, int(stat.S_ISREG(s.st_mode)))\u0027)\" || exit 77\nread -r owner mode size regular \u003c\u003c\u003c\"$metadata\"\n[[ \"$owner\" == \"$(id -u)\" \u0026\u0026 \"$mode\" =~ ^(400|600)$ \u0026\u0026 \"$regular\" == 1 ]] || exit 77\n(( size \u003e= 20 \u0026\u0026 size \u003c= 4096 )) || exit 65\n\n/usr/bin/env -i PATH=\u0027/usr/bin:/bin\u0027 LANG=C \\\n  RESTIC_PASSWORD_FILE=\"/proc/$$/fd/$password_fd\" \\\n  \"$restic\" -r \u0027sftp:backup@backup.example:/srv/restic/orders\u0027 snapshots --latest 1",
                             "blurb":  "The password file is opened once, the descriptor is checked for owner, mode, type, and size, and the backup client receives only the descriptor path in a cleared environment."
                         },
                         {
                             "title":  "Drop to the dedicated backup identity before reading data",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nreadonly WORKER=\u0027/usr/local/libexec/orders-backup-collector\u0027\n[[ -x \"$WORKER\" \u0026\u0026 ! -L \"$WORKER\" ]] || exit 77\nuid=\"$(id -u orders-backup)\" || exit 69\ngid=\"$(id -g orders-backup)\" || exit 69\n\n/usr/bin/env -i PATH=\u0027/usr/bin:/bin\u0027 LANG=C \\\n  /usr/bin/setpriv --reuid=\"$uid\" --regid=\"$gid\" --clear-groups --no-new-privs \\\n  \"$WORKER\" --source /srv/orders/data --output-fd 1",
                             "blurb":  "The wrapper verifies the service account and uses setpriv to remove supplementary groups and prevent privilege regain before the fixed collection program starts."
                         }
                     ]
};
