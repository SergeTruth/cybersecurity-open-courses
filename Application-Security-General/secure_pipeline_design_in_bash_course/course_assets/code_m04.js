window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Exit Status, pipefail, and Safe Failure\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Inspect every stage result with PIPESTATUS",
                             "code":  "#!/usr/bin/env bash\nset -uo pipefail\n\n/usr/bin/journalctl -t orders-api --since \u0027-5 minutes\u0027 \\\n  | /usr/bin/grep -F \u0027event=request_failed\u0027 \\\n  | /usr/bin/wc -l \u003e\"${1:?count output required}\"\nstatus=(\"${PIPESTATUS[@]}\")\n(( status[0] == 0 )) || exit 70\n(( status[1] == 0 || status[1] == 1 )) || exit 70\n(( status[2] == 0 )) || exit 73",
                             "blurb":  "A failed producer, parser, or sink cannot be hidden by the final command; each status maps to a distinct operational error."
                         },
                         {
                             "title":  "Bound a pipeline and preserve its failure status",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nstatus=0\n/usr/bin/timeout --signal=TERM --kill-after=2s 20s \\\n  bash -o pipefail -c \u0027/usr/bin/tail -n 5000 -- \"$1\" | /usr/bin/gzip -c \u003e\"$2\"\u0027 \\\n  bash \"${1:?input required}\" \"${2:?output required}\" || status=$?\ncase \"$status\" in\n  0) ;;\n  124|137) printf \u0027pipeline timed out\\n\u0027 \u003e\u00262; exit 75 ;;\n  *) printf \u0027pipeline failed: %s\\n\u0027 \"$status\" \u003e\u00262; exit 70 ;;\nesac",
                             "blurb":  "timeout controls total runtime, pipefail propagates an early-stage error, and the wrapper reports timeout separately from processing failure."
                         }
                     ]
};
