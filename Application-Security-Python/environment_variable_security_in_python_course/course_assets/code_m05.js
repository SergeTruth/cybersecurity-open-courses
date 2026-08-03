window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Local Development and .env File Safety with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Read a development environment file safely",
      "language": "python",
      "blurb": "The POSIX loader opens one fixed name beneath a trusted directory, refuses links, validates the opened descriptor, and returns bounded UTF-8 text.",
      "code": "import os\nimport stat\n\ndef read_development_dotenv(root_fd: int, name: str = \".env\") -> str:\n    if not hasattr(os, \"O_NOFOLLOW\"):\n        raise NotImplementedError(\"secure dotenv loading requires O_NOFOLLOW\")\n    if name != \".env\":\n        raise ValueError(\"only the approved dotenv name is supported\")\n    descriptor = os.open(name, os.O_RDONLY | os.O_NOFOLLOW, dir_fd=root_fd)\n    with os.fdopen(descriptor, \"rb\") as stream:\n        info = os.fstat(stream.fileno())\n        if not stat.S_ISREG(info.st_mode) or info.st_mode & 0o077:\n            raise PermissionError(\".env file type or permissions rejected\")\n        raw = stream.read(65_537)\n    if len(raw) > 65_536:\n        raise ValueError(\".env file is too large\")\n    return raw.decode(\"utf-8\", errors=\"strict\")\n"
    },
    {
      "title": "Parse only documented dotenv names",
      "language": "python",
      "blurb": "The small parser consumes already-opened text, rejects unexpected keys, and cannot silently override deployment-provided values.",
      "code": "ALLOWED_DEVELOPMENT_KEYS = {\"APP_ENV\", \"API_ORIGIN\", \"DATABASE_URL\"}\n\ndef _strip_dotenv_quotes(value: str) -> str:\n    if len(value) >= 2 and value[0] == value[-1] and value[0] in {\"'\", '\"'}:\n        return value[1:-1]\n    return value\n\ndef parse_development_dotenv(raw: str) -> dict[str, str]:\n    values = {}\n    for line_number, line in enumerate(raw.splitlines(), 1):\n        stripped = line.strip()\n        if not stripped or stripped.startswith(\"#\"):\n            continue\n        if stripped.startswith(\"export \"):\n            stripped = stripped[7:].lstrip()\n        name, separator, value = stripped.partition(\"=\")\n        if not separator:\n            raise ValueError(f\"line {line_number} is missing '='\")\n        name = name.strip()\n        if name not in ALLOWED_DEVELOPMENT_KEYS:\n            raise ValueError(f\"unknown .env setting: {name}\")\n        values[name] = _strip_dotenv_quotes(value.strip())\n    return values\n\ndef development_environment(raw: str, inherited: dict[str, str]) -> dict[str, str]:\n    file_values = parse_development_dotenv(raw)\n    inherited_values = {\n        key: inherited[key] for key in ALLOWED_DEVELOPMENT_KEYS & inherited.keys()\n    }\n    return file_values | inherited_values\n"
    }
  ]
};
