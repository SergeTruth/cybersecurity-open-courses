window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Reading and Writing Files Safely with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Read a bounded UTF-8 file through a directory descriptor",
      "language": "python",
      "blurb": "The POSIX reader refuses links and checks type and size on the opened descriptor, eliminating the earlier stat-then-open pathname race.",
      "code": "import os\nimport stat\n\ndef read_text_file(root_fd: int, stored_name: str, maximum_bytes: int = 65_536) -> str:\n    if not hasattr(os, \"O_NOFOLLOW\"):\n        raise NotImplementedError(\"secure file reading requires O_NOFOLLOW\")\n    if not stored_name or os.path.basename(stored_name) != stored_name:\n        raise ValueError(\"stored name must be one path component\")\n    descriptor = os.open(stored_name, os.O_RDONLY | os.O_NOFOLLOW, dir_fd=root_fd)\n    with os.fdopen(descriptor, \"rb\") as stream:\n        info = os.fstat(stream.fileno())\n        if not stat.S_ISREG(info.st_mode) or info.st_size > maximum_bytes:\n            raise ValueError(\"configuration file rejected\")\n        raw = stream.read(maximum_bytes + 1)\n    if len(raw) > maximum_bytes:\n        raise ValueError(\"configuration grew beyond its limit\")\n    return raw.decode(\"utf-8\", errors=\"strict\")\n"
    },
    {
      "title": "Commit a file and its directory entry durably",
      "language": "python",
      "blurb": "The workflow distinguishes a failed write from a replacement whose directory synchronization could not be confirmed.",
      "code": "from enum import Enum\nfrom pathlib import Path\nimport os\nimport tempfile\n\nclass CommitResult(Enum):\n    NOT_REPLACED = \"not_replaced\"\n    REPLACED_UNCONFIRMED = \"replaced_unconfirmed\"\n    REPLACED_DURABLE = \"replaced_durable\"\n\ndef durable_replace(target: Path, payload: bytes) -> CommitResult:\n    descriptor, temporary = tempfile.mkstemp(dir=target.parent)\n    committed = False\n    try:\n        with os.fdopen(descriptor, \"wb\") as output:\n            output.write(payload); output.flush(); os.fsync(output.fileno())\n        os.replace(temporary, target); committed = True\n        directory = os.open(target.parent, os.O_RDONLY)\n        try: os.fsync(directory)\n        finally: os.close(directory)\n        return CommitResult.REPLACED_DURABLE\n    except OSError:\n        if not committed:\n            try: os.unlink(temporary)\n            except FileNotFoundError: pass\n        return CommitResult.REPLACED_UNCONFIRMED if committed else CommitResult.NOT_REPLACED\n"
    }
  ]
};
