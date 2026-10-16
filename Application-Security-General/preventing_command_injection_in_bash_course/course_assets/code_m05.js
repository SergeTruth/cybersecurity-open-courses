window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Dispatch supported maintenance operations",
      "language": "bash",
      "blurb": "The mode selects fixed functions and targets.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\ncompact(){ journalctl --vacuum-time=14d; }; verify(){ /opt/orders/bin/server --check-config /etc/orders/config.yaml; }\ncase \"${1-}\" in compact) compact;; verify) verify;; *) exit 64;; esac\n"
    },
    {
      "title": "Build rsync arguments as data",
      "language": "bash",
      "blurb": "Validated values become array elements without reparsing.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nlimit=\"${1-}\"; [[ \"$limit\" =~ ^[1-9][0-9]{1,3}$ ]] && ((limit>=64&&limit<=4096)) || exit 64\ncase \"${2-}\" in east|west) host=\"backup-${2}.example.test\";; *) exit 64;; esac\nargs=(-a --delete-delay \"--bwlimit=$limit\" -- /srv/export/ \"backup@$host:/incoming/\"); rsync \"${args[@]}\"\n"
    }
  ]
};
