window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Reject API-key literals before a commit",
      "language": "bash",
      "blurb": "This supplemental pre-commit lint scans the staged index, distinguishes findings from operational failure, and prints locations rather than secret values. It is not proof of secret absence.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n# Course runtime: Linux, Bash 5+, GNU tools; Python helpers require Python 3.12+\n# with current security fixes. Start from a trusted supervisor with a fixed PATH\n# and sanitized environment. Application CLIs under /opt and custom *ctl commands\n# are reviewed deployment adapters; install/configure them before using a snippet.\n\nscan_api_key_literals() {\n  local repository=\"${1:?repository required}\"\n  local -a status\n\n  git -C \"$repository\" grep --cached --no-color --no-heading --no-break -n -I -i -E \\\n    '(^|[^A-Za-z])(api[_-]?key|authorization)[[:space:]]*[:=][[:space:]]*\"[A-Za-z0-9_./+=-]{20,}' \\\n    -- ':!tools/scan-api-keys.sh' \\\n    | cut -d: -f1,2\n  status=(\"${PIPESTATUS[@]}\")\n\n  (( status[1] == 0 )) || return 70\n  case \"${status[0]}\" in\n    0|1) return \"${status[0]}\" ;;\n    *) return \"${status[0]}\" ;;\n  esac\n}\n\nscan_status=0\nfindings=\"$(scan_api_key_literals \"${1:-.}\")\" || scan_status=$?\ncase \"$scan_status\" in\n  0)\n    [[ -n \"$findings\" ]] || { printf 'scanner returned no findings with match status\\n' >&2; exit 70; }\n    printf 'possible API-key literals at:\\n%s\\n' \"$findings\" >&2\n    exit 1\n    ;;\n  1)\n    [[ -z \"$findings\" ]] || { printf 'scanner returned output with clean status\\n' >&2; exit 70; }\n    ;;\n  *)\n    printf 'API-key scan failed with status %s\\n' \"$scan_status\" >&2\n    exit 70\n    ;;\nesac\n"
    },
    {
      "title": "Store a secret reference instead of secret text",
      "language": "bash",
      "blurb": "Configuration accepts a provider path with a closed grammar; runtime code resolves that reference through the deployment's credential provider.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nvalidate_secret_reference() {\n  local reference=\"${1-}\"\n  [[ \"$reference\" =~ ^services/[a-z0-9-]{2,32}/keys/[a-z0-9-]{2,24}$ ]] || {\n    printf 'invalid secret reference\\n' >&2\n    return 64\n  }\n}\n\nreference=\"${API_KEY_REFERENCE:?API_KEY_REFERENCE required}\"\nvalidate_secret_reference \"$reference\"\nprintf 'configured secret reference: %s\\n' \"$reference\"\n"
    }
  ]
};
