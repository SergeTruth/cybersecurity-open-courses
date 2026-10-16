window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Validate the opened API-key object on Linux",
      "language": "bash",
      "blurb": "The pathname is opened once, descriptor metadata is checked without a colliding process substitution, and exactly one nonempty line is read into an unexported shell variable.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nexport LC_ALL=C\n# Trusted application-owned regular-file path; hostile FIFO/hard-link selection is not allowed.\n\nopen_checked_key() {\n  local path=\"${1:?key path required}\" owner mode kind metadata extra\n  local first_status=0 second_status=0\n  API_KEY=''\n\n  exec {KEY_FD}<\"$path\"\n  metadata=\"$(stat -Lc '%u %a %F' \"/proc/$$/fd/$KEY_FD\")\" || {\n    exec {KEY_FD}<&-\n    return 77\n  }\n  read -r owner mode kind <<<\"$metadata\"\n  [[ \"$owner\" == \"$(id -u)\" && \"$mode\" =~ ^(400|600)$ && \"$kind\" == 'regular file' ]] || {\n    exec {KEY_FD}<&-\n    return 77\n  }\n\n  IFS= read -r -n 129 -u \"$KEY_FD\" API_KEY || first_status=$?\n  if (( first_status > 1 )) || [[ -z \"$API_KEY\" ]]; then\n    exec {KEY_FD}<&-\n    unset -v API_KEY\n    return 65\n  fi\n\n  extra=''\n  IFS= read -r -n 1 -u \"$KEY_FD\" extra || second_status=$?\n  if (( second_status != 1 )) || [[ -n \"$extra\" ]]; then\n    exec {KEY_FD}<&-\n    unset -v API_KEY\n    return 65\n  fi\n  export KEY_FD\n}\n\nopen_checked_key \"${1:?key file required}\"\n[[ \"$API_KEY\" =~ ^[A-Za-z0-9._~-]{32,128}$ ]] || {\n  exec {KEY_FD}<&-\n  unset -v API_KEY\n  exit 65\n}\n"
    },
    {
      "title": "Create a private temporary curl configuration",
      "language": "bash",
      "blurb": "A closed grammar protects the private curl configuration; both secret variables are removed before an absolute curl executable starts with an exact nonsecret environment.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\numask 077\n\nruntime=\"${XDG_RUNTIME_DIR:?private runtime directory required}\"\napi_key=\"${API_KEY:?key required}\"\n[[ -d \"$runtime\" && ! -L \"$runtime\" ]] || exit 77\n[[ \"$api_key\" =~ ^[A-Za-z0-9._~-]{32,128}$ ]] || exit 65\nconfig=\"$(mktemp -p \"$runtime\" curl-key.XXXXXX)\"\ntrap 'rm -f -- \"$config\"' EXIT HUP INT TERM\n\nprintf 'header = \"Authorization: Bearer %s\"\\n' \"$api_key\" > \"$config\"\nunset -v API_KEY api_key\n/usr/bin/env -i PATH='/usr/bin:/bin' LANG=C HOME=/nonexistent \\\n  /usr/bin/curl --disable --proxy '' --noproxy '*' --no-location --connect-timeout 5 --max-time 15 --config \"$config\" --proto '=https' --fail --silent \\\n  'https://payments.example.test/v1/profile' > /dev/null\n"
    }
  ]
};
