#!/usr/bin/env python3
"""Collect and parse launchd plists and limited startup-adjacent leads."""

from __future__ import annotations

import json
import plistlib
from pathlib import Path

from artifact_utils import (
    bounded_value,
    contained_regular_file,
    copy_verified,
    error_record,
    iter_regular_files,
    limitation,
    path_fields,
    write_failure_status,
    write_json_exclusive,
    write_stage_status,
)
from dfir_context import load_context


def launch_sources(run: Path, root: Path):
    stage = "launch-item-collection"
    fixed = (
        "Library/LaunchAgents",
        "Library/LaunchDaemons",
        "System/Library/LaunchAgents",
        "System/Library/LaunchDaemons",
    )
    seen: set[Path] = set()
    for relative in fixed:
        for path in iter_regular_files(root / relative, root, run, stage):
            if path.suffix.lower() == ".plist" and path not in seen:
                seen.add(path)
                yield path
    for path in iter_regular_files(root / "Users", root, run, stage):
        relative = path.relative_to(root)
        if (
            path.suffix.lower() == ".plist"
            and len(relative.parts) >= 5
            and relative.parts[0] == "Users"
            and relative.parts[2:4] == ("Library", "LaunchAgents")
            and path not in seen
        ):
            seen.add(path)
            yield path


def collect_and_parse_launch_items(run: Path, root: Path) -> None:
    stage = "launch-item-collection"
    manifest_path = run / "launch-item-manifest.jsonl"
    parsed_path = run / "launch-items-parsed.jsonl"
    count = 0
    with manifest_path.open("x", encoding="utf-8", newline="\n") as manifest, (
        parsed_path.open("x", encoding="utf-8", newline="\n")
    ) as parsed:
        for source in launch_sources(run, root):
            relative = source.relative_to(root)
            destination = run / "collected/launch-items" / relative
            try:
                copy_record = copy_verified(source, destination)
                copy_record.update({"role": "launchd_plist", **path_fields(source, root)})
                manifest.write(
                    json.dumps(copy_record, ensure_ascii=False, sort_keys=True) + "\n"
                )
                count += 1
                try:
                    with destination.open("rb") as handle:
                        item = plistlib.load(handle)
                    if not isinstance(item, dict):
                        raise ValueError("plist root is not a dictionary")
                    record = {
                        "label": bounded_value(item.get("Label")),
                        "keep_alive": bounded_value(item.get("KeepAlive")),
                        "program": bounded_value(item.get("Program")),
                        "program_arguments": bounded_value(
                            item.get("ProgramArguments")
                        ),
                        "run_at_load": bounded_value(item.get("RunAtLoad")),
                        "start_calendar_interval": bounded_value(
                            item.get("StartCalendarInterval")
                        ),
                        "watch_paths": bounded_value(item.get("WatchPaths")),
                        "queue_directories": bounded_value(
                            item.get("QueueDirectories")
                        ),
                        "environment_variables": bounded_value(
                            item.get("EnvironmentVariables")
                        ),
                        "working_directory": bounded_value(
                            item.get("WorkingDirectory")
                        ),
                        "user_name": bounded_value(item.get("UserName")),
                        "group_name": bounded_value(item.get("GroupName")),
                        "standard_out_path": bounded_value(
                            item.get("StandardOutPath")
                        ),
                        "standard_error_path": bounded_value(
                            item.get("StandardErrorPath")
                        ),
                        "source_mtime_ns": copy_record["mtime_ns"],
                        "source_path": str(relative),
                        "source_sha256": copy_record["source_sha256"],
                        "start_interval": bounded_value(item.get("StartInterval")),
                        "status": "parsed",
                    }
                except (OSError, ValueError, plistlib.InvalidFileException) as error:
                    error_record(run, "launch-item-parse", source, error)
                    record = {
                        "error": str(error),
                        "source_mtime_ns": copy_record["mtime_ns"],
                        "source_path": str(relative),
                        "source_sha256": copy_record["source_sha256"],
                        "status": "malformed",
                    }
                parsed.write(
                    json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n"
                )
            except BaseException as error:
                error_record(run, stage, source, error)
    if count == 0:
        limitation(run, stage, root, "no launchd plist files were collected")
    write_json_exclusive(run / "launch-item-summary.json", {"collected_count": count})


def startup_adjacent_leads(run: Path, root: Path) -> None:
    stage = "limited-startup-adjacent-inventory"
    output_path = run / "startup-adjacent-leads.jsonl"
    count = 0
    fixed_files = ("etc/crontab",)
    profile_names = {".bash_profile", ".zprofile", ".zshrc"}
    with output_path.open("x", encoding="utf-8", newline="\n") as output:
        candidates: list[Path] = []
        for relative in fixed_files:
            path = root / relative
            selected = contained_regular_file(path, root, run, stage)
            if selected is not None:
                candidates.append(selected)
        candidates.extend(
            iter_regular_files(root / "private/var/at/tabs", root, run, stage)
        )
        for path in iter_regular_files(root / "Users", root, run, stage):
            if path.name in profile_names:
                candidates.append(path)
        for path in sorted(set(candidates), key=lambda item: bytes(item)):
            try:
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
            except OSError as error:
                error_record(run, stage, path, error)
    write_json_exclusive(
        run / "startup-adjacent-summary.json",
        {
            "lead_count": count,
            "scope": "limited cron-tab and user shell-profile inventory",
        },
    )


def main() -> None:
    context = load_context()
    run = context["run"]
    root = context["root"]
    try:
        collect_and_parse_launch_items(run, root)
        startup_adjacent_leads(run, root)
    except BaseException as error:
        error_record(run, "persistence-artifacts", root, error)
        write_failure_status(run, "persistence-artifacts")
        raise
    write_stage_status(run, "persistence-artifacts", 0)


if __name__ == "__main__":
    main()
