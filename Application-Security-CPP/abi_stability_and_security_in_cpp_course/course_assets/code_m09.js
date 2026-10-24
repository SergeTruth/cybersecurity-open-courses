window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Verification, and ABI Governance to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Compare the release ABI with an approved baseline",
      "language": "bash",
      "blurb": "The gate fails closed when ABI tools fail and accepts differences only through an explicit compatibility review.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nold=${1:?approved ABI dump required}\nlibrary=${2:?candidate shared library required}\nwork=$(mktemp -d)\ntrap 'rm -rf \"$work\"' EXIT\n\n/usr/bin/abi-dumper \"$library\" -o \"$work/candidate.abi\" -lver candidate\nif /usr/bin/abi-compliance-checker -l orders      -old \"$old\" -new \"$work/candidate.abi\" -report-path \"$work/report.html\"; then\n  echo \"ABI compatible\"\nelse\n  status=$?\n  echo \"ABI compatibility check failed with status $status\" >&2\n  exit \"$status\"\nfi\n"
    },
    {
      "title": "Verify the exact public symbol set",
      "language": "bash",
      "blurb": "The release check normalizes dynamic exports and compares them with a reviewed list rather than trusting build flags.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nlibrary=${1:?shared library required}\napproved=${2:?approved symbol list required}\nactual=$(mktemp)\ntrap 'rm -f \"$actual\"' EXIT\n\n/usr/bin/nm -D --defined-only --format=posix \"$library\" |\n  /usr/bin/awk '{print $1}' |\n  /usr/bin/sort -u > \"$actual\"\n\nif ! /usr/bin/cmp -s \"$approved\" \"$actual\"; then\n  /usr/bin/diff -u \"$approved\" \"$actual\" >&2 || true\n  exit 1\nfi\n"
    }
  ]
};
