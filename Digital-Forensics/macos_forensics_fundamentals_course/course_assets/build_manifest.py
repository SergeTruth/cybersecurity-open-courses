#!/usr/bin/env python3
"""Create a filename-safe, nonempty forensic JSON Lines manifest."""

from __future__ import annotations

import argparse
import base64
import hashlib
import json
import os
import stat
from datetime import datetime, timezone
from pathlib import Path

from dfir_context import _reject_symlink_components


def digest(path: Path) -> str:
    result = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            result.update(block)
    return result.hexdigest()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--summary", required=True, type=Path)
    parser.add_argument("--source-id", required=True)
    parser.add_argument("--limitations", type=Path)
    arguments = parser.parse_args()

    _reject_symlink_components(arguments.root, "manifest root")
    root = arguments.root.resolve(strict=True)
    if not root.is_dir():
        raise SystemExit("manifest root must be a non-symlink directory")
    if arguments.output.exists() or arguments.summary.exists():
        raise SystemExit("manifest outputs already exist")

    root_device = root.stat(follow_symlinks=False).st_dev
    count = 0
    total_bytes = 0
    skipped_cross_filesystem = 0
    skipped_nonregular = 0
    skipped_symlinks = 0
    collected = datetime.now(timezone.utc).isoformat()

    def traversal_error(error: OSError) -> None:
        raise error

    partial = arguments.output.with_name(
        f".{arguments.output.name}.partial-{os.getpid()}"
    )
    try:
        with partial.open("x", encoding="utf-8", newline="\n") as output:
            for directory, names, filenames in os.walk(
                root,
                followlinks=False,
                onerror=traversal_error,
            ):
                names.sort(key=os.fsencode)
                filenames.sort(key=os.fsencode)
                directory_path = Path(directory)
                kept_names = []
                for name in names:
                    candidate = directory_path / name
                    metadata = candidate.lstat()
                    if stat.S_ISLNK(metadata.st_mode):
                        skipped_symlinks += 1
                        continue
                    if metadata.st_dev == root_device:
                        kept_names.append(name)
                    else:
                        skipped_cross_filesystem += 1
                names[:] = kept_names
                for name in filenames:
                    path = directory_path / name
                    metadata = path.lstat()
                    if not stat.S_ISREG(metadata.st_mode):
                        if stat.S_ISLNK(metadata.st_mode):
                            skipped_symlinks += 1
                        else:
                            skipped_nonregular += 1
                        continue
                    if metadata.st_dev != root_device:
                        skipped_cross_filesystem += 1
                        continue
                    relative = path.relative_to(root)
                    relative_bytes = os.fsencode(relative)
                    record = {
                        "collection_time_utc": collected,
                        "gid": metadata.st_gid,
                        "mode": stat.filemode(metadata.st_mode),
                        "mtime_ns": metadata.st_mtime_ns,
                        "path": os.fsdecode(relative_bytes),
                        "path_bytes_b64": base64.b64encode(
                            relative_bytes
                        ).decode("ascii"),
                        "sha256": digest(path),
                        "size": metadata.st_size,
                        "source_id": arguments.source_id,
                        "uid": metadata.st_uid,
                    }
                    output.write(
                        json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n"
                    )
                    count += 1
                    total_bytes += metadata.st_size
    except BaseException:
        partial.unlink(missing_ok=True)
        raise

    if count == 0:
        partial.unlink()
        raise SystemExit("collection is unexpectedly empty")
    os.link(partial, arguments.output)
    partial.unlink()
    manifest_hash = digest(arguments.output)
    summary = {
        "collection_time_utc": collected,
        "file_count": count,
        "manifest_sha256": manifest_hash,
        "root": str(root),
        "skipped_cross_filesystem": skipped_cross_filesystem,
        "skipped_nonregular": skipped_nonregular,
        "skipped_symlinks": skipped_symlinks,
        "source_id": arguments.source_id,
        "total_bytes": total_bytes,
    }
    with arguments.summary.open("x", encoding="utf-8", newline="\n") as output:
        output.write(
            json.dumps(summary, ensure_ascii=False, indent=2, sort_keys=True) + "\n"
        )
    skipped = skipped_cross_filesystem + skipped_nonregular + skipped_symlinks
    if skipped and arguments.limitations:
        record = {
            "kind": "limitation",
            "message": (
                "manifest skipped "
                f"{skipped_symlinks} symlinks, "
                f"{skipped_cross_filesystem} cross-filesystem objects, and "
                f"{skipped_nonregular} other non-regular objects"
            ),
            "path": str(root),
            "stage": "collection-manifest",
            "time_utc": collected,
        }
        with arguments.limitations.open(
            "a", encoding="utf-8", newline="\n"
        ) as limitations:
            limitations.write(
                json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n"
            )


if __name__ == "__main__":
    main()
