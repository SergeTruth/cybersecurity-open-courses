window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Terminate gzip options before the file",
      "language": "bash",
      "blurb": "A validated path remains one operand.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nf=\"${1-}\"; [[ \"$f\" =~ ^/srv/archive/[A-Za-z0-9._-]{1,64}$ && -f \"$f\" ]] || exit 64; gzip --keep -- \"$f\"\n"
    },
    {
      "title": "Assemble process flags in an array",
      "language": "bash",
      "blurb": "A boolean adds one fixed flag.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\na=(--format json --limit 100); [[ \"${INCLUDE_ARCHIVED:-false}\" == true ]] && a+=(--include-archived)\n/opt/orders/bin/list-orders \"${a[@]}\" -- \"${1:?tenant}\"\n"
    }
  ]
};
