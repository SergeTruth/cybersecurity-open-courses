window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Host Trust, Connectivity, and Target Selection\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Map an inventory name to a pinned SSH target",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\ncase \"${1-}\" in\n  database-primary) target=\u0027admin@db01.example.test\u0027 ;;\n  database-replica) target=\u0027admin@db02.example.test\u0027 ;;\n  *) exit 64 ;;\nesac\n/usr/bin/ssh -oBatchMode=yes -oStrictHostKeyChecking=yes \\\n  -oUserKnownHostsFile=/etc/remote-admin/known_hosts \\\n  \"$target\" -- /usr/local/sbin/orders-readiness",
                             "blurb":  "Operators choose a logical host, while hostname, account, and known-hosts data remain application-controlled."
                         },
                         {
                             "title":  "Reject unexpected effective SSH configuration",
                             "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nconfiguration=\"$(/usr/bin/ssh -G -F /etc/remote-admin/ssh_config db01)\"\n/usr/bin/grep -qx 'hostname db01.example.test' <<<\"$configuration\" || exit 77\n/usr/bin/grep -qx 'user admin' <<<\"$configuration\" || exit 77\n/usr/bin/grep -qx 'stricthostkeychecking true' <<<\"$configuration\" || exit 77\n/usr/bin/grep -qx 'userknownhostsfile /etc/remote-admin/known_hosts' <<<\"$configuration\" || exit 77\n# OpenSSH may omit unused proxy fields. Any present value must be none.\n/usr/bin/awk '\n  ($1 == \"proxycommand\" || $1 == \"proxyjump\") && $2 != \"none\" {bad=1}\n  END {exit bad ? 1 : 0}\n' <<<\"$configuration\" || exit 77",
                             "blurb":  "ssh -G resolves configuration without connecting; the gate verifies hostname, user, proxy, and known-hosts settings before administration proceeds."
                         }
                     ]
};
