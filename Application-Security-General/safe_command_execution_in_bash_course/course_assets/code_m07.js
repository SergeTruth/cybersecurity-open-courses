window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Preserve pipeline statuses before publishing",
      "language": "bash",
      "blurb": "Both producer and compressor must succeed.",
      "code": "#!/usr/bin/env bash\nset -uo pipefail\nt=\"$(mktemp)\"; trap 'rm -f -- \"$t\"' EXIT; generate-report | gzip -c > \"$t\"; s=(\"${PIPESTATUS[@]}\")\n((s[0]==0&&s[1]==0)) || exit 70; mv -- \"$t\" /srv/reports/latest.json.gz\n"
    },
    {
      "title": "Distinguish grep no-match from failure",
      "language": "bash",
      "blurb": "Status one is expected absence, not operational success or failure.",
      "code": "#!/usr/bin/env bash\nset -u\ngrep -Fq -- READY \"${1:?file}\" && { printf 'ready\\n'; exit; }; s=$?; ((s==1)) && { printf 'not-ready\\n'; exit; }; exit \"$s\"\n"
    }
  ]
};
