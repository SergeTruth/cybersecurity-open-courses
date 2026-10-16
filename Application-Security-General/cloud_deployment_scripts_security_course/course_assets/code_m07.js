window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Require approval for the reviewed Terraform digest",
      "language": "bash",
      "blurb": "An authenticated deployment adapter authorizes the workload and consumes approval for the exact immutable module-5 plan digest. Environment assertions or a checksum supplied alongside the plan are not approval evidence.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n# Trusted deployment supplies module 5's exact immutable private plan directory.\n# Its parent/contents cannot be modified by job or request code during apply.\nplan=\"${APPROVED_PLAN_FILE:?reviewed private plan path required}\"\napproval=\"${1:?approval ID required}\"\n[[ \"$plan\" == /* && -f \"$plan\" && ! -L \"$plan\" ]] || exit 77\n[[ \"$approval\" =~ ^approval-[a-f0-9]{32}$ ]] || exit 64\nactual_digest=\"$(sha256sum -- \"$plan\" | cut -d' ' -f1)\"\n[[ \"$actual_digest\" =~ ^[a-f0-9]{64}$ ]] || exit 65\n# Required application-owned service adapter: authenticates workload and approver,\n# checks production scope, and consumes an approval bound to this exact digest.\n# It must not trust RELEASE_APPROVER or a caller-supplied digest as approval evidence.\n/opt/releases/bin/release-approvalctl consume --approval-id \"$approval\" \\\n  --operation terraform-apply --environment production --sha256 \"$actual_digest\"\nterraform -chdir=infra apply -input=false -auto-approve \"$plan\"\n"
    },
    {
      "title": "Promote an immutable image digest",
      "language": "bash",
      "blurb": "Promotion accepts an OCI digest rather than a mutable tag and maps the environment to a fixed registry repository.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nenvironment=\"${1:?environment required}\"\ndigest=\"${2:?digest required}\"\n[[ \"$digest\" =~ ^sha256:[a-f0-9]{64}$ ]] || exit 64\ncase \"$environment\" in\n  staging) repository='registry.example.test/orders-staging' ;;\n  production) repository='registry.example.test/orders-production' ;;\n  *) exit 64 ;;\nesac\n\ndeployctl promote --environment \"$environment\" --image \"$repository@$digest\" --wait\n"
    }
  ]
};
