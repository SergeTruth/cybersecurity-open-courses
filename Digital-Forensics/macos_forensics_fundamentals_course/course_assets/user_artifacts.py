#!/usr/bin/env python3
"""Collect and parse local accounts, activity leads, and Chrome history."""

from __future__ import annotations

import json
import os
import plistlib
import re
import sqlite3
from pathlib import Path

from artifact_utils import (
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


UID_PATTERN = re.compile(r"(?:0|[1-9][0-9]*)", flags=re.ASCII)


def field(data: dict[object, object], name: str, anomalies: list[str]) -> str:
    value = data.get(name)
    if not isinstance(value, list) or not value:
        anomalies.append(f"{name} is not a nonempty list")
        return ""
    first = value[0]
    if not isinstance(first, (str, int)) or isinstance(first, bool):
        anomalies.append(f"{name} has an invalid first value")
        return ""
    return str(first)


def collect_accounts(run: Path, root: Path) -> None:
    stage = "local-account-review"
    source_dir = root / "private/var/db/dslocal/nodes/Default/users"
    collected_dir = run / "collected/user-account-plists"
    collected_dir.mkdir(mode=0o700, parents=True, exist_ok=False)
    manifest_path = run / "user-account-plist-manifest.jsonl"
    output_path = run / "user-accounts.jsonl"
    records: list[dict[str, object]] = []
    manifest_count = 0
    with manifest_path.open("x", encoding="utf-8", newline="\n") as manifest:
        for source in iter_regular_files(source_dir, root, run, stage):
            if source.suffix.lower() != ".plist":
                continue
            destination = collected_dir / source.name
            try:
                copy_record = copy_verified(source, destination)
                copy_record.update(path_fields(source, root))
                manifest.write(
                    json.dumps(copy_record, ensure_ascii=False, sort_keys=True) + "\n"
                )
                manifest_count += 1
                anomalies: list[str] = []
                try:
                    with destination.open("rb") as handle:
                        value = plistlib.load(handle)
                    if not isinstance(value, dict):
                        raise ValueError("plist root is not a dictionary")
                    account_name = field(value, "name", anomalies) or source.stem
                    uid = field(value, "uid", anomalies)
                    home = field(value, "home", anomalies)
                    shell = field(value, "shell", anomalies)
                    realname = field(value, "realname", anomalies)
                    if uid and UID_PATTERN.fullmatch(uid) is None:
                        anomalies.append("uid is not canonical unsigned decimal text")
                    if home and not home.startswith("/"):
                        anomalies.append("home is not an absolute path")
                    if shell and not shell.startswith("/"):
                        anomalies.append("shell is not an absolute path")
                    records.append(
                        {
                            "account": account_name,
                            "anomalies": anomalies,
                            "home": home,
                            "realname": realname,
                            "shell": shell,
                            "source_path": str(source.relative_to(root)),
                            "source_sha256": copy_record["source_sha256"],
                            "status": "anomaly" if anomalies else "parsed",
                            "uid": uid,
                        }
                    )
                except (OSError, ValueError, plistlib.InvalidFileException) as error:
                    error_record(run, stage, source, error)
                    records.append(
                        {
                            "account": source.stem,
                            "anomalies": [f"malformed plist: {error}"],
                            "source_path": str(source.relative_to(root)),
                            "source_sha256": copy_record["source_sha256"],
                            "status": "malformed",
                        }
                    )
            except BaseException as error:
                error_record(run, stage, source, error)
    if manifest_count == 0:
        limitation(run, stage, source_dir, "no local-account plist files were collected")

    names: dict[str, int] = {}
    uids: dict[str, int] = {}
    for record in records:
        name = str(record.get("account", ""))
        uid = str(record.get("uid", ""))
        names[name] = names.get(name, 0) + 1
        if uid:
            uids[uid] = uids.get(uid, 0) + 1
    for record in records:
        anomalies = record.setdefault("anomalies", [])
        name = str(record.get("account", ""))
        uid = str(record.get("uid", ""))
        if name and names.get(name, 0) > 1:
            anomalies.append("duplicate account name")
        if uid and uids.get(uid, 0) > 1:
            anomalies.append("duplicate uid")
        if anomalies and record.get("status") != "malformed":
            record["status"] = "anomaly"
    with output_path.open("x", encoding="utf-8", newline="\n") as output:
        for record in records:
            output.write(json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n")
    write_json_exclusive(
        run / "user-accounts-summary.json",
        {
            "anomaly_count": sum(bool(item.get("anomalies")) for item in records),
            "record_count": len(records),
        },
    )


def activity_leads(run: Path, root: Path) -> None:
    stage = "user-activity-leads"
    output_path = run / "user-activity-leads.jsonl"
    wanted_names = {
        ".bash_history",
        ".zsh_history",
        "Downloads.plist",
        "History",
    }
    count = 0
    with output_path.open("x", encoding="utf-8", newline="\n") as output:
        for path in iter_regular_files(root / "Users", root, run, stage):
            relative = path.relative_to(root)
            is_download = "Downloads" in relative.parts
            if path.name not in wanted_names and not is_download:
                continue
            metadata = path.lstat()
            record = {
                **path_fields(path, root),
                "gid": metadata.st_gid,
                "mtime_ns": metadata.st_mtime_ns,
                "size": metadata.st_size,
                "uid": metadata.st_uid,
            }
            output.write(json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n")
            count += 1
    write_json_exclusive(
        run / "user-activity-leads-summary.json",
        {"lead_count": count, "scope": "limited path and filename inventory"},
    )


def chrome_history(run: Path, root: Path) -> None:
    stage = "chrome-history"
    profile_text = os.environ.get("DFIR_CHROME_PROFILE", "").strip()
    output_path = run / "chrome-history.jsonl"
    if not profile_text:
        output_path.open("x").close()
        limitation(run, stage, root, "DFIR_CHROME_PROFILE was not selected")
        write_json_exclusive(
            run / "chrome-history-summary.json",
            {"row_count": 0, "status": "not selected"},
        )
        return
    relative_profile = Path(profile_text)
    if relative_profile.is_absolute() or ".." in relative_profile.parts:
        raise RuntimeError("DFIR_CHROME_PROFILE must be a relative evidence path")
    profile = root / relative_profile
    _reject_symlink_components(profile, "Chrome profile")
    profile = profile.resolve(strict=True)
    profile.relative_to(root)

    family = ("History", "History-wal", "History-shm")
    collected = run / "collected/chrome" / relative_profile
    manifest_path = run / "chrome-history-family-manifest.jsonl"
    copied_history: Path | None = None
    with manifest_path.open("x", encoding="utf-8", newline="\n") as manifest:
        for name in family:
            source = profile / name
            if not source.exists():
                if name == "History":
                    raise RuntimeError("selected Chrome profile has no History database")
                limitation(run, stage, source, f"optional SQLite sidecar {name} is absent")
                continue
            record = copy_verified(source, collected / name)
            record["profile"] = str(relative_profile)
            record["role"] = name
            manifest.write(json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n")
            if name == "History":
                copied_history = collected / name
    if copied_history is None:
        raise RuntimeError("History database was not copied")

    row_count = 0
    malformed_count = 0
    uri = copied_history.as_uri() + "?mode=ro"
    with sqlite3.connect(uri, uri=True) as database, output_path.open(
        "x", encoding="utf-8", newline="\n"
    ) as output, (run / "chrome-history-malformed-rows.jsonl").open(
        "x", encoding="utf-8", newline="\n"
    ) as malformed:
        query = """
            SELECT id, last_visit_time, url, title
            FROM urls
            ORDER BY last_visit_time DESC, id DESC
        """
        for row_id, source_time, url, title in database.execute(query):
            try:
                if type(source_time) is not int:
                    raise TypeError("last_visit_time is not an integer")
                parsed_source_time = source_time
                timestamp_ns = (parsed_source_time - 11644473600000000) * 1000
                record = {
                    "profile": str(relative_profile),
                    "row_id": row_id,
                    "source_database": str(profile / "History"),
                    "source_timestamp": parsed_source_time,
                    "source_timestamp_semantics": (
                        "microseconds since 1601-01-01 UTC"
                    ),
                    "timestamp_ns": timestamp_ns,
                    "title": title,
                    "url": url,
                }
                output.write(
                    json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n"
                )
                row_count += 1
            except (TypeError, ValueError, OverflowError) as error:
                malformed.write(
                    json.dumps(
                        {
                            "error": str(error),
                            "profile": str(relative_profile),
                            "row_id": row_id,
                            "source_database": str(profile / "History"),
                            "source_timestamp": source_time,
                            "title": title,
                            "url": url,
                        },
                        ensure_ascii=False,
                        sort_keys=True,
                    )
                    + "\n"
                )
                malformed_count += 1
    write_json_exclusive(
        run / "chrome-history-summary.json",
        {
            "malformed_row_count": malformed_count,
            "profile": str(relative_profile),
            "row_count": row_count,
            "status": "queried",
        },
    )


def main() -> None:
    context = load_context()
    run = context["run"]
    root = context["root"]
    try:
        collect_accounts(run, root)
        activity_leads(run, root)
        chrome_history(run, root)
    except BaseException as error:
        error_record(run, "user-artifacts", root, error)
        write_failure_status(run, "user-artifacts")
        raise
    write_stage_status(run, "user-artifacts", 0)


if __name__ == "__main__":
    main()
