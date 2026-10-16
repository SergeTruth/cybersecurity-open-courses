window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Inspect the real argument vector",
      "language": "bash",
      "blurb": "A probe prints quoted arguments without executing runtime text.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n# Course runtime: Linux, Bash 5+, GNU tools; Python helpers require Python 3.12+\n# with current security fixes. Start from a trusted supervisor with a fixed PATH\n# and sanitized environment. Application CLIs under /opt and custom *ctl commands\n# are reviewed deployment adapters; install/configure them before using a snippet.\nshow_argv(){ local i=0 v; for v in \"$@\"; do printf 'argv[%d]=%q\\n' \"$i\" \"$v\"; ((i+=1)); done; }\nlabel='$(touch /tmp/injected); *.conf'; show_argv /usr/bin/printf '%s\\n' \"$label\"\n"
    },
    {
      "title": "Search for a literal caller value",
      "language": "bash",
      "blurb": "Fixed grep options and -- keep metacharacters in one operand.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\np=\"${1:?pattern required}\"; f=\"${2:?file required}\"; [[ ${#p} -le 100 && -f \"$f\" ]] || exit 64\ngrep -F -n -- \"$p\" \"$f\" || { s=$?; ((s==1)) || exit \"$s\"; }\n"
    }
  ]
};
