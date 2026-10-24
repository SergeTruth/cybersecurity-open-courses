window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Secure File Transfer and Remote State\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Map an automation action to a fixed remote entry point",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\ncase \"${1-}\" in status|reload|rotate-logs) action=\"$1\" ;; *) exit 64 ;; esac\n/usr/bin/ssh -F /etc/orders-automation/ssh_config worker01 -- \\\n  /usr/local/bin/orders-automation-action \"$action\"",
                             "blurb":  "No arbitrary command name or shell fragment crosses the SSH boundary; supported actions become fixed positional values."
                         },
                         {
                             "title":  "Deliver a bounded data value over SSH standard input",
                             "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nversion=\"${1:?version required}\"\n[[ \"$version\" =~ ^(0|[1-9][0-9]{0,8})\\.(0|[1-9][0-9]{0,8})\\.(0|[1-9][0-9]{0,8})$ ]] || exit 64\n/usr/bin/printf '%s\\n' \"$version\" \\\n  | /usr/bin/ssh -F /etc/orders-automation/ssh_config worker01 -- \\\n      /usr/local/bin/orders-deploy --version-stdin\nstatus=(\"${PIPESTATUS[@]}\")\n(( status[0] == 0 && status[1] == 0 )) || exit 70",
                             "blurb":  "The deployment version is validated locally and read as data by a fixed remote program instead of being embedded in remote shell text."
                         }
                     ]
};
