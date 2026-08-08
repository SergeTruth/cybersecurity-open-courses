window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Permissions, Storage Locations, and Isolation with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Create a private POSIX file with explicit permissions",
      "language": "python",
      "blurb": "The POSIX example fails closed unless directory descriptors and O_NOFOLLOW are available, then uses exclusive creation and verifies owner-only permissions on the opened descriptor before writing.",
      "code": "import os\nimport re\nimport stat\n\nSTORED_NAME = re.compile(r\"[a-f0-9]{32}\\Z\")\nMAX_PRIVATE_FILE_BYTES = 1_048_576\n\ndef create_private_file(directory_fd: int, stored_name: str, content: bytes) -> None:\n    if not hasattr(os, \"O_NOFOLLOW\") or os.open not in os.supports_dir_fd:\n        raise NotImplementedError(\"secure private-file creation requires POSIX dir_fd and O_NOFOLLOW\")\n    if type(directory_fd) is not int or directory_fd < 0:\n        raise ValueError(\"directory descriptor rejected\")\n    if not isinstance(stored_name, str) or STORED_NAME.fullmatch(stored_name) is None:\n        raise ValueError(\"stored name rejected\")\n    if not isinstance(content, bytes) or len(content) > MAX_PRIVATE_FILE_BYTES:\n        raise ValueError(\"private file content rejected\")\n    if not stat.S_ISDIR(os.fstat(directory_fd).st_mode):\n        raise ValueError(\"directory descriptor rejected\")\n    flags = (\n        os.O_WRONLY\n        | os.O_CREAT\n        | os.O_EXCL\n        | os.O_NOFOLLOW\n        | getattr(os, \"O_CLOEXEC\", 0)\n    )\n    descriptor = os.open(stored_name, flags, 0o600, dir_fd=directory_fd)\n    try:\n        info = os.fstat(descriptor)\n        if not stat.S_ISREG(info.st_mode) or (info.st_mode & 0o077) != 0:\n            raise ValueError(\"private file permissions rejected\")\n        with os.fdopen(descriptor, \"wb\") as output:\n            descriptor = -1\n            output.write(content)\n            output.flush()\n            os.fsync(output.fileno())\n    except BaseException as error:\n        cleanup_errors: list[BaseException] = []\n        if descriptor >= 0:\n            try:\n                os.close(descriptor)\n            except BaseException as cleanup_error:\n                cleanup_errors.append(cleanup_error)\n        try:\n            os.unlink(stored_name, dir_fd=directory_fd)\n        except FileNotFoundError:\n            pass\n        except BaseException as cleanup_error:\n            cleanup_errors.append(cleanup_error)\n        if cleanup_errors:\n            raise BaseExceptionGroup(\n                \"private-file creation and cleanup failed\",\n                [error, *cleanup_errors],\n            )\n        raise\n"
    },
    {
      "title": "Separate tenant storage namespaces",
      "language": "python",
      "blurb": "A validated tenant identifier selects a pre-provisioned directory; arbitrary tenant paths are never accepted.",
      "code": "from pathlib import Path\n\nTENANT_DIRECTORIES = {\n    \"north\": Path(\"/srv/private/tenants/north\"),\n    \"south\": Path(\"/srv/private/tenants/south\"),\n}\n\ndef tenant_directory(tenant_id: str) -> Path:\n    try:\n        directory = TENANT_DIRECTORIES[tenant_id]\n    except KeyError:\n        raise PermissionError(\"tenant storage is unavailable\") from None\n    if not directory.is_dir():\n        raise RuntimeError(\"tenant storage is not mounted\")\n    return directory\n"
    }
  ]
};
