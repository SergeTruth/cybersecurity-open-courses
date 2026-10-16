window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Install a service file with explicit ownership and mode",
      "language": "bash",
      "blurb": "install creates the destination with the intended owner, group, and permissions rather than inheriting ambient umask and directory defaults.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n# Course runtime: Linux, Bash 5+, GNU tools; Python helpers require Python 3.12+\n# with current security fixes. Start from a trusted supervisor with a fixed PATH\n# and sanitized environment. Application CLIs under /opt and custom *ctl commands\n# are reviewed deployment adapters; install/configure them before using a snippet.\n\nsource_file=\"${1:?source required}\"\n[[ -f \"$source_file\" && ! -L \"$source_file\" ]] || exit 66\ninstall --owner=orders --group=orders --mode=0640 \\\n  --no-target-directory -- \"$source_file\" /etc/orders/config.yaml\nactual=\"$(stat -Lc '%U:%G %a %F' /etc/orders/config.yaml)\"\n[[ \"$actual\" == 'orders:orders 640 regular file' ]] || exit 77\n"
    },
    {
      "title": "Audit supplementary groups for a service account",
      "language": "bash",
      "blurb": "The check compares effective memberships with a closed set and fails if an unexpected privileged group appears.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\ngroup_text=\"$(id -nG orders | tr ' ' '\\n' | LC_ALL=C sort -u)\" || exit 70\nmapfile -t groups <<< \"$group_text\"\nexpected=(orders telemetry)\nif [[ \"${groups[*]}\" != \"${expected[*]}\" ]]; then\n  printf 'unexpected orders group membership: %s\\n' \"${groups[*]}\" >&2\n  exit 77\nfi\n"
    }
  ]
};
