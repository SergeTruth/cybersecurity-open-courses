window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Handle timeout status explicitly",
      "language": "bash",
      "blurb": "Expiry is distinct from child failure.",
      "code": "#!/usr/bin/env bash\nset -u\ntimeout -k 2s 15s /opt/orders/bin/reconcile --once; s=$?\ncase \"$s\" in 0);; 124|137) printf 'timed out\\n' >&2; exit 70;; *) exit \"$s\";; esac\n"
    },
    {
      "title": "Terminate and reap one child",
      "language": "bash",
      "blurb": "Signal handlers terminate and reap the one direct child before exiting. Ordinary success or failure preserves the child status without signaling a completed PID. This is not descendant-process supervision.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n/opt/orders/bin/worker --once & p=$!\ncleanup(){\n  trap - INT TERM\n  # Only signal a still-running job belonging to this shell, not a completed PID.\n  if [[ -n \"$p\" && \"$(jobs -pr)\" == \"$p\" ]]; then\n    kill -TERM \"$p\" 2>/dev/null || true\n    sleep .2\n    if [[ \"$(jobs -pr)\" == \"$p\" ]]; then kill -KILL \"$p\" 2>/dev/null || true; fi\n  fi\n  [[ -z \"$p\" ]] || wait \"$p\" 2>/dev/null || true\n  p=''\n}\ntrap cleanup EXIT\ntrap 'cleanup; exit 130' INT\ntrap 'cleanup; exit 143' TERM\nstatus=0\nwait \"$p\" || status=$?\np=''\ntrap - EXIT INT TERM\nexit \"$status\"\n"
    }
  ]
};
