window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "GNU Bash/Linux and Python Examples: Correlate Remote Access Evidence",
  "codeExamples": [
    {
      "title": "Summarize Validated IPv4 and IPv6 Sources",
      "language": "python",
      "code": String.raw`import ipaddress
import json
from collections import Counter
from pathlib import Path


CASE = Path("case-2026-06-26")
# Sequential workflow prerequisite: normalize logs in module 4 first.
counts = Counter()
with (CASE / "auth-events.jsonl").open(encoding="utf-8") as source:
    for line in source:
        event = json.loads(line)
        address = str(ipaddress.ip_address(event["address"]))
        counts[(event["result"], address)] += 1

rows = [
    {"result": result, "address": address, "count": count}
    for (result, address), count in counts.most_common()
]
with (CASE / "ssh-source-summary.json").open("x", encoding="utf-8") as output:
    json.dump(rows, output, indent=2)
    output.write("\n")
`
    },
    {
      "title": "Fingerprint Authorized Keys Without Hiding Errors",
      "language": "python",
      "code": String.raw`import json
import os
import stat
import subprocess
from pathlib import Path


ROOT = Path("/mnt/evidence/rootfs")
CASE = Path("case-2026-06-26")
SSH_KEYGEN = Path("/usr/bin/ssh-keygen")
CASE.mkdir(mode=0o700, parents=True, exist_ok=True)

records = []
for account_root in (ROOT / "home", ROOT / "root"):
    if account_root.is_symlink() or not account_root.is_dir():
        records.append({"path": str(account_root), "error": "account root unavailable"})
        continue
    for directory, _, filenames in os.walk(account_root, followlinks=False):
        if Path(directory).name != ".ssh" or "authorized_keys" not in filenames:
            continue
        path = Path(directory) / "authorized_keys"
        info = path.lstat()
        if not stat.S_ISREG(info.st_mode):
            records.append({"path": str(path), "error": "not a regular file"})
            continue
        result = subprocess.run(
            [str(SSH_KEYGEN), "-lf", str(path)],
            check=False,
            capture_output=True,
            text=True,
            timeout=10,
        )
        records.append(
            {
                "path": str(path.relative_to(ROOT)),
                "uid": info.st_uid,
                "gid": info.st_gid,
                "exit_status": result.returncode,
                "fingerprints": result.stdout.splitlines(),
                "error": result.stderr.strip(),
            }
        )

with (CASE / "authorized-key-fingerprints.json").open(
    "x", encoding="utf-8"
) as output:
    json.dump(records, output, indent=2, ensure_ascii=True)
    output.write("\n")
`
    },
    {
      "title": "Review Raw SSH Directives Without Following Symlinks",
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
config_roots=()
for path in "$ROOT/etc/ssh/sshd_config" "$ROOT/etc/ssh/sshd_config.d"; do
  if [[ -e "$path" && ! -L "$path" ]]; then
    resolved="$(readlink -f -- "$path")"
    if [[ "$resolved" == "$ROOT_REAL"/* ]]; then
      config_roots+=("$resolved")
    else
      printf 'rejected SSH configuration outside evidence root: %s\n' "$path" \
        >> "$CASE/limitations.log"
    fi
  else
    printf 'SSH configuration path missing: %s\n' "$path" \
      >> "$CASE/limitations.log"
  fi
done

if ((${"$"}{#config_roots[@]} > 0)); then
  find "${"$"}{config_roots[@]}" -xdev -type f \
    -print0 > "$CASE/sshd-config-files.nul"
  : > "$CASE/sshd-settings.txt"
  while IFS= read -r -d '' file; do
    set +e
    grep -EHin \
      '^[[:space:]]*(Port|ListenAddress|PermitRootLogin|PasswordAuthentication|AllowUsers|AllowGroups|Include|Match)([[:space:]]|$)' \
      -- "$file" >> "$CASE/sshd-settings.txt"
    status=$?
    set -e
    case "$status" in
      0|1) ;;
      *) printf 'cannot review SSH configuration: %s\n' "$file" >&2; \
         exit "$status" ;;
    esac
  done < "$CASE/sshd-config-files.nul"
  [[ -s "$CASE/sshd-settings.txt" ]] || {
    printf 'SSH configuration contained no selected raw directives\n' \
      >> "$CASE/limitations.log"
  }
  find "${"$"}{config_roots[@]}" -xdev -type l -printf '%p -> %l\0' \
    > "$CASE/sshd-config-symlinks.nul"
fi

find "$ROOT/etc" -xdev -maxdepth 3 \
  \( -name '*iptables*' -o -name '*nft*' -o -name '*ufw*' \) \
  -type f -print0 > "$CASE/firewall-config-files.nul"
`
    }
  ]
};
