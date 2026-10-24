window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Bash Invocation, Agents, and Runtime Use\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Validate the SSH agent socket before adding a key",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nsocket=\"${SSH_AUTH_SOCK:?agent socket required}\"\nread -r owner kind \u003c\u003c\u003c\"$(stat -Lc \u0027%u %F\u0027 \"$socket\")\"\n[[ \"$owner\" == \"$(id -u)\" \u0026\u0026 \"$kind\" == \u0027socket\u0027 ]] || exit 77\n/usr/bin/ssh-add -t 900 -- \"${1:?private key required}\"",
                             "blurb":  "The socket must belong to the current user and be a real socket; ssh-add limits the key lifetime for this automation session."
                         },
                         {
                             "title":  "Confirm only the expected key is loaded in the agent",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nexpected=\"${1:?expected fingerprint required}\"\n[[ \"$expected\" =~ ^SHA256:[A-Za-z0-9+/]{43}$ ]] || exit 64\nmapfile -t loaded \u003c \u003c(/usr/bin/ssh-add -l -E sha256 | /usr/bin/awk \u0027{print $2}\u0027)\n(( ${#loaded[@]} == 1 )) || exit 77\n[[ \"${loaded[0]}\" == \"$expected\" ]] || exit 77",
                             "blurb":  "Agent public fingerprints are compared with one reviewed fingerprint; extra or missing identities fail the gate."
                         }
                     ]
};
