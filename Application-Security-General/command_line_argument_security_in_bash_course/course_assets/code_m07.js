window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Validate an action and target combination",
      "language": "bash",
      "blurb": "A small decision matrix permits reports for historical periods but limits deletion to the staging target.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\naction=\"${1:?action required}\"\ntarget=\"${2:?target required}\"\nperiod=\"${3:?period required}\"\n[[ \"$period\" =~ ^20[2-9][0-9]-(0[1-9]|1[0-2])$ ]] || exit 64\n\ncase \"$action:$target\" in\n  report:staging|report:archive) ;;\n  delete:staging) ;;\n  *) printf 'unsupported action and target combination\\n' >&2; exit 64 ;;\nesac\n"
    },
    {
      "title": "Bound a date range before export",
      "language": "bash",
      "blurb": "Calendar syntax and ordering are checked with date before the range reaches the export command.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nstart=\"${1:?start date required}\"\nend=\"${2:?end date required}\"\n[[ \"$start\" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ && \"$end\" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] || exit 64\nstart_epoch=\"$(date -u -d \"$start\" +%s)\" || exit 64\nend_epoch=\"$(date -u -d \"$end\" +%s)\" || exit 64\n((start_epoch <= end_epoch && end_epoch - start_epoch <= 2678400)) || exit 64\nreportctl export --from \"$start\" --to \"$end\" --format json\n"
    }
  ]
};
