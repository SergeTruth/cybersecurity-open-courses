window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Require an explicit report format and input file",
      "language": "bash",
      "blurb": "A long-option parser rejects unknown flags, missing values, extra operands, and unsafe defaults before work begins.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n# Course runtime: Linux, Bash 5+, GNU tools; Python helpers require Python 3.12+\n# with current security fixes. Start from a trusted supervisor with a fixed PATH\n# and sanitized environment. Application CLIs under /opt and custom *ctl commands\n# are reviewed deployment adapters; install/configure them before using a snippet.\n\nformat=''\nwhile (($#)); do\n  case \"$1\" in\n    --format) format=\"${2:?--format requires a value}\"; shift 2 ;;\n    --help) printf 'usage: report --format json|text -- INPUT\\n'; exit 0 ;;\n    --) shift; break ;;\n    -*) printf 'unknown option: %s\\n' \"$1\" >&2; exit 64 ;;\n    *) break ;;\n  esac\ndone\n[[ \"$format\" =~ ^(json|text)$ && $# -eq 1 ]] || exit 64\ninput=\"$1\"\n[[ -f \"$input\" && ! -L \"$input\" ]] || exit 66\n"
    },
    {
      "title": "Return a stable usage error",
      "language": "bash",
      "blurb": "The helper separates user-facing usage from diagnostics and returns EX_USAGE without silently choosing a target.",
      "code": "#!/usr/bin/env bash\nset -u\n\nusage() {\n  printf 'usage: %s --profile NAME -- JOB_ID\\n' \"${0##*/}\" >&2\n  return 64\n}\n\nprofile=''\n[[ \"${1-}\" == '--profile' ]] || { usage; exit $?; }\nprofile=\"${2-}\"\n[[ \"$profile\" =~ ^[a-z][a-z0-9-]{2,20}$ ]] || { usage; exit $?; }\nshift 2\n[[ \"${1-}\" == '--' && \"${2-}\" =~ ^job-[0-9]{6}$ && $# -eq 2 ]] || { usage; exit $?; }\n"
    }
  ]
};
