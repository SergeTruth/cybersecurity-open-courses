window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Provide a minimal child environment",
      "language": "bash",
      "blurb": "The child receives fixed locale, timezone, home, and PATH.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nenv -i PATH=/usr/bin:/bin LANG=C TZ=UTC HOME=/nonexistent /opt/orders/bin/daily-summary --date \"${1:?date}\"\n"
    },
    {
      "title": "Sanitize the environment before interpreter startup",
      "language": "bash",
      "blurb": "A trusted launcher constructs the environment before Bash starts. This recipe cannot repair an already-compromised invoking process.",
      "code": "# Launch recipe: issue from a TRUSTED supervisor or clean administrator shell.\n# Not an in-script guard: BASH_ENV and loader variables act before script startup.\n/usr/bin/env -i PATH=/usr/bin:/bin LANG=C HOME=/nonexistent \\\n  /bin/bash --noprofile --norc /opt/orders/bin/verify-runtime.sh\n"
    }
  ]
};
