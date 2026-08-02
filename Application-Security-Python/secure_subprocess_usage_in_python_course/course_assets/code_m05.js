window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Paths, Working Directories, and File Handling through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Inspect an opened file through a standard utility",
      "language": "python",
      "blurb": "The parent obtains a no-follow descriptor from a trusted directory, validates the actual regular file, and sends that object to file rather than reopening a replaceable pathname.",
      "code": "import os\nimport stat\nimport subprocess\n\ndef identify_stored_file(root_fd: int, name: str) -> str:\n    if not hasattr(os, \"O_NOFOLLOW\") or not name or os.path.basename(name) != name:\n        raise ValueError(\"stored filename rejected\")\n    descriptor = os.open(name, os.O_RDONLY | os.O_NOFOLLOW, dir_fd=root_fd)\n    try:\n        info = os.fstat(descriptor)\n        if not stat.S_ISREG(info.st_mode) or info.st_size > 20_000_000:\n            raise ValueError(\"stored object rejected\")\n        with os.fdopen(descriptor, \"rb\", closefd=False) as source:\n            completed = subprocess.run(\n                [\"/usr/bin/file\", \"--brief\", \"--mime-type\", \"-\"],\n                stdin=source,\n                stdout=subprocess.PIPE,\n                stderr=subprocess.DEVNULL,\n                timeout=15,\n                check=True,\n                env={\"PATH\": \"/usr/bin:/bin\"},\n            )\n        media_type = completed.stdout.decode(\"ascii\", \"strict\").strip()\n        if media_type not in {\"application/pdf\", \"image/jpeg\", \"image/png\", \"text/plain\"}:\n            raise ValueError(\"stored media type rejected\")\n        return media_type\n    finally:\n        os.close(descriptor)\n"
    },
    {
      "title": "Check executable integrity under an immutable deployment root",
      "language": "python",
      "blurb": "This is a startup integrity check for one direct child of a root-owned, non-writable deployment directory; later pathname launch is safe only while that deployment tree remains immutable.",
      "code": "from pathlib import Path\nimport os\nimport stat\n\ndef verify_executable_at_startup(path: Path, deployment_root: Path) -> tuple[int, int]:\n    if not path.is_absolute() or not deployment_root.is_absolute() or path.parent != deployment_root:\n        raise ValueError(\"direct deployment executable required\")\n    if path.is_symlink() or deployment_root.is_symlink():\n        raise ValueError(\"deployment links rejected\")\n    root_info = deployment_root.stat()\n    if not stat.S_ISDIR(root_info.st_mode) or root_info.st_uid != 0 or root_info.st_mode & 0o022:\n        raise PermissionError(\"immutable root-owned deployment directory required\")\n    flags = os.O_RDONLY | getattr(os, \"O_CLOEXEC\", 0) | getattr(os, \"O_NOFOLLOW\", 0)\n    descriptor = os.open(path, flags)\n    try:\n        opened = os.fstat(descriptor)\n        named = os.stat(path, follow_symlinks=False)\n        if (opened.st_dev, opened.st_ino) != (named.st_dev, named.st_ino):\n            raise OSError(\"executable changed during startup validation\")\n        if opened.st_uid not in {0, os.geteuid()}:\n            raise PermissionError(\"executable owner rejected\")\n        if not stat.S_ISREG(opened.st_mode) or opened.st_mode & 0o022 or not opened.st_mode & 0o111:\n            raise PermissionError(\"executable mode rejected\")\n        return opened.st_dev, opened.st_ino\n    finally:\n        os.close(descriptor)\n"
    }
  ]
};
