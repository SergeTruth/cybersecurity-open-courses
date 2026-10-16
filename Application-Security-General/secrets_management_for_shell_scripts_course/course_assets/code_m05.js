window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Launch with an exact non-secret environment",
      "language": "bash",
      "blurb": "The launcher constructs the protected child's complete environment with env -i instead of trying to audit Bash-managed variables in its own environment.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\ninput=\"${1:?report path required}\"\n[[ \"$input\" =~ ^/srv/orders/reports/[A-Za-z0-9._-]{1,64}\\.json$ ]] || exit 64\n\nexec env -i \\\n  PATH='/usr/bin:/bin' \\\n  LANG=C \\\n  HOME=/nonexistent \\\n  TZ=UTC \\\n  /opt/orders/bin/render-report --input \"$input\"\n"
    },
    {
      "title": "Clear environment around an fd consumer",
      "language": "bash",
      "blurb": "Only a fixed PATH and fd number reach the child.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nf=\"${SECRET_FD:?}\"; [[ \"$f\" =~ ^[0-9]+$ && -e /proc/$$/fd/$f ]] || exit 64\nenv -i PATH=/usr/bin:/bin LANG=C SECRET_FD=\"$f\" /opt/orders/bin/consumer --secret-fd \"$f\"\n"
    }
  ]
};
