window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Start a constrained transient systemd job",
      "language": "bash",
      "blurb": "A transient unit fixes identity, filesystem protections, capabilities, runtime, and executable rather than inheriting a broad interactive session.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\njob=\"${1:?job id required}\"\n[[ \"$job\" =~ ^job-[0-9]{6}$ ]] || exit 64\nsystemd-run --wait --collect \\\n  --uid=orders --gid=orders \\\n  --property=NoNewPrivileges=yes \\\n  --property=ProtectSystem=strict \\\n  --property=PrivateTmp=yes \\\n  --property=RuntimeMaxSec=120 \\\n  /opt/orders/bin/reconcile --job-id \"$job\"\n"
    },
    {
      "title": "Launch a read-only container with reduced authority",
      "language": "bash",
      "blurb": "The container receives no new privileges, a read-only root, dropped capabilities, and one read-only data mount.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\ndigest=\"${1:?image digest required}\"\n[[ \"$digest\" =~ ^sha256:[a-f0-9]{64}$ ]] || exit 64\nexec docker run --rm \\\n  --read-only --cap-drop=ALL --security-opt=no-new-privileges \\\n  --user 10001:10001 --network none \\\n  --mount type=bind,src=/srv/orders/input,dst=/input,readonly \\\n  \"registry.example.test/orders-audit@$digest\" --input /input\n"
    }
  ]
};
