window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Log a path fingerprint instead of the path",
      "language": "bash",
      "blurb": "Operational telemetry uses a helper that reads the HMAC key from a protected descriptor, so neither the key nor tenant path appears in a child-process argument.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\naudit_path_result() {\n  local result=\"${1:?result required}\" path=\"${2:?path required}\" fingerprint\n  local key_fd=\"${AUDIT_HMAC_KEY_FD:?HMAC key fd required}\"\n  [[ \"$result\" =~ ^(accepted|rejected|missing)$ ]] || return 64\n  [[ \"$key_fd\" =~ ^[0-9]+$ && -r \"/proc/$$/fd/$key_fd\" ]] || return 77\n  fingerprint=\"$(\n    printf '%s' \"$path\" | python3 -c '\nimport hashlib, hmac, os, sys\nfd = int(sys.argv[1])\nkey = os.read(fd, 65)\ndata = sys.stdin.buffer.read(4097)\nif not 32 <= len(key) <= 64:\n    raise SystemExit(\"HMAC key length rejected\")\nif len(data) > 4096:\n    raise SystemExit(\"path length rejected\")\nprint(hmac.new(key, data, hashlib.sha256).hexdigest())\n' \"$key_fd\"\n  )\"\n  logger --tag path-boundary -- \"event=path_check result=$result path_id=$fingerprint\"\n}\n\naudit_path_result \"$@\"\n"
    },
    {
      "title": "Regression-test traversal and symlink rejection",
      "language": "bash",
      "blurb": "A self-contained test plants an external target and verifies the application helper refuses parent traversal and a link beneath the approved root.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nworkspace=\"$(mktemp -d)\"\ntrap 'rm -rf -- \"$workspace\"' EXIT\nmkdir -m 700 \"$workspace/root\" \"$workspace/outside\"\nprintf 'outside\\n' > \"$workspace/outside/secret\"\nln -s \"$workspace/outside\" \"$workspace/root/link\"\n\nif ./read-contained \"$workspace/root\" '../outside/secret'; then exit 1; fi\nif ./read-contained \"$workspace/root\" 'link/secret'; then exit 1; fi\n[[ \"$(cat \"$workspace/outside/secret\")\" == outside ]] || exit 1\n"
    }
  ]
};
