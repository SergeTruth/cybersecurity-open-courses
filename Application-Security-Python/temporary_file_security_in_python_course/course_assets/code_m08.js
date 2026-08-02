window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Logging, Monitoring, and Incident Response through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Regression-test exclusive temporary creation in one listing",
      "language": "python",
      "blurb": "The self-contained regression includes descriptor-relative exclusive creation, plants a candidate name, and verifies the implementation creates a different object without truncating the planted file.",
      "code": "import os\nimport secrets\n\ndef create_private_temp(root_fd: int) -> tuple[int, str]:\n    if not hasattr(os, \"O_NOFOLLOW\"):\n        raise NotImplementedError(\"secure creation requires O_NOFOLLOW\")\n    for _ in range(20):\n        name = \".work-\" + secrets.token_hex(16)\n        try:\n            descriptor = os.open(\n                name,\n                os.O_RDWR | os.O_CREAT | os.O_EXCL | os.O_NOFOLLOW,\n                mode=0o600,\n                dir_fd=root_fd,\n            )\n        except FileExistsError:\n            continue\n        os.fchmod(descriptor, 0o600)\n        return descriptor, name\n    raise FileExistsError(\"temporary name retry budget exhausted\")\n\ndef test_private_temp_does_not_reuse_existing_name(tmp_path, monkeypatch) -> None:\n    planted = tmp_path / (\".work-\" + \"a\" * 32)\n    planted.write_text(\"preserve\")\n    values = iter((\"a\" * 32, \"b\" * 32))\n    monkeypatch.setattr(\"secrets.token_hex\", lambda _size: next(values))\n    root_fd = os.open(tmp_path, os.O_RDONLY)\n    try:\n        descriptor, name = create_private_temp(root_fd)\n        os.close(descriptor)\n        assert name == \".work-\" + \"b\" * 32\n        assert planted.read_text() == \"preserve\"\n    finally:\n        os.close(root_fd)\n"
    },
    {
      "title": "Remove only an exact one-component orphan name",
      "language": "python",
      "blurb": "Cleanup requires a lowercase hexadecimal work name and one path component before no-follow opening, descriptor validation, age checking, and unlinking inside the trusted private directory.",
      "code": "import os\nimport re\nimport stat\nimport time\n\nWORK_NAME = re.compile(r\"\\.work-[0-9a-f]{32}\")\n\ndef remove_stale_work_file(root_fd: int, name: str, now: float | None = None) -> bool:\n    if (\n        WORK_NAME.fullmatch(name) is None\n        or os.path.basename(name) != name\n        or not hasattr(os, \"O_NOFOLLOW\")\n    ):\n        return False\n    descriptor = os.open(name, os.O_RDONLY | os.O_NOFOLLOW, dir_fd=root_fd)\n    try:\n        info = os.fstat(descriptor)\n        current = time.time() if now is None else now\n        if not stat.S_ISREG(info.st_mode) or info.st_uid != os.geteuid() or current - info.st_mtime < 3600:\n            return False\n        os.unlink(name, dir_fd=root_fd)\n        return True\n    finally:\n        os.close(descriptor)\n"
    }
  ]
};
