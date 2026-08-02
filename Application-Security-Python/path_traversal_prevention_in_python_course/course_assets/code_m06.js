window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Archives, Symlinks, Temporary Files, and Race Conditions with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Approve portable ZIP member names before extraction",
      "language": "python",
      "blurb": "The validator interprets every name with POSIX and Windows rules, rejecting backslashes, drives, UNC or absolute paths, parent traversal, links, and resource excesses.",
      "code": "from pathlib import Path, PurePosixPath, PureWindowsPath\nfrom zipfile import ZipFile\nimport stat\n\ndef approved_zip_members(archive: ZipFile, maximum_bytes: int = 50_000_000):\n    members = archive.infolist()\n    if len(members) > 500 or sum(item.file_size for item in members) > maximum_bytes:\n        raise ValueError(\"archive resource limits exceeded\")\n    for item in members:\n        raw_name = item.filename\n        posix_path = PurePosixPath(raw_name)\n        windows_path = PureWindowsPath(raw_name)\n        mode = item.external_attr >> 16\n        if (\n            \"\\\\\" in raw_name\n            or posix_path.is_absolute()\n            or windows_path.is_absolute()\n            or bool(windows_path.drive)\n            or \"..\" in posix_path.parts\n            or stat.S_ISLNK(mode)\n        ):\n            raise ValueError(\"unsafe archive member\")\n        if item.is_dir():\n            continue\n        if not posix_path.parts or posix_path.parts[-1] in {\"\", \".\"}:\n            raise ValueError(\"empty archive member name\")\n        yield item, Path(*posix_path.parts)\n"
    },
    {
      "title": "Create a temporary file beside its commit target",
      "language": "python",
      "blurb": "A unique same-filesystem temporary file is flushed and synchronized before an atomic replacement, with cleanup on pre-commit failure.",
      "code": "from pathlib import Path\nimport os\nimport tempfile\n\ndef replace_report(destination: Path, content: bytes) -> None:\n    descriptor, temporary = tempfile.mkstemp(prefix=f\".{destination.name}.\", dir=destination.parent)\n    try:\n        with os.fdopen(descriptor, \"wb\") as output:\n            output.write(content)\n            output.flush()\n            os.fsync(output.fileno())\n        os.replace(temporary, destination)\n    except BaseException:\n        try:\n            os.unlink(temporary)\n        except FileNotFoundError:\n            pass\n        raise\n"
    }
  ]
};
