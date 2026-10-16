window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Choose a tool from an immutable system directory",
      "language": "bash",
      "blurb": "A closed format selects a fixed executable under root-owned, non-writable /usr/bin; pathname execution relies on that directory remaining administrator-controlled.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n# Course runtime: Linux, Bash 5+, GNU tools; Python helpers require Python 3.12+\n# with current security fixes. Start from a trusted supervisor with a fixed PATH\n# and sanitized environment. Application CLIs under /opt and custom *ctl commands\n# are reviewed deployment adapters; install/configure them before using a snippet.\n\ncase \"${1-}\" in\n  gzip) tool='/usr/bin/gzip'; arguments=(-c) ;;\n  xz) tool='/usr/bin/xz'; arguments=(-c -T1) ;;\n  *) exit 64 ;;\nesac\nmetadata=\"$(stat -Lc '%u %a %F' /usr/bin)\" || exit 77\nread -r owner mode kind <<< \"$metadata\"\n[[ \"$owner\" == 0 && \"$kind\" == 'directory' ]] || exit 77\n(( (8#$mode & 8#022) == 0 )) || exit 77\n[[ -x \"$tool\" && ! -L \"$tool\" ]] || exit 77\n# All ancestor directories and the executable remain administrator-controlled.\nmetadata=\"$(stat -Lc '%u %a %F' -- \"$tool\")\" || exit 77\nread -r file_owner file_mode file_kind <<< \"$metadata\"\n[[ \"$file_owner\" == 0 && \"$file_kind\" == 'regular file' ]] || exit 77\n(( (8#$file_mode & 8#022) == 0 )) || exit 77\n\"$tool\" \"${arguments[@]}\" < \"${2:?input required}\"\n"
    },
    {
      "title": "Verify a helper in an immutable deployment directory",
      "language": "bash",
      "blurb": "The fixed helper must match an approved digest; its later pathname launch relies on root-owned, non-writable /opt/orders/bin remaining administrator-controlled.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\ntool='/opt/orders/bin/decoder'\nexpected=\"${DECODER_SHA256:?approved digest required}\"\n[[ \"$expected\" =~ ^[a-f0-9]{64}$ && -x \"$tool\" && ! -L \"$tool\" ]] || exit 77\nmetadata=\"$(stat -Lc '%u %a %F' /opt/orders/bin)\" || exit 77\nread -r owner mode kind <<< \"$metadata\"\n[[ \"$owner\" == 0 && \"$kind\" == 'directory' ]] || exit 77\n(( (8#$mode & 8#022) == 0 )) || exit 77\n# All ancestor directories and the executable remain administrator-controlled.\nmetadata=\"$(stat -Lc '%u %a %F' -- \"$tool\")\" || exit 77\nread -r file_owner file_mode file_kind <<< \"$metadata\"\n[[ \"$file_owner\" == 0 && \"$file_kind\" == 'regular file' ]] || exit 77\n(( (8#$file_mode & 8#022) == 0 )) || exit 77\nactual=\"$(/usr/bin/sha256sum -- \"$tool\")\"\nactual=\"${actual%% *}\"\n[[ \"$actual\" == \"$expected\" ]] || exit 77\n\"$tool\" --self-test\n"
    }
  ]
};
