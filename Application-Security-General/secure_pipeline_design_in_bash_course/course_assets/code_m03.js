window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro": "These examples apply 'Data Boundaries Between Pipeline Stages' to distinct, reviewable Bash workflows. Runtime: GNU/Linux, Bash 5+, GNU command-line tools, and Python 3.11+ where shown. Install the demonstrated clients separately; fixed /etc and /opt policies and application-specific consumers are deployment-owned prerequisites. These are administrator/service scripts, not unauthenticated web endpoints.",
    "codeExamples":  [
                         {
                             "title":  "Pass filenames between stages with NUL delimiters",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nreadonly ROOT=\u0027/srv/orders/incoming\u0027\n/usr/bin/find -P \"$ROOT\" -xdev -maxdepth 1 -type f -name \u0027*.json\u0027 -print0 \\\n  | while IFS= read -r -d \u0027\u0027 file; do\n      /usr/bin/jq -e \u0027type == \"object\"\u0027 -- \"$file\" \u003e/dev/null\n    done\nstatus=(\"${PIPESTATUS[@]}\")\n(( status[0] == 0 \u0026\u0026 status[1] == 0 )) || exit 70",
                             "blurb":  "find and the read loop preserve spaces, newlines, and leading dashes without turning path data into shell syntax."
                         },
                         {
                             "title":  "Validate and extract a JSON boundary in one pass",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\n/usr/bin/jq -er \u0027\n  if type == \"object\" and keys == [\"order_id\",\"status\"] and\n    (.order_id | (type == \"string\" and test(\"^ORD-[0-9]{8}$\"))) and\n    (.status == \"ready\" or .status == \"held\")\n  then [.order_id,.status] | @tsv\n  else error(\"invalid order envelope\")\n  end\n\u0027 \"${1:?input JSON required}\" | /usr/bin/sort -u",
                             "blurb":  "One jq invocation opens the input once, enforces the exact envelope, and emits only the two validated scalar fields to the tabular consumer."
                         }
                     ]
};
