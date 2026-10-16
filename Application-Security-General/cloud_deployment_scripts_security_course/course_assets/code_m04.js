window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Map a release stage to fixed CloudFormation inputs",
      "language": "bash",
      "blurb": "The stage controls known stack, region, and parameter-file values; the caller supplies no free-form CLI options.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\ndeploy_stack() {\n  local stage=\"${1:?stage required}\" stack region parameters\n  case \"$stage\" in\n    staging) stack='orders-staging'; region='us-west-2'; parameters='config/staging.json' ;;\n    production) stack='orders-production'; region='us-east-1'; parameters='config/production.json' ;;\n    *) return 64 ;;\n  esac\n  aws --profile \"${AWS_PROFILE:?profile required}\" --region \"$region\" cloudformation deploy \\\n    --stack-name \"$stack\" --template-file infra/orders.yaml \\\n    --parameter-overrides \"file://$parameters\" --no-fail-on-empty-changeset\n}\n\ndeploy_stack \"${1:?stage required}\"\n"
    },
    {
      "title": "Build cloud tags as an argument array",
      "language": "bash",
      "blurb": "Validated identifiers become separate AWS CLI arguments, preserving boundaries without eval or command-string re-parsing.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\napplication=\"${1:?application required}\"\nrevision=\"${2:?revision required}\"\n[[ \"$application\" =~ ^[a-z][a-z0-9-]{2,30}$ ]] || exit 64\n[[ \"$revision\" =~ ^[a-f0-9]{40}$ ]] || exit 64\n\ntags=(\n  \"Key=Application,Value=$application\"\n  \"Key=Revision,Value=$revision\"\n  \"Key=ManagedBy,Value=release-pipeline\"\n)\naws ec2 create-tags --resources \"${INSTANCE_ID:?approved instance required}\" --tags \"${tags[@]}\"\n"
    }
  ]
};
