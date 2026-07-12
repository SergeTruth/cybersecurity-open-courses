window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "GNU Bash/Linux and Python Examples: Preserve Evidence and Notes",
  "codeExamples": [
    {
      "title": "Create a Nonempty, Filename-Safe Manifest",
      "language": "shell",
      "code": String.raw`set -Eeuo pipefail
umask 077
set -o noclobber

CASE=case-2026-06-26
COLLECTION="$CASE/collected"
MANIFEST="$CASE/collection-manifest.sha256z"
install -d -m 700 -- "$CASE"
exec 2> >(tee -a "$CASE/errors.log" >&2)

[[ -d "$COLLECTION" && ! -L "$COLLECTION" ]] || {
  printf 'collection missing or symbolic: %s\n' "$COLLECTION" >&2
  exit 1
}
file_count="$(find "$COLLECTION" -xdev -type f -printf . | wc -c)"
if ((file_count == 0)); then
  printf 'collection unexpectedly contains no regular files\n' >&2
  exit 1
fi

export LC_ALL=C
find "$COLLECTION" -xdev -type f -print0 | sort -z | \
  xargs -0 -r sha256sum --zero -- > "$MANIFEST"
printf 'files_hashed=%s\n' "$file_count" > "$CASE/manifest-count.txt"
sha256sum -- "$MANIFEST" > "$CASE/manifest-file.sha256"
`
    },
    {
      "title": "Record Collection Metadata Without Overwriting",
      "language": "python",
      "code": String.raw`import json
import os
import pwd
import subprocess
from datetime import datetime, timezone
from pathlib import Path


CASE = Path("case-2026-06-26")
SOURCE = Path("/mnt/evidence/rootfs")
CASE.mkdir(mode=0o700, parents=True, exist_ok=True)

record = {
    "case_id": CASE.name,
    "source": str(SOURCE),
    "source_resolved": str(SOURCE.resolve(strict=True)),
    "collection": "targeted Linux artifact collection",
    "timestamp_utc": datetime.now(timezone.utc).isoformat(),
    "analyst": pwd.getpwuid(os.geteuid()).pw_name,
    "python": subprocess.run(
        ["/usr/bin/python3", "--version"],
        check=True,
        capture_output=True,
        text=True,
        timeout=10,
    ).stdout.strip(),
    "limitations": ["live system state may differ from mounted evidence"],
}

with (CASE / "collection-record.json").open("x", encoding="utf-8") as output:
    json.dump(record, output, indent=2)
    output.write("\n")
`
    },
    {
      "title": "Write Findings with CSV Escaping",
      "language": "python",
      "code": String.raw`import csv
from pathlib import Path


CASE = Path("case-2026-06-26")
CASE.mkdir(mode=0o700, parents=True, exist_ok=True)
headers = ["finding_id", "evidence", "method", "confidence", "limitation"]
finding = {
    "finding_id": "F-001",
    "evidence": "auth.log shows accepted SSH login",
    "method": "searched both rotated authentication-log families",
    "confidence": "medium",
    "limitation": "source IP alone is not attribution",
}

with (CASE / "findings.csv").open("x", newline="", encoding="utf-8") as output:
    writer = csv.DictWriter(output, fieldnames=headers)
    writer.writeheader()
    writer.writerow(finding)
`
    }
  ]
};
