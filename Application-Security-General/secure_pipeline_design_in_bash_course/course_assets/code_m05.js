window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Quoting, Arguments, and Controlled Pipeline Inputs\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Keep a search term separate from grep options",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\npattern=\"${1:?pattern required}\"\n(( ${#pattern} \u003e= 1 \u0026\u0026 ${#pattern} \u003c= 80 )) || exit 64\n[[ \"$pattern\" != *$\u0027\\n\u0027* \u0026\u0026 \"$pattern\" != *$\u0027\\r\u0027* ]] || exit 64\n/usr/bin/printf \u0027%s\\n\u0027 \"${@:2}\" | /usr/bin/grep -F -- \"$pattern\"",
                             "blurb":  "The pattern is length-bounded and passed after --, so a leading dash remains data rather than changing grep behavior."
                         },
                         {
                             "title":  "Map a report mode to a known text-processing stage",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\ncase \"${1-}\" in\n  failures) program=\u0027$3 == \"failed\" {print $1}\u0027 ;;\n  slow) program=\u0027$4 + 0 \u003e 5000 {print $1}\u0027 ;;\n  *) exit 64 ;;\nesac\n/usr/bin/awk -F \u0027\\t\u0027 \"$program\" \"${2:?TSV input required}\" | /usr/bin/sort -u",
                             "blurb":  "Caller input selects one predefined awk program; it is never interpolated into executable awk or shell source."
                         }
                     ]
};
