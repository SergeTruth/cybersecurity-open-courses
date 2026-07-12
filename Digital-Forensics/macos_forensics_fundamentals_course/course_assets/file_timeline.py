#!/usr/bin/env python3
"""Create filename-safe file and quarantine timelines with exact timestamps."""

from __future__ import annotations

import base64
import errno
import json
import os
from pathlib import Path

from artifact_utils import (
    error_record,
    iter_regular_files,
    limitation,
    path_fields,
    write_failure_status,
    write_json_exclusive,
    write_stage_status,
)
from dfir_context import load_context


def selected_files(run: Path, root: Path):
    stage = "file-timeline"
    for path in iter_regular_files(root / "Users", root, run, stage):
        relative = path.relative_to(root)
        if len(relative.parts) >= 3 and relative.parts[2] in {"Desktop", "Downloads"}:
            yield path


def file_timeline(run: Path, root: Path) -> list[Path]:
    output_path = run / "file-timeline.jsonl"
    files: list[Path] = []
    event_count = 0
    exact_birthtime_unavailable = False
    with output_path.open("x", encoding="utf-8", newline="\n") as output:
        for path in selected_files(run, root):
            files.append(path)
            metadata = path.lstat()
            fields = path_fields(path, root)
            times = (
                ("mtime", metadata.st_mtime_ns, "file content modification time"),
                ("atime", metadata.st_atime_ns, "file access time"),
                ("ctime", metadata.st_ctime_ns, "inode metadata change time"),
            )
            for family, timestamp_ns, meaning in times:
                record = {
                    **fields,
                    "gid": metadata.st_gid,
                    "size": metadata.st_size,
                    "source_timestamp": timestamp_ns,
                    "timestamp_family": family,
                    "timestamp_meaning": meaning,
                    "timestamp_ns": timestamp_ns,
                    "timezone_assumption": "POSIX epoch timestamp normalized to UTC",
                    "uid": metadata.st_uid,
                }
                output.write(json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n")
                event_count += 1
            birth_ns = getattr(metadata, "st_birthtime_ns", None)
            if birth_ns is not None:
                output.write(
                    json.dumps(
                        {
                            **fields,
                            "gid": metadata.st_gid,
                            "size": metadata.st_size,
                            "source_timestamp": birth_ns,
                            "timestamp_family": "btime",
                            "timestamp_meaning": "file creation or birth time",
                            "timestamp_ns": birth_ns,
                            "timezone_assumption": (
                                "POSIX epoch timestamp normalized to UTC"
                            ),
                            "uid": metadata.st_uid,
                        },
                        ensure_ascii=False,
                        sort_keys=True,
                    )
                    + "\n"
                )
                event_count += 1
            elif hasattr(metadata, "st_birthtime"):
                exact_birthtime_unavailable = True
    if not files:
        limitation(run, "file-timeline", root / "Users", "no scoped files found")
    if exact_birthtime_unavailable:
        limitation(
            run,
            "file-timeline",
            root,
            "runtime exposed birth time without an exact integer-nanosecond value",
        )
    write_json_exclusive(
        run / "file-timeline-summary.json",
        {
            "event_count": event_count,
            "file_count": len(files),
            "families": ["mtime", "atime", "ctime", "btime when exact"],
            "scope": "all user Desktop and Downloads regular files",
            "timestamp_precision": "integer nanoseconds",
        },
    )
    return files


def quarantine_timeline(run: Path, root: Path, files: list[Path]) -> None:
    stage = "quarantine-attributes"
    output_path = run / "quarantine-attributes.jsonl"
    count = 0
    no_attribute = {getattr(errno, "ENOATTR", 93), getattr(errno, "ENODATA", 61)}
    with output_path.open("x", encoding="utf-8", newline="\n") as output:
        for path in files:
            if "Downloads" not in path.relative_to(root).parts:
                continue
            try:
                value = os.getxattr(path, "com.apple.quarantine", follow_symlinks=False)
            except OSError as error:
                if error.errno in no_attribute:
                    continue
                error_record(run, stage, path, error)
                continue
            decoded = value.decode("utf-8", errors="replace")
            record: dict[str, object] = {
                **path_fields(path, root),
                "attribute_bytes_b64": base64.b64encode(value).decode("ascii"),
                "attribute_text": decoded,
            }
            parts = decoded.split(";")
            if len(parts) >= 2:
                try:
                    timestamp_seconds = int(parts[1], 16)
                    record.update(
                        {
                            "source_timestamp": parts[1],
                            "timestamp_meaning": "quarantine event timestamp",
                            "timestamp_ns": timestamp_seconds * 1_000_000_000,
                            "timezone_assumption": "hex POSIX seconds interpreted as UTC",
                        }
                    )
                except ValueError:
                    record["timestamp_error"] = "quarantine timestamp is not hexadecimal"
            else:
                record["timestamp_error"] = "quarantine attribute has too few fields"
            output.write(json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n")
            count += 1
    write_json_exclusive(
        run / "quarantine-attributes-summary.json",
        {"attribute_count": count, "scope": "scoped Downloads files"},
    )


def main() -> None:
    context = load_context()
    run = context["run"]
    root = context["root"]
    try:
        files = file_timeline(run, root)
        quarantine_timeline(run, root, files)
    except BaseException as error:
        error_record(run, "file-and-quarantine-timeline", root, error)
        write_failure_status(run, "file-and-quarantine-timeline")
        raise
    write_stage_status(run, "file-and-quarantine-timeline", 0)


if __name__ == "__main__":
    main()
