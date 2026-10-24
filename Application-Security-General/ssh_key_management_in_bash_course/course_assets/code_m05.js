window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Authorized Keys, Account Scope, and Restrictions\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Create a restricted authorized_keys entry",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\npublic=\"${1:?public key file required}\"\nmapfile -t key_lines \u003c\"$public\"\n[[ \"${#key_lines[@]}\" == 1 ]] || exit 65\nread -r type material comment \u003c\u003c\u003c\"${key_lines[0]}\"\n[[ \"$type\" == \u0027ssh-ed25519\u0027 \u0026\u0026 \"$material\" =~ ^[A-Za-z0-9+/]+={0,2}$ ]] || exit 65\n/usr/bin/ssh-keygen -lf \"$public\" -E sha256 \u003e/dev/null || exit 65\nprintf \u0027restrict,command=\"/usr/local/bin/orders-deploy-receiver\" %s %s %s\\n\u0027 \\\n  \"$type\" \"$material\" \u0027orders-deploy@production\u0027",
                             "blurb":  "The public key grammar is validated and fixed restrictions bind it to one noninteractive command without port, agent, X11, or PTY access."
                         },
                         {
                             "title":  "Reject duplicate authorized key fingerprints",
                             "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nauthorized=\"${1:?authorized_keys required}\"\ntemporary=\"$(mktemp)\"; trap 'rm -f -- \"$temporary\"' EXIT\nnon_key='^[[:space:]]*(#|$)'\nwhile IFS= read -r line || [[ -n \"$line\" ]]; do\n  [[ \"$line\" =~ $non_key ]] && continue\n  printf '%s\\n' \"$line\" | /usr/bin/ssh-keygen -lf - -E sha256 | /usr/bin/awk '{print $2}'\ndone <\"$authorized\" | /usr/bin/sort >\"$temporary\"\nduplicates=\"$(/usr/bin/uniq -d \"$temporary\")\"\n[[ -z \"$duplicates\" ]] || { printf 'duplicate authorized key\\n' >&2; exit 65; }",
                             "blurb":  "The audit ignores comments, fingerprints each actual key line, and fails when the same trust relationship appears more than once."
                         }
                     ]
};
