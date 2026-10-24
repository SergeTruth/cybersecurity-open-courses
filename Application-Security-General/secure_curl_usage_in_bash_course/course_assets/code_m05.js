window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Headers, Tokens, and Secret Handling\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Keep a bearer token out of curl argv and environment",
                             "code": "#!/usr/bin/env bash\nset +x\nset -euo pipefail\numask 077\n\ntoken=\"${API_TOKEN:?token required}\"\nunset -v API_TOKEN\n[[ \"$token\" =~ ^[A-Za-z0-9._~-]{32,2048}$ ]] || exit 65\nruntime=\"${XDG_RUNTIME_DIR:?private runtime required}\"\nconfig=\"$(mktemp -p \"$runtime\" curl-auth.XXXXXX)\"\ntrap 'rm -f -- \"$config\"' EXIT HUP INT TERM\nprintf 'header = \"Authorization: Bearer %s\"\\n' \"$token\" >\"$config\"\nunset -v token\n/usr/bin/env -i PATH='/usr/bin:/bin' LANG=C HOME=/nonexistent \\\n  /usr/bin/curl -q --config \"$config\" --proto '=https' --max-redirs 0 \\\n  --fail --silent 'https://api.example.test/v1/profile' >/dev/null",
                             "blurb":  "A private config carries the header, both token variables are unset, and an exact environment launches the absolute curl executable."
                         },
                         {
                             "title":  "Reject control characters in an approved request header",
                             "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nrequest_id=\"${1:?request id required}\"\n[[ \"$request_id\" =~ ^REQ-[A-F0-9]{16}$ ]] || exit 64\n/usr/bin/curl -q --proto '=https' --max-redirs 0 \\\n  --header \"X-Request-Id: $request_id\" \\\n  --fail --silent --show-error 'https://api.example.test/v1/status'",
                             "blurb":  "Only a short correlation identifier with a closed grammar may become a header; caller text cannot inject another header line."
                         }
                     ]
};
