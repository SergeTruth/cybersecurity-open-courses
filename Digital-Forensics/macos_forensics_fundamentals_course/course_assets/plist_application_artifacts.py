#!/usr/bin/env python3
"""Collect selected plists and inventory application data."""

from __future__ import annotations

import json
import os
import plistlib
from pathlib import Path

from artifact_utils import (
    bounded_value,
    copy_verified,
    error_record,
    iter_regular_files,
    limitation,
    path_fields,
    write_failure_status,
    write_json_exclusive,
    write_stage_status,
)
from dfir_context import _reject_symlink_components, load_context


def selected_plists(run: Path, root: Path) -> None:
    stage = "selected-plist-review"
    selections = {
        "finder_preferences": os.environ.get("DFIR_FINDER_PLIST", "").strip(),
        "recent_items": os.environ.get("DFIR_RECENT_ITEMS_PLIST", "").strip(),
    }
    manifest_path = run / "selected-plist-manifest.jsonl"
    parsed_path = run / "selected-plist-values.jsonl"
    with manifest_path.open("x", encoding="utf-8", newline="\n") as manifest, (
        parsed_path.open("x", encoding="utf-8", newline="\n")
    ) as parsed:
        for role, relative_text in selections.items():
            if not relative_text:
                limitation(run, stage, root, f"{role} was not selected")
                continue
            relative = Path(relative_text)
            if relative.is_absolute() or ".." in relative.parts:
                raise RuntimeError(f"{role} must be a relative evidence path")
            source = root / relative
            _reject_symlink_components(source, role)
            source = source.resolve(strict=True)
            source.relative_to(root)
            destination = run / "collected/plists" / role / source.name
            try:
                copy_record = copy_verified(source, destination)
                copy_record.update({"role": role, **path_fields(source, root)})
                manifest.write(
                    json.dumps(copy_record, ensure_ascii=False, sort_keys=True) + "\n"
                )
                with destination.open("rb") as handle:
                    value = plistlib.load(handle)
                if not isinstance(value, dict):
                    raise ValueError("plist root is not a dictionary")
                selected = {
                    str(key): bounded_value(item)
                    for key, item in value.items()
                    if any(word in str(key) for word in ("Recent", "File", "Application"))
                    or role == "finder_preferences"
                }
                parsed.write(
                    json.dumps(
                        {
                            "role": role,
                            "selected_values": bounded_value(selected),
                            "source_path": str(relative),
                            "source_sha256": copy_record["source_sha256"],
                            "status": "parsed",
                        },
                        ensure_ascii=False,
                        sort_keys=True,
                    )
                    + "\n"
                )
            except (OSError, ValueError, plistlib.InvalidFileException) as error:
                error_record(run, stage, source, error)
                parsed.write(
                    json.dumps(
                        {
                            "error": str(error),
                            "role": role,
                            "source_path": str(relative),
                            "status": "malformed",
                        },
                        ensure_ascii=False,
                        sort_keys=True,
                    )
                    + "\n"
                )


def application_inventory(run: Path, root: Path) -> None:
    stage = "application-data-inventory"
    output_path = run / "application-data-inventory.jsonl"
    wanted_names = {"Local State"}
    wanted_suffixes = {".plist", ".sqlite", ".sqlite3"}
    count = 0
    with output_path.open("x", encoding="utf-8", newline="\n") as output:
        for path in iter_regular_files(root / "Users", root, run, stage):
            relative = path.relative_to(root)
            if (
                "Library" not in relative.parts
                or "Application Support" not in relative.parts
            ):
                continue
            if path.name not in wanted_names and path.suffix.lower() not in wanted_suffixes:
                continue
            metadata = path.lstat()
            output.write(
                json.dumps(
                    {
                        **path_fields(path, root),
                        "gid": metadata.st_gid,
                        "mtime_ns": metadata.st_mtime_ns,
                        "size": metadata.st_size,
                        "uid": metadata.st_uid,
                    },
                    ensure_ascii=False,
                    sort_keys=True,
                )
                + "\n"
            )
            count += 1
    write_json_exclusive(
        run / "application-data-inventory-summary.json",
        {"file_count": count, "scope": "user Library/Application Support"},
    )


def main() -> None:
    context = load_context()
    run = context["run"]
    root = context["root"]
    try:
        selected_plists(run, root)
        application_inventory(run, root)
    except BaseException as error:
        error_record(run, "plist-and-application-data", root, error)
        write_failure_status(run, "plist-and-application-data")
        raise
    write_stage_status(run, "plist-and-application-data", 0)


if __name__ == "__main__":
    main()
