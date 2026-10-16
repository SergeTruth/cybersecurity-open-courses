window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Canonicalize a path for display, not later authorization",
      "language": "bash",
      "blurb": "The helper labels canonicalization as diagnostic output and never returns the pathname as proof that a future open is contained.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nshow_candidate_location() {\n  local root=\"${1:?root required}\" candidate=\"${2:?candidate required}\" resolved\n  resolved=\"$(realpath -m -- \"$root/$candidate\")\" || return 65\n  case \"$resolved\" in\n    \"$root\"/*) printf 'candidate currently resolves beneath root: %q\\n' \"$resolved\" ;;\n    *) printf 'candidate currently escapes root\\n' >&2; return 64 ;;\n  esac\n  printf 'note: this result does not authorize a later pathname open\\n' >&2\n}\n\nshow_candidate_location \"$@\"\n"
    },
    {
      "title": "Reject traversal syntax before filesystem access",
      "language": "bash",
      "blurb": "The relative-name contract rejects absolute paths, empty components, dot components, backslashes, and control characters.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nvalidate_relative_name() {\n  local value=\"${1-}\" component\n  [[ -n \"$value\" && \"$value\" != /* && \"$value\" != */ && \"$value\" != *\\\\* && \"$value\" != *$'\\n'* ]] || return 64\n  IFS=/ read -r -a components <<< \"$value\"\n  ((${#components[@]} <= 8)) || return 64\n  for component in \"${components[@]}\"; do\n    [[ \"$component\" =~ ^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$ && \"$component\" != '.' && \"$component\" != '..' ]] || return 64\n  done\n}\n\nvalidate_relative_name \"${1-}\" || { printf 'relative path rejected\\n' >&2; exit 64; }\n"
    }
  ]
};
