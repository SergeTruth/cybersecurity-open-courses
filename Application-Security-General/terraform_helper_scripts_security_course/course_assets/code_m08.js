window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027CI/CD, Logging, Monitoring, Drift, and Recovery\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Distinguish clean, drifted, and failed plans",
                             "code":  "#!/usr/bin/env bash\nset -uo pipefail\numask 077\n\nlog=\"$(mktemp)\"; trap \u0027/usr/bin/rm -f -- \"$log\"\u0027 EXIT\nstatus=0\n/usr/bin/terraform -chdir=/srv/terraform/orders plan -detailed-exitcode -input=false -lock=false -no-color \u003e\"$log\" 2\u003e\u00261 || status=$?\ncase \"$status\" in\n  0) /usr/bin/logger --tag terraform-drift -- \u0027result=clean\u0027 ;;\n  2) /usr/bin/logger --tag terraform-drift -- \u0027result=drift\u0027; exit 2 ;;\n  *) /usr/bin/logger --tag terraform-drift -- \"result=error status=$status\"; exit \"$status\" ;;\nesac",
                             "blurb":  "Terraform detailed exit codes are handled explicitly: zero is clean, two reports drift, and every operational failure remains a failed check."
                         },
                         {
                             "title":  "Encrypt a state snapshot without storing plaintext",
                             "code": "#!/usr/bin/env bash\nset -euo pipefail\numask 077\n# Prerequisite: this root-owned, non-writable deployment file contains real,\n# independently approved age recipients. Do not use an illustrative fake key.\n\ndestination=\"$(mktemp -p /var/lib/orders-terraform/recovery .state.XXXXXX.age)\"\ntrap '/usr/bin/rm -f -- \"$destination\"' EXIT\n/usr/bin/terraform -chdir=/srv/terraform/orders state pull |\n  /usr/bin/age -R /etc/orders-terraform/recovery-recipients.txt -o \"$destination\"\n/usr/bin/mv -T -- \"$destination\" /var/lib/orders-terraform/recovery/orders-current.tfstate.age\ndestination=''",
                             "blurb": "terraform state pull streams directly into age using an application-owned file of approved recovery recipients; pipefail prevents publishing ciphertext from a failed producer or encryptor."
                         }
                     ]
};
