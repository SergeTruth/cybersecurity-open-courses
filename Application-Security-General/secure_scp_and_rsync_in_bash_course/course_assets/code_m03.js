window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro": "These examples apply 'Choosing Between SCP, SFTP, and rsync' to distinct, reviewable Bash workflows. Runtime: GNU/Linux, Bash 5+, GNU command-line tools, and Python 3.11+ where shown. Install the demonstrated clients separately; fixed /etc and /opt policies and application-specific consumers are deployment-owned prerequisites. These are administrator/service scripts, not unauthenticated web endpoints.",
    "codeExamples":  [
                         {
                             "title":  "Copy one immutable release artifact with scp",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nartifact=\"$(realpath -e -- \"${1:?artifact required}\")\"\n[[ \"$artifact\" =~ ^/srv/releases/orders-[0-9]+\\.[0-9]+\\.[0-9]+\\.tar\\.gz$ \u0026\u0026 -f \"$artifact\" ]] || exit 64\n/usr/bin/scp -oBatchMode=yes -oIdentitiesOnly=yes -oStrictHostKeyChecking=yes \\\n  -oUserKnownHostsFile=/etc/orders-transfer/known_hosts \\\n  -i /etc/orders-transfer/release_ed25519 -- \"$artifact\" \\\n  \u0027release@deploy.example.test:/srv/releases/incoming/orders.tar.gz.pending\u0027",
                             "blurb":  "The local artifact grammar, destination account, host, path, identity, and known-hosts database are fixed for a one-file transfer."
                         },
                         {
                             "title":  "Use a fixed SFTP batch for an atomic remote rename",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nlocal_file=\"${1:?local file required}\"\n[[ \"$local_file\" =~ ^/srv/releases/orders-[0-9]+\\.[0-9]+\\.[0-9]+\\.json$ \u0026\u0026 -f \"$local_file\" ]] || exit 64\nbatch=\"$(mktemp)\"; trap \u0027rm -f -- \"$batch\"\u0027 EXIT\nprintf \u0027put %s /srv/releases/incoming/orders.json.pending\\nrename /srv/releases/incoming/orders.json.pending /srv/releases/incoming/orders.json\\n\u0027 \"$local_file\" \u003e\"$batch\"\n/usr/bin/sftp -b \"$batch\" -F /etc/orders-transfer/ssh_config release-host",
                             "blurb":  "The batch commands contain no caller text; upload and rename occur within one approved remote directory."
                         }
                     ]
};
