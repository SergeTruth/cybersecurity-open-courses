window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro": "These examples apply 'Key Generation, Storage, and File Permissions' to distinct, reviewable Bash workflows. Runtime: GNU/Linux, Bash 5+, GNU command-line tools, and Python 3.11+ where shown. Install the demonstrated clients separately; fixed /etc and /opt policies and application-specific consumers are deployment-owned prerequisites. These are administrator/service scripts, not unauthenticated web endpoints.",
    "codeExamples":  [
                         {
                             "title":  "Generate a passphrase-protected Ed25519 key interactively",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\numask 077\n\n[[ -t 0 \u0026\u0026 -t 1 ]] || { printf \u0027interactive terminal required for protected key generation\\n\u0027 \u003e\u00262; exit 64; }\nroot=\u0027/var/lib/orders-automation/keys\u0027\n[[ -d \"$root\" \u0026\u0026 ! -L \"$root\" ]] || exit 77\nread -r owner mode kind \u003c\u003c\u003c\"$(/usr/bin/stat -Lc \u0027%u %a %F\u0027 \"$root\")\"\n[[ \"$owner\" == \"$(/usr/bin/id -u)\" \u0026\u0026 \"$mode\" == 700 \u0026\u0026 \"$kind\" == directory ]] || exit 77\n\nkey_dir=\"$(/usr/bin/mktemp -d -p \"$root\" generation.XXXXXX)\"\ncleanup=1\ncleanup_key_dir() {\n  (( cleanup == 0 )) \u0026\u0026 return\n  [[ \"$key_dir\" == \"$root/generation.\"* ]] \u0026\u0026 /usr/bin/rm -rf -- \"$key_dir\"\n}\ntrap cleanup_key_dir EXIT\n\n/usr/bin/ssh-keygen -q -t ed25519 -a 100 \\\n  -C \u0027orders-deploy@production\u0027 -f \"$key_dir/id_ed25519\"\nif /usr/bin/ssh-keygen -y -P \u0027\u0027 -f \"$key_dir/id_ed25519\" \u003e/dev/null 2\u003e\u00261; then\n  printf \u0027a nonempty passphrase is required\\n\u0027 \u003e\u00262\n  exit 77\nfi\n/usr/bin/chmod 600 \"$key_dir/id_ed25519\"\n/usr/bin/chmod 644 \"$key_dir/id_ed25519.pub\"\ncleanup=0\nprintf \u0027protected_key_directory=%s\\n\u0027 \"$key_dir\"",
                             "blurb":  "The workflow requires a terminal, applies deliberate KDF rounds, and rejects and removes a key if the operator supplies an empty passphrase."
                         },
                         {
                             "title":  "Audit key ownership, mode, and fingerprint",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nprivate=\"${1:?private key required}\"; public=\"$private.pub\"\nread -r owner mode kind \u003c\u003c\u003c\"$(stat -Lc \u0027%u %a %F\u0027 \"$private\")\"\n[[ \"$owner\" == \"$(id -u)\" \u0026\u0026 \"$mode\" == 600 \u0026\u0026 \"$kind\" == \u0027regular file\u0027 ]] || exit 77\nfingerprint=\"$(/usr/bin/ssh-keygen -lf \"$public\" -E sha256 | /usr/bin/awk \u0027{print $2}\u0027)\"\n[[ \"$fingerprint\" =~ ^SHA256:[A-Za-z0-9+/]{43}$ ]] || exit 65\nprintf \u0027public_fingerprint=%s\\n\u0027 \"$fingerprint\"",
                             "blurb":  "Private-key metadata and the corresponding public fingerprint are checked without printing private material."
                         }
                     ]
};
