window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Status Codes, Timeouts, Retries, and Redirects\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Classify HTTP status separately from transport failure",
                             "code": "#!/usr/bin/env bash\nset -euo pipefail\numask 077\n\nwork=\"$(mktemp -d)\"; trap 'rm -rf -- \"$work\"' EXIT\nstatus=\"$(/usr/bin/curl -q --proto '=https' --max-redirs 0 \\\n  --connect-timeout 5 --max-time 20 --retry 2 --retry-delay 1 \\\n  --output \"$work/body\" --write-out '%{http_code}' --silent --show-error \\\n  'https://api.example.test/v1/readiness')\" || exit 70\ncase \"$status\" in\n  200) /usr/bin/jq -e '.ready == true' \"$work/body\" >/dev/null ;;\n  401|403) exit 77 ;;\n  429|5??) exit 75 ;;\n  *) exit 70 ;;\nesac",
                             "blurb": "The response body and HTTP status are separate; curl retries selected transient transport and HTTP failures for this idempotent GET, not arbitrary mutating requests."
                         },
                         {
                             "title":  "Revalidate every redirect before following it",
                             "code": "#!/usr/bin/env bash\nset -euo pipefail\numask 077\n\nurl='https://downloads.example.test/releases/current'\nwork=\"$(mktemp -d)\"; trap 'rm -rf -- \"$work\"' EXIT\nfor _ in 1 2 3; do\n  : >\"$work/headers\"\n  status=\"$(/usr/bin/curl -q --proto '=https' --max-redirs 0 --output /dev/null \\\n    --dump-header \"$work/headers\" --write-out '%{http_code}' --silent --show-error \"$url\")\" || exit 70\n  case \"$status\" in\n    301|302|303|307|308)\n      location=\"$(awk 'BEGIN{IGNORECASE=1} /^Location:/{sub(/\\r$/,\"\"); sub(/^[^:]+:[[:space:]]*/,\"\"); print; exit}' \"$work/headers\")\"\n      [[ \"$location\" =~ ^https://downloads\\.example\\.test/[-A-Za-z0-9._/~]+$ ]] || exit 77\n      url=\"$location\" ;;\n    200) printf 'approved_url=%s\\n' \"$url\"; exit 0 ;;\n    *) exit 70 ;;\n  esac\ndone\nexit 75",
                             "blurb":  "Each Location value must remain an HTTPS URL on the approved host with no credentials or alternate port; curl itself never follows redirects automatically."
                         }
                     ]
};
