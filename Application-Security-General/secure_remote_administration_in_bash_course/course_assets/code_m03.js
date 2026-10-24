window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro": "These examples apply 'Identity, SSH Keys, and Access Control' to distinct, reviewable Bash workflows. Runtime: GNU/Linux, Bash 5+, GNU command-line tools, and Python 3.11+ where shown. Install the demonstrated clients separately; fixed /etc and /opt policies and application-specific consumers are deployment-owned prerequisites. These are administrator/service scripts, not unauthenticated web endpoints.",
    "codeExamples":  [
                         {
                             "title":  "Use a dedicated administration key through its descriptor",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nexec {key_fd}\u003c\"${1:?administration key required}\"\nmetadata=\"$(stat -Lc \u0027%u %a %F\u0027 \"/proc/$$/fd/$key_fd\")\" || exit 77\nread -r owner mode kind \u003c\u003c\u003c\"$metadata\"\n[[ \"$owner\" == \"$(id -u)\" \u0026\u0026 \"$mode\" == 600 \u0026\u0026 \"$kind\" == \u0027regular file\u0027 ]] || exit 77\n/usr/bin/ssh -oBatchMode=yes -oIdentitiesOnly=yes \\\n  -oIdentityFile=\"/proc/$$/fd/$key_fd\" -oStrictHostKeyChecking=yes \\\n  -oUserKnownHostsFile=/etc/remote-admin/known_hosts \\\n  \u0027admin@db01.example.test\u0027 -- /usr/local/sbin/orders-status",
                             "blurb":  "The key is opened once and checked for owner, mode, and type before SSH receives the descriptor path with identities restricted."
                         },
                         {
                             "title":  "Require the expected principal in an SSH certificate",
                             "code": "#!/usr/bin/env bash\nset -euo pipefail\nexport LC_ALL=C TZ=UTC\n\ncertificate=\"${1:?SSH certificate required}\"\ndetails=\"$(/usr/bin/ssh-keygen -L -f \"$certificate\")\" || exit 65\n# Reject injected/duplicate display headings; key IDs can contain newlines.\nfor heading in 'Type:' 'Public key:' 'Signing CA:' 'Key ID:' 'Serial:' 'Valid:' 'Principals:' 'Critical Options:' 'Extensions:'; do\n  count=\"$(/usr/bin/awk -v prefix=\"        $heading\" 'index($0,prefix)==1 {n++} END {print n+0}' <<<\"$details\")\"\n  [[ \"$count\" == 1 ]] || exit 65\ndone\nprincipal_count=\"$(/usr/bin/awk '\n  /^        Principals:/{inside=1; next}\n  /^        Critical Options:/{inside=0}\n  inside && $1 == \"orders-remote-admin\" {count++}\n  END {print count + 0}\n' <<<\"$details\")\"\nsigning_ca=\"$(/usr/bin/awk '/^        Signing CA:/{for (i=1; i<=NF; i++) if ($i ~ /^SHA256:/) {print $i; exit}}' <<<\"$details\")\"\n[[ \"$principal_count\" == 1 ]] || exit 77\n[[ \"$signing_ca\" == 'SHA256:2Q3sS7q3DgYJm2Wq8y3zM9uX5cYh2f4Kp8vN6aBcDe0' ]] || exit 77",
                             "blurb":  "ssh-keygen inspects the certificate and the wrapper refuses use unless the fixed automation principal and CA fingerprint are present."
                         }
                     ]
};
