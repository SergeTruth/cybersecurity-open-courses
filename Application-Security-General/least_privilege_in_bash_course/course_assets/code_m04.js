window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Invoke one noninteractive sudo command",
      "language": "bash",
      "blurb": "A mode maps to a fixed systemctl action and service; sudo cannot prompt or accept caller-supplied command text.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\ncase \"${1-}\" in\n  reload) action=reload ;;\n  status) action=status ;;\n  *) printf 'unsupported service action\\n' >&2; exit 64 ;;\nesac\nsudo -n -- /usr/bin/systemctl --no-pager \"$action\" orders.service\n"
    },
    {
      "title": "Drop privileges before processing an upload",
      "language": "bash",
      "blurb": "setpriv clears supplementary groups and selects the dedicated account before a fixed parser opens the approved input.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nupload=\"${1:?upload required}\"\n[[ \"$upload\" =~ ^/srv/orders/incoming/[A-Za-z0-9_-]{1,48}\\.json$ ]] || exit 64\n[[ -f \"$upload\" && ! -L \"$upload\" ]] || exit 66\nexec setpriv \\\n  --reuid=orders --regid=orders --clear-groups \\\n  --no-new-privs \\\n  /opt/orders/bin/import-json -- \"$upload\"\n"
    }
  ]
};
