window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Create a recovery bundle before remediation",
      "language": "bash",
      "blurb": "A response workflow captures refs and reachable objects in a private bundle with an integrity checksum, without claiming that the checksum is a signature.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\numask 077\n\nrepo=\"${1:?repository required}\"\nincident=\"${2:?incident required}\"\n[[ \"$incident\" =~ ^INC-[0-9]{6}$ ]] || exit 64\nruntime=\"${RUNNER_TEMP:?runner temp required}\"\n[[ -d \"$runtime\" && ! -L \"$runtime\" ]] || exit 77\nbundle_dir=\"$(mktemp -d -p \"$runtime\" \"$incident.recovery.XXXXXX\")\"\nbundle=\"$bundle_dir/recovery.bundle\"\nchecksum=\"$bundle_dir/recovery.bundle.sha256\"\n\ngit -C \"$repo\" fsck --strict --no-dangling\ngit -C \"$repo\" bundle create \"$bundle\" --all\ngit -C \"$repo\" bundle verify \"$bundle\"\nsha256sum -- \"$bundle\" > \"$checksum\"\nprintf 'recovery artifacts: %s\\n' \"$bundle_dir\"\n"
    },
    {
      "title": "Audit a protected-branch movement",
      "language": "bash",
      "blurb": "The monitor compares the previous and current commit, classifies non-fast-forward movement, and logs identifiers rather than credentials or repository contents.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nold=\"${1:?old commit required}\"\nnew=\"${2:?new commit required}\"\n[[ \"$old\" =~ ^[a-f0-9]{40}$ && \"$new\" =~ ^[a-f0-9]{40}$ ]] || exit 64\nstatus=0\ngit merge-base --is-ancestor \"$old\" \"$new\" || status=$?\ncase \"$status\" in\n  0) movement='fast_forward' ;;\n  1) movement='history_rewrite' ;;\n  *) printf 'ancestry check failed\\n' >&2; exit 70 ;;\nesac\nlogger --tag git-monitor -- \"event=protected_ref_update old=$old new=$new movement=$movement\"\n[[ \"$movement\" == fast_forward ]] || exit 77\n"
    }
  ]
};
