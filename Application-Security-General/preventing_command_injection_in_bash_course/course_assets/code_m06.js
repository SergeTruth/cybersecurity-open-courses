window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Authorize a destination alias",
      "language": "bash",
      "blurb": "An allowlist maps public names to fixed hosts.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\ncase \"${1-}\" in east) host=backup-east.example.test;; west) host=backup-west.example.test;; *) exit 64;; esac\nssh -oBatchMode=yes -oStrictHostKeyChecking=yes -- \"backup@$host\" /usr/local/bin/receive-orders\n"
    },
    {
      "title": "Bound a numeric worker count",
      "language": "bash",
      "blurb": "Canonical decimal syntax and an operational range precede execution.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nn=\"${1-}\"; [[ \"$n\" =~ ^([1-9]|1[0-6])$ ]] || exit 64\n/opt/orders/bin/reindex --workers \"$n\"\n"
    }
  ]
};
