window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Exchange workload identity for a short session",
      "language": "bash",
      "blurb": "The fixed exchange assumes the CI platform keeps its OIDC file in a private immutable job directory while AWS CLI reopens it; session output stays in a new private directory.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\numask 077\n\n# CI contract: job code cannot replace the token or its parent while AWS CLI reads it.\ntoken_file=\"${CI_JOB_JWT_FILE:?OIDC token file required}\"\n[[ -f \"$token_file\" && ! -L \"$token_file\" ]] || exit 77\nruntime=\"${RUNNER_TEMP:?runner temp required}\"\n[[ -d \"$runtime\" && ! -L \"$runtime\" ]] || exit 77\nsession_dir=\"$(mktemp -d -p \"$runtime\" oidc-session.XXXXXX)\"\ntrap 'rm -rf -- \"$session_dir\"' EXIT HUP INT TERM\nsession=\"$session_dir/session.json\"\n\naws sts assume-role-with-web-identity \\\n  --role-arn 'arn:aws:iam::123456789012:role/OrdersReadOnly' \\\n  --role-session-name \"orders-${CI_PIPELINE_ID:?}\" \\\n  --duration-seconds 900 \\\n  --web-identity-token \"file://$token_file\" \\\n  --output json > \"$session\"\n[[ -s \"$session\" && ! -L \"$session\" ]] || exit 70\n/opt/orders/bin/read-worker --session-file \"$session\"\n"
    },
    {
      "title": "Give a worker one scoped credential descriptor",
      "language": "bash",
      "blurb": "The parent opens a fixed credential, clears unrelated environment state, and launches the worker with no broader secret directory access.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nexec {credential_fd}<\"${CREDENTIALS_DIRECTORY:?}/orders-read-token\"\nenv -i PATH='/usr/bin:/bin' LANG='C.UTF-8' CREDENTIAL_FD=\"$credential_fd\" \\\n  setpriv --reuid=orders --regid=orders --clear-groups --no-new-privs \\\n  /opt/orders/bin/read-worker --credential-fd \"$credential_fd\"\nstatus=$?\nexec {credential_fd}<&-\nexit \"$status\"\n"
    }
  ]
};
