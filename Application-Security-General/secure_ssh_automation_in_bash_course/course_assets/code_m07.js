window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027CI/CD, Bastions, and Execution Environments\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Use a fixed bastion for a CI deployment check",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\n/usr/bin/env -i PATH=\u0027/usr/bin:/bin\u0027 LANG=C HOME=/nonexistent \\\n  /usr/bin/ssh -F /etc/orders-automation/ci_ssh_config \\\n  -J bastion.example.test deploy01.example.test -- /usr/local/bin/orders-release-status",
                             "blurb":  "The runner cannot choose a proxy or destination; both hosts are pinned in the CI-specific SSH configuration."
                         },
                         {
                             "title":  "Create a private SSH control socket directory",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\numask 077\n\ncontrol=\"$(mktemp -d -p \"${RUNNER_TEMP:?}\" ssh-control.XXXXXX)\"\ntrap \u0027rm -rf -- \"$control\"\u0027 EXIT\n/usr/bin/ssh -F /etc/orders-automation/ci_ssh_config \\\n  -oControlMaster=auto -oControlPersist=30 -oControlPath=\"$control/%C\" \\\n  deploy01 -- /usr/local/bin/orders-release-status",
                             "blurb":  "Connection sharing uses an unpredictable private path and removes it after the job, preventing another job from preplanting the control socket."
                         }
                     ]
};
