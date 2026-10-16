window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Authorize a deployed service",
      "language": "bash",
      "blurb": "Syntax and a closed mapping precede systemctl.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\ncase \"${1-}\" in orders) u=orders.service;; billing) u=billing.service;; *) exit 64;; esac\nsystemctl show -p ActiveState --value \"$u\"\n"
    },
    {
      "title": "Require canonical bounded decimal input",
      "language": "bash",
      "blurb": "Signs and alternate bases are rejected.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nn=\"${1-}\"; [[ \"$n\" =~ ^[1-9][0-9]{0,2}$ ]] && ((n<=250)) || exit 64\n/opt/orders/bin/export --limit \"$n\"\n"
    }
  ]
};
