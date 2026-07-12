#!/usr/bin/env python3
"""Shared filename-safe collection helpers for the macOS course."""

from __future__ import annotations

import base64
import hashlib
import json
import os
import shutil
import stat
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterator

from dfir_context import _reject_symlink_components, append_jsonl


def sha256(path: Path) -> str:
    result = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            result.update(block)
    return result.hexdigest()


def path_fields(path: Path, root: Path) -> dict[str, str]:
    relative = path.relative_to(root)
    encoded = os.fsencode(relative)
    return {
        "path": os.fsdecode(encoded),
        "path_bytes_b64": base64.b64encode(encoded).decode("ascii"),
    }


def limitation(run: Path, stage: str, path: Path, message: str) -> None:
    append_jsonl(
        run / "limitations.jsonl",
        {
            "kind": "limitation",
            "message": message,
            "path": str(path),
            "stage": stage,
            "time_utc": datetime.now(timezone.utc).isoformat(),
        },
    )


def error_record(run: Path, stage: str, path: Path, error: BaseException) -> None:
    append_jsonl(
        run / "errors.jsonl",
        {
            "error": str(error),
            "kind": "error",
            "path": str(path),
            "stage": stage,
            "time_utc": datetime.now(timezone.utc).isoformat(),
        },
    )


def iter_regular_files(
    start: Path,
    root: Path,
    run: Path,
    stage: str,
) -> Iterator[Path]:
    try:
        _reject_symlink_components(start, "artifact search root")
        resolved_start = start.resolve(strict=True)
        resolved_start.relative_to(root)
    except (OSError, RuntimeError, ValueError) as error:
        error_record(run, stage, start, error)
        return
    if not resolved_start.is_dir():
        limitation(run, stage, start, "artifact search root is not a directory")
        return
    root_device = root.stat(follow_symlinks=False).st_dev

    def on_error(error: OSError) -> None:
        error_record(run, stage, Path(error.filename or resolved_start), error)

    for directory, names, filenames in os.walk(
        resolved_start,
        followlinks=False,
        onerror=on_error,
    ):
        names.sort(key=os.fsencode)
        filenames.sort(key=os.fsencode)
        directory_path = Path(directory)
        kept = []
        for name in names:
            candidate = directory_path / name
            try:
                metadata = candidate.lstat()
            except OSError as error:
                error_record(run, stage, candidate, error)
                continue
            if stat.S_ISLNK(metadata.st_mode):
                limitation(run, stage, candidate, "symbolic-link directory was skipped")
            elif metadata.st_dev != root_device:
                limitation(run, stage, candidate, "cross-filesystem directory was skipped")
            else:
                kept.append(name)
        names[:] = kept
        for name in filenames:
            candidate = directory_path / name
            try:
                metadata = candidate.lstat()
            except OSError as error:
                error_record(run, stage, candidate, error)
                continue
            if stat.S_ISLNK(metadata.st_mode):
                limitation(run, stage, candidate, "symbolic-link file was skipped")
            elif metadata.st_dev != root_device:
                limitation(run, stage, candidate, "cross-filesystem file was skipped")
            elif stat.S_ISREG(metadata.st_mode):
                yield candidate
            else:
                limitation(run, stage, candidate, "non-regular object was skipped")


def contained_regular_file(
    path: Path,
    root: Path,
    run: Path,
    stage: str,
) -> Path | None:
    if not path.exists():
        limitation(run, stage, path, "selected artifact is absent")
        return None
    try:
        _reject_symlink_components(path, "selected artifact")
        resolved = path.resolve(strict=True)
        resolved.relative_to(root)
        metadata = resolved.lstat()
    except (OSError, RuntimeError, ValueError) as error:
        error_record(run, stage, path, error)
        return None
    if not stat.S_ISREG(metadata.st_mode):
        limitation(run, stage, path, "selected artifact is not a regular file")
        return None
    return resolved


def copy_verified(source: Path, destination: Path) -> dict[str, Any]:
    _reject_symlink_components(source, "copy source")
    metadata = source.lstat()
    if not stat.S_ISREG(metadata.st_mode) or source.is_symlink():
        raise RuntimeError(f"source is not a regular non-symlink file: {source}")
    destination.parent.mkdir(mode=0o700, parents=True, exist_ok=True)
    source_hash = sha256(source)
    with source.open("rb") as source_handle, destination.open("xb") as target:
        shutil.copyfileobj(source_handle, target, length=1024 * 1024)
    copied_hash = sha256(destination)
    if copied_hash != source_hash:
        raise RuntimeError(f"copy hash mismatch: {source}")
    destination.chmod(0o400)
    return {
        "copied_path": str(destination),
        "copied_sha256": copied_hash,
        "copy_time_utc": datetime.now(timezone.utc).isoformat(),
        "gid": metadata.st_gid,
        "mode": stat.filemode(metadata.st_mode),
        "mtime_ns": metadata.st_mtime_ns,
        "size": metadata.st_size,
        "source_path": str(source),
        "source_sha256": source_hash,
        "uid": metadata.st_uid,
    }


def bounded_value(value: Any, depth: int = 0) -> Any:
    if depth >= 5:
        return "<depth limit>"
    if isinstance(value, dict):
        keys = sorted(value, key=lambda item: str(item))[:50]
        result = {str(key): bounded_value(value[key], depth + 1) for key in keys}
        if len(value) > len(keys):
            result["<omitted>"] = len(value) - len(keys)
        return result
    if isinstance(value, (list, tuple)):
        result = [bounded_value(item, depth + 1) for item in value[:50]]
        if len(value) > len(result):
            result.append(f"<{len(value) - len(result)} items omitted>")
        return result
    if isinstance(value, bytes):
        encoded = base64.b64encode(value[:4096]).decode("ascii")
        return {"bytes_b64": encoded, "truncated": len(value) > 4096}
    if isinstance(value, str):
        return value[:4096] + ("<truncated>" if len(value) > 4096 else "")
    if isinstance(value, (bool, int, float)) or value is None:
        return value
    return repr(value)[:4096]


def write_json_exclusive(path: Path, value: Any) -> None:
    with path.open("x", encoding="utf-8", newline="\n") as handle:
        json.dump(value, handle, ensure_ascii=False, indent=2, sort_keys=True)
        handle.write("\n")


def write_stage_status(run: Path, stage: str, exit_status: int) -> None:
    write_json_exclusive(
        run / f"{stage}-status.json",
        {
            "exit_status": exit_status,
            "finished_utc": datetime.now(timezone.utc).isoformat(),
            "stage": stage,
        },
    )


def write_failure_status(run: Path, stage: str) -> None:
    try:
        write_stage_status(run, stage, 1)
    except OSError:
        # The primary exception remains authoritative if finalization also fails.
        pass
