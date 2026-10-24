window.COURSE_CODE_MODULE = {
    "title":  "Code Examples",
    "codeIntro":  "These examples apply \u0027Temporary Files, Process Substitution, and Intermediate Data\u0027 to distinct, reviewable Bash workflows.",
    "codeExamples":  [
                         {
                             "title":  "Replace sensitive process substitution with a private FIFO",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\numask 077\n\nwork=\"$(mktemp -d)\"; trap \u0027rm -rf -- \"$work\"\u0027 EXIT\n/usr/bin/mkfifo -m 600 \"$work/events\"\n/opt/orders/bin/event-export --format=jsonl \u003e\"$work/events\" \u0026 producer=$!\nconsumer_status=0\n/usr/bin/jq -e \u0027type == \"object\"\u0027 \u003c\"$work/events\" \u003e/dev/null || consumer_status=$?\nproducer_status=0; wait \"$producer\" || producer_status=$?\n(( producer_status == 0 \u0026\u0026 consumer_status == 0 )) || exit 70",
                             "blurb":  "A private directory contains the FIFO, the producer PID is explicit, and both producer and consumer results are checked."
                         },
                         {
                             "title":  "Keep intermediate data in an opened unlinked file",
                             "code":  "#!/usr/bin/env bash\nset -euo pipefail\numask 077\n\ntemporary=\"$(mktemp)\"\nexec {temporary_fd}\u003c\u003e\"$temporary\"\n/usr/bin/rm -f -- \"$temporary\"\n/opt/orders/bin/export-public-metrics \u003e\u0026\"$temporary_fd\"\nseek_status=0\nFD=\"$temporary_fd\" /usr/bin/python3 -c \u0027import os; os.lseek(int(os.environ[\"FD\"]),0,0)\u0027 || seek_status=$?\n(( seek_status == 0 )) || exit 70\n/usr/bin/jq -e \u0027type == \"array\"\u0027 \"/proc/$$/fd/$temporary_fd\" \u003e/dev/null",
                             "blurb":  "The temporary pathname is removed immediately while its descriptor remains open, limiting later access and eliminating predictable cleanup names."
                         }
                     ]
};
