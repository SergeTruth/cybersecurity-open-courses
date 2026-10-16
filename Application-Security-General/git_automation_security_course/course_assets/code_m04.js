window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Fetch an approved ref in an isolated Git context",
      "language": "bash",
      "blurb": "A new private bare repository and empty home prevent inherited local, global, and system URL rewrites before one fixed ref is fetched.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\numask 077\n\nreadonly REMOTE='https://github.example.test/platform/orders.git'\nreadonly REFSPEC='+refs/heads/main:refs/remotes/approved/main'\nfetch_root=\"$(mktemp -d -p \"${RUNNER_TEMP:?runner temp required}\" approved-fetch.XXXXXX)\"\ntrap 'rm -rf -- \"$fetch_root\"' EXIT HUP INT TERM\nmkdir -m 700 \"$fetch_root/home\"\nrepo=\"$fetch_root/repository.git\"\ngit_env=(/usr/bin/env -i PATH=/usr/bin:/bin LANG=C HOME=\"$fetch_root/home\" \\\n  GIT_CONFIG_NOSYSTEM=1 GIT_CONFIG_GLOBAL=/dev/null GIT_TERMINAL_PROMPT=0)\n\n\"${git_env[@]}\" /usr/bin/git init --bare --quiet \"$repo\"\n\"${git_env[@]}\" /usr/bin/git -C \"$repo\" \\\n  -c credential.helper= -c core.hooksPath=/dev/null -c protocol.file.allow=never \\\n  fetch --no-tags \"$REMOTE\" \"$REFSPEC\"\n\"${git_env[@]}\" /usr/bin/git -C \"$repo\" rev-parse --verify 'refs/remotes/approved/main^{commit}'\n"
    },
    {
      "title": "Verify tracked, staged, and untracked Git state",
      "language": "bash",
      "blurb": "Every inspection result is checked explicitly, including failures inside command substitution. The existing checkout and configuration are application-owned.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n# Application-owned checkout/configuration; see module 5 for isolated inspection.\nrequire_clean_tree() {\n  local repo=\"${1:?repository required}\" untracked status\n  git -C \"$repo\" -c core.fsmonitor=false update-index -q --refresh || return 65\n  for mode in worktree index; do\n    local args=(diff --quiet --no-ext-diff --no-textconv --ignore-submodules=all)\n    [[ \"$mode\" == index ]] && args+=(--cached)\n    status=0\n    git -C \"$repo\" -c core.fsmonitor=false \"${args[@]}\" -- || status=$?\n    case \"$status\" in 0) ;; 1) return 65 ;; *) return 70 ;; esac\n  done\n  untracked=\"$(git -C \"$repo\" ls-files --others --exclude-standard)\" || return 70\n  [[ -z \"$untracked\" ]] || return 65\n}\nstatus=0\nrequire_clean_tree \"${1:?repository required}\" || status=$?\nif ((status != 0)); then\n  printf 'worktree not clean or Git inspection failed\\n' >&2\n  exit \"$status\"\nfi\n"
    }
  ]
};
