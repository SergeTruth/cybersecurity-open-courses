window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Parse configuration without source",
      "language": "bash",
      "blurb": "Parser state starts empty; both keys must occur exactly once. Bounded lines, including a final line without a newline, are validated without source or eval.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nexport LC_ALL=C\nregion=''; format=''; seen_region=false; seen_format=false; count=0\nwhile IFS= read -r -n 257 line || [[ -n \"$line\" ]]; do\n  ((count += 1))\n  ((count <= 100 && ${#line} <= 256)) || exit 65\n  [[ -z \"$line\" || \"$line\" == \\#* ]] && continue\n  [[ \"$line\" == *=* ]] || exit 65\n  key=\"${line%%=*}\"; value=\"${line#*=}\"\n  [[ \"$value\" =~ ^[A-Za-z0-9._-]{1,40}$ ]] || exit 65\n  case \"$key\" in\n    REGION) [[ \"$seen_region\" == false ]] || exit 65; region=\"$value\"; seen_region=true ;;\n    FORMAT) [[ \"$seen_format\" == false ]] || exit 65; format=\"$value\"; seen_format=true ;;\n    *) exit 65 ;;\n  esac\ndone < \"${1:?config required}\"\n[[ \"$seen_region\" == true && \"$seen_format\" == true && \"$region\" =~ ^(east|west)$ && \"$format\" =~ ^(json|text)$ ]] || exit 65\n"
    },
    {
      "title": "Use a retention lookup",
      "language": "bash",
      "blurb": "An associative array replaces indirect evaluation.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\ndeclare -Ar DAYS=([audit]=365 [metrics]=30 [debug]=7); d=\"${DAYS[${1-}]-}\"; [[ -n \"$d\" ]] || exit 64\nfind /srv/logs -xdev -type f -name \"${1}-*.log\" -mtime \"+$d\" -print\n"
    }
  ]
};
