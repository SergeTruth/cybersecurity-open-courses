window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Secrets in CI/CD, Containers, and Automation with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Consume a CI secret without printing it",
      "language": "python",
      "blurb": "The deployment step validates credential bytes, passes them through standard input, and exposes only a fixed command and sanitized environment.",
      "code": "import subprocess\n\ndef authenticate_registry(token: bytes) -> None:\n    if not isinstance(token, bytes) or not 16 <= len(token) <= 4096:\n        raise ValueError(\"registry token length rejected\")\n    if any(byte in b\"\\x00\\r\\n\" for byte in token):\n        raise ValueError(\"registry token contains an unsafe delimiter\")\n    completed = subprocess.run(\n        [\"/usr/bin/docker\", \"login\", \"registry.example\", \"--username\", \"ci\", \"--password-stdin\"],\n        input=token,\n        stdout=subprocess.DEVNULL,\n        stderr=subprocess.PIPE,\n        env={\"PATH\": \"/usr/bin:/bin\", \"LANG\": \"C.UTF-8\"},\n        timeout=20,\n        check=False,\n    )\n    if completed.returncode:\n        raise RuntimeError(\"registry authentication failed\")\n"
    },
    {
      "title": "Read an approved runtime secret without path traversal",
      "language": "python",
      "blurb": "The POSIX loader validates one approved runtime secret name before opening beneath /run/secrets, refuses links, validates the descriptor, and reads at most 4 KiB.",
      "code": "import os\nimport stat\n\nAPPROVED_CONTAINER_SECRETS = {\"database-password\"}\n\ndef approved_container_secret_name(secret_name: object) -> str:\n    if not isinstance(secret_name, str) or secret_name not in APPROVED_CONTAINER_SECRETS:\n        raise ValueError(\"container secret name is not approved\")\n    if os.path.basename(secret_name) != secret_name or secret_name in {\".\", \"..\"}:\n        raise ValueError(\"container secret name is not approved\")\n    return secret_name\n\ndef container_database_password(secret_name: str = \"database-password\") -> bytes:\n    secret_name = approved_container_secret_name(secret_name)\n    if not hasattr(os, \"O_DIRECTORY\") or not hasattr(os, \"O_NOFOLLOW\"):\n        raise NotImplementedError(\"secure container secret loading requires POSIX open flags\")\n    directory = os.open(\"/run/secrets\", os.O_RDONLY | os.O_DIRECTORY)\n    try:\n        descriptor = os.open(secret_name, os.O_RDONLY | os.O_NOFOLLOW, dir_fd=directory)\n    finally:\n        os.close(directory)\n    with os.fdopen(descriptor, \"rb\") as stream:\n        info = os.fstat(stream.fileno())\n        if not stat.S_ISREG(info.st_mode) or info.st_mode & 0o077:\n            raise PermissionError(\"container secret type or permissions rejected\")\n        value = stream.read(4097)\n    value = value.rstrip(b\"\\r\\n\")\n    if not 12 <= len(value) <= 4096:\n        raise ValueError(\"container secret length rejected\")\n    return value\n"
    }
  ]
};
