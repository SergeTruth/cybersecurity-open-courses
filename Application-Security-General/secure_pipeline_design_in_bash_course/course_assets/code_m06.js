window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Safer Text Processing and Filtering\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Filter a bounded set of structured log fields",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\n/usr/bin/jq -er \u0027\n  select(type == \"object\") |\n  [.service,.event] |\n  select(all(.[]; type == \"string\" and length \u003c= 64)) |\n  @tsv\n\u0027 \"${1:?JSON-lines log required}\" | LC_ALL=C /usr/bin/sort | /usr/bin/uniq -c",
                             "blurb":  "jq selects named fields and rejects unbounded strings before sort and uniq receive them."
                         },
                         {
                             "title":  "Use fixed-string matching for operator-selected identifiers",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nrequest_id=\"${1:?request id required}\"\n[[ \"$request_id\" =~ ^REQ-[A-F0-9]{16}$ ]] || exit 64\n\nset +e\n/usr/bin/journalctl -t orders-api --since \u0027-1 hour\u0027 --output=cat |\n  /usr/bin/awk -v needle=\"request_id=$request_id\" \u0027\n    index($0, needle) \u0026\u0026 emitted \u003c 200 { print; emitted++ }\n  \u0027\nstatus=(\"${PIPESTATUS[@]}\")\nset -e\n(( ${#status[@]} == 2 \u0026\u0026 status[0] == 0 \u0026\u0026 status[1] == 0 )) || exit 70",
                             "blurb":  "A closed identifier grammar and an awk substring check avoid regular-expression input while consuming the full journal stream and emitting at most 200 matches."
                         }
                     ]
};
