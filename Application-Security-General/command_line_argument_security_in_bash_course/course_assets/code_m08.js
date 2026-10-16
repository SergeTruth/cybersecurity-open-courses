window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Detect and reject sensitive command-line options",
      "language": "bash",
      "blurb": "A preflight scans option names, not values, and blocks credential-bearing arguments before logging or child-process creation.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nreject_sensitive_argv() {\n  local argument\n  for argument in \"$@\"; do\n    case \"$argument\" in\n      --password|--password=*|--token|--token=*|--api-key|--api-key=*) return 64 ;;\n    esac\n  done\n}\n\nreject_sensitive_argv \"$@\" || {\n  printf 'credential options are not accepted; use the credential provider\\n' >&2\n  exit 64\n}\n"
    },
    {
      "title": "Log option names while redacting selected values",
      "language": "bash",
      "blurb": "The audit formatter recognizes sensitive switches and records a marker instead of the following value.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nredact_argv() {\n  local redact_next=false argument\n  for argument in \"$@\"; do\n    if [[ \"$redact_next\" == true ]]; then\n      printf '%q ' '[REDACTED]'; redact_next=false; continue\n    fi\n    case \"$argument\" in\n      --credential-file|--identity-file) printf '%q ' \"$argument\"; redact_next=true ;;\n      --credential-file=*|--identity-file=*) printf '%q ' \"${argument%%=*}=[REDACTED]\" ;;\n      *) printf '%q ' \"$argument\" ;;\n    esac\n  done\n  printf '\\n'\n}\n\nredact_argv \"$@\" >&2\n"
    }
  ]
};
