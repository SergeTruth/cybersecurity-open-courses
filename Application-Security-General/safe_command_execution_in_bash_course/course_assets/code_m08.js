window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Check a tool under an immutable system directory",
      "language": "bash",
      "blurb": "The startup check requires root-owned, non-writable /usr/bin and a protected regular executable; pathname execution relies on that directory remaining administrator-controlled.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nmetadata=\"$(stat -Lc '%u %a %F' /usr/bin)\" || exit 77\n\nread -r dir_owner dir_mode dir_kind <<< \"$metadata\"\n[[ \"$dir_owner\" == 0 && \"$dir_kind\" == 'directory' ]] || exit 77\n(( (8#$dir_mode & 8#022) == 0 )) || exit 77\nmetadata=\"$(stat -Lc '%u %a %F' /usr/bin/rsync)\" || exit 77\nread -r owner mode kind <<< \"$metadata\"\n[[ \"$owner\" == 0 && \"$kind\" == 'regular file' ]] || exit 77\n(( (8#$mode & 8#022) == 0 )) || exit 77\n/usr/bin/rsync --version\n"
    },
    {
      "title": "Execute with fixed PATH and locale",
      "language": "bash",
      "blurb": "env -i removes loader and proxy state.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n[[ -f \"${1-}\" ]] || exit 66; exec env -i PATH=/usr/bin:/bin LANG=C HOME=/nonexistent /usr/bin/sha256sum -- \"$1\"\n"
    }
  ]
};
