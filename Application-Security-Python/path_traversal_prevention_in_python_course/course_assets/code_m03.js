window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Safe Path Construction and Canonicalization with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Open a single stored name beneath a directory descriptor",
      "language": "python",
      "blurb": "The POSIX boundary requires no-follow support, rejects path syntax, and validates the actual descriptor opened beneath a trusted directory.",
      "code": "import os\nimport stat\n\ndef open_stored_file(root_fd: int, stored_name: str) -> int:\n    if not hasattr(os, \"O_NOFOLLOW\"):\n        raise NotImplementedError(\"this boundary requires O_NOFOLLOW support\")\n    if not stored_name or stored_name in {\".\", \"..\"}:\n        raise ValueError(\"stored name is empty or reserved\")\n    if os.path.basename(stored_name) != stored_name or \"\\x00\" in stored_name:\n        raise ValueError(\"stored name must be one path component\")\n    flags = os.O_RDONLY | os.O_NOFOLLOW | getattr(os, \"O_CLOEXEC\", 0)\n    descriptor = os.open(stored_name, flags, dir_fd=root_fd)\n    if not stat.S_ISREG(os.fstat(descriptor).st_mode):\n        os.close(descriptor)\n        raise ValueError(\"stored object is not a regular file\")\n    return descriptor\n"
    },
    {
      "title": "Reject an escaping resolved path",
      "language": "python",
      "blurb": "Containment uses Path.relative_to rather than a vulnerable string prefix and disallows selecting the storage root itself.",
      "code": "from pathlib import Path\n\ndef contained_existing_file(root: Path, relative_name: str) -> Path:\n    trusted_root = root.resolve(strict=True)\n    candidate = (trusted_root / relative_name).resolve(strict=True)\n    if candidate == trusted_root or not candidate.is_file():\n        raise ValueError(\"a stored file must be selected\")\n    try:\n        candidate.relative_to(trusted_root)\n    except ValueError:\n        raise PermissionError(\"path escaped the storage root\") from None\n    return candidate\n"
    }
  ]
};
