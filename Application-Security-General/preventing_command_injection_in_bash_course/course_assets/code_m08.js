window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Remove inherited shell behavior",
      "language": "bash",
      "blurb": "A clean environment excludes exported functions and startup files.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nenv -i PATH=/usr/bin:/bin LANG=C HOME=/nonexistent /bin/bash --noprofile --norc /opt/orders/bin/verify-release.sh \"${1:?release required}\"\n"
    },
    {
      "title": "Test metacharacters as inert data",
      "language": "bash",
      "blurb": "A fake child captures argv for an injection regression.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nf=\"$(mktemp)\"; trap 'rm -f -- \"$f\"' EXIT; fake(){ printf '%s\\0' \"$@\" > \"$f\"; }\nx='; touch /tmp/pwn'; fake --label \"$x\"; mapfile -d '' -t got < \"$f\"; [[ ${#got[@]} -eq 2 && \"${got[1]}\" == \"$x\" ]]\n"
    }
  ]
};
