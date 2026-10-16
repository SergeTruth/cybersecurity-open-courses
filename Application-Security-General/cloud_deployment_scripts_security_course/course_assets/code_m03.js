window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Pin the AWS account and deployment role",
      "language": "bash",
      "blurb": "The wrapper selects an approved profile and compares both account and role ARN returned by STS before any deployment command runs.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n# Course runtime: Linux, Bash 5+, GNU tools; Python helpers require Python 3.12+\n# with current security fixes. Start from a trusted supervisor with a fixed PATH\n# and sanitized environment. Application CLIs under /opt and custom *ctl commands\n# are reviewed deployment adapters; install/configure them before using a snippet.\nreadonly PROFILE='production-deployer'\nreadonly EXPECTED_ACCOUNT='123456789012'\nreadonly EXPECTED_ARN='arn:aws:sts::123456789012:assumed-role/ProductionDeployer/ci'\nidentity=\"$(aws --profile \"$PROFILE\" --region us-east-1 sts get-caller-identity \\\n  --query '[Account,Arn]' --output text)\" || exit 70\n[[ \"$identity\" != *$'\\n'* ]] || exit 70\nread -r account arn <<< \"$identity\"\n[[ \"$account\" == \"$EXPECTED_ACCOUNT\" && \"$arn\" == \"$EXPECTED_ARN\" ]] || {\n  printf 'unexpected AWS account or role\\n' >&2\n  exit 77\n}\n"
    },
    {
      "title": "Assume one approved deployment role",
      "language": "bash",
      "blurb": "A stage maps to a fixed role and session name, while a private unpredictable directory prevents a preexisting runner-temp symlink from receiving the session output.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\numask 077\n\nrole_for_stage() {\n  case \"${1-}\" in\n    staging) printf '%s\\n' 'arn:aws:iam::111122223333:role/StagingRelease' ;;\n    production) printf '%s\\n' 'arn:aws:iam::123456789012:role/ProductionRelease' ;;\n    *) return 64 ;;\n  esac\n}\n\nstage=\"${1:?stage required}\"\nrole=\"$(role_for_stage \"$stage\")\"\nruntime=\"${RUNNER_TEMP:?runner temp required}\"\n[[ -d \"$runtime\" && ! -L \"$runtime\" ]] || exit 77\nsession_dir=\"$(mktemp -d -p \"$runtime\" role-session.XXXXXX)\"\ntrap 'rm -rf -- \"$session_dir\"' EXIT HUP INT TERM\nsession=\"$session_dir/role.json\"\n\naws sts assume-role --role-arn \"$role\" --role-session-name \"release-${CI_PIPELINE_ID:?}\" \\\n  --duration-seconds 900 --output json > \"$session\"\n[[ -s \"$session\" && ! -L \"$session\" ]] || exit 70\n/opt/releases/bin/deploy --stage \"$stage\" --session-file \"$session\"\n"
    }
  ]
};
