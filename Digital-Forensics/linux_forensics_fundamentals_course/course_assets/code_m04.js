window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "GNU Bash/Linux and Python Examples: Query Linux Logs Safely",
  "codeExamples": [
    {
      "title": "Search Rotated Logs with Provenance",
      "language": "shell",
      "code": String.raw`set -Eeuo pipefail
umask 077
set -o noclobber
shopt -s nullglob

CASE=case-2026-06-26
ROOT=/mnt/evidence/rootfs
install -d -m 700 -- "$CASE"
exec 2> >(tee -a "$CASE/errors.log" >&2)

[[ -d "$ROOT" && ! -L "$ROOT" ]] || {
  printf 'evidence root is missing, nondirectory, or symbolic: %s\n' "$ROOT" >&2
  exit 1
}
candidates=("$ROOT"/var/log/auth.log* "$ROOT"/var/log/secure*)
logs=()
ROOT_REAL="$(readlink -f -- "$ROOT")"
: > "$CASE/auth-log-symlinks.txt"
for candidate in "${"$"}{candidates[@]}"; do
  if [[ -L "$candidate" ]]; then
    printf '%s -> %s\n' "$candidate" "$(readlink -- "$candidate")" \
      >> "$CASE/auth-log-symlinks.txt"
    continue
  fi
  [[ -f "$candidate" ]] || continue
  case "$candidate" in
    *.xz|*.bz2|*.zst)
      printf 'unsupported compressed authentication log: %s\n' "$candidate" \
        >> "$CASE/limitations.log"
      continue
      ;;
  esac
  resolved="$(readlink -f -- "$candidate")"
  case "$resolved" in
    "$ROOT_REAL"/*) logs+=("$resolved") ;;
    *) printf 'rejected authentication log outside evidence root: %s\n' \
         "$candidate" >> "$CASE/limitations.log" ;;
  esac
done
if ((${"$"}{#logs[@]} == 0)); then
  printf 'no auth.log* or secure* artifacts found\n' >> "$CASE/limitations.log"
  exit 0
fi

set +e
zgrep -HnE 'Accepted|Failed|sudo|session opened|session closed' \
  -- "${"$"}{logs[@]}" > "$CASE/auth-events.txt"
status=$?
set -e
case "$status" in
  0) ;;
  1) printf 'authentication logs contained no selected events\n' \
       >> "$CASE/limitations.log" ;;
  *) printf 'zgrep failed with status %s\n' "$status" >&2; exit "$status" ;;
esac
`
    },
    {
      "title": "Read an Optional Offline Journal",
      "language": "shell",
      "code": String.raw`set -Eeuo pipefail
umask 077
set -o noclobber

CASE=case-2026-06-26
ROOT=/mnt/evidence/rootfs
JOURNAL="$ROOT/var/log/journal"
install -d -m 700 -- "$CASE"
exec 2> >(tee -a "$CASE/errors.log" >&2)

[[ -d "$ROOT" && ! -L "$ROOT" ]] || {
  printf 'evidence root is missing, nondirectory, or symbolic: %s\n' "$ROOT" >&2
  exit 1
}
ROOT_REAL="$(readlink -f -- "$ROOT")"
if [[ ! -d "$JOURNAL" || -L "$JOURNAL" ]]; then
  printf 'journal directory missing or symbolic: %s\n' "$JOURNAL" \
    >> "$CASE/limitations.log"
  exit 0
fi

JOURNAL_REAL="$(readlink -f -- "$JOURNAL")"
case "$JOURNAL_REAL" in
  "$ROOT_REAL"/*) ;;
  *) printf 'journal directory resolves outside evidence root: %s\n' \
       "$JOURNAL" >&2; exit 1 ;;
esac

find "$JOURNAL_REAL" -xdev -type l -printf '%p -> %l\0' \
  > "$CASE/journal-symlinks.nul"
if [[ -s "$CASE/journal-symlinks.nul" ]]; then
  printf 'journal analysis skipped because symbolic entries were present\n' \
    >> "$CASE/limitations.log"
  exit 0
fi

journalctl --directory "$JOURNAL_REAL" \
  --since '2026-06-20 00:00:00 UTC' \
  --until '2026-06-27 00:00:00 UTC' \
  --output short-iso --no-pager > "$CASE/journal-events.txt"
`
    },
    {
      "title": "Normalize Plain and Gzip Authentication Logs",
      "language": "python",
      "code": String.raw`import calendar
import gzip
import ipaddress
import json
import re
import stat
from datetime import datetime, timezone
from pathlib import Path
from zoneinfo import ZoneInfo


ROOT = Path("/mnt/evidence/rootfs")
CASE = Path("case-2026-06-26")
LOG_DIRECTORY = ROOT / "var/log"
INCIDENT_YEAR = 2026
EVIDENCE_TIMEZONE = ZoneInfo("UTC")
PATTERN = re.compile(
    r"^(?P<stamp>[A-Z][a-z]{2}\s+\d{1,2}\s+\d\d:\d\d:\d\d)"
    r".*?(?P<result>Accepted|Failed).*? from (?P<address>\S+)"
)


def open_text_log(path: Path):
    if path.suffix == ".gz":
        return gzip.open(path, mode="rt", encoding="utf-8", errors="replace")
    return path.open(mode="rt", encoding="utf-8", errors="replace")


def timestamp_fields(stamp: str) -> tuple[int, str]:
    naive = datetime.strptime(
        f"{INCIDENT_YEAR} {stamp}", "%Y %b %d %H:%M:%S"
    )
    aware = naive.replace(tzinfo=EVIDENCE_TIMEZONE)
    utc_value = aware.astimezone(timezone.utc)
    epoch_seconds = calendar.timegm(utc_value.timetuple())
    return epoch_seconds * 1_000_000_000, aware.isoformat()


CASE.mkdir(mode=0o700, parents=True, exist_ok=True)
root_real = ROOT.resolve(strict=True)
if LOG_DIRECTORY.is_symlink():
    raise RuntimeError("var/log is symbolic; refuse to traverse it")
LOG_DIRECTORY.resolve(strict=True).relative_to(root_real)
paths = sorted(
    set(LOG_DIRECTORY.glob("auth.log*")) | set(LOG_DIRECTORY.glob("secure*"))
)
errors = []
if not paths:
    errors.append({"source": str(LOG_DIRECTORY), "error": "no log family found"})
with (CASE / "auth-events.jsonl").open("x", encoding="utf-8") as output:
    for path in paths:
        try:
            if path.suffix in {".bz2", ".xz", ".zst"}:
                errors.append(
                    {"source": str(path), "error": "unsupported compression format"}
                )
                continue
            if path.is_symlink() or not stat.S_ISREG(path.lstat().st_mode):
                errors.append({"source": str(path), "error": "not a regular file"})
                continue
            resolved = path.resolve(strict=True)
            resolved.relative_to(root_real)
            with open_text_log(resolved) as stream:
                for line_number, line in enumerate(stream, start=1):
                    match = PATTERN.search(line)
                    if match is None:
                        continue
                    try:
                        address = str(ipaddress.ip_address(match["address"]))
                        timestamp_ns, timestamp = timestamp_fields(match["stamp"])
                    except ValueError as error:
                        errors.append(
                            {
                                "source": str(path),
                                "line": line_number,
                                "error": str(error),
                            }
                        )
                        continue
                    event = {
                        "timestamp_ns": timestamp_ns,
                        "timestamp": timestamp,
                        "kind": "auth",
                        "result": match["result"],
                        "address": address,
                        "source": str(path),
                        "line": line_number,
                        "raw": line.rstrip("\n"),
                    }
                    output.write(json.dumps(event, ensure_ascii=True) + "\n")
        except (OSError, EOFError, gzip.BadGzipFile) as error:
            errors.append({"source": str(path), "error": str(error)})

with (CASE / "auth-parser-errors.json").open("x", encoding="utf-8") as output:
    json.dump(errors, output, indent=2, ensure_ascii=True)
    output.write("\n")
with (CASE / "auth-timestamp-assumptions.json").open(
    "x", encoding="utf-8"
) as output:
    json.dump(
        {
            "incident_year": INCIDENT_YEAR,
            "evidence_timezone": str(EVIDENCE_TIMEZONE),
            "clock_skew": "unknown",
            "dst_ambiguity": "review manually if the timezone observes DST",
            "timestamp_source": "traditional syslog prefix",
        },
        output,
        indent=2,
    )
    output.write("\n")
`
    }
  ]
};
