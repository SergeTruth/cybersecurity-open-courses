window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Use a BuildKit secret mount",
      "language": "bash",
      "blurb": "BuildKit mounts the CI token rather than passing a build argument. The Dockerfile and build steps must be trusted not to copy or print it: secret mounts alone cannot prevent a malicious build from leaking it.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nf=\"${CI_REGISTRY_TOKEN_FILE:?}\"; [[ -f \"$f\" ]] || exit 77\nDOCKER_BUILDKIT=1 docker build --secret \"id=registry_token,src=$f\" -t orders-builder:local .\n"
    },
    {
      "title": "Exchange OIDC for a short cloud session",
      "language": "bash",
      "blurb": "Remote automation avoids a stored key under an explicit CI guarantee that the private OIDC path stays immutable while AWS CLI reopens it; output uses a new private directory.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\numask 077\n\n# CI contract: job code cannot replace the token or its parent while AWS CLI reads it.\ntoken_file=\"${CI_JOB_JWT_FILE:?OIDC token file required}\"\n[[ -f \"$token_file\" && ! -L \"$token_file\" ]] || exit 77\nruntime=\"${RUNNER_TEMP:?runner temp required}\"\n[[ -d \"$runtime\" && ! -L \"$runtime\" ]] || exit 77\nsession_dir=\"$(mktemp -d -p \"$runtime\" oidc-session.XXXXXX)\"\ntrap 'rm -rf -- \"$session_dir\"' EXIT HUP INT TERM\nsession=\"$session_dir/session.json\"\n\naws sts assume-role-with-web-identity \\\n  --role-arn 'arn:aws:iam::123456789012:role/OrdersJob' \\\n  --role-session-name \"job-${CI_JOB_ID:?}\" \\\n  --web-identity-token \"file://$token_file\" \\\n  --duration-seconds 900 --output json > \"$session\"\n[[ -s \"$session\" && ! -L \"$session\" ]] || exit 70\n/opt/orders/bin/run-job --session-file \"$session\"\n"
    }
  ]
};
