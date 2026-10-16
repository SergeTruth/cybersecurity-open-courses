window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Treat a caller filename as a basename",
      "language": "bash",
      "blurb": "The contract rejects separators and option-like names, then uses a fixed directory and -- before the operand.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nbasename=\"${1:?filename required}\"\n[[ \"$basename\" =~ ^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$ ]] || exit 64\n[[ \"$basename\" != -* && \"$basename\" != *'..'* ]] || exit 64\n\ninput=\"/srv/reports/incoming/$basename\"\n[[ -f \"$input\" && ! -L \"$input\" ]] || exit 66\nwc -c -- \"$input\"\n"
    },
    {
      "title": "Consume find output with NUL delimiters",
      "language": "bash",
      "blurb": "Enumeration must finish successfully before hashing. NUL framing preserves filenames, and the file-count limit is checked before processing each entry.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\numask 077\n# Application-owned tree; this does not protect against hostile pathname mutation.\nreadonly ROOT='/srv/reports/ready'\nlist=\"$(mktemp)\"\ntrap 'rm -f -- \"$list\"' EXIT\ntrap 'exit 130' INT\ntrap 'exit 143' TERM HUP\nfind \"$ROOT\" -xdev -type f -print0 > \"$list\" || exit 70\ncount=0\nwhile IFS= read -r -d '' path; do\n  ((count += 1))\n  ((count <= 500)) || { printf 'file count limit exceeded\\n' >&2; exit 65; }\n  [[ \"$path\" == \"$ROOT/\"* && -f \"$path\" && ! -L \"$path\" ]] || exit 65\n  sha256sum -- \"$path\"\ndone < \"$list\"\n"
    }
  ]
};
