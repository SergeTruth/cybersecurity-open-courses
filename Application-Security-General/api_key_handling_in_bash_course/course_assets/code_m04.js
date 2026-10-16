window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Read a credential from one verified systemd directory",
      "language": "bash",
      "blurb": "The application validates its exact systemd credential object, then gives the descriptor to an absolute application-owned executable through a deliberately minimal environment.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nopen_api_credential() {\n  local directory=\"${CREDENTIALS_DIRECTORY:?systemd credential directory missing}\"\n  local canonical owner mode kind metadata\n  readonly EXPECTED_CREDENTIAL_DIRECTORY='/run/credentials/payments.service'\n\n  canonical=\"$(realpath -e -- \"$directory\")\" || return 77\n  [[ \"$directory\" == \"$EXPECTED_CREDENTIAL_DIRECTORY\" && \"$canonical\" == \"$EXPECTED_CREDENTIAL_DIRECTORY\" ]] || return 77\n  metadata=\"$(stat -Lc '%u %a %F' -- \"$canonical\")\" || return 77\n  read -r owner mode kind <<< \"$metadata\"\n  [[ \"$owner\" == 0 && \"$kind\" == 'directory' ]] || return 77\n  (( (8#$mode & 8#022) == 0 )) || return 77\n\n  exec {API_KEY_FD}<\"$canonical/payments-api-key\"\n  metadata=\"$(stat -Lc '%u %a %F' \"/proc/$$/fd/$API_KEY_FD\")\" || {\n    exec {API_KEY_FD}<&-\n    return 77\n  }\n  read -r owner mode kind <<<\"$metadata\"\n  [[ \"$owner\" == 0 && \"$kind\" == 'regular file' ]] || return 77\n  (( (8#$mode & 8#077) == 0 )) || return 77\n  export API_KEY_FD\n}\n\nopen_api_credential\n/usr/bin/env -i PATH='/usr/bin:/bin' LANG=C API_KEY_FD=\"$API_KEY_FD\" \\\n  /opt/payments/bin/send-payment-request --token-fd \"$API_KEY_FD\"\nstatus=$?\nexec {API_KEY_FD}<&-\nexit \"$status\"\n"
    },
    {
      "title": "Fetch one versioned key from a secret service",
      "language": "bash",
      "blurb": "An approved profile, region, secret identifier, and version stage are fixed before the secret is streamed to an absolute application-owned consumer with a minimal environment.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nreadonly PROFILE='payments-runtime'\nreadonly REGION='us-east-1'\nreadonly SECRET_ID='prod/payments/api'\n\naws --profile \"$PROFILE\" --region \"$REGION\" secretsmanager get-secret-value \\\n  --secret-id \"$SECRET_ID\" \\\n  --version-stage AWSCURRENT \\\n  --query SecretString \\\n  --output text \\\n| /usr/bin/env -i PATH='/usr/bin:/bin' LANG=C \\\n    /opt/payments/bin/payment-worker --api-key-stdin\nstatus=(\"${PIPESTATUS[@]}\")\n(( status[0] == 0 && status[1] == 0 )) || exit 70\n"
    }
  ]
};
