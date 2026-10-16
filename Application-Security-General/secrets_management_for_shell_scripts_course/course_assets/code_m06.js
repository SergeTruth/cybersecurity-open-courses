window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Validate the opened secret object",
      "language": "bash",
      "blurb": "Descriptor metadata is checked without a colliding process substitution, and read status plus byte presence enforce exactly one nonempty line with or without a final newline.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nexport LC_ALL=C\n# Trusted application-owned regular-file path; hostile FIFO/hard-link selection is not allowed.\n\nexec {f}<\"${1:?secret file required}\"\nmetadata=\"$(stat -Lc '%u %a %s %F' \"/proc/$$/fd/$f\")\" || exit 77\nread -r u m z k <<<\"$metadata\"\n[[ \"$u\" == \"$(id -u)\" && \"$m\" =~ ^(400|600)$ && \"$k\" == 'regular file' ]] || exit 77\n(( z >= 20 && z <= 4096 )) || exit 77\n\nsecret=''\nfirst_status=0\nIFS= read -r -n 4097 -u \"$f\" secret || first_status=$?\nif (( first_status > 1 )) || (( ${#secret} < 20 || ${#secret} > 4096 )); then exit 65; fi\n\nextra=''\nsecond_status=0\nIFS= read -r -n 1 -u \"$f\" extra || second_status=$?\nif (( second_status != 1 )) || [[ -n \"$extra\" ]]; then exit 65; fi\nexec {f}<&-\n"
    },
    {
      "title": "Deliver a secret through a supervised pipe",
      "language": "bash",
      "blurb": "An ordinary pipe avoids regular secret files and named-FIFO open deadlocks. Supervised producer and consumer limits plus both exit statuses make failures observable.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n# Ordinary pipe: neither endpoint can hang opening a named FIFO.\n# GNU timeout supervises each direct producer/consumer process group.\nset +e\ntimeout --kill-after=2s 15s vault kv get -field=password secret/orders \\\n | timeout --kill-after=2s 20s /opt/orders/bin/consumer --password-stdin\nstatuses=(\"${PIPESTATUS[@]}\")\nset -e\n((statuses[0] == 0 && statuses[1] == 0)) || exit 70\n"
    }
  ]
};
