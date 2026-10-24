window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027File Transfer, Configuration, and Remote State\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Install one reviewed configuration through staging",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nconfig=\"$(realpath -e -- \"${1:?configuration required}\")\"\n[[ \"$config\" =~ ^/srv/admin/reviewed/orders-[a-z0-9][a-z0-9-]{1,31}\\.conf$ \u0026\u0026 -f \"$config\" ]] || exit 64\n/usr/bin/scp -F /etc/remote-admin/ssh_config -- \"$config\" \u0027db01:/var/tmp/orders.conf.pending\u0027\n/usr/bin/ssh -F /etc/remote-admin/ssh_config db01 -- \\\n  /usr/local/sbin/install-orders-config /var/tmp/orders.conf.pending",
                             "blurb":  "scp transfers a fixed local file to a fixed staging name, then a restricted remote command validates and atomically installs it."
                         },
                         {
                             "title":  "Compare remote state without granting write access",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nremote_digest=\"$(/usr/bin/ssh -F /etc/remote-admin/read_only_config db01 -- \\\n  /usr/bin/sha256sum /etc/orders/orders.conf)\" || exit 70\n[[ \"$remote_digest\" =~ ^[a-f0-9]{64}[[:space:]]+/etc/orders/orders\\.conf$ ]] || exit 65\nprintf \u0027%s\\n\u0027 \"$remote_digest\"",
                             "blurb":  "A fixed read-only command emits a digest that is validated locally; no caller-selected remote path or command is accepted."
                         }
                     ]
};
