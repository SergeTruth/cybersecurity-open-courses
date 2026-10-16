window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Reject repository aliases and active hooks",
      "language": "bash",
      "blurb": "A supplemental preflight handles Git errors, linked hook entries, and worktree hook paths without mistaking inert sample files for active hooks. Execution still uses the isolated runner.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n# Supplemental preflight, not a sandbox. Use the next isolated runner for Git work.\nrepo=\"${1:?repository required}\"\nstatus=0\ngit -C \"$repo\" config --local --get-regexp '^alias\\.' >/dev/null || status=$?\ncase \"$status\" in 0) printf 'local aliases rejected\\n' >&2; exit 77 ;; 1) ;; *) exit 70 ;; esac\nstatus=0\nhooks=\"$(git -C \"$repo\" config --local --get core.hooksPath)\" || status=$?\ncase \"$status\" in 0) [[ \"$hooks\" == /dev/null ]] || exit 77 ;; 1) ;; *) exit 70 ;; esac\n[[ \"$hooks\" == /dev/null ]] && exit 0\nhooks=\"$(git -C \"$repo\" rev-parse --path-format=absolute --git-path hooks)\" || exit 70\n[[ ! -L \"$hooks\" ]] || exit 77\n# Reject active hook names, including symlinks. Ordinary *.sample files are inert.\nnames=(applypatch-msg pre-applypatch post-applypatch pre-commit pre-merge-commit\n  prepare-commit-msg commit-msg post-commit pre-rebase post-checkout post-merge\n  pre-push pre-receive update proc-receive post-receive post-update\n  reference-transaction push-to-checkout pre-auto-gc post-rewrite sendemail-validate\n  fsmonitor-watchman p4-changelist p4-prepare-changelist p4-post-changelist p4-pre-submit post-index-change)\nfor name in \"${names[@]}\"; do\n  [[ ! -e \"$hooks/$name\" && ! -L \"$hooks/$name\" ]] || exit 77\ndone\n"
    },
    {
      "title": "Run Git with isolated configuration inputs",
      "language": "bash",
      "blurb": "An exact environment excludes inherited Git configuration. Overrides disable filesystem-monitor hooks, ordinary hooks, credential helpers, and submodule inspection.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n# Maintained Git >= 2.36; this is not a sandbox for parsing a corrupt repository.\nrepo=\"${1:?repository required}\"\nempty_home=\"$(mktemp -d)\"\ntrap 'rmdir -- \"$empty_home\"' EXIT\ntrap 'exit 130' INT\ntrap 'exit 143' TERM HUP\n/usr/bin/env -i PATH=/usr/bin:/bin LANG=C HOME=\"$empty_home\" \\\n  GIT_CONFIG_NOSYSTEM=1 GIT_CONFIG_GLOBAL=/dev/null GIT_TERMINAL_PROMPT=0 \\\n  /usr/bin/git -C \"$repo\" -c credential.helper= -c core.hooksPath=/dev/null \\\n    -c core.fsmonitor=false -c core.untrackedCache=false -c protocol.file.allow=never \\\n    status --porcelain=v2 --branch --ignore-submodules=all\n"
    }
  ]
};
