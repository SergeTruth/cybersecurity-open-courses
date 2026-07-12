window.COURSE_CODE_MODULE = {
  "title": "DFIR Code Examples",
  "codeIntro": "GNU Bash/Linux and Python Examples: Build Modification-Time and Event Timelines",
  "codeExamples": [
    {
      "title": "Create a Filename-Safe Modification-Time Timeline",
      "language": "python",
      "code": String.raw`import base64
import json
import os
import stat
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path("/mnt/evidence/rootfs")
CASE = Path("case-2026-06-26")


def exact_utc(mtime_ns: int) -> str:
    seconds, nanoseconds = divmod(mtime_ns, 1_000_000_000)
    prefix = datetime.fromtimestamp(seconds, timezone.utc).strftime(
        "%Y-%m-%dT%H:%M:%S"
    )
    return f"{prefix}.{nanoseconds:09d}Z"


CASE.mkdir(mode=0o700, parents=True, exist_ok=True)
root_info = ROOT.lstat()
if ROOT.is_symlink() or not stat.S_ISDIR(root_info.st_mode):
    raise RuntimeError("evidence root must be a real directory, not a symlink")
root_device = root_info.st_dev
errors = []
record_count = 0
with (CASE / "file-timeline.jsonl").open("x", encoding="utf-8") as output:
    for directory, dirnames, filenames in os.walk(ROOT, followlinks=False):
        kept_directories = []
        for dirname in dirnames:
            path = Path(directory) / dirname
            try:
                info = path.lstat()
                if stat.S_ISLNK(info.st_mode):
                    errors.append(
                        {"path": str(path), "error": "symbolic directory skipped"}
                    )
                elif not stat.S_ISDIR(info.st_mode):
                    errors.append(
                        {"path": str(path), "error": "non-directory traversal entry"}
                    )
                elif info.st_dev != root_device:
                    errors.append(
                        {
                            "path": str(path),
                            "error": "cross-device directory pruned",
                            "device": info.st_dev,
                            "root_device": root_device,
                        }
                    )
                else:
                    kept_directories.append(dirname)
            except OSError as error:
                errors.append({"path": str(path), "error": str(error)})
        dirnames[:] = kept_directories

        for filename in filenames:
            path = Path(directory) / filename
            try:
                info = path.lstat()
            except OSError as error:
                errors.append({"path": str(path), "error": str(error)})
                continue
            if not stat.S_ISREG(info.st_mode):
                if stat.S_ISLNK(info.st_mode):
                    errors.append({"path": str(path), "error": "symbolic file skipped"})
                continue
            if info.st_dev != root_device:
                errors.append(
                    {
                        "path": str(path),
                        "error": "cross-device regular file included; review mount topology",
                        "device": info.st_dev,
                        "root_device": root_device,
                    }
                )

            relative = path.relative_to(ROOT)
            record = {
                "mtime_ns": info.st_mtime_ns,
                "mtime_utc": exact_utc(info.st_mtime_ns),
                "uid": info.st_uid,
                "gid": info.st_gid,
                "device": info.st_dev,
                "mode": f"{stat.S_IMODE(info.st_mode):04o}",
                "size": info.st_size,
                "path": str(relative),
                "path_bytes_b64": base64.b64encode(os.fsencode(relative)).decode(
                    "ascii"
                ),
            }
            output.write(json.dumps(record, ensure_ascii=True) + "\n")
            record_count += 1

if record_count == 0:
    errors.append(
        {
            "path": str(ROOT),
            "error": "no regular file records emitted; review traversal and mounts",
        }
    )

with (CASE / "file-timeline-errors.json").open("x", encoding="utf-8") as output:
    json.dump(errors, output, indent=2, ensure_ascii=True)
    output.write("\n")
with (CASE / "analysis-mountinfo.txt").open("x", encoding="utf-8") as output:
    output.write(Path("/proc/self/mountinfo").read_text(encoding="utf-8"))
`
    },
    {
      "title": "Filter an Explicit Incident Window",
      "language": "python",
      "code": String.raw`import calendar
import json
import stat
from datetime import datetime, timezone
from pathlib import Path, PurePosixPath


CASE = Path("case-2026-06-26")
START = datetime.fromisoformat("2026-06-20T00:00:00+00:00")
END = datetime.fromisoformat("2026-06-27T00:00:00+00:00")
SCOPES = ("home", "root", "tmp", "var/tmp")

# Sequential workflow prerequisite: create file-timeline.jsonl first.


def epoch_ns(value: datetime) -> int:
    utc_value = value.astimezone(timezone.utc)
    return calendar.timegm(utc_value.timetuple()) * 1_000_000_000


start_ns = epoch_ns(START)
end_ns = epoch_ns(END)
with (CASE / "file-timeline.jsonl").open(encoding="utf-8") as source, (
    CASE / "windowed-executables-dotfiles.jsonl"
).open("x", encoding="utf-8") as output:
    for line in source:
        record = json.loads(line)
        path = PurePosixPath(record["path"])
        in_scope = any(path == scope or str(path).startswith(scope + "/") for scope in SCOPES)
        mode = int(record["mode"], 8)
        interesting = bool(mode & 0o111) or path.name.startswith(".")
        if in_scope and interesting and start_ns <= record["mtime_ns"] < end_ns:
            output.write(json.dumps(record, ensure_ascii=True) + "\n")

with (CASE / "incident-window.json").open("x", encoding="utf-8") as output:
    json.dump(
        {
            "start": START.isoformat(),
            "end_exclusive": END.isoformat(),
            "timezone": "UTC",
            "basis": "documented incident window, not analyst current time",
        },
        output,
        indent=2,
    )
    output.write("\n")
`
    },
    {
      "title": "Sort Timeline Records by Integer Nanoseconds",
      "language": "python",
      "code": String.raw`import json
from pathlib import Path


CASE = Path("case-2026-06-26")
# Sequential workflow prerequisite: create file-timeline.jsonl first.
with (CASE / "file-timeline.jsonl").open(encoding="utf-8") as source:
    records = [json.loads(line) for line in source]

records.sort(key=lambda record: record["mtime_ns"])
with (CASE / "latest-25-files.jsonl").open("x", encoding="utf-8") as output:
    for record in records[-25:]:
        output.write(json.dumps(record, ensure_ascii=True) + "\n")
`
    }
  ]
};
