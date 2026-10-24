window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Bash Invocation Patterns for curl\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Build curl options as an argument array",
                             "code": "#!/usr/bin/env bash\nset -euo pipefail\n\ncase \"${1-}\" in\n  profile) url='https://api.example.test/v1/profile' ;;\n  limits) url='https://api.example.test/v1/limits' ;;\n  *) exit 64 ;;\nesac\noptions=(--proto '=https' --max-redirs 0 --connect-timeout 5 --max-time 20 --fail --silent --show-error)\n/usr/bin/curl -q \"${options[@]}\" \"$url\"",
                             "blurb":  "A closed operation selects one fixed URL, while timeout and output options remain separate arguments rather than executable shell text."
                         },
                         {
                             "title":  "Encode a query value as data instead of URL syntax",
                             "code": "#!/usr/bin/env bash\nset -euo pipefail\n\ncustomer=\"${1:?customer required}\"\n(( ${#customer} >= 1 && ${#customer} <= 64 )) || exit 64\n[[ \"$customer\" != *$'\\n'* && \"$customer\" != *$'\\r'* ]] || exit 64\n/usr/bin/curl -q --proto '=https' --max-redirs 0 --get \\\n  --data-urlencode \"customer=$customer\" \\\n  --fail --silent --show-error 'https://api.example.test/v1/orders'",
                             "blurb":  "curl performs percent encoding for a bounded identifier, so reserved characters cannot become extra query parameters."
                         }
                     ]
};
