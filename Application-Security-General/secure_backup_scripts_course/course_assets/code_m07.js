window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Retention, Immutability, and Cleanup Safety\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Delete only expired archives beneath a fixed retention root",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\n[[ \"${RETENTION_APPROVAL-}\" == \u0027orders-30-day-policy\u0027 ]] || exit 77\nreadonly ROOT=\u0027/srv/backups/orders\u0027\n[[ -d \"$ROOT\" \u0026\u0026 ! -L \"$ROOT\" ]] || exit 77\n\n/usr/bin/find -P \"$ROOT\" -xdev -mindepth 2 -maxdepth 2 \\\n  -type f -links 1 -name \u0027orders-*.tar.gz.gpg\u0027 -mtime +30 \\\n  -printf \u0027deleting expired backup %p\\n\u0027 -delete",
                             "blurb":  "The cleanup command never accepts a caller path, does not follow symlinks, requires a retention approval token, and limits deletion to regular single-link archive files."
                         },
                         {
                             "title":  "Require object-lock retention on the remote backup bucket",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\n\nreadonly BUCKET=\u0027company-orders-recovery\u0027\nconfiguration=\"$(/usr/bin/aws s3api get-object-lock-configuration --bucket \"$BUCKET\" --output json)\" || exit 70\nmode=\"$(/usr/bin/jq -r \u0027.ObjectLockConfiguration.Rule.DefaultRetention.Mode // empty\u0027 \u003c\u003c\u003c\"$configuration\")\"\ndays=\"$(/usr/bin/jq -r \u0027.ObjectLockConfiguration.Rule.DefaultRetention.Days // 0\u0027 \u003c\u003c\u003c\"$configuration\")\"\n[[ \"$mode\" == \u0027COMPLIANCE\u0027 \u0026\u0026 \"$days\" =~ ^[0-9]+$ ]] || exit 77\n(( days \u003e= 30 )) || exit 77",
                             "blurb":  "The gate checks the actual bucket configuration and refuses upload unless compliance retention meets the application policy."
                         }
                     ]
};
