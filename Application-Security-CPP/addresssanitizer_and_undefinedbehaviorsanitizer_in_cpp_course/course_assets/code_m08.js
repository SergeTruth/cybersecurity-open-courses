window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Limitations, Tradeoffs, and Safe Expectations to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Review suppressions as exact, expiring exceptions",
      "language": "text",
      "blurb": "Each exact suppression has a tracking issue and ISO expiration date that the following CI policy validates against an application-owned review date.",
      "code": "# exception issue=ORDERS-1842 expires=2026-10-31\ninterceptor_via_fun:third_party_legacy_decode\n\n# exception issue=ORDERS-1917 expires=2026-10-31\nleak:vendor_tls_cache_initialize\n"
    },
    {
      "title": "Reject broad, untracked, or expired suppressions in CI",
      "language": "bash",
      "blurb": "The gate uses a reviewed GNU date parser to require real calendar dates, then enforces one tracked, unexpired metadata record per exact suppression.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\nfile=${1:?suppression file required}\ntoday=${2:?application-owned ISO review date required}\n\nvalid_iso_date() {\n  local candidate=${1:?date required}\n  local normalized\n  if ! normalized=$(\n    /usr/bin/date -u --date=\"$candidate\" '+%F' 2>/dev/null\n  ) || [[ \"$normalized\" != \"$candidate\" ]]; then\n    return 1\n  fi\n}\n\nif ! valid_iso_date \"$today\"; then\n  echo \"review date is not a real YYYY-MM-DD calendar date\" >&2\n  exit 1\nfi\n\nmetadata_pattern='^# exception issue=([A-Z0-9-]+) expires=([0-9]{4}-[0-9]{2}-[0-9]{2})$'\nsuppression_pattern='^(interceptor_via_fun|leak):[A-Za-z0-9_:.-]+$'\npending=0\n\nwhile IFS= read -r line || [[ -n \"$line\" ]]; do\n  if [[ -z \"$line\" ]]; then\n    continue\n  elif [[ \"$line\" =~ $metadata_pattern ]]; then\n    if (( pending )); then\n      echo \"metadata is missing its suppression\" >&2\n      exit 1\n    fi\n    expiry=${BASH_REMATCH[2]}\n    if ! valid_iso_date \"$expiry\"; then\n      echo \"suppression expiration is not a real calendar date\" >&2\n      exit 1\n    fi\n    if [[ \"$expiry\" < \"$today\" ]]; then\n      echo \"suppression has expired\" >&2\n      exit 1\n    fi\n    pending=1\n  elif [[ \"$line\" =~ $suppression_pattern ]]; then\n    if (( ! pending )); then\n      echo \"suppression lacks issue and expiration metadata\" >&2\n      exit 1\n    fi\n    pending=0\n  else\n    echo \"unsupported suppression syntax\" >&2\n    exit 1\n  fi\ndone < \"$file\"\n\nif (( pending )); then\n  echo \"metadata is missing its suppression\" >&2\n  exit 1\nfi\n"
    }
  ]
};
