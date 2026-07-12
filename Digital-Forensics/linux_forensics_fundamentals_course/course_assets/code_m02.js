window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "GNU Bash/Linux and Python Examples: Map the Linux Filesystem",
  "codeExamples": [
    {
      "title": "Identify Distribution and Record Missing Artifacts",
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
contained_regular() {
  local candidate="$1" resolved
  [[ -f "$candidate" && ! -L "$candidate" ]] || return 1
  resolved="$(readlink -f -- "$candidate")"
  [[ "$resolved" == "$ROOT_REAL"/* ]] || return 1
  printf '%s\n' "$resolved"
}

if os_release="$(contained_regular "$ROOT/etc/os-release")"; then
  cat -- "$os_release" > "$CASE/os-release.txt"
else
  printf 'required artifact missing, nonregular, or symbolic: %s\n' \
    "$ROOT/etc/os-release" >&2
  exit 1
fi
if issue="$(contained_regular "$ROOT/etc/issue")"; then
  cat -- "$issue" > "$CASE/issue.txt"
else
  printf 'optional artifact missing: %s\n' "$ROOT/etc/issue" \
    >> "$CASE/limitations.log"
fi

find "$ROOT/etc" -xdev -maxdepth 1 \
  \( -name '*release' -o -name '*version' \) -type f -print0 \
  > "$CASE/release-files.nul"
`
    },
    {
      "title": "Save Complete and Deliberately Sorted Inventories",
      "language": "shell",
      "code": String.raw`set -Eeuo pipefail
umask 077
set -o noclobber

CASE=case-2026-06-26
ROOT=/mnt/evidence/rootfs
install -d -m 700 -- "$CASE/inventory"
exec 2> >(tee -a "$CASE/errors.log" >&2)

[[ -d "$ROOT" && ! -L "$ROOT" ]] || {
  printf 'evidence root is missing, nondirectory, or symbolic: %s\n' "$ROOT" >&2
  exit 1
}
ROOT_REAL="$(readlink -f -- "$ROOT")"
export LC_ALL=C
for relative in etc var/log home root tmp opt usr/local; do
  source_path="$ROOT/$relative"
  label="${"$"}{relative//\//_}"
  if [[ ! -d "$source_path" || -L "$source_path" ]]; then
    printf 'directory missing: %s\n' "$source_path" >> "$CASE/limitations.log"
    continue
  fi

  resolved="$(readlink -f -- "$source_path")"
  if [[ "$resolved" != "$ROOT_REAL"/* ]]; then
    printf 'directory resolves outside evidence root: %s\n' "$source_path" \
      >> "$CASE/limitations.log"
    continue
  fi

  find "$resolved" -xdev -maxdepth 2 -type f \
    -printf '%T@|%s|%U|%G|%m|%p\0' |
    sort -z -t '|' -k1,1nr > "$CASE/inventory/$label-complete.nul"

  head -z -n 50 -- "$CASE/inventory/$label-complete.nul" \
    > "$CASE/inventory/$label-newest-50.nul"
done
`
    },
    {
      "title": "Count Regular Files Without Following Symlinks",
      "language": "python",
      "code": String.raw`import json
import os
import stat
from pathlib import Path


ROOT = Path("/mnt/evidence/rootfs")
CASE = Path("case-2026-06-26")
CASE.mkdir(mode=0o700, parents=True, exist_ok=True)

results = []
errors = []
for name in ["etc", "var/log", "home", "root", "tmp", "opt"]:
    path = ROOT / name
    count = 0

    def record_error(error: OSError) -> None:
        errors.append({"path": error.filename, "error": str(error)})

    if not path.is_symlink() and path.is_dir():
        for directory, _, filenames in os.walk(
            path, followlinks=False, onerror=record_error
        ):
            for filename in filenames:
                candidate = Path(directory) / filename
                try:
                    if stat.S_ISREG(candidate.lstat().st_mode):
                        count += 1
                except OSError as error:
                    record_error(error)
    else:
        errors.append({"path": str(path), "error": "missing or symbolic directory"})

    results.append({"path": str(path), "regular_files": count})

with (CASE / "filesystem-counts.json").open("x", encoding="utf-8") as output:
    json.dump({"results": results, "errors": errors}, output, indent=2)
    output.write("\n")
`
    }
  ]
};
