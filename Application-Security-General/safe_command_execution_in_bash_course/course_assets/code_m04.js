window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Select an approved find root",
      "language": "bash",
      "blurb": "A closed alias selects an application-owned absolute root; only fixed predicates and a validated suffix reach find.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n# Deployment owns these directories and their entries.\ncase \"${1-}\" in\n  ready) root='/srv/orders/export/ready' ;;\n  archive) root='/srv/orders/export/archive' ;;\n  *) exit 64 ;;\nesac\nsuffix=\"${2-}\"\n[[ \"$suffix\" =~ ^[a-z0-9]{1,8}$ && -d \"$root\" && ! -L \"$root\" ]] || exit 64\npredicates=(-xdev -type f -name \"*.$suffix\")\n[[ \"${RECENT_ONLY:-false}\" == true ]] && predicates+=(-mtime -1)\nfind \"$root\" \"${predicates[@]}\" -print0\n"
    },
    {
      "title": "Use a fixed printf format",
      "language": "bash",
      "blurb": "Caller percent signs remain data.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nfor value in \"$@\"; do /usr/bin/printf 'value=%s\\n' \"$value\"; done\n"
    }
  ]
};
