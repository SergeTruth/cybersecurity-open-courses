window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Permissions, Storage Locations, and Isolation with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Create a private POSIX file with explicit permissions",
      "language": "python",
      "blurb": "The POSIX example fails closed unless directory descriptors and O_NOFOLLOW are available, then uses exclusive creation and verifies owner-only permissions on the opened descriptor before writing.",
      "code": "import os\nimport stat\n\ndef create_private_file(directory_fd: int, stored_name: str, content: bytes) -> None:\n    if not hasattr(os, \"O_NOFOLLOW\") or os.open not in os.supports_dir_fd:\n        raise NotImplementedError(\"secure private-file creation requires POSIX dir_fd and O_NOFOLLOW\")\n    if not stored_name or os.path.basename(stored_name) != stored_name:\n        raise ValueError(\"stored name must be one path component\")\n    flags = os.O_WRONLY | os.O_CREAT | os.O_EXCL | os.O_NOFOLLOW\n    descriptor = os.open(stored_name, flags, 0o600, dir_fd=directory_fd)\n    try:\n        info = os.fstat(descriptor)\n        if not stat.S_ISREG(info.st_mode) or (info.st_mode & 0o077) != 0:\n            raise ValueError(\"private file permissions rejected\")\n        with os.fdopen(descriptor, \"wb\") as output:\n            descriptor = -1\n            output.write(content)\n            output.flush()\n            os.fsync(output.fileno())\n    finally:\n        if descriptor >= 0:\n            os.close(descriptor)\n"
    },
    {
      "title": "Separate tenant storage namespaces",
      "language": "python",
      "blurb": "A validated tenant identifier selects a pre-provisioned directory; arbitrary tenant paths are never accepted.",
      "code": "from pathlib import Path\n\nTENANT_DIRECTORIES = {\n    \"north\": Path(\"/srv/private/tenants/north\"),\n    \"south\": Path(\"/srv/private/tenants/south\"),\n}\n\ndef tenant_directory(tenant_id: str) -> Path:\n    try:\n        directory = TENANT_DIRECTORIES[tenant_id]\n    except KeyError:\n        raise PermissionError(\"tenant storage is unavailable\") from None\n    if not directory.is_dir():\n        raise RuntimeError(\"tenant storage is not mounted\")\n    return directory\n"
    }
  ]
};
