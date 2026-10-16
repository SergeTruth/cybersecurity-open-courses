window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Verify the deployed stack after promotion",
      "language": "bash",
      "blurb": "The verification step rechecks account identity, stack state, and the deployed revision rather than treating command success as proof of outcome.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nexpected_revision=\"${1:?revision required}\"\n[[ \"$expected_revision\" =~ ^[a-f0-9]{40}$ ]] || exit 64\naccount=\"$(aws sts get-caller-identity --query Account --output text)\"\n[[ \"$account\" == '123456789012' ]] || exit 77\nstate=\"$(aws cloudformation describe-stacks --stack-name orders-production \\\n  --query 'Stacks[0].StackStatus' --output text)\"\n[[ \"$state\" == 'UPDATE_COMPLETE' ]] || exit 70\ndeployed=\"$(aws cloudformation describe-stacks --stack-name orders-production \\\n  --query 'Stacks[0].Parameters[?ParameterKey==`Revision`].ParameterValue' --output text)\"\n[[ \"$deployed\" == \"$expected_revision\" ]] || exit 70\n"
    },
    {
      "title": "Rollback a failed release to a recorded digest",
      "language": "bash",
      "blurb": "The handler reads the last-known-good immutable digest from trusted state, validates it, and records a rollback event without leaking configuration.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nrollback_release() {\n  local release=\"${1:?release required}\" state_file=\"${2:?state required}\" digest\n  [[ \"$release\" =~ ^rel-[0-9]{8}-[0-9]{4}$ ]] || return 64\n  IFS= read -r digest < \"$state_file\"\n  [[ \"$digest\" =~ ^sha256:[a-f0-9]{64}$ ]] || return 65\n  deployctl rollback --service orders --image \"registry.example.test/orders@$digest\" --wait\n  logger --tag cloud-release -- \"event=rollback release=$release digest=$digest\"\n}\n\nrollback_release \"$@\"\n"
    }
  ]
};
