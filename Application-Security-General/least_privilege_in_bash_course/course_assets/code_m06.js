window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Run a tool from an immutable system directory",
      "language": "bash",
      "blurb": "The closed environment invokes a fixed tool only after /usr/bin is confirmed root-owned and non-writable; this directory is the pathname-stability boundary.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nreadonly TOOL='/usr/bin/sha256sum'\nmetadata=\"$(stat -Lc '%u %a %F' /usr/bin)\" || exit 77\nread -r owner mode kind <<< \"$metadata\"\n[[ \"$owner\" == 0 && \"$kind\" == 'directory' ]] || exit 77\n(( (8#$mode & 8#022) == 0 )) || exit 77\n[[ -x \"$TOOL\" && ! -L \"$TOOL\" ]] || exit 77\n# All ancestor directories and the executable remain administrator-controlled.\nmetadata=\"$(stat -Lc '%u %a %F' -- \"$TOOL\")\" || exit 77\nread -r file_owner file_mode file_kind <<< \"$metadata\"\n[[ \"$file_owner\" == 0 && \"$file_kind\" == 'regular file' ]] || exit 77\n(( (8#$file_mode & 8#022) == 0 )) || exit 77\nfile=\"${1:?file required}\"\n[[ \"$file\" =~ ^/srv/orders/packages/[A-Za-z0-9._-]{1,64}$ ]] || exit 64\nenv -i PATH='/usr/bin:/bin' LANG=C HOME=/nonexistent \"$TOOL\" -- \"$file\"\n"
    },
    {
      "title": "Verify a tool under an immutable system directory",
      "language": "bash",
      "blurb": "Descriptor and pathname identity are compared at startup; any later pathname launch relies on root-owned, non-writable /usr/bin remaining administrator-controlled.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\ntool='/usr/bin/rsync'\nmetadata=\"$(stat -Lc '%u %a %F' /usr/bin)\" || exit 77\nread -r dir_owner dir_mode dir_kind <<< \"$metadata\"\n[[ \"$dir_owner\" == 0 && \"$dir_kind\" == 'directory' ]] || exit 77\n(( (8#$dir_mode & 8#022) == 0 )) || exit 77\nexec {tool_fd}<\"$tool\"\nmetadata=\"$(stat -Lc '%d %i %u %a %F' \"/proc/$$/fd/$tool_fd\")\" || exit 77\nread -r dev inode uid mode kind <<<\"$metadata\"\nmetadata=\"$(stat -Lc '%d %i' \"$tool\")\" || exit 77\nread -r path_dev path_inode <<< \"$metadata\"\n[[ \"$dev:$inode\" == \"$path_dev:$path_inode\" && \"$uid\" == 0 && \"$kind\" == 'regular file' ]] || exit 77\n(( (8#$mode & 8#022) == 0 )) || exit 77\nexec {tool_fd}<&-\n"
    }
  ]
};
