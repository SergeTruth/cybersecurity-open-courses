window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Refuse API keys supplied as command-line options",
      "language": "bash",
      "blurb": "Credential options are rejected without echoing values; duplicates and extra operands fail. Only the approved endpoint and inherited descriptor reach the worker.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nendpoint=''\nwhile (($#)); do\n  case \"$1\" in\n    --api-key|--api-key=*|--token|--token=*|--password|--password=*)\n      printf 'credentials are not accepted in argv\\n' >&2; exit 64 ;;\n    --endpoint) [[ -z \"$endpoint\" && $# -ge 2 ]] || exit 64; endpoint=\"$2\"; shift 2 ;;\n    --) shift; break ;;\n    *) printf 'unsupported argument\\n' >&2; exit 64 ;;\n  esac\ndone\n[[ $# -eq 0 && \"$endpoint\" == payments && \"${API_KEY_FD-}\" =~ ^[0-9]{1,5}$ ]] || exit 64\n/usr/bin/env -i PATH=/usr/bin:/bin LANG=C API_KEY_FD=\"$API_KEY_FD\" \\\n  /opt/payments/bin/payment-worker --endpoint \"$endpoint\" --token-fd \"$API_KEY_FD\"\n"
    },
    {
      "title": "Launch a key consumer with a minimal environment",
      "language": "bash",
      "blurb": "Only locale, a fixed PATH, and the inherited credential descriptor reach the child; ambient proxy and debugging variables are removed.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nrun_isolated_consumer() {\n  local fd=\"${1:?credential fd required}\"\n  [[ \"$fd\" =~ ^[0-9]+$ && -e \"/proc/$$/fd/$fd\" ]] || return 64\n  /usr/bin/env -i \\\n    PATH='/usr/bin:/bin' \\\n    LANG='C.UTF-8' \\\n    API_KEY_FD=\"$fd\" \\\n    /opt/payments/bin/key-consumer --read-fd \"$fd\"\n}\n\nrun_isolated_consumer \"${API_KEY_FD:?API_KEY_FD required}\"\n"
    }
  ]
};
