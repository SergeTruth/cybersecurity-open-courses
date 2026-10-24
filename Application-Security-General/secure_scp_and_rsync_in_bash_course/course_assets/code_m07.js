window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Dry Runs, Incremental Sync, Deletes, and Overwrite Safety\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Treat rsync dry-run output as review evidence only",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\numask 077\n\nreview=\"$(mktemp)\"\n/usr/bin/rsync --archive --delete --dry-run --itemize-changes -- \\\n  /srv/orders/mirror/ \u0027mirror-host:/srv/orders/mirror/\u0027 \u003e\"$review\"\nprintf \u0027review_file=%s\\n\u0027 \"$review\"\n[[ \"${TRANSFER_APPROVAL-}\" == \u0027approved-after-current-review\u0027 ]] || exit 77\n/usr/bin/rsync --archive --delete-delay --itemize-changes -- \\\n  /srv/orders/mirror/ \u0027mirror-host:/srv/orders/mirror/\u0027",
                             "blurb":  "The preview is saved for an operator, but the script explicitly requires a separate approval before a fresh real transfer; it does not claim the preview binds later state."
                         },
                         {
                             "title":  "Delay deletions until transferred files are complete",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\n/usr/bin/rsync --archive --delay-updates --partial-dir=.partial \\\n  --delete-delay --max-delete=100 --itemize-changes -- \\\n  /srv/orders/published/ \u0027publish-host:/srv/orders/published/\u0027",
                             "blurb":  "A fixed mirror uses partial staging and delete-delay so interrupted copies do not immediately remove the previous remote set."
                         }
                     ]
};
