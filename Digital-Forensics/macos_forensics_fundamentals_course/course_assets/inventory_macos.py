#!/usr/bin/env python3
"""Create complete, filename-safe inventories of selected macOS locations."""

from __future__ import annotations

import json
import stat
from datetime import datetime, timezone

from artifact_utils import (
    error_record,
    iter_regular_files,
    path_fields,
    write_failure_status,
    write_json_exclusive,
    write_stage_status,
)
from dfir_context import load_context


def main() -> None:
    context = load_context()
    run = context["run"]
    root = context["root"]
    stage = "high-value-inventory"
    inventory_path = run / "high-value-file-inventory.jsonl"
    library_path = run / "library-artifact-inventory.jsonl"
    if inventory_path.exists() or library_path.exists():
        raise RuntimeError("inventory derivative already exists")

    locations = ("Applications", "Users", "Library", "System", "private/var")
    count = 0
    bytes_seen = 0
    library_count = 0
    started = datetime.now(timezone.utc).isoformat()
    try:
        with inventory_path.open("x", encoding="utf-8", newline="\n") as inventory, (
            library_path.open("x", encoding="utf-8", newline="\n")
        ) as library:
            for location in locations:
                for path in iter_regular_files(root / location, root, run, stage):
                    metadata = path.lstat()
                    record = {
                        **path_fields(path, root),
                        "gid": metadata.st_gid,
                        "mode": stat.filemode(metadata.st_mode),
                        "mtime_ns": metadata.st_mtime_ns,
                        "size": metadata.st_size,
                        "source_location": location,
                        "uid": metadata.st_uid,
                    }
                    inventory.write(
                        json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n"
                    )
                    count += 1
                    bytes_seen += metadata.st_size
                    relative = record["path"]
                    suffix = path.suffix.lower()
                    is_system_library = relative.startswith("Library/")
                    is_user_library = "/Library/" in relative and relative.startswith(
                        "Users/"
                    )
                    if (is_system_library or is_user_library) and suffix in {
                        ".log",
                        ".plist",
                        ".sqlite",
                        ".sqlite3",
                    }:
                        library.write(
                            json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n"
                        )
                        library_count += 1
        if count == 0:
            raise RuntimeError("selected high-value locations contained no files")
        write_json_exclusive(
            run / "high-value-inventory-summary.json",
            {
                "completed_utc": datetime.now(timezone.utc).isoformat(),
                "file_count": count,
                "library_artifact_count": library_count,
                "scope": list(locations),
                "started_utc": started,
                "total_bytes": bytes_seen,
                "truncated": False,
            },
        )
    except BaseException as error:
        error_record(run, stage, root, error)
        write_failure_status(run, stage)
        raise
    write_stage_status(run, stage, 0)


if __name__ == "__main__":
    main()
