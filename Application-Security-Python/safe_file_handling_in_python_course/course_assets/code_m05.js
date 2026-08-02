window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Permissions, Storage Locations, and Isolation with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Create a private file with explicit permissions",
      "language": "python",
      "blurb": "The low-level open uses exclusive creation, no final symlink following, and owner-only mode from the first filesystem operation.",
      "code": "from pathlib import Path\nimport os\n\ndef create_private_file(path: Path, content: bytes) -> None:\n    flags = os.O_WRONLY | os.O_CREAT | os.O_EXCL | getattr(os, \"O_NOFOLLOW\", 0)\n    descriptor = os.open(path, flags, 0o600)\n    with os.fdopen(descriptor, \"wb\") as output:\n        output.write(content)\n        output.flush()\n        os.fsync(output.fileno())\n"
    },
    {
      "title": "Separate tenant storage namespaces",
      "language": "python",
      "blurb": "A validated tenant identifier selects a pre-provisioned directory; arbitrary tenant paths are never accepted.",
      "code": "from pathlib import Path\n\nTENANT_DIRECTORIES = {\n    \"north\": Path(\"/srv/private/tenants/north\"),\n    \"south\": Path(\"/srv/private/tenants/south\"),\n}\n\ndef tenant_directory(tenant_id: str) -> Path:\n    try:\n        directory = TENANT_DIRECTORIES[tenant_id]\n    except KeyError:\n        raise PermissionError(\"tenant storage is unavailable\") from None\n    if not directory.is_dir():\n        raise RuntimeError(\"tenant storage is not mounted\")\n    return directory\n"
    }
  ]
};
