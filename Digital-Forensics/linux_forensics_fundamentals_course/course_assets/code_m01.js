window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "GNU Bash/Linux and Python Examples: Preserve Context and Integrity",
  "codeExamples": [
    {
      "title": "Hash Evidence Into a Unique Run Record",
      "language": "shell",
      "code": String.raw`set -Eeuo pipefail
umask 077
set -o noclobber

CASE=case-2026-06-26
IMAGE=/mnt/evidence/linux-disk.img
ROOT=/mnt/evidence/rootfs
RUN_ID="$(date -u +%Y%m%dT%H%M%SZ)-$$"
RUN="$CASE/runs/$RUN_ID"
install -d -m 700 -- "$RUN"
exec 2> >(tee -a "$CASE/errors.log" >&2)

trap 'status=$?; printf "exit_status=%s\n" "$status" > "$RUN/exit-status.txt"; exit "$status"' EXIT

[[ -f "$IMAGE" && ! -L "$IMAGE" ]] || {
  printf 'evidence image is missing, nonregular, or symbolic: %s\n' "$IMAGE" >&2
  exit 1
}
[[ -d "$ROOT" && ! -L "$ROOT" ]] || {
  printf 'analysis root is missing, nondirectory, or symbolic: %s\n' "$ROOT" >&2
  exit 1
}
SOURCE_REAL="$(readlink -f -- "$IMAGE")"
ROOT_REAL="$(readlink -f -- "$ROOT")"
if ! IMAGE_MOUNT="$(
  findmnt -no TARGET,SOURCE,FSTYPE,OPTIONS --target "$IMAGE"
)"; then
  printf 'cannot identify the mount containing the evidence image: %s\n' \
    "$IMAGE" >&2
  exit 1
fi
if ! ROOT_MOUNT="$(
  findmnt -no TARGET,SOURCE,FSTYPE,OPTIONS --target "$ROOT"
)"; then
  printf 'cannot identify the mounted analysis root: %s\n' "$ROOT" >&2
  exit 1
fi
printf '%s\n' "$IMAGE_MOUNT" > "$RUN/image-mount.txt"
printf '%s\n' "$ROOT_MOUNT" > "$RUN/rootfs-mount.txt"

IMAGE_OPTIONS="$(findmnt -no OPTIONS --target "$IMAGE")"
ROOT_OPTIONS="$(findmnt -no OPTIONS --target "$ROOT")"
case ",$IMAGE_OPTIONS," in
  *,ro,*) ;;
  *) printf 'evidence-image storage is not read-only: %s\n' \
       "$IMAGE_OPTIONS" >&2; exit 1 ;;
esac
case ",$ROOT_OPTIONS," in
  *,ro,*) ;;
  *) printf 'analysis root is not mounted read-only: %s\n' \
       "$ROOT_OPTIONS" >&2; exit 1 ;;
esac

sha256sum -- "$IMAGE" > "$RUN/evidence-hashes.txt"
stat --printf 'name=%n\nsize=%s\nmodified=%y\n' -- "$IMAGE" \
  > "$RUN/evidence-stat.txt"

{
  printf 'case_id=%s\n' "$CASE"
  printf 'run_id=%s\n' "$RUN_ID"
  printf 'collected_utc=%s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  printf 'analyst=%s\n' "$(id -un)"
  printf 'source=%s\n' "$IMAGE"
  printf 'source_resolved=%s\n' "$SOURCE_REAL"
  printf 'analysis_root=%s\n' "$ROOT"
  printf 'analysis_root_resolved=%s\n' "$ROOT_REAL"
  printf 'image_mount_options=%s\n' "$IMAGE_OPTIONS"
  printf 'rootfs_mount_options=%s\n' "$ROOT_OPTIONS"
  printf '%s\n' \
    'rootfs_source_mapping=review rootfs-mount.txt and acquisition notes'
  printf 'sha256sum_version=%s\n' "$(sha256sum --version | head -n 1)"
  printf 'command=%s\n' 'sha256sum -- "$IMAGE"'
} > "$RUN/collection-metadata.txt"
`
    },
    {
      "title": "Create a Non-Overwriting Case Note",
      "language": "shell",
      "code": String.raw`set -Eeuo pipefail
umask 077
set -o noclobber

CASE=case-2026-06-26
RUN_ID="$(date -u +%Y%m%dT%H%M%SZ)-$$"
RUN="$CASE/runs/$RUN_ID"
install -d -m 700 -- "$RUN"
exec 2> >(tee -a "$CASE/errors.log" >&2)

{
  printf 'case_id=%s\n' "$CASE"
  printf 'run_id=%s\n' "$RUN_ID"
  printf 'analyst=%s\n' "$(id -un)"
  printf 'started_utc=%s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  printf 'scope=%s\n' 'authorized Linux forensic review'
  printf 'limitations=%s\n' 'record known access and tool limitations here'
} > "$RUN/case-notes.txt"
`
    }
  ]
};
