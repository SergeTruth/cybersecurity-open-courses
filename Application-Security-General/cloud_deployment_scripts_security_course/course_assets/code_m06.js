window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Reject public or unencrypted deployment buckets",
      "language": "bash",
      "blurb": "The gate inspects the actual S3 public-access block and default encryption settings before permitting storage use.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nbucket=\"${1:?bucket required}\"\n[[ \"$bucket\" =~ ^company-deploy-[a-z0-9-]{3,30}$ ]] || exit 64\npublic=\"$(aws s3api get-public-access-block --bucket \"$bucket\" \\\n  --query 'PublicAccessBlockConfiguration.[BlockPublicAcls,IgnorePublicAcls,BlockPublicPolicy,RestrictPublicBuckets]' \\\n  --output text)\"\n[[ \"$public\" == $'True\\tTrue\\tTrue\\tTrue' ]] || exit 77\nencryption=\"$(aws s3api get-bucket-encryption --bucket \"$bucket\" \\\n  --query 'ServerSideEncryptionConfiguration.Rules[0].ApplyServerSideEncryptionByDefault.SSEAlgorithm' --output text)\"\n[[ \"$encryption\" == 'aws:kms' ]] || exit 77\n"
    },
    {
      "title": "Keep secrets out of rendered cloud-init data",
      "language": "bash",
      "blurb": "A supplemental credential-field lint rejects matches and scanner errors; only grep status 1 is clean. This is not proof of secret absence.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\numask 077\n\nruntime=\"${RUNNER_TEMP:?runner temp required}\"\n[[ -d \"$runtime\" && ! -L \"$runtime\" ]] || exit 77\nartifact_dir=\"$(mktemp -d -p \"$runtime\" cloud-init.XXXXXX)\"\noutput=\"$artifact_dir/cloud-init.yaml\"\ncat > \"$output\" <<'YAML'\n#cloud-config\nwrite_files:\n  - path: /etc/orders/config\n    permissions: '0640'\n    content: |\n      secret_reference=prod/orders/database\nruncmd:\n  - [systemctl, restart, orders]\nYAML\n\nscan_status=0\ngrep -Eqi '(password|api[_-]?key|bearer)[[:space:]]*[:=][[:space:]]*[^[:space:]]+' \"$output\" || scan_status=$?\ncase \"$scan_status\" in\n  0)\n  printf 'rendered user data contains secret material\\n' >&2\n  exit 65\n    ;;\n  1) ;;\n  *) printf 'user-data scan failed\\n' >&2; exit 70 ;;\nesac\nprintf 'validated user data: %s\\n' \"$output\"\n"
    }
  ]
};
