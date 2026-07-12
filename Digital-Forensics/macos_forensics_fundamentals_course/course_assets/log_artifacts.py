#!/usr/bin/env python3
"""Collect and parse unified and install logs with durable provenance."""

from __future__ import annotations

import bz2
import gzip
import json
import lzma
import os
import re
import subprocess
import sys
from collections import Counter
from pathlib import Path

from artifact_utils import (
    error_record,
    iter_regular_files,
    limitation,
    sha256,
    write_failure_status,
    write_json_exclusive,
    write_stage_status,
)
from dfir_context import _reject_symlink_components, load_context
from time_utils import AmbiguousLocalTime, normalize_timestamp


INSTALL_PATTERN = re.compile(r"install|package|succeeded|failed", re.IGNORECASE)
TIMESTAMP_PREFIX = re.compile(
    r"^(?P<time>[0-9]{4}-[0-9]{2}-[0-9]{2}[T ]"
    r"[0-9]{2}:[0-9]{2}:[0-9]{2}(?:\.[0-9]{1,9})?"
    r"(?:Z|[+-][0-9]{2}:?[0-9]{2})?)"
)


def manifest_archive(run: Path, archive: Path, source_id: str) -> tuple[Path, str]:
    manifest = run / "unified-log-source-manifest.jsonl"
    summary = run / "unified-log-source-summary.json"
    subprocess.run(
        [
            sys.executable,
            str(Path(__file__).with_name("build_manifest.py")),
            "--root",
            str(archive),
            "--output",
            str(manifest),
            "--summary",
            str(summary),
            "--source-id",
            source_id,
            "--limitations",
            str(run / "limitations.jsonl"),
        ],
        check=True,
    )
    return manifest, sha256(manifest)


def capture_unified(run: Path, root: Path, record: dict[str, object]) -> None:
    stage = "unified-log-capture"
    relative_text = os.environ.get("DFIR_LOGARCHIVE_RELATIVE", "").strip()
    start = os.environ.get("DFIR_LOG_START_UTC", "").strip()
    end = os.environ.get("DFIR_LOG_END_UTC", "").strip()
    if not relative_text or not start or not end:
        limitation(run, stage, root, "unified-log archive or incident window not selected")
        return
    relative = Path(relative_text)
    if relative.is_absolute() or ".." in relative.parts:
        raise RuntimeError("DFIR_LOGARCHIVE_RELATIVE must be a relative evidence path")
    archive = root / relative
    _reject_symlink_components(archive, "unified-log archive")
    archive = archive.resolve(strict=True)
    archive.relative_to(root)
    if not archive.is_dir():
        raise RuntimeError("selected unified-log archive is not a directory")
    start_ns, start_policy = normalize_timestamp(start)
    end_ns, end_policy = normalize_timestamp(end)
    if not start.endswith("Z") or not end.endswith("Z") or start_ns >= end_ns:
        raise RuntimeError("unified-log window must be increasing explicit UTC text")

    source_id = str(record["evidence_source_identifier"])
    manifest, manifest_hash = manifest_archive(run, archive, source_id)
    help_result = subprocess.run(
        ["/usr/bin/log", "help", "show"],
        check=False,
        capture_output=True,
        text=True,
    )
    help_path = run / "log-show-help.txt"
    with help_path.open("x", encoding="utf-8", newline="\n") as output:
        output.write(help_result.stdout + help_result.stderr)
    if help_result.returncode != 0:
        raise RuntimeError("log help show failed; tool behavior cannot be recorded")

    predicate = (
        'process == "loginwindow" OR process == "securityd" OR '
        'process == "syspolicyd"'
    )
    command = [
        "/usr/bin/log",
        "show",
        "--archive",
        str(archive),
        "--style",
        "json",
        "--predicate",
        predicate,
        "--start",
        start,
        "--end",
        end,
    ]
    raw_output = run / "unified-log-security-events.jsonl"
    stderr_path = run / "unified-log-show.stderr.txt"
    environment = {**os.environ, "TZ": "UTC", "LC_ALL": "C"}
    with raw_output.open("xb") as output, stderr_path.open("xb") as errors:
        completed = subprocess.run(
            command,
            check=False,
            stdout=output,
            stderr=errors,
            env=environment,
        )
    if completed.returncode != 0:
        raise RuntimeError(f"log show failed with status {completed.returncode}")
    if raw_output.stat().st_size == 0:
        limitation(run, stage, archive, "selected window produced no unified-log rows")
    write_json_exclusive(
        run / "unified-log-capture-metadata.json",
        {
            "archive": str(relative),
            "archive_manifest": str(manifest),
            "archive_manifest_sha256": manifest_hash,
            "command": command,
            "end_utc": end,
            "end_window_policy": end_policy,
            "log_help_sha256": sha256(help_path),
            "macos_version": subprocess.run(
                ["/usr/bin/sw_vers", "-productVersion"],
                check=True,
                capture_output=True,
                text=True,
            ).stdout.strip(),
            "start_utc": start,
            "start_window_policy": start_policy,
            "timezone_environment": "UTC",
        },
    )


def parse_unified(run: Path) -> None:
    source = run / "unified-log-security-events.jsonl"
    if not source.exists():
        limitation(run, "unified-log-parse", source, "unified-log capture is absent")
        return
    output_path = run / "unified-log-events-normalized.jsonl"
    malformed_path = run / "unified-log-malformed-lines.jsonl"
    counts: Counter[str] = Counter()
    parsed_count = 0
    malformed_count = 0
    with source.open("r", encoding="utf-8", errors="replace") as source_handle, (
        output_path.open("x", encoding="utf-8", newline="\n")
    ) as output, malformed_path.open("x", encoding="utf-8", newline="\n") as malformed:
        for line_number, line in enumerate(source_handle, 1):
            if not line.strip():
                continue
            try:
                item = json.loads(line)
                if not isinstance(item, dict):
                    raise ValueError("event is not a JSON object")
                timestamp_text = str(item.get("timestamp", ""))
                timestamp_ns, policy = normalize_timestamp(timestamp_text)
                process = str(
                    item.get("processImagePath") or item.get("process") or "unknown"
                )
                record = {
                    "event": item,
                    "process": process,
                    "source_line": line_number,
                    "source_timestamp": timestamp_text,
                    "timestamp_ns": timestamp_ns,
                    "timestamp_source": "unified log timestamp",
                    "timezone_assumption": policy,
                }
                output.write(json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n")
                counts[process] += 1
                parsed_count += 1
            except (json.JSONDecodeError, TypeError, ValueError) as error:
                malformed.write(
                    json.dumps(
                        {
                            "error": str(error),
                            "raw_line": line.rstrip("\n"),
                            "source_line": line_number,
                        },
                        ensure_ascii=False,
                        sort_keys=True,
                    )
                    + "\n"
                )
                malformed_count += 1
    if malformed_count:
        limitation(
            run,
            "unified-log-parse",
            source,
            f"{malformed_count} malformed rows were retained separately",
        )
    write_json_exclusive(
        run / "unified-log-process-counts.json",
        {
            "malformed_count": malformed_count,
            "parsed_count": parsed_count,
            "process_counts": dict(counts.most_common()),
        },
    )


def open_log(path: Path):
    lower = path.name.lower()
    if lower.endswith(".gz"):
        return gzip.open(path, "rt", encoding="utf-8", errors="replace")
    if lower.endswith(".bz2"):
        return bz2.open(path, "rt", encoding="utf-8", errors="replace")
    if lower.endswith(".xz"):
        return lzma.open(path, "rt", encoding="utf-8", errors="replace")
    return path.open("r", encoding="utf-8", errors="replace")


def parse_install_logs(run: Path, root: Path) -> None:
    stage = "install-log-review"
    evidence_timezone = os.environ.get("DFIR_EVIDENCE_TIMEZONE", "").strip()
    if not evidence_timezone:
        raise RuntimeError("set DFIR_EVIDENCE_TIMEZONE from offline system evidence")
    output_path = run / "install-log-events.jsonl"
    file_count = 0
    event_count = 0
    with output_path.open("x", encoding="utf-8", newline="\n") as output:
        for path in iter_regular_files(root / "private/var/log", root, run, stage):
            if not path.name.startswith("install.log"):
                continue
            if path.name.lower().endswith(".zst"):
                limitation(
                    run,
                    stage,
                    path,
                    "zstd log requires a separately verified decoder",
                )
                continue
            if not (
                ".log" in path.name
                or path.name.lower().endswith((".gz", ".bz2", ".xz"))
            ):
                continue
            file_count += 1
            try:
                with open_log(path) as handle:
                    for line_number, line in enumerate(handle, 1):
                        raw = line.rstrip("\n")
                        if INSTALL_PATTERN.search(raw) is None:
                            continue
                        match = TIMESTAMP_PREFIX.match(raw)
                        record: dict[str, object] = {
                            "raw_line": raw,
                            "source_line": line_number,
                            "source_path": str(path.relative_to(root)),
                        }
                        if match:
                            original = match.group("time")
                            try:
                                timestamp_ns, policy = normalize_timestamp(
                                    original,
                                    evidence_timezone,
                                )
                                record.update(
                                    {
                                        "source_timestamp": original,
                                        "timestamp_ns": timestamp_ns,
                                        "timestamp_source": "install log line prefix",
                                        "timezone_assumption": policy,
                                    }
                                )
                            except AmbiguousLocalTime as error:
                                record["possible_timestamp_ns"] = list(
                                    error.possible_timestamp_ns
                                )
                                record["timestamp_error"] = str(error)
                                record["timezone_assumption"] = (
                                    "ambiguous local time; both UTC possibilities retained"
                                )
                            except ValueError as error:
                                record["timestamp_error"] = str(error)
                        else:
                            record["timestamp_error"] = "no supported timestamp prefix"
                        output.write(
                            json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n"
                        )
                        event_count += 1
            except (OSError, EOFError, lzma.LZMAError) as error:
                error_record(run, stage, path, error)
    if file_count == 0:
        limitation(run, stage, root / "private/var/log", "no install logs found")
    write_json_exclusive(
        run / "install-log-summary.json",
        {
            "evidence_timezone": evidence_timezone,
            "event_count": event_count,
            "source_file_count": file_count,
        },
    )


def main() -> None:
    context = load_context()
    run = context["run"]
    root = context["root"]
    try:
        capture_unified(run, root, context["record"])
        parse_unified(run)
        parse_install_logs(run, root)
    except BaseException as error:
        error_record(run, "log-artifacts", root, error)
        write_failure_status(run, "log-artifacts")
        raise
    write_stage_status(run, "log-artifacts", 0)


if __name__ == "__main__":
    main()
