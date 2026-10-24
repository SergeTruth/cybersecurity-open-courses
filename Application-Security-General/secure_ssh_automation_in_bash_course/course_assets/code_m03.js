window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro": "These examples apply 'Keys, Accounts, and Automation Identity' to distinct, reviewable Bash workflows. Runtime: GNU/Linux, Bash 5+, GNU command-line tools, and Python 3.11+ where shown. Install the demonstrated clients separately; fixed /etc and /opt policies and application-specific consumers are deployment-owned prerequisites. These are administrator/service scripts, not unauthenticated web endpoints.",
    "codeExamples":  [
                         {
                             "title":  "Connect only with strict host verification",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\n/usr/bin/ssh -oBatchMode=yes -oStrictHostKeyChecking=yes \\\n  -oUserKnownHostsFile=/etc/orders-automation/known_hosts \\\n  -oConnectTimeout=10 \u0027orders@worker01.example.test\u0027 -- /usr/local/bin/orders-health",
                             "blurb":  "The automation profile fixes the destination and known-hosts database; accepting a new host key interactively is disabled."
                         },
                         {
                             "title":  "Authenticate a reviewed known-hosts update",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\numask 077\n\ncandidate=\"${1:?known-hosts candidate required}\"\nstage=\"$(/usr/bin/mktemp -d /tmp/ssh-trust-update.XXXXXX)\"\ncleanup() { [[ \"$stage\" == /tmp/ssh-trust-update.* ]] \u0026\u0026 /usr/bin/rm -rf -- \"$stage\"; }\ntrap cleanup EXIT\n\nexec {candidate_fd}\u003c\"$candidate\"\nexec {signature_fd}\u003c\"$candidate.asc\"\nsnapshot=\"$stage/known_hosts.next\"\nsignature_snapshot=\"$stage/known_hosts.next.asc\"\n/usr/bin/dd if=\"/proc/$$/fd/$candidate_fd\" of=\"$snapshot\" bs=1048577 count=1 status=none conv=fsync\n/usr/bin/dd if=\"/proc/$$/fd/$signature_fd\" of=\"$signature_snapshot\" bs=65537 count=1 status=none conv=fsync\nexec {candidate_fd}\u003c\u0026-\nexec {signature_fd}\u003c\u0026-\ncandidate_size=\"$(/usr/bin/stat -Lc \u0027%s\u0027 \"$snapshot\")\"\nsignature_size=\"$(/usr/bin/stat -Lc \u0027%s\u0027 \"$signature_snapshot\")\"\n(( candidate_size \u003e 0 \u0026\u0026 candidate_size \u003c= 1048576 \u0026\u0026 signature_size \u003e 0 \u0026\u0026 signature_size \u003c= 65536 )) || exit 77\n/usr/bin/chmod 0400 \"$snapshot\" \"$signature_snapshot\"\n/usr/bin/chmod 0500 \"$stage\"\n\n/usr/bin/gpgv --keyring /etc/orders-automation/infrastructure-signers.gpg \\\n  \"$signature_snapshot\" \"$snapshot\"\n/usr/bin/ssh-keygen -l -f \"$snapshot\" \u003e/dev/null\nfor host in worker01.example.test worker02.example.test; do\n  /usr/bin/ssh-keygen -F \"$host\" -f \"$snapshot\" \u003e/dev/null || exit 77\ndone\n/usr/bin/install -o root -g root -m 0644 -- \"$snapshot\" /etc/orders-automation/known_hosts",
                             "blurb":  "Bounded descriptor copies are sealed in private staging before signature verification, required-host lookup, and installation all consume the identical snapshot."
                         }
                     ]
};
