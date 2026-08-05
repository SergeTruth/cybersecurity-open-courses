window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Secret Storage Patterns with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Read and normalize a protected secret safely",
      "language": "python",
      "blurb": "The approved one-component secret name is validated before opening, then the no-follow descriptor is checked for type and permissions before a bounded byte value is returned.",
      "code": "import os\nimport stat\n\nAPPROVED_FILE_SECRETS = {\"database-password\"}\n\ndef approved_secret_filename(secret_name: object) -> str:\n    if not isinstance(secret_name, str) or not 1 <= len(secret_name) <= 80:\n        raise ValueError(\"secret name must be an approved path component\")\n    if secret_name not in APPROVED_FILE_SECRETS:\n        raise ValueError(\"secret name must be an approved path component\")\n    if os.path.basename(secret_name) != secret_name:\n        raise ValueError(\"secret name must be an approved path component\")\n    if any(character in secret_name for character in \"\\x00\\r\\n\") or secret_name in {\".\", \"..\"}:\n        raise ValueError(\"secret name must be an approved path component\")\n    return secret_name\n\ndef normalize_secret(raw: bytes) -> bytes:\n    value = raw.rstrip(b\"\\r\\n\")\n    if not value or len(value) > 4096:\n        raise ValueError(\"secret value size rejected\")\n    return value\n\ndef read_protected_secret(root_fd: int, secret_name: str) -> bytes:\n    secret_name = approved_secret_filename(secret_name)\n    if not hasattr(os, \"O_NOFOLLOW\"):\n        raise NotImplementedError(\"secure secret loading requires O_NOFOLLOW\")\n    descriptor = os.open(secret_name, os.O_RDONLY | os.O_NOFOLLOW, dir_fd=root_fd)\n    with os.fdopen(descriptor, \"rb\") as stream:\n        info = os.fstat(stream.fileno())\n        if not stat.S_ISREG(info.st_mode) or info.st_mode & 0o077:\n            raise PermissionError(\"secret file type or permissions rejected\")\n        raw = stream.read(4097)\n    if len(raw) > 4096:\n        raise ValueError(\"secret file size rejected\")\n    return normalize_secret(raw)\n"
    },
    {
      "title": "Cache a secret for a bounded interval",
      "language": "python",
      "blurb": "The cache expires by monotonic time, stores a private bytearray copy that can be zeroed, and returns bytes so callers cannot mutate cached state.",
      "code": "from dataclasses import dataclass\nfrom time import monotonic\n\n@dataclass\nclass CachedSecret:\n    value: bytes | bytearray\n    expires_at: float\n\n    def __post_init__(self) -> None:\n        if not isinstance(self.value, (bytes, bytearray)) or not 1 <= len(self.value) <= 4096:\n            raise ValueError(\"cached secret value rejected\")\n        self.value = bytearray(self.value)\n\n    def get(self) -> bytes:\n        if monotonic() >= self.expires_at:\n            self.value[:] = b\"\\x00\" * len(self.value)\n            raise TimeoutError(\"cached secret expired\")\n        return bytes(self.value)\n"
    }
  ]
};
