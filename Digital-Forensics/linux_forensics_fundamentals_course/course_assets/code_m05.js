window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "GNU Bash/Linux and Python Examples: Review Services and Persistence",
  "codeExamples": [
    {
      "title": "Capture Timestamped Live Process Context",
      "language": "shell",
      "code": String.raw`set -Eeuo pipefail
umask 077
set -o noclobber

CASE=case-2026-06-26
install -d -m 700 -- "$CASE/live"
exec 2> >(tee -a "$CASE/errors.log" >&2)

printf 'ps_started_utc=%s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  > "$CASE/live/capture-times.txt"
ps -eo pid,ppid,user,lstart,cmd --forest > "$CASE/live/process-tree.txt"
printf 'ps_finished_utc=%s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  >> "$CASE/live/capture-times.txt"

printf 'ss_started_utc=%s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  >> "$CASE/live/capture-times.txt"
ss -tulpn > "$CASE/live/listening-sockets.txt"
printf 'ss_finished_utc=%s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  >> "$CASE/live/capture-times.txt"
`
    },
    {
      "title": "Inspect Unit Files Without Following Symlinks",
      "language": "shell",
      "code": String.raw`set -Eeuo pipefail
umask 077
set -o noclobber

CASE=case-2026-06-26
ROOT=/mnt/evidence/rootfs
install -d -m 700 -- "$CASE"
exec 2> >(tee -a "$CASE/errors.log" >&2)

[[ -d "$ROOT" && ! -L "$ROOT" ]] || {
  printf 'evidence root is missing, nondirectory, or symbolic: %s\n' "$ROOT" >&2
  exit 1
}
ROOT_REAL="$(readlink -f -- "$ROOT")"
roots=()
for path in \
  "$ROOT/etc/systemd/system" \
  "$ROOT/usr/lib/systemd/system" \
  "$ROOT/lib/systemd/system"; do
  if [[ -d "$path" && ! -L "$path" ]]; then
    resolved="$(readlink -f -- "$path")"
    [[ "$resolved" == "$ROOT_REAL"/* ]] && roots+=("$resolved")
  else
    printf 'optional unit directory missing: %s\n' "$path" \
      >> "$CASE/limitations.log"
  fi
done
((${"$"}{#roots[@]} > 0)) || { printf 'no unit directories available\n' >&2; exit 1; }

find "${"$"}{roots[@]}" -xdev -type f \
  \( -name '*.service' -o -path '*.service.d/*.conf' \) \
  -printf '%T@|%U|%G|%m|%p\0' > "$CASE/systemd-unit-files.nul"
find "${"$"}{roots[@]}" -xdev -type f \
  \( -name '*.service' -o -path '*.service.d/*.conf' \) \
  -print0 > "$CASE/systemd-unit-content-files.nul"

: > "$CASE/systemd-directives.txt"
while IFS= read -r -d '' unit_file; do
  set +e
  grep -EHin \
    '^[[:space:]]*(ExecStart|ExecStartPre|ExecStartPost|ExecCondition|Environment|EnvironmentFile|User|Group|WorkingDirectory|RuntimeDirectory|WantedBy|RequiredBy)[[:space:]]*=' \
    -- "$unit_file" >> "$CASE/systemd-directives.txt"
  status=$?
  set -e
  case "$status" in
    0|1) ;;
    *) printf 'cannot review systemd unit content: %s\n' "$unit_file" >&2; \
       exit "$status" ;;
  esac
done < "$CASE/systemd-unit-content-files.nul"
[[ -s "$CASE/systemd-directives.txt" ]] || {
  printf 'systemd files contained no selected directives\n' \
    >> "$CASE/limitations.log"
}
find "${"$"}{roots[@]}" -xdev -type l -printf '%p -> %l\0' \
  > "$CASE/systemd-symlinks.nul"
`
    },
    {
      "title": "Review Scheduled Tasks with Numeric Ownership",
      "language": "shell",
      "code": String.raw`set -Eeuo pipefail
umask 077
set -o noclobber

CASE=case-2026-06-26
ROOT=/mnt/evidence/rootfs
install -d -m 700 -- "$CASE"
exec 2> >(tee -a "$CASE/errors.log" >&2)

[[ -d "$ROOT" && ! -L "$ROOT" ]] || {
  printf 'evidence root is missing, nondirectory, or symbolic: %s\n' "$ROOT" >&2
  exit 1
}
ROOT_REAL="$(readlink -f -- "$ROOT")"
roots=()
for path in \
  "$ROOT/etc/cron.d" "$ROOT/etc/cron.daily" "$ROOT/etc/cron.hourly" \
  "$ROOT/etc/cron.monthly" "$ROOT/etc/cron.weekly" "$ROOT/var/spool/cron"; do
  if [[ -d "$path" && ! -L "$path" ]]; then
    resolved="$(readlink -f -- "$path")"
    [[ "$resolved" == "$ROOT_REAL"/* ]] && roots+=("$resolved")
  else
    printf 'optional scheduler path missing: %s\n' "$path" \
      >> "$CASE/limitations.log"
  fi
done
((${"$"}{#roots[@]} > 0)) || { printf 'no scheduler paths available\n' >&2; exit 1; }

export LC_ALL=C
find "${"$"}{roots[@]}" -xdev -type f -printf '%T@|%U|%G|%m|%p\0' \
  | sort -z -t '|' -k1,1nr > "$CASE/scheduled-task-files.nul"
`
    }
  ]
};
