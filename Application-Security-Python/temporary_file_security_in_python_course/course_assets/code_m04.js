window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Naming, Race Conditions, and Path Safety through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Create a named temporary file exclusively",
      "language": "python",
      "blurb": "mkstemp performs unpredictable exclusive creation and returns the already-open descriptor, avoiding a separate name selection and vulnerable reopen.",
      "code": "from pathlib import Path\nimport os\nimport tempfile\n\ndef stage_named_payload(directory: Path, payload: bytes) -> Path:\n    descriptor, name = tempfile.mkstemp(prefix=\".payload-\", suffix=\".tmp\", dir=directory)\n    path = Path(name)\n    try:\n        with os.fdopen(descriptor, \"wb\") as output:\n            output.write(payload)\n            output.flush()\n            os.fsync(output.fileno())\n        return path\n    except BaseException:\n        path.unlink(missing_ok=True)\n        raise\n"
    },
    {
      "title": "Create a temporary object relative to a trusted directory",
      "language": "python",
      "blurb": "A random one-component name is opened with exclusive and no-follow flags through a directory descriptor, then the actual descriptor receives restrictive permissions.",
      "code": "import os\nimport secrets\n\ndef create_private_temp(root_fd: int) -> tuple[int, str]:\n    if not hasattr(os, \"O_NOFOLLOW\"):\n        raise NotImplementedError(\"secure descriptor-relative creation requires O_NOFOLLOW\")\n    for _ in range(20):\n        name = \".work-\" + secrets.token_hex(16)\n        try:\n            descriptor = os.open(\n                name,\n                os.O_RDWR | os.O_CREAT | os.O_EXCL | os.O_NOFOLLOW,\n                mode=0o600,\n                dir_fd=root_fd,\n            )\n        except FileExistsError:\n            continue\n        os.fchmod(descriptor, 0o600)\n        return descriptor, name\n    raise FileExistsError(\"temporary name retry budget exhausted\")\n"
    }
  ]
};
