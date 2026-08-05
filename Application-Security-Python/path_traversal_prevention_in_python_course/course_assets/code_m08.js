window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Logging, Monitoring, and Remediation with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Test a descriptor-based opener against a symlink swap",
      "language": "python",
      "blurb": "The regression skips when descriptor-relative no-follow opens or symlink creation are unavailable, then swaps a stored entry for a symlink and verifies that the opened object is rejected.",
      "code": "import os\nimport stat\nimport pytest\n\ndef open_stored_file(root_fd: int, object_name: str):\n    if not hasattr(os, \"O_NOFOLLOW\") or os.open not in os.supports_dir_fd:\n        raise NotImplementedError(\"secure opening requires O_NOFOLLOW and dir_fd support\")\n    if not object_name or object_name in {\".\", \"..\"}:\n        raise ValueError(\"one stored-file component required\")\n    if os.path.basename(object_name) != object_name or \"\\x00\" in object_name:\n        raise ValueError(\"one stored-file component required\")\n    descriptor = os.open(\n        object_name,\n        os.O_RDONLY | os.O_NOFOLLOW | getattr(os, \"O_CLOEXEC\", 0),\n        dir_fd=root_fd,\n    )\n    try:\n        if not stat.S_ISREG(os.fstat(descriptor).st_mode):\n            raise OSError(\"stored object is not a regular file\")\n        return os.fdopen(descriptor, \"rb\")\n    except BaseException:\n        os.close(descriptor)\n        raise\n\ndef test_symlink_swap_is_rejected(tmp_path):\n    if not hasattr(os, \"O_NOFOLLOW\") or os.open not in os.supports_dir_fd:\n        pytest.skip(\"descriptor-relative no-follow open is unavailable\")\n    root = tmp_path / \"store\"\n    root.mkdir()\n    outside = tmp_path / \"secret.txt\"\n    outside.write_text(\"do not disclose\")\n    try:\n        (root / \"object-1\").symlink_to(outside)\n    except OSError as error:\n        pytest.skip(f\"symlink creation is unavailable: {error}\")\n    root_fd = os.open(root, os.O_RDONLY)\n    try:\n        with pytest.raises(OSError):\n            open_stored_file(root_fd, \"object-1\")\n    finally:\n        os.close(root_fd)\n"
    },
    {
      "title": "Log opaque file decisions",
      "language": "python",
      "blurb": "The audit event records identifiers and outcomes without copying user paths, filenames, URLs, or file contents.",
      "code": "def record_file_decision(audit, *, file_id: str, tenant_id: str, allowed: bool, reason: str) -> None:\n    allowed_reasons = {\"owner\", \"shared\", \"not_found\", \"denied\", \"invalid_identifier\"}\n    audit.info(\n        \"file_access_decision\",\n        extra={\n            \"file_id\": file_id,\n            \"tenant_id\": tenant_id,\n            \"outcome\": \"allowed\" if allowed else \"rejected\",\n            \"reason\": reason if reason in allowed_reasons else \"internal\",\n        },\n    )\n"
    }
  ]
};
