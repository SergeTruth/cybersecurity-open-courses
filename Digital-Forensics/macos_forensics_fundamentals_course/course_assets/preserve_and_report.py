#!/usr/bin/env python3
"""Manifest collected derivatives and append defensible case records."""

from __future__ import annotations

import fcntl
import json
import os
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

from artifact_utils import (
    error_record,
    sha256,
    write_failure_status,
    write_stage_status,
)
from dfir_context import load_context


def collection_manifest(run: Path, source_id: str) -> None:
    collected = run / "collected"
    if not collected.is_dir():
        raise RuntimeError("collected derivative directory is absent")
    subprocess.run(
        [
            sys.executable,
            str(Path(__file__).with_name("build_manifest.py")),
            "--root",
            str(collected),
            "--output",
            str(run / "collection-manifest.jsonl"),
            "--summary",
            str(run / "collection-manifest-summary.json"),
            "--source-id",
            source_id,
            "--limitations",
            str(run / "limitations.jsonl"),
        ],
        check=True,
    )


def chain_of_custody(run: Path, run_id: str) -> None:
    names = (
        "DFIR_CUSTODY_ACTOR",
        "DFIR_CUSTODY_ACTION",
        "DFIR_CUSTODY_ITEM",
        "DFIR_CUSTODY_LOCATION",
    )
    values = {name: os.environ.get(name, "").strip() for name in names}
    missing = [name for name, value in values.items() if not value]
    if missing:
        raise RuntimeError("set chain-of-custody fields: " + ", ".join(missing))
    record = {
        "action": values["DFIR_CUSTODY_ACTION"],
        "actor": values["DFIR_CUSTODY_ACTOR"],
        "item": values["DFIR_CUSTODY_ITEM"],
        "location": values["DFIR_CUSTODY_LOCATION"],
        "run_id": run_id,
        "timestamp_utc": datetime.now(timezone.utc).isoformat(),
    }
    path = run / "chain-of-custody.jsonl"
    with path.open("a+", encoding="utf-8", newline="\n") as handle:
        fcntl.flock(handle, fcntl.LOCK_EX)
        handle.write(json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n")
        handle.flush()
        os.fsync(handle.fileno())
        fcntl.flock(handle, fcntl.LOCK_UN)


def report_table(run: Path) -> None:
    derivatives = (
        "user-accounts.jsonl",
        "chrome-history.jsonl",
        "unified-log-events-normalized.jsonl",
        "install-log-events.jsonl",
        "launch-items-parsed.jsonl",
        "file-timeline.jsonl",
        "quarantine-attributes.jsonl",
    )
    lines = [
        "| Derivative | SHA-256 | Status |",
        "|---|---|---|",
    ]
    for name in derivatives:
        path = run / name
        if path.is_file():
            lines.append(f"| `{name}` | `{sha256(path)}` | present |")
        else:
            lines.append(f"| `{name}` |  | missing |")
    with (run / "report-evidence-table.md").open(
        "x", encoding="utf-8", newline="\n"
    ) as output:
        output.write("\n".join(lines) + "\n")


def main() -> None:
    context = load_context()
    run = context["run"]
    record = context["record"]
    try:
        collection_manifest(run, str(record["evidence_source_identifier"]))
        chain_of_custody(run, str(record["run_id"]))
        report_table(run)
    except BaseException as error:
        error_record(run, "preservation-and-reporting", run, error)
        write_failure_status(run, "preservation-and-reporting")
        raise
    write_stage_status(run, "preservation-and-reporting", 0)


if __name__ == "__main__":
    main()
