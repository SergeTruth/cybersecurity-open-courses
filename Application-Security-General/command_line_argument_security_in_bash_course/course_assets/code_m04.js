window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Parse short options with bounded values",
      "language": "bash",
      "blurb": "getopts handles syntax while explicit checks constrain the retry count and verbosity flag.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nretries=3\nverbose=false\nwhile getopts ':n:v' option; do\n  case \"$option\" in\n    n) retries=\"$OPTARG\" ;;\n    v) verbose=true ;;\n    :) printf 'option -%s needs a value\\n' \"$OPTARG\" >&2; exit 64 ;;\n    \\?) printf 'unsupported option: -%s\\n' \"$OPTARG\" >&2; exit 64 ;;\n  esac\ndone\nshift \"$((OPTIND - 1))\"\n[[ \"$retries\" =~ ^[1-8]$ ]] || exit 64\n[[ $# -eq 1 ]] || exit 64\n"
    },
    {
      "title": "Reject conflicting output flags",
      "language": "bash",
      "blurb": "The parser treats mutually exclusive switches as a combination error instead of letting option order decide behavior.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\njson=false\ntable=false\nwhile (($#)); do\n  case \"$1\" in\n    --json) json=true ;;\n    --table) table=true ;;\n    --) shift; break ;;\n    *) printf 'unsupported argument: %s\\n' \"$1\" >&2; exit 64 ;;\n  esac\n  shift\ndone\nif [[ \"$json\" == true && \"$table\" == true ]]; then\n  printf -- '--json and --table conflict\\n' >&2\n  exit 64\nfi\n[[ $# -eq 1 ]] || exit 64\n"
    }
  ]
};
