window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Safe Remote Command Execution\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Dispatch only fixed remote maintenance actions",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\ncase \"${1-}\" in\n  status) remote=(/usr/local/sbin/orders-admin status) ;;\n  reload) remote=(/usr/local/sbin/orders-admin reload) ;;\n  drain) remote=(/usr/local/sbin/orders-admin drain) ;;\n  *) exit 64 ;;\nesac\n/usr/bin/ssh -F /etc/remote-admin/ssh_config db01 -- \"${remote[@]}\"",
                             "blurb":  "A short action name maps to an application-owned remote command; arbitrary caller text never becomes remote shell source."
                         },
                         {
                             "title":  "Send validated input on standard input to a fixed remote program",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nrequest_id=\"${1:?request id required}\"\n[[ \"$request_id\" =~ ^REQ-[A-F0-9]{16}$ ]] || exit 64\n/usr/bin/printf \u0027%s\\n\u0027 \"$request_id\" \\\n  | /usr/bin/ssh -F /etc/remote-admin/ssh_config db01 -- \\\n      /usr/local/sbin/orders-investigate --request-id-stdin\nstatus=(\"${PIPESTATUS[@]}\")\n(( status[0] == 0 \u0026\u0026 status[1] == 0 )) || exit 70",
                             "blurb":  "The request identifier is not interpolated into a remote command string; a fixed receiver reads it as data."
                         }
                     ]
};
