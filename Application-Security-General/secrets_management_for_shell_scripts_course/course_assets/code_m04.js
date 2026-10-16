window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Pipe a vault value to its consumer",
      "language": "bash",
      "blurb": "The secret avoids stdout logs and argv.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nvault kv get -field=password secret/production/orders/database | /opt/orders/bin/migrate --password-stdin\ns=(\"${PIPESTATUS[@]}\"); ((s[0]==0&&s[1]==0))\n"
    },
    {
      "title": "Use one verified systemd credential descriptor",
      "language": "bash",
      "blurb": "The application requires its exact canonical systemd directory, checks directory and opened-file metadata, and inherits only the fixed credential descriptor.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nreadonly EXPECTED_CREDENTIAL_DIRECTORY='/run/credentials/orders.service'\ndirectory=\"${CREDENTIALS_DIRECTORY:?credential directory required}\"\ncanonical=\"$(realpath -e -- \"$directory\")\" || exit 77\n[[ \"$directory\" == \"$EXPECTED_CREDENTIAL_DIRECTORY\" && \"$canonical\" == \"$EXPECTED_CREDENTIAL_DIRECTORY\" ]] || exit 77\nmetadata=\"$(stat -Lc '%u %a %F' -- \"$canonical\")\" || exit 77\nread -r owner mode kind <<< \"$metadata\"\n[[ \"$owner\" == 0 && \"$kind\" == 'directory' ]] || exit 77\n(( (8#$mode & 8#022) == 0 )) || exit 77\n\nexec {credential_fd}<\"$canonical/orders-password\"\nmetadata=\"$(stat -Lc '%u %a %F' \"/proc/$$/fd/$credential_fd\")\" || exit 77\nread -r owner mode kind <<<\"$metadata\"\n[[ \"$owner\" == 0 && \"$kind\" == 'regular file' ]] || exit 77\n(( (8#$mode & 8#077) == 0 )) || exit 77\n/opt/orders/bin/worker --password-fd \"$credential_fd\"\nstatus=$?\nexec {credential_fd}<&-\nexit \"$status\"\n"
    }
  ]
};
