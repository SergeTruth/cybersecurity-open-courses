window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Roll an API key through an overlap window",
      "language": "bash",
      "blurb": "Before cutover a failed candidate is revoked. Once cutover may have begun, failures preserve the candidate for reconciliation instead of revoking a possibly active key.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n# keyctl/deployctl are application-owned adapters, NOT Linux keyutils.\n# Versions are public IDs; deployment wait confirms credential adoption.\nold_version=\"${1:?old version required}\"\n[[ \"$old_version\" =~ ^key-v[0-9]{8}-[a-f0-9]{8}$ ]] || exit 64\nnew_version=''; cutover_started=false\non_failure(){\n  local status=$?\n  trap - ERR\n  if [[ \"$cutover_started\" == false && -n \"$new_version\" ]]; then\n    keyctl revoke --scope payments --version \"$new_version\" >/dev/null 2>&1 || printf 'candidate cleanup failed; operator reconciliation required\\n' >&2\n  else\n    printf 'rotation outcome requires reconciliation; candidate remains enabled\\n' >&2\n  fi\n  exit \"$status\"\n}\ntrap on_failure ERR\nnew_version=\"$(keyctl create --scope payments --format id)\"\n[[ \"$new_version\" =~ ^key-v[0-9]{8}-[a-f0-9]{8}$ && \"$new_version\" != \"$old_version\" ]] || exit 65\nkeyctl verify --scope payments --version \"$new_version\"\n# Mark BEFORE dispatch: failure may occur after the reference changed.\ncutover_started=true\ndeployctl set-secret-version payments \"$new_version\"\ndeployctl wait --service payments --condition healthy --timeout 180\nkeyctl revoke --scope payments --version \"$old_version\"\ntrap - ERR\nprintf 'rotation complete: old=%s new=%s\\n' \"$old_version\" \"$new_version\"\n"
    },
    {
      "title": "Record an API-key exposure response without the key",
      "language": "bash",
      "blurb": "The incident helper validates public identifiers, revokes the affected version, and writes an audit event containing no credential material.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nrespond_to_key_exposure() {\n  local incident=\"${1:?incident required}\" version=\"${2:?version required}\"\n  [[ \"$incident\" =~ ^INC-[0-9]{6}$ ]] || return 64\n  [[ \"$version\" =~ ^key-v[0-9]{8}-[a-f0-9]{8}$ ]] || return 64\n  keyctl revoke --scope payments --version \"$version\"\n  logger --tag api-key-response -- \\\n    \"event=credential_revoked incident=$incident version=$version\"\n}\n\nrespond_to_key_exposure \"$@\"\n"
    }
  ]
};
