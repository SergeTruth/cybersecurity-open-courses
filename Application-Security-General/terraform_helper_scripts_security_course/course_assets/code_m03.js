window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro": "These examples apply 'Identities, Credentials, and Least Privilege' to distinct, reviewable Bash workflows. Runtime: GNU/Linux, Bash 5+, GNU command-line tools, and Python 3.11+ where shown. Install the demonstrated clients separately; fixed /etc and /opt policies and application-specific consumers are deployment-owned prerequisites. These are administrator/service scripts, not unauthenticated web endpoints.",
    "codeExamples":  [
                         {
                             "title":  "Verify the active AWS identity before Terraform runs",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nidentity=\"$(/usr/bin/aws sts get-caller-identity --output json)\"\naccount=\"$(/usr/bin/jq -er \u0027.Account\u0027 \u003c\u003c\u003c\"$identity\")\"\narn=\"$(/usr/bin/jq -er \u0027.Arn\u0027 \u003c\u003c\u003c\"$identity\")\"\n[[ \"$account\" == \u0027123456789012\u0027 ]] || exit 77\n[[ \"$arn\" =~ ^arn:aws:sts::123456789012:assumed-role/orders-terraform/[A-Za-z0-9+=,.@_-]+$ ]] || exit 77\n/usr/bin/terraform -chdir=/srv/terraform/orders version \u003e/dev/null",
                             "blurb":  "The helper compares the account and role ARN returned by STS with application-owned expectations instead of trusting environment labels."
                         },
                         {
                             "title":  "Let the AWS provider read a validated OIDC token descriptor",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\ntoken_file=/run/secrets/ci-oidc-token\nexec {token_fd}\u003c\"$token_file\"\nopened_token=\"$(/usr/bin/readlink -e \"/proc/$$/fd/$token_fd\")\" || exit 77\n[[ \"$opened_token\" == \"$token_file\" ]] || exit 77\nread -r owner mode size \u003c\u003c\u003c\"$(/usr/bin/stat -Lc \u0027%u %a %s\u0027 \"/proc/$$/fd/$token_fd\")\"\ntoken_kind=\"$(FD=\"$token_fd\" /usr/bin/python3 -c \u0027import os, stat; print(int(stat.S_ISREG(os.fstat(int(os.environ[\"FD\"])).st_mode)))\u0027)\"\n[[ \"$owner\" == \"$(/usr/bin/id -u)\" \u0026\u0026 \"$mode\" == 400 \u0026\u0026 \"$token_kind\" == 1 ]] || exit 77\n(( size \u003e= 32 \u0026\u0026 size \u003c= 16384 )) || exit 77\npipeline_id=\"${CI_PIPELINE_ID:?pipeline id required}\"\n[[ \"$pipeline_id\" =~ ^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$ ]] || exit 64\n\n/usr/bin/env -i PATH=\u0027/usr/bin:/bin\u0027 TF_IN_AUTOMATION=1 \\\n  AWS_ROLE_ARN=\u0027arn:aws:iam::123456789012:role/orders-terraform\u0027 \\\n  AWS_WEB_IDENTITY_TOKEN_FILE=\"/proc/$$/fd/$token_fd\" AWS_ROLE_SESSION_NAME=\"ci-$pipeline_id\" \\\n  /usr/bin/terraform -chdir=/srv/terraform/orders plan -input=false -lock-timeout=60s",
                             "blurb":  "The helper opens the fixed token once, validates the descriptor metadata and size, and exposes that same stable object through procfs in a minimal Terraform environment."
                         }
                     ]
};
