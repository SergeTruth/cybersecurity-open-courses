window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Safe Bash Patterns for Terraform Wrappers\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Expose only approved Terraform subcommands",
                             "code": "#!/usr/bin/env bash\nset -euo pipefail\n\ncase \"${1:-}\" in\n  validate) args=(-chdir=/srv/terraform/orders validate -no-color) ;;\n  plan) args=(-chdir=/srv/terraform/orders plan -input=false -lock-timeout=60s -no-color) ;;\n  *) exit 64 ;;\nesac\n/usr/bin/env -i PATH='/usr/bin:/bin' LANG=C HOME=/var/lib/orders-terraform TF_IN_AUTOMATION=1 AWS_PROFILE=orders-terraform TF_CLI_CONFIG_FILE=/etc/orders-terraform/terraform.tfrc \\\n  /usr/bin/terraform \"${args[@]}\"",
                             "blurb": "Fixed subcommand arrays and a complete service-owned environment exclude TF_CLI_ARGS overrides. HOME, AWS profile, and Terraform CLI configuration are deployment-owned, not request inputs."
                         },
                         {
                             "title":  "Launch Terraform with a deliberately small environment",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\n/usr/bin/env -i \\\n  PATH=\u0027/usr/bin:/bin\u0027 LANG=C TF_IN_AUTOMATION=1 AWS_PROFILE=orders-terraform \\\n  /usr/bin/terraform -chdir=/srv/terraform/orders validate -no-color",
                             "blurb":  "env clears ambient proxy, plugin, and credential variables; only the reviewed path, locale, automation flag, and protected AWS profile reach Terraform."
                         }
                     ]
};
