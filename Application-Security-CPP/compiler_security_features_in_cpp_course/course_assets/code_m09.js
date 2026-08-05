window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Verification, Governance, and Release Readiness to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Verify Linux release hardening from the artifact",
      "language": "bash",
      "blurb": "The gate inspects the shipped binary rather than inferring protection from build-system intent.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nbinary=${1:?release binary required}\n\n/usr/bin/readelf -h \"$binary\" | /usr/bin/grep -Eq 'Type:[[:space:]]+DYN'\n/usr/bin/readelf -d \"$binary\" | /usr/bin/grep -Eq 'BIND_NOW|FLAGS.*NOW'\n/usr/bin/readelf -sW \"$binary\" | /usr/bin/grep -q '__stack_chk_fail'\n/usr/bin/readelf -W -l \"$binary\" |\n  /usr/bin/awk '/GNU_RELRO/ { relro=1 } /GNU_STACK/ { stack=1; if ($0 ~ /RWE/) exit 1 }\n                   END { exit !(relro && stack) }'\n"
    },
    {
      "title": "Record a scoped hardening exception",
      "language": "json",
      "blurb": "The machine-readable exception names one target, one missing control, an owner, compensating evidence, and an expiration date.",
      "code": "{\n  \"target\": \"orders-armv7-helper\",\n  \"control\": \"branch-protection\",\n  \"reason\": \"selected compiler does not implement the required option\",\n  \"owner\": \"platform-security\",\n  \"compensatingControls\": [\"signed package\", \"non-networked helper\", \"CFI integration test\"],\n  \"expires\": \"2026-10-31\",\n  \"trackingIssue\": \"ORDERS-2190\"\n}\n"
    }
  ]
};
