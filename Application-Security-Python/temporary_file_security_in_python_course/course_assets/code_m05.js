window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Permissions, Locations, and Lifecycle Management through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Verify a trusted temporary directory",
      "language": "python",
      "blurb": "The policy checks the actual directory's type, ownership, and mode before creating sensitive work rather than assuming every system temporary location has suitable isolation.",
      "code": "from pathlib import Path\nimport os\nimport stat\n\ndef verify_private_temp_root(path: Path) -> int:\n    descriptor = os.open(path, os.O_RDONLY | getattr(os, \"O_DIRECTORY\", 0))\n    try:\n        info = os.fstat(descriptor)\n        if not stat.S_ISDIR(info.st_mode) or info.st_uid != os.geteuid():\n            raise PermissionError(\"temporary root ownership rejected\")\n        if stat.S_IMODE(info.st_mode) != 0o700:\n            raise PermissionError(\"temporary root permissions rejected\")\n        return descriptor\n    except BaseException:\n        os.close(descriptor)\n        raise\n"
    },
    {
      "title": "Create and clean up one private temporary object",
      "language": "python",
      "blurb": "This self-contained manager creates a descriptor-relative object exclusively with a no-follow open, then unlinks its generated name and closes the descriptor on success or failure.",
      "code": "from contextlib import contextmanager\nimport os\nimport secrets\n\ndef create_private_temp(root_fd: int) -> tuple[int, str]:\n    if not hasattr(os, \"O_NOFOLLOW\"):\n        raise NotImplementedError(\"secure temporary creation requires O_NOFOLLOW\")\n    for _ in range(20):\n        name = \".work-\" + secrets.token_hex(16)\n        try:\n            descriptor = os.open(\n                name,\n                os.O_RDWR | os.O_CREAT | os.O_EXCL | os.O_NOFOLLOW | getattr(os, \"O_CLOEXEC\", 0),\n                mode=0o600,\n                dir_fd=root_fd,\n            )\n        except FileExistsError:\n            continue\n        os.fchmod(descriptor, 0o600)\n        return descriptor, name\n    raise FileExistsError(\"temporary name retry budget exhausted\")\n\n@contextmanager\ndef private_temporary_object(root_fd: int):\n    descriptor, name = create_private_temp(root_fd)\n    try:\n        yield descriptor\n    finally:\n        try:\n            os.unlink(name, dir_fd=root_fd)\n        except FileNotFoundError:\n            pass\n        finally:\n            os.close(descriptor)\n"
    }
  ]
};
