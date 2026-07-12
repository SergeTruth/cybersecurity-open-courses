window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "GNU Bash/Linux and Python Examples: Review User and Account Evidence",
  "codeExamples": [
    {
      "title": "Classify Every Local Account Row",
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
[[ -f "$ROOT/etc/passwd" && ! -L "$ROOT/etc/passwd" ]] || {
  printf 'passwd is missing, nonregular, or symbolic\n' >&2
  exit 1
}
PASSWD="$(readlink -f -- "$ROOT/etc/passwd")"
[[ "$PASSWD" == "$ROOT_REAL"/* ]] || {
  printf 'passwd resolves outside evidence root\n' >&2
  exit 1
}
awk -F: '
  NF != 7 {
    printf "line=%d classification=malformed raw=%s\n", NR, $0
    next
  }
  {
    uid_ok = ($3 ~ /^(0|[1-9][0-9]*)$/)
    gid_ok = ($4 ~ /^(0|[1-9][0-9]*)$/)
    disabled = ($7 == "/bin/false" || $7 == "/usr/bin/false" ||
                $7 == "/sbin/nologin" || $7 == "/usr/sbin/nologin")
    duplicate_user = (++seen_user[$1] > 1)
    duplicate_uid = (uid_ok && ++seen_uid[$3] > 1)
    printf "line=%d user=%s uid=%s gid=%s home=%s shell=%s " \
           "login_disabled=%s uid_valid=%s gid_valid=%s " \
           "duplicate_user=%s duplicate_uid=%s empty_user=%s\n", \
           NR, $1, $3, $4, $6, $7, disabled, uid_ok, gid_ok, \
           duplicate_user, duplicate_uid, ($1 == "")
  }
' "$PASSWD" > "$CASE/account-classification.txt"
`
    },
    {
      "title": "Review Administrative Policy Without Hiding Gaps",
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
if [[ -f "$ROOT/etc/group" && ! -L "$ROOT/etc/group" ]]; then
  GROUP="$(readlink -f -- "$ROOT/etc/group")"
  [[ "$GROUP" == "$ROOT_REAL"/* ]] || {
    printf 'group resolves outside evidence root\n' >&2
    exit 1
  }
  if ! grep -E '^(sudo|wheel|adm):' -- "$GROUP" \
      > "$CASE/admin-groups.txt"; then
    printf 'no sudo, wheel, or adm rows found\n' >> "$CASE/limitations.log"
  fi
else
  printf 'required artifact missing: %s\n' "$ROOT/etc/group" >&2
  exit 1
fi

for path in "$ROOT/etc/sudoers" "$ROOT/etc/sudoers.d"; do
  if [[ -e "$path" && ! -L "$path" ]]; then
    resolved="$(readlink -f -- "$path")"
    if [[ "$resolved" == "$ROOT_REAL"/* ]]; then
      find "$resolved" -xdev -maxdepth 1 -type f -print0
    else
      printf 'rejected sudo policy path outside evidence root: %s\n' "$path" \
        >> "$CASE/limitations.log"
    fi
  else
    printf 'optional sudo policy path missing: %s\n' "$path" \
      >> "$CASE/limitations.log"
  fi
done > "$CASE/sudo-policy-files.nul"
`
    },
    {
      "title": "List SSH Keys and Histories with Numeric Ownership",
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
for path in "$ROOT/home" "$ROOT/root"; do
  if [[ -d "$path" && ! -L "$path" ]]; then
    resolved="$(readlink -f -- "$path")"
    if [[ "$resolved" == "$ROOT_REAL"/* ]]; then
      roots+=("$resolved")
    fi
  else
    printf 'account path missing: %s\n' "$path" >> "$CASE/limitations.log"
  fi
done
((${"$"}{#roots[@]} > 0)) || { printf 'no account roots available\n' >&2; exit 1; }

find "${"$"}{roots[@]}" -xdev \
  \( -name authorized_keys -o -name known_hosts -o -name '.*history' \) \
  -type f -printf '%T@|%U|%G|%m|%p\0' > "$CASE/account-artifacts.nul"
`
    },
    {
      "title": "Parse passwd Rows and Retain Malformed Records",
      "language": "python",
      "code": String.raw`import json
import re
from pathlib import Path


ROOT = Path("/mnt/evidence/rootfs")
CASE = Path("case-2026-06-26")
CASE.mkdir(mode=0o700, parents=True, exist_ok=True)

DISABLED_SHELLS = {
    "/bin/false",
    "/usr/bin/false",
    "/sbin/nologin",
    "/usr/sbin/nologin",
}
CANONICAL_ID = re.compile(r"0|[1-9][0-9]*")

accounts = []
anomalies = []
seen_users = set()
seen_uids = set()
passwd = ROOT / "etc/passwd"
root_real = ROOT.resolve(strict=True)
if passwd.is_symlink():
    raise RuntimeError("passwd is symbolic; record the link instead of following it")
passwd.resolve(strict=True).relative_to(root_real)

known_shells = set()
shells_file = ROOT / "etc/shells"
if shells_file.is_file() and not shells_file.is_symlink():
    shells_file.resolve(strict=True).relative_to(root_real)
    known_shells = {
        line.strip()
        for line in shells_file.read_text(
            encoding="utf-8", errors="replace"
        ).splitlines()
        if line.strip() and not line.lstrip().startswith("#")
    }

with passwd.open(encoding="utf-8", errors="replace") as stream:
    for line_number, raw_line in enumerate(stream, start=1):
        line = raw_line.rstrip("\n")
        fields = line.split(":")
        if len(fields) != 7:
            anomalies.append(
                {"line": line_number, "reason": "field count", "raw": line}
            )
            continue

        user, _, uid_text, gid_text, comment, home, shell = fields
        issues = []
        uid = int(uid_text, 10) if CANONICAL_ID.fullmatch(uid_text) else None
        gid = int(gid_text, 10) if CANONICAL_ID.fullmatch(gid_text) else None
        if uid is None:
            issues.append("uid_not_canonical_nonnegative_decimal")
        if gid is None:
            issues.append("gid_not_canonical_nonnegative_decimal")
        if not user:
            issues.append("empty_username")
        if user in seen_users:
            issues.append("duplicate_username")
        seen_users.add(user)
        if uid is not None:
            if uid in seen_uids:
                issues.append("duplicate_uid")
            seen_uids.add(uid)
        if home and not home.startswith("/"):
            issues.append("home_path_not_absolute")
        if shell and not shell.startswith("/"):
            issues.append("shell_path_not_absolute")
        login_disabled = shell in DISABLED_SHELLS
        if known_shells and not login_disabled and shell not in known_shells:
            issues.append("shell_not_listed_in_evidence_etc_shells")
        accounts.append(
            {
                "line": line_number,
                "user": user,
                "uid": uid,
                "uid_text": uid_text,
                "gid": gid,
                "gid_text": gid_text,
                "home": home,
                "shell": shell,
                "login_disabled": login_disabled,
                "issues": issues,
            }
        )

with (CASE / "passwd-review.json").open("x", encoding="utf-8") as output:
    json.dump({"accounts": accounts, "anomalies": anomalies}, output, indent=2)
    output.write("\n")
`
    }
  ]
};
