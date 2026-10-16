window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Rotate with a verified overlap",
      "language": "bash",
      "blurb": "An explicitly required issuer adapter creates, tests, and revokes the credential. KV-v2 deletion is separate storage cleanup; failures after possible cutover preserve the candidate for reconciliation.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n# Application-owned issuer adapter: create issues the real credential and stores\n# its KV-v2 version; revoke invalidates it at the issuer and confirms completion.\n# KV deletion alone never revokes a credential.\nold=\"${1:?old numeric KV version required}\"\n[[ \"$old\" =~ ^[1-9][0-9]{0,8}$ ]] || exit 64\nnew=''; cutover_started=false\non_failure(){\n  local status=$?\n  trap - ERR\n  if [[ \"$cutover_started\" == false && \"$new\" =~ ^[1-9][0-9]{0,8}$ && \"$new\" != \"$old\" ]]; then\n    orders-credentialctl revoke --version \"$new\" --wait >/dev/null 2>&1 || printf 'candidate cleanup failed; operator reconciliation required\\n' >&2\n  else\n    printf 'rotation requires reconciliation; candidate remains enabled\\n' >&2\n  fi\n  exit \"$status\"\n}\ntrap on_failure ERR\nnew=\"$(orders-credentialctl create --format kv-version)\"\n[[ \"$new\" =~ ^[1-9][0-9]{0,8}$ && \"$new\" != \"$old\" ]] || exit 65\norders-credentialctl verify --version \"$new\"\ncutover_started=true\ndeployctl set-secret-version orders \"$new\"\ndeployctl wait --service orders --condition healthy --timeout 180\norders-credentialctl revoke --version \"$old\" --wait\nvault kv delete -mount=secret -versions=\"$old\" orders\ntrap - ERR\n"
    },
    {
      "title": "Triage a secret exposure",
      "language": "bash",
      "blurb": "An application-owned issuer adapter first invalidates the exposed credential; KV-v2 deletion only cleans stored data. The private report matches the exact version and distinguishes no matches from failure.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\numask 077\n\nincident=\"${1-}\"\nversion=\"${2-}\"\n[[ \"$incident\" =~ ^INC-[0-9]{6}$ && \"$version\" =~ ^[1-9][0-9]{0,8}$ ]] || exit 64\nruntime=\"${RUNNER_TEMP:?runner temp required}\"\n[[ -d \"$runtime\" && ! -L \"$runtime\" ]] || exit 77\nreport_dir=\"$(mktemp -d -p \"$runtime\" \"$incident.review.XXXXXX\")\"\nreport=\"$report_dir/credential-usage.log\"\n\n# Trusted issuer adapter confirms real revocation before storage cleanup.\norders-credentialctl revoke --version \"$version\" --wait\nvault kv delete -mount=secret -versions=\"$version\" orders\nset +e\njournalctl -t orders-worker --since '-24 hours' \\\n  | grep -E \"(^|[[:space:]])credential_version=$version([[:space:]]|$)\" > \"$report\"\nstatus=(\"${PIPESTATUS[@]}\")\nset -e\n\n(( status[0] == 0 )) || { printf 'journal review failed\\n' >&2; exit 70; }\ncase \"${status[1]}\" in\n  0) printf 'matching credential use: %s\\n' \"$report\" ;;\n  1) printf 'no matching credential use found; report: %s\\n' \"$report\" ;;\n  *) printf 'credential-use filter failed\\n' >&2; exit 70 ;;\nesac\n"
    }
  ]
};
