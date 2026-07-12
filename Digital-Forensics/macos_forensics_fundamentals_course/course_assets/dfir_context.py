#!/usr/bin/env python3
"""Load and re-verify one macOS offline forensic run."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import plistlib
import shlex
import stat
import subprocess
from pathlib import Path
from typing import Any


class ContextError(RuntimeError):
    """The selected run cannot be safely bound to its evidence mount."""


def _reject_symlink_components(path: Path, label: str) -> None:
    if not path.is_absolute():
        raise ContextError(f"{label} must be absolute")
    current = Path(path.anchor)
    for part in path.parts[1:]:
        current /= part
        try:
            mode = current.lstat().st_mode
        except FileNotFoundError as error:
            raise ContextError(f"{label} component is missing: {current}") from error
        if stat.S_ISLNK(mode):
            raise ContextError(f"{label} contains a symbolic-link component: {current}")


def _regular_file(path: Path, label: str) -> None:
    _reject_symlink_components(path, label)
    mode = path.lstat().st_mode
    if not stat.S_ISREG(mode):
        raise ContextError(f"{label} is not a regular file: {path}")


def _sha256(path: Path) -> str:
    result = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            result.update(block)
    return result.hexdigest()


def _json_object(path: Path, label: str) -> dict[str, Any]:
    _regular_file(path, label)
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise ContextError(f"{label} is unreadable") from error
    if not isinstance(value, dict):
        raise ContextError(f"{label} must be a JSON object")
    return value


def _disk_info(root: Path) -> dict[str, Any]:
    result = subprocess.run(
        ["/usr/sbin/diskutil", "info", "-plist", str(root)],
        check=True,
        capture_output=True,
    )
    data = result.stdout
    value = plistlib.loads(data)
    if not isinstance(value, dict):
        raise ContextError("diskutil did not return a dictionary")
    return value


def _is_read_only(info: dict[str, Any]) -> bool:
    if info.get("Writable") is False:
        return True
    return bool(info.get("ReadOnlyVolume") or info.get("ReadOnlyMedia"))


def append_jsonl(path: Path, record: dict[str, Any]) -> None:
    encoded = json.dumps(record, ensure_ascii=False, sort_keys=True)
    with path.open("a", encoding="utf-8", newline="\n") as handle:
        handle.write(encoded + "\n")


def load_context() -> dict[str, Any]:
    selected = os.environ.get("DFIR_RUN", "")
    if not selected:
        raise ContextError("DFIR_RUN must select an initialized offline run")
    requested_run = Path(selected)
    _reject_symlink_components(requested_run, "selected run")
    run = requested_run.resolve(strict=True)
    if not run.is_dir():
        raise ContextError("DFIR_RUN is not a directory")

    record_path = run / "acquisition-record.json"
    record = _json_object(record_path, "acquisition record")

    required = (
        "run_id",
        "source_type",
        "evidence_source",
        "evidence_source_hash_basis",
        "evidence_source_sha256",
        "mapping_record",
        "mapping_record_sha256",
        "mounted_root",
        "mounted_volume_uuid",
        "mounted_device_identifier",
    )
    missing = [name for name in required if not record.get(name)]
    if missing:
        raise ContextError("acquisition record lacks: " + ", ".join(missing))
    if run.name != str(record["run_id"]):
        raise ContextError("run directory does not match acquisition record")
    if record["source_type"] not in {"offline_image", "targeted_collection"}:
        raise ContextError("selected run is not an offline macOS source")

    acquisition_hash_path = run / "acquisition-record-hash.json"
    acquisition_hash = _json_object(
        acquisition_hash_path,
        "acquisition-record hash",
    )
    if Path(str(acquisition_hash.get("path", ""))).resolve() != record_path.resolve():
        raise ContextError("acquisition-record hash names a different file")
    if str(acquisition_hash.get("sha256", "")).lower() != _sha256(record_path):
        raise ContextError("acquisition-record hash verification failed")

    mapping_path = Path(str(record["mapping_record"]))
    _reject_symlink_components(mapping_path, "source-to-mount mapping")
    mapping_path = mapping_path.resolve(strict=True)
    try:
        mapping_path.relative_to(run)
    except ValueError as error:
        raise ContextError("mapping record is outside the selected run") from error
    mapping = _json_object(mapping_path, "source-to-mount mapping")
    if str(record["mapping_record_sha256"]).lower() != _sha256(mapping_path):
        raise ContextError("mapping-record hash verification failed")
    mapping_fields = {
        "evidence_source": "evidence_source",
        "evidence_source_hash_basis": "evidence_source_hash_basis",
        "evidence_source_sha256": "evidence_source_sha256",
        "mounted_device_identifier": "mounted_device_identifier",
        "mounted_root": "mounted_root",
        "mounted_volume_uuid": "mounted_volume_uuid",
    }
    for mapping_name, record_name in mapping_fields.items():
        if str(mapping.get(mapping_name, "")) != str(record[record_name]):
            raise ContextError(f"mapping record disagrees on {mapping_name}")

    requested_root = Path(str(record["mounted_root"]))
    _reject_symlink_components(requested_root, "mounted evidence root")
    root = requested_root.resolve(strict=True)
    if not root.is_dir():
        raise ContextError("recorded evidence root is not a directory")
    if run == root or root in run.parents:
        raise ContextError("run directory is inside the evidence root")

    info = _disk_info(root)
    if not _is_read_only(info):
        raise ContextError("current evidence mount is not read-only")
    device = str(info.get("DeviceIdentifier", ""))
    volume_uuid = str(info.get("VolumeUUID", ""))
    if device != str(record["mounted_device_identifier"]):
        raise ContextError("mounted device no longer matches the selected run")
    if volume_uuid.lower() != str(record["mounted_volume_uuid"]).lower():
        raise ContextError("mounted volume no longer matches the selected run")

    return {
        "run": run,
        "root": root,
        "record": record,
        "disk_info": info,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--shell", action="store_true")
    arguments = parser.parse_args()
    context = load_context()
    if arguments.shell:
        print("DFIR_RUN_RESOLVED=" + shlex.quote(str(context["run"])))
        print("DFIR_ROOT=" + shlex.quote(str(context["root"])))
    else:
        print(
            json.dumps(
                {
                    "run": str(context["run"]),
                    "root": str(context["root"]),
                    "source_type": context["record"]["source_type"],
                },
                sort_keys=True,
            )
        )


if __name__ == "__main__":
    main()
