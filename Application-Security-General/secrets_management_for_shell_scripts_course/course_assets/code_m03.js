window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Report likely hard-coded secrets",
      "language": "bash",
      "blurb": "A supplemental pre-commit lint scans staged shell files, reports locations, and distinguishes no findings from operational failure. Other secret formats need additional scanning.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n# Course runtime: Linux, Bash 5+, GNU tools; Python helpers require Python 3.12+\n# with current security fixes. Start from a trusted supervisor with a fixed PATH\n# and sanitized environment. Application CLIs under /opt and custom *ctl commands\n# are reviewed deployment adapters; install/configure them before using a snippet.\n\nif findings=\"$(git grep --cached --no-color --no-heading --no-break -n -I -E '^[[:space:]]*(PASSWORD|TOKEN|SECRET|API_KEY)=' -- '*.sh')\"; then\n  printf '%s\\n' \"$findings\" | cut -d: -f1,2 >&2\n  unset -v findings\n  exit 1\nelse\n  status=$?\n  unset -v findings\n  (( status == 1 )) && exit 0\n  exit 70\nfi\n"
    },
    {
      "title": "Require a vault reference",
      "language": "bash",
      "blurb": "Configuration stores a provider identifier.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nr=\"${DATABASE_SECRET_REFERENCE:?}\"; [[ \"$r\" =~ ^vault://production/orders/[a-z0-9-]{3,32}$ ]] || exit 64; printf 'source=%s\\n' \"$r\"\n"
    }
  ]
};
