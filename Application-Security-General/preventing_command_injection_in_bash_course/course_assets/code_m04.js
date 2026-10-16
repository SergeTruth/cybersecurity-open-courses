window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Replace eval with a function map",
      "language": "bash",
      "blurb": "An associative lookup chooses code-owned behavior.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\ndeclare -Ar ACTION=([health]=check_health [version]=show_version)\ncheck_health(){ systemctl is-active --quiet orders.service; }; show_version(){ /opt/orders/bin/server --version; }\nfn=\"${ACTION[${1-}]-}\"; [[ -n \"$fn\" ]] || exit 64; \"$fn\"\n"
    },
    {
      "title": "Use find -exec directly",
      "language": "bash",
      "blurb": "Selected files reach sha256sum without xargs or sh -c.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nfind /srv/uploads/accepted -xdev -type f -size -5M -exec /usr/bin/sha256sum -- '{}' +\n"
    }
  ]
};
