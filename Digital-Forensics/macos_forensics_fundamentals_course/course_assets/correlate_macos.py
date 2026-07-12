#!/usr/bin/env python3
"""Build an exact timed timeline and separate untimed artifact leads."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from artifact_utils import (
    error_record,
    limitation,
    write_failure_status,
    write_json_exclusive,
    write_stage_status,
)
from dfir_context import load_context


def read_jsonl(path: Path):
    with path.open("r", encoding="utf-8") as handle:
        for line_number, line in enumerate(handle, 1):
            if line.strip():
                yield line_number, json.loads(line)


def event(
    source: str,
    row: int,
    timestamp_ns: int | None,
    original: Any,
    timestamp_source: str,
    meaning: str,
    timezone_assumption: str,
    detail: dict[str, Any],
) -> dict[str, Any]:
    return {
        "detail": detail,
        "source_derivative": source,
        "source_row": row,
        "source_timestamp": original,
        "timestamp_meaning": meaning,
        "timestamp_ns": timestamp_ns,
        "timestamp_source": timestamp_source,
        "timezone_assumption": timezone_assumption,
    }


def build_events(run: Path) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    timed: list[dict[str, Any]] = []
    untimed: list[dict[str, Any]] = []

    def add(record: dict[str, Any]) -> None:
        (timed if record["timestamp_ns"] is not None else untimed).append(record)

    sources = (
        "file-timeline.jsonl",
        "quarantine-attributes.jsonl",
        "install-log-events.jsonl",
        "unified-log-events-normalized.jsonl",
        "launch-items-parsed.jsonl",
        "chrome-history.jsonl",
    )
    for name in sources:
        path = run / name
        if not path.exists():
            limitation(run, "cross-artifact-correlation", path, "source is absent")
            continue
        for row, item in read_jsonl(path):
            if name == "file-timeline.jsonl":
                add(
                    event(
                        name,
                        row,
                        int(item["timestamp_ns"]),
                        item["source_timestamp"],
                        item["timestamp_family"],
                        item["timestamp_meaning"],
                        item["timezone_assumption"],
                        {"path": item["path"], "size": item["size"]},
                    )
                )
            elif name == "quarantine-attributes.jsonl":
                timestamp = item.get("timestamp_ns")
                add(
                    event(
                        name,
                        row,
                        int(timestamp) if timestamp is not None else None,
                        item.get("source_timestamp"),
                        "com.apple.quarantine field",
                        item.get("timestamp_meaning", "untimed quarantine lead"),
                        item.get("timezone_assumption", "not applicable"),
                        {"attribute": item["attribute_text"], "path": item["path"]},
                    )
                )
            elif name == "install-log-events.jsonl":
                timestamp = item.get("timestamp_ns")
                add(
                    event(
                        name,
                        row,
                        int(timestamp) if timestamp is not None else None,
                        item.get("source_timestamp"),
                        item.get("timestamp_source", "unparsed install-log line"),
                        "install-log observation",
                        item.get("timezone_assumption", "unresolved"),
                        {
                            "possible_timestamp_ns": item.get(
                                "possible_timestamp_ns"
                            ),
                            "raw_line": item["raw_line"],
                            "source_line": item["source_line"],
                            "source_path": item["source_path"],
                        },
                    )
                )
            elif name == "unified-log-events-normalized.jsonl":
                add(
                    event(
                        name,
                        row,
                        int(item["timestamp_ns"]),
                        item["source_timestamp"],
                        item["timestamp_source"],
                        "unified-log event time",
                        item["timezone_assumption"],
                        {"event": item["event"], "process": item["process"]},
                    )
                )
            elif name == "launch-items-parsed.jsonl":
                add(
                    event(
                        name,
                        row,
                        int(item["source_mtime_ns"]),
                        item["source_mtime_ns"],
                        "launch plist filesystem mtime",
                        "plist modification time; not proof of launch execution",
                        "POSIX epoch timestamp normalized to UTC",
                        item,
                    )
                )
            elif name == "chrome-history.jsonl":
                add(
                    event(
                        name,
                        row,
                        int(item["timestamp_ns"]),
                        item["source_timestamp"],
                        "Chrome urls.last_visit_time",
                        "recorded URL last-visit time",
                        "source is defined as UTC",
                        item,
                    )
                )
    return timed, untimed


def write_timeline(run: Path) -> None:
    timed, untimed = build_events(run)
    if not timed:
        raise RuntimeError("no timed observations are available for correlation")
    timed.sort(
        key=lambda item: (
            item["timestamp_ns"],
            item["source_derivative"],
            item["source_row"],
        )
    )
    with (run / "cross-artifact-timeline.jsonl").open(
        "x", encoding="utf-8", newline="\n"
    ) as output:
        for item in timed:
            output.write(json.dumps(item, ensure_ascii=False, sort_keys=True) + "\n")
    with (run / "untimed-observations.jsonl").open(
        "x", encoding="utf-8", newline="\n"
    ) as output:
        for item in untimed:
            output.write(json.dumps(item, ensure_ascii=False, sort_keys=True) + "\n")
    write_json_exclusive(
        run / "cross-artifact-timeline-summary.json",
        {
            "ordering": "integer UTC nanoseconds",
            "timed_count": len(timed),
            "untimed_count": len(untimed),
        },
    )


def coverage(run: Path) -> None:
    required = {
        "chain_of_custody": "chain-of-custody.jsonl",
        "collection_manifest": "collection-manifest.jsonl",
        "file_timeline": "file-timeline.jsonl",
        "launch_items": "launch-items-parsed.jsonl",
        "unified_logs": "unified-log-events-normalized.jsonl",
        "user_accounts": "user-accounts.jsonl",
    }
    records = []
    for source, name in required.items():
        path = run / name
        status = "present" if path.is_file() else "missing"
        records.append({"path": str(path), "source": source, "status": status})
        if status == "missing":
            limitation(run, "coverage-review", path, "required derivative is missing")
    write_json_exclusive(run / "evidence-coverage.json", records)


def main() -> None:
    context = load_context()
    run = context["run"]
    try:
        write_timeline(run)
        coverage(run)
    except BaseException as error:
        error_record(run, "cross-artifact-correlation", run, error)
        write_failure_status(run, "cross-artifact-correlation")
        raise
    write_stage_status(run, "cross-artifact-correlation", 0)


if __name__ == "__main__":
    main()
