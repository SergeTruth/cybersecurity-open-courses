window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Preserve tar operands in an array",
      "language": "bash",
      "blurb": "Optional compression changes a code-owned vector.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nname=\"${1-}\"; [[ \"$name\" =~ ^orders-[0-9]{8}\\.tar(\\.gz)?$ ]] || exit 64\na=(--create --directory=/srv/orders/export --file=\"/srv/orders/archive/$name\"); [[ \"$name\" == *.gz ]] && a+=(--gzip)\ntar \"${a[@]}\" -- data.json manifest.txt\n"
    },
    {
      "title": "Forward operands with quoted positional parameters",
      "language": "bash",
      "blurb": "Nested functions preserve empty and whitespace values.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nemit(){ printf '<%s>\\n' \"$@\"; }; audit(){ printf 'count=%d\\n' \"$#\" >&2; emit \"$@\"; }\nv=('north region' '' '*.json'); audit \"${v[@]}\"\n"
    }
  ]
};
