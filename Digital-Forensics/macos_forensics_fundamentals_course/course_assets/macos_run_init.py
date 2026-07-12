#!/usr/bin/env python3
"""Initialize one exclusive macOS offline forensic run."""

from __future__ import annotations

import getpass
import json
import os
import platform
import plistlib
import shlex
import shutil
import socket
import stat
import subprocess
import sys
import uuid
from datetime import datetime, timezone
from pathlib import Path

from build_manifest import digest
from dfir_context import _disk_info, _is_read_only, _reject_symlink_components


def required_environment(name: str) -> str:
    value = os.environ.get(name, "").strip()
    if not value:
        raise RuntimeError(f"set {name} before initialization")
    return value


def write_json_exclusive(path: Path, value: object) -> None:
    with path.open("x", encoding="utf-8", newline="\n") as handle:
        json.dump(value, handle, ensure_ascii=False, indent=2, sort_keys=True)
        handle.write("\n")


def append_error(run: Path, stage: str, error: BaseException) -> None:
    record = {
        "error": str(error),
        "stage": stage,
        "time_utc": datetime.now(timezone.utc).isoformat(),
    }
    with (run / "errors.jsonl").open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n")


def command_text(command: list[str]) -> str:
    result = subprocess.run(command, check=True, capture_output=True, text=True)
    return result.stdout.strip() or result.stderr.strip()


def regular_non_symlink(path: Path, label: str) -> Path:
    _reject_symlink_components(path, label)
    resolved = path.resolve(strict=True)
    if not stat.S_ISREG(resolved.lstat().st_mode):
        raise RuntimeError(f"{label} is not a regular file")
    return resolved


def initialize() -> Path:
    case_root_input = Path(required_environment("DFIR_CASE_ROOT"))
    evidence_root_input = Path(required_environment("DFIR_EVIDENCE_ROOT"))
    evidence_source_input = Path(required_environment("DFIR_EVIDENCE_SOURCE"))
    source_storage_input = Path(required_environment("DFIR_EVIDENCE_SOURCE_MOUNT"))
    source_identifier = required_environment("DFIR_SOURCE_IDENTIFIER")
    source_type = required_environment("DFIR_SOURCE_TYPE")
    mount_tool = required_environment("DFIR_MOUNT_TOOL")
    mount_tool_version = required_environment("DFIR_MOUNT_TOOL_VERSION")
    mount_time_text = required_environment("DFIR_MOUNT_TIME_UTC")
    mount_log_input = Path(required_environment("DFIR_MOUNT_SESSION_LOG"))
    if source_type not in {"offline_image", "targeted_collection"}:
        raise RuntimeError("DFIR_SOURCE_TYPE is not an offline source type")
    mount_time = datetime.fromisoformat(mount_time_text.replace("Z", "+00:00"))
    if mount_time.tzinfo is None:
        raise RuntimeError("DFIR_MOUNT_TIME_UTC must include an offset")

    _reject_symlink_components(evidence_root_input, "evidence root")
    evidence_root = evidence_root_input.resolve(strict=True)
    if not evidence_root.is_dir():
        raise RuntimeError("evidence root is not a directory")
    _reject_symlink_components(evidence_source_input, "evidence source")
    evidence_source = evidence_source_input.resolve(strict=True)
    _reject_symlink_components(source_storage_input, "evidence source mount")
    source_storage = source_storage_input.resolve(strict=True)
    if not source_storage.is_dir():
        raise RuntimeError("evidence source mount is not a directory")
    try:
        evidence_source.relative_to(source_storage)
    except ValueError as error:
        raise RuntimeError("evidence source is outside its recorded mount") from error
    mount_log = regular_non_symlink(mount_log_input, "mount-session log")

    disk_info = _disk_info(evidence_root)
    if not _is_read_only(disk_info):
        raise RuntimeError("evidence root is not mounted read-only")
    device_identifier = str(disk_info.get("DeviceIdentifier", ""))
    volume_uuid = str(disk_info.get("VolumeUUID", ""))
    if not device_identifier or not volume_uuid:
        raise RuntimeError("diskutil did not provide device and volume identifiers")
    source_disk_info = _disk_info(source_storage)
    if not _is_read_only(source_disk_info):
        raise RuntimeError("evidence source storage is not read-only")
    source_device_identifier = str(
        source_disk_info.get("DeviceIdentifier", "")
    )
    source_volume_uuid = str(source_disk_info.get("VolumeUUID", ""))
    if not source_device_identifier or not source_volume_uuid:
        raise RuntimeError("evidence source storage identity is incomplete")
    mount_log_text = mount_log.read_text(encoding="utf-8", errors="replace")
    if source_identifier.lower() not in mount_log_text.lower():
        raise RuntimeError("mount log does not contain the source identifier")
    if device_identifier.lower() not in mount_log_text.lower():
        raise RuntimeError("mount log does not contain the mounted device identifier")

    if not case_root_input.is_absolute():
        raise RuntimeError("DFIR_CASE_ROOT must be absolute")
    case_parent = case_root_input.parent
    _reject_symlink_components(case_parent, "case parent")
    case_parent = case_parent.resolve(strict=True)
    case_root = case_parent / case_root_input.name
    try:
        case_root.relative_to(evidence_root)
    except ValueError:
        pass
    else:
        raise RuntimeError("case directory must be outside the evidence root")
    case_root.mkdir(mode=0o700, exist_ok=True)
    _reject_symlink_components(case_root, "case root")
    runs = case_root / "runs"
    runs.mkdir(mode=0o700, exist_ok=True)
    _reject_symlink_components(runs, "runs directory")

    started = datetime.now(timezone.utc)
    run_id = started.strftime("%Y%m%dT%H%M%SZ-") + uuid.uuid4().hex
    run = runs / run_id
    run.mkdir(mode=0o700)
    (run / "errors.jsonl").open("x").close()
    (run / "limitations.jsonl").open("x").close()

    try:
        preserved_log = run / "mount-session.log"
        with mount_log.open("rb") as source, preserved_log.open("xb") as target:
            shutil.copyfileobj(source, target, length=1024 * 1024)
        mount_log_hash = digest(mount_log)
        if digest(preserved_log) != mount_log_hash:
            raise RuntimeError("preserved mount-session log hash mismatch")
        root_info_path = run / "mounted-root-diskutil-info.plist"
        source_info_path = run / "source-storage-diskutil-info.plist"
        with root_info_path.open("xb") as output:
            plistlib.dump(disk_info, output, fmt=plistlib.FMT_XML, sort_keys=True)
        with source_info_path.open("xb") as output:
            plistlib.dump(
                source_disk_info,
                output,
                fmt=plistlib.FMT_XML,
                sort_keys=True,
            )

        if evidence_source.is_file():
            evidence_source_hash = digest(evidence_source)
            evidence_source_hash_basis = "SHA-256 of evidence source file bytes"
            source_manifest = None
        elif evidence_source.is_dir():
            source_manifest = run / "source-manifest.jsonl"
            source_summary = run / "source-manifest-summary.json"
            subprocess.run(
                [
                    sys.executable,
                    str(Path(__file__).with_name("build_manifest.py")),
                    "--root",
                    str(evidence_source),
                    "--output",
                    str(source_manifest),
                    "--summary",
                    str(source_summary),
                    "--source-id",
                    source_identifier,
                    "--limitations",
                    str(run / "limitations.jsonl"),
                ],
                check=True,
            )
            evidence_source_hash = digest(source_manifest)
            evidence_source_hash_basis = "SHA-256 of source-manifest.jsonl"
        else:
            raise RuntimeError("evidence source is not a regular file or directory")

        mapping = {
            "evidence_source": str(evidence_source),
            "evidence_source_identifier": source_identifier,
            "evidence_source_hash_basis": evidence_source_hash_basis,
            "evidence_source_sha256": evidence_source_hash,
            "evidence_source_device_identifier": source_device_identifier,
            "evidence_source_mount": str(source_storage),
            "evidence_source_volume_uuid": source_volume_uuid,
            "mount_session_log_source": str(mount_log),
            "mount_session_log_sha256": mount_log_hash,
            "mounted_device_identifier": device_identifier,
            "mounted_diskutil_info": str(root_info_path),
            "mounted_diskutil_info_sha256": digest(root_info_path),
            "mounted_root": str(evidence_root),
            "mounted_volume_uuid": volume_uuid,
            "preserved_mount_session_log": str(preserved_log),
            "source_storage_diskutil_info": str(source_info_path),
            "source_storage_diskutil_info_sha256": digest(source_info_path),
        }
        mapping_path = run / "source-to-mount-mapping.json"
        write_json_exclusive(mapping_path, mapping)

        tools = {
            "bash": command_text(["/bin/bash", "--version"]).splitlines()[0],
            "macos": command_text(["/usr/bin/sw_vers", "-productVersion"]),
            "mount_tool": mount_tool,
            "mount_tool_version": mount_tool_version,
            "python": platform.python_version(),
        }
        record = {
            "analyst_host": socket.gethostname(),
            "analyst_identity": getpass.getuser(),
            "case_id": case_root.name,
            "evidence_source": str(evidence_source),
            "evidence_source_identifier": source_identifier,
            "evidence_source_hash_basis": evidence_source_hash_basis,
            "evidence_source_sha256": evidence_source_hash,
            "evidence_source_device_identifier": source_device_identifier,
            "evidence_source_mount": str(source_storage),
            "evidence_source_storage_read_only": True,
            "evidence_source_volume_uuid": source_volume_uuid,
            "limitations_log": str(run / "limitations.jsonl"),
            "mapping_record": str(mapping_path),
            "mapping_record_sha256": digest(mapping_path),
            "initializer_command": [sys.executable, str(Path(__file__).resolve())],
            "mount_session_log_sha256": mount_log_hash,
            "mounted_diskutil_info_sha256": digest(root_info_path),
            "mount_time_utc": mount_time.astimezone(timezone.utc).isoformat(),
            "mounted_device_identifier": device_identifier,
            "mounted_read_only": True,
            "mounted_root": str(evidence_root),
            "mounted_volume_uuid": volume_uuid,
            "source_storage_diskutil_info_sha256": digest(source_info_path),
            "run_id": run_id,
            "source_manifest": str(source_manifest) if source_manifest else None,
            "source_type": source_type,
            "started_utc": started.isoformat(),
            "timezone_policy": "derivatives use UTC; original values are retained",
            "tool_versions": tools,
        }
        acquisition = run / "acquisition-record.json"
        write_json_exclusive(acquisition, record)
        write_json_exclusive(
            run / "acquisition-record-hash.json",
            {"path": str(acquisition), "sha256": digest(acquisition)},
        )
        write_json_exclusive(
            run / "initialization-status.json",
            {
                "exit_status": 0,
                "finished_utc": datetime.now(timezone.utc).isoformat(),
                "stage": "initialization",
            },
        )
    except BaseException as error:
        append_error(run, "initialization", error)
        status = run / "initialization-status.json"
        if not status.exists():
            write_json_exclusive(
                status,
                {
                    "exit_status": 1,
                    "finished_utc": datetime.now(timezone.utc).isoformat(),
                    "stage": "initialization",
                },
            )
        raise
    return run


def main() -> None:
    run = initialize()
    print("export DFIR_RUN=" + shlex.quote(str(run)))


if __name__ == "__main__":
    main()
