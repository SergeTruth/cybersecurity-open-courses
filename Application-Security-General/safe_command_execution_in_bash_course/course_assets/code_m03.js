window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Map report modes to wc",
      "language": "bash",
      "blurb": "A real utility receives one fixed option and a validated file.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n# Course runtime: Linux, Bash 5+, GNU tools; Python helpers require Python 3.12+\n# with current security fixes. Start from a trusted supervisor with a fixed PATH\n# and sanitized environment. Application CLIs under /opt and custom *ctl commands\n# are reviewed deployment adapters; install/configure them before using a snippet.\n[[ -f \"${2-}\" && ! -L \"${2-}\" ]] || exit 66\ncase \"${1-}\" in bytes) o=-c;; lines) o=-l;; words) o=-w;; *) exit 64;; esac\nexec /usr/bin/wc \"$o\" -- \"$2\"\n"
    },
    {
      "title": "Select a fixed Git inspection",
      "language": "bash",
      "blurb": "The view selects known subcommands with executable Git features disabled. Use a trusted bootstrap and maintained Git; this is not a sandbox for corrupt repositories.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n# Trusted bootstrap clears ambient Git configuration, as shown in the Git course.\nr=\"${2:-.}\"; [[ -d \"$r/.git\" ]] || exit 66\ng=(git -C \"$r\" -c core.fsmonitor=false -c core.untrackedCache=false\n  -c core.hooksPath=/dev/null -c log.showSignature=false)\ncase \"${1-}\" in\n  status) \"${g[@]}\" status --short --branch --ignore-submodules=all ;;\n  head) \"${g[@]}\" show -s --format='%H %s' HEAD ;;\n  *) exit 64 ;;\nesac\n"
    }
  ]
};
