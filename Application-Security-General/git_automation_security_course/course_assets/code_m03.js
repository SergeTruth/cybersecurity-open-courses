window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Pin an SSH identity and known-hosts file",
      "language": "bash",
      "blurb": "A trusted bootstrap with isolated Git configuration pins the SSH identity, disables SSH configuration files, and requires strict verification against a deployment-owned known-hosts file.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n# Course runtime: Linux, Bash 5+, GNU tools; Python helpers require Python 3.12+\n# with current security fixes. Start from a trusted supervisor with a fixed PATH\n# and sanitized environment. Application CLIs under /opt and custom *ctl commands\n# are reviewed deployment adapters; install/configure them before using a snippet.\n\n# Run inside the isolated Git environment from module 4; never inherit URL rewrites.\nreadonly REMOTE='ssh://git@github.example.test/platform/orders.git'\nreadonly KEY='/run/credentials/git-deploy-key'\nreadonly HOSTS='/etc/git-automation/known_hosts'\n[[ -f \"$KEY\" && -f \"$HOSTS\" && ! -L \"$KEY\" ]] || exit 77\n\nexport GIT_SSH_COMMAND=\"ssh -F /dev/null -oBatchMode=yes -oIdentitiesOnly=yes -oStrictHostKeyChecking=yes -oUserKnownHostsFile=$HOSTS -i $KEY\"\ngit -c credential.helper= -c core.hooksPath=/dev/null \\\n  clone --filter=blob:none --no-checkout \"$REMOTE\" orders\nunset GIT_SSH_COMMAND\n"
    },
    {
      "title": "Supply an HTTPS token through a private askpass helper",
      "language": "bash",
      "blurb": "The token stays out of Git arguments; a private askpass program reads an inherited descriptor and responds only to the password prompt.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\numask 077\n# Trusted bootstrap: use module 4's empty HOME/configuration and private working directory.\n# The token descriptor and approved origin are application-owned, never request inputs.\n\nhelper=\"$(mktemp -p \"${RUNNER_TEMP:?}\" git-askpass.XXXXXX)\"\ntrap 'rm -f -- \"$helper\"' EXIT\ncat > \"$helper\" <<'SH'\n#!/usr/bin/env bash\ncase \"$1\" in\n  \"Username for 'https://github.example.test':\"*) printf '%s\\n' 'oauth2' ;;\n  \"Password for 'https://oauth2@github.example.test':\"*) cat \"/proc/$$/fd/${GIT_TOKEN_FD:?}\" ;;\n  *) exit 1 ;;\nesac\nSH\nchmod 700 \"$helper\"\nGIT_ASKPASS=\"$helper\" GIT_TERMINAL_PROMPT=0 LC_ALL=C git -c credential.helper= -c http.followRedirects=false ls-remote \\\n  'https://github.example.test/platform/orders.git' refs/heads/main >/dev/null\n"
    }
  ]
};
