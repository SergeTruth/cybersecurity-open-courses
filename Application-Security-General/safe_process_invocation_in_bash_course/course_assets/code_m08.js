window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Invoke a parser with no new privileges",
      "language": "bash",
      "blurb": "The child drops groups before opening untrusted data.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n[[ -f \"${1-}\" ]] || exit 66\nexec setpriv --reuid=orders --regid=orders --clear-groups --no-new-privs /opt/orders/bin/parser -- \"$1\"\n"
    },
    {
      "title": "Verify the rsync version contract",
      "language": "bash",
      "blurb": "Unsupported option semantics fail closed.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nv=\"$(rsync --version|awk 'NR==1{print $3}')\"; [[ \"$v\" =~ ^3\\.[2-9]\\.[0-9]+$ ]] || exit 78\n"
    }
  ]
};
