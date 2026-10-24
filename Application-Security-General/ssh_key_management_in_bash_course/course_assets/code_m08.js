window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Rotation, Revocation, Incident Response, and Monitoring\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Revoke a fingerprint from every managed account",
                             "code": "#!/usr/bin/env bash\nset -euo pipefail\numask 077\n# Managed root, directories, and files are administrator-owned; this is not a\n# parser for an attacker-writable home directory. Writers share the same lock.\nrevoked=\"$1\"\n[[ \"$revoked\" =~ ^SHA256:[A-Za-z0-9+/]{43}$ ]] || exit 64\nexec {revocation_lock}>/srv/ssh-accounts/.revocation.lock\n/usr/bin/flock --nonblock \"$revocation_lock\" || exit 75\ntemporary=''\ntrap '[[ -z \"$temporary\" ]] || rm -f -- \"$temporary\"' EXIT\nnon_key='^[[:space:]]*(#|$)'\nfor file in /srv/ssh-accounts/*/authorized_keys; do\n  [[ -f \"$file\" && ! -L \"$file\" ]] || continue\n  temporary=\"$(mktemp -p \"$(dirname -- \"$file\")\" .authorized_keys.XXXXXX)\"\n  while IFS= read -r line || [[ -n \"$line\" ]]; do\n    if [[ \"$line\" =~ $non_key ]]; then\n      printf '%s\\n' \"$line\" >>\"$temporary\"\n      continue\n    fi\n    fingerprint=\"$(printf '%s\\n' \"$line\" |\n      /usr/bin/ssh-keygen -lf - -E sha256 2>/dev/null |\n      /usr/bin/awk '{print $2}')\" || {\n        printf 'invalid managed authorized_keys entry; revocation incomplete\\n' >&2\n        exit 65\n      }\n    [[ \"$fingerprint\" =~ ^SHA256:[A-Za-z0-9+/]{43}$ ]] || exit 65\n    [[ \"$fingerprint\" == \"$revoked\" ]] || printf '%s\\n' \"$line\" >>\"$temporary\"\n  done <\"$file\"\n  chmod --reference=\"$file\" \"$temporary\"\n  chown --reference=\"$file\" \"$temporary\"\n  /usr/bin/mv -T -- \"$temporary\" \"$file\"\n  temporary=''\ndone",
                             "blurb": "Comments, blank lines, and final lines without a newline are handled deliberately. Invalid key records fail visibly, replacements are private, and cooperating writers use one lock; failures clean up temporary files."
                         },
                         {
                             "title":  "Remove a compromised identity from the agent and audit the event",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\npublic=\"${1:?public key required}\"; incident=\"${2:?incident required}\"\n[[ \"$incident\" =~ ^INC-[0-9]{6}$ ]] || exit 64\nfingerprint=\"$(/usr/bin/ssh-keygen -lf \"$public\" -E sha256 | /usr/bin/awk \u0027{print $2}\u0027)\"\n/usr/bin/ssh-add -d -- \"$public\"\n/usr/bin/logger --tag ssh-key-response -- \"event=key_revoked incident=$incident fingerprint=$fingerprint\"",
                             "blurb":  "The public key selects the agent identity for removal; the log records only its public fingerprint and incident identifier."
                         }
                     ]
};
