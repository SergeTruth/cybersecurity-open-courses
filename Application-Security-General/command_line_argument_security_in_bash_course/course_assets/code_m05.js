window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Keep grep options and operands in an array",
      "language": "bash",
      "blurb": "A fixed-string search uses an array for optional flags and terminates option parsing before the caller-selected pattern and file.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\npattern=\"${1:?pattern required}\"\nfile=\"${2:?file required}\"\n[[ ${#pattern} -le 80 && \"$pattern\" != *$'\\n'* ]] || exit 64\n[[ -f \"$file\" ]] || exit 66\n\ngrep_args=(-F -n)\n[[ \"${CASE_INSENSITIVE:-false}\" == true ]] && grep_args+=(-i)\nif grep \"${grep_args[@]}\" -- \"$pattern\" \"$file\"; then\n  :\nelse\n  status=$?\n  (( status == 1 )) || exit 70\nfi\n"
    },
    {
      "title": "Forward an existing argument vector unchanged",
      "language": "bash",
      "blurb": "The wrapper adds one fixed option and expands the caller's array with quoted \"$@\", preserving empty and whitespace-containing values.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nrun_formatter() {\n  (($# > 0)) || return 64\n  /usr/bin/printf 'argument-count=%d\\n' \"$#\" >&2\n  format-records --strict -- \"$@\"\n}\n\nrecords=('north region' '' 'invoice-*' '--literal-name')\nrun_formatter \"${records[@]}\"\n"
    }
  ]
};
