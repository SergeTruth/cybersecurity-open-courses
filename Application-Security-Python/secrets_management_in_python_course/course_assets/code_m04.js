window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Secret Storage Patterns with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Read and normalize a protected secret safely",
      "language": "python",
      "blurb": "The no-follow descriptor is checked for type and permissions, then trailing line endings are removed before the final secret value is required to be nonempty and bounded.",
      "code": "import os\nimport stat\n\ndef normalize_secret(raw: bytes) -> bytes:\n    value = raw.rstrip(b\"\\r\\n\")\n    if not value or len(value) > 4096:\n        raise ValueError(\"secret value size rejected\")\n    return value\n\ndef read_protected_secret(root_fd: int, secret_name: str) -> bytes:\n    if not hasattr(os, \"O_NOFOLLOW\"):\n        raise NotImplementedError(\"secure secret loading requires O_NOFOLLOW\")\n    if not secret_name or os.path.basename(secret_name) != secret_name:\n        raise ValueError(\"secret name must be one path component\")\n    descriptor = os.open(secret_name, os.O_RDONLY | os.O_NOFOLLOW, dir_fd=root_fd)\n    with os.fdopen(descriptor, \"rb\") as stream:\n        info = os.fstat(stream.fileno())\n        if not stat.S_ISREG(info.st_mode) or info.st_mode & 0o077:\n            raise PermissionError(\"secret file type or permissions rejected\")\n        raw = stream.read(4097)\n    if len(raw) > 4096:\n        raise ValueError(\"secret file size rejected\")\n    return normalize_secret(raw)\n"
    },
    {
      "title": "Cache a secret for a bounded interval",
      "language": "python",
      "blurb": "The cache expires by monotonic time and returns copies so callers cannot mutate the cached byte array.",
      "code": "from dataclasses import dataclass\nfrom time import monotonic\n\n@dataclass\nclass CachedSecret:\n    value: bytearray\n    expires_at: float\n\n    def get(self) -> bytes:\n        if monotonic() >= self.expires_at:\n            self.value[:] = b\"\\x00\" * len(self.value)\n            raise TimeoutError(\"cached secret expired\")\n        return bytes(self.value)\n"
    }
  ]
};
