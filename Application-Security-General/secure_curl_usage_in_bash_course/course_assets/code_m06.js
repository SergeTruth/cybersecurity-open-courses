window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Methods, Payloads, and API Safety\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Generate a JSON request body with jq",
                             "code": "#!/usr/bin/env bash\nset -euo pipefail\n\norder_id=\"${1:?order id required}\"\nquantity=\"${2:?quantity required}\"\n[[ \"$order_id\" =~ ^ORD-[0-9]{8}$ && \"$quantity\" =~ ^[1-9][0-9]{0,3}$ ]] || exit 64\n/usr/bin/jq -cn --arg id \"$order_id\" --argjson quantity \"$quantity\" '{order_id:$id, quantity:$quantity}' \\\n  | /usr/bin/curl -q --proto '=https' --max-redirs 0 --request POST \\\n      --header 'Content-Type: application/json' --data-binary @- \\\n      --fail --silent --show-error 'https://api.example.test/v1/shipments'\nstatus=(\"${PIPESTATUS[@]}\")\n(( status[0] == 0 && status[1] == 0 )) || exit 70",
                             "blurb":  "Typed input becomes JSON through jq rather than string concatenation, and curl reads the payload from standard input."
                         },
                         {
                             "title":  "Map supported actions to fixed HTTP methods and paths",
                             "code": "#!/usr/bin/env bash\nset -euo pipefail\n\ncase \"${1-}\" in\n  pause) method='POST'; path='/v1/service/pause' ;;\n  resume) method='POST'; path='/v1/service/resume' ;;\n  status) method='GET'; path='/v1/service/status' ;;\n  *) exit 64 ;;\nesac\n/usr/bin/curl -q --proto '=https' --max-redirs 0 --request \"$method\" \\\n  --fail --silent --show-error \"https://api.example.test$path\"",
                             "blurb":  "Callers select a business action, not an arbitrary method or URL; destructive behavior remains explicit in the dispatch table."
                         }
                     ]
};
