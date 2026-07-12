window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "GNU Bash/Linux and Python Examples: Correlate Artifacts Into a Timeline",
  "codeExamples": [
    {
      "title": "Build a Normalized Cross-Artifact Timeline",
      "language": "python",
      "code": String.raw`import json
from pathlib import Path, PurePosixPath


CASE = Path("case-2026-06-26")
AUTH_EVENTS = CASE / "auth-events.jsonl"
FILE_EVENTS = CASE / "file-timeline.jsonl"
OUTPUT = CASE / "correlated-timeline.jsonl"
ASSUMPTIONS = CASE / "auth-timestamp-assumptions.json"

# Sequential workflow prerequisite: run the module 4 and module 6 exporters.
if not ASSUMPTIONS.is_file():
    raise RuntimeError("authentication timestamp assumptions are missing")

events = []
with AUTH_EVENTS.open(encoding="utf-8") as source:
    for line in source:
        event = json.loads(line)
        events.append(
            {
                "timestamp_ns": int(event["timestamp_ns"]),
                "timestamp": event["timestamp"],
                "kind": "auth",
                "detail": event,
            }
        )

with FILE_EVENTS.open(encoding="utf-8") as source:
    for line in source:
        record = json.loads(line)
        path = PurePosixPath(record["path"])
        if ".ssh" not in path.parts and "systemd" not in path.parts:
            continue
        events.append(
            {
                "timestamp_ns": int(record["mtime_ns"]),
                "timestamp": record["mtime_utc"],
                "kind": "file",
                "detail": record,
            }
        )

events.sort(key=lambda event: event["timestamp_ns"])
with OUTPUT.open("x", encoding="utf-8") as output:
    for event in events:
        output.write(json.dumps(event, ensure_ascii=True) + "\n")

`
    },
    {
      "title": "Limited Read-Only Triage Preview",
      "language": "shell",
      "code": String.raw`set -Eeuo pipefail
umask 077
set -o noclobber
shopt -s nullglob

CASE=case-2026-06-26
ROOT=/mnt/evidence/rootfs
START='2026-06-20 00:00:00 UTC'
END='2026-06-27 00:00:00 UTC'
install -d -m 700 -- "$CASE/triage-preview"
exec 2> >(tee -a "$CASE/errors.log" >&2)

printf '%s\n' \
  'LIMITED PREVIEW: selected artifacts only; not a complete chronological merge.' \
  > "$CASE/triage-preview/README.txt"
[[ -d "$ROOT" && ! -L "$ROOT" ]] || {
  printf 'evidence root is missing, nondirectory, or symbolic: %s\n' "$ROOT" >&2
  exit 1
}
[[ -f "$ROOT/etc/os-release" && ! -L "$ROOT/etc/os-release" ]] || {
  printf 'os-release is missing, nonregular, or symbolic\n' >&2
  exit 1
}
[[ -f "$ROOT/etc/passwd" && ! -L "$ROOT/etc/passwd" ]] || {
  printf 'passwd is missing, nonregular, or symbolic\n' >&2
  exit 1
}
ROOT_REAL="$(readlink -f -- "$ROOT")"
OS_RELEASE="$(readlink -f -- "$ROOT/etc/os-release")"
PASSWD="$(readlink -f -- "$ROOT/etc/passwd")"
[[ "$OS_RELEASE" == "$ROOT_REAL"/* && "$PASSWD" == "$ROOT_REAL"/* ]] || {
  printf 'required triage artifact resolves outside evidence root\n' >&2
  exit 1
}
cat -- "$OS_RELEASE" > "$CASE/triage-preview/os-release.txt"
awk '
BEGIN { FS = ":" }
NF != 7 {
  printf "line=%d classification=malformed raw=%s\n", NR, $0
  next
}
{
  disabled = ($7 == "/bin/false" ||
    $7 == "/usr/bin/false" ||
    $7 == "/sbin/nologin" ||
    $7 == "/usr/sbin/nologin")
  uid_valid = ($3 ~ /^(0|[1-9][0-9]*)$/)
  printf "user=%s uid=%s home=%s shell=%s " \
         "login_disabled=%s uid_valid=%s\n", \
         $1, $3, $6, $7, disabled, uid_valid
}' "$PASSWD" > "$CASE/triage-preview/account-classification.txt"

candidates=("$ROOT"/var/log/auth.log* "$ROOT"/var/log/secure*)
logs=()
for candidate in "${"$"}{candidates[@]}"; do
  if [[ -L "$candidate" ]]; then
    printf 'authentication log is symbolic and was skipped: %s\n' "$candidate" \
      >> "$CASE/limitations.log"
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
  if [[ "$resolved" == "$ROOT_REAL"/* ]]; then
    logs+=("$resolved")
  else
    printf 'authentication log resolves outside evidence root: %s\n' \
      "$candidate" >> "$CASE/limitations.log"
  fi
done
if ((${"$"}{#logs[@]} > 0)); then
  set +e
  zgrep -HnE 'Accepted|Failed|sudo' -- "${"$"}{logs[@]}" \
    > "$CASE/triage-preview/auth-events.txt"
  status=$?
  set -e
  case "$status" in
    0) ;;
    1) printf 'authentication logs contained no selected triage events\n' \
         >> "$CASE/limitations.log" ;;
    *) exit "$status" ;;
  esac
else
  printf 'no authentication log family found\n' >> "$CASE/limitations.log"
fi

if [[ -d "$ROOT/etc/systemd/system" && ! -L "$ROOT/etc/systemd/system" ]]; then
  systemd_root="$(readlink -f -- "$ROOT/etc/systemd/system")"
  [[ "$systemd_root" == "$ROOT_REAL"/* ]] || {
    printf 'systemd path resolves outside evidence root\n' >&2
    exit 1
  }
  find "$systemd_root" -xdev -type f \
    -newermt "$START" ! -newermt "$END" -print0 \
    > "$CASE/triage-preview/service-files.nul"
else
  printf 'systemd override directory missing\n' >> "$CASE/limitations.log"
fi

roots=()
for path in "$ROOT/home" "$ROOT/root"; do
  if [[ -d "$path" && ! -L "$path" ]]; then
    resolved="$(readlink -f -- "$path")"
    [[ "$resolved" == "$ROOT_REAL"/* ]] && roots+=("$resolved")
  fi
done
if ((${"$"}{#roots[@]} > 0)); then
  find "${"$"}{roots[@]}" -xdev -path '*/.ssh/authorized_keys' -type f -print0 \
    > "$CASE/triage-preview/authorized-keys.nul"
else
  printf 'no account roots available for SSH-key preview\n' \
    >> "$CASE/limitations.log"
fi
`
    }
  ]
};
