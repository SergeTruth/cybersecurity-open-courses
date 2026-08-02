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
      "blurb": "The parser consumes already-opened text, rejects unexpected keys, and cannot silently override deployment-provided values.",
      "code": "from io import StringIO\nfrom dotenv import dotenv_values\n\nALLOWED_DEVELOPMENT_KEYS = {\"APP_ENV\", \"API_ORIGIN\", \"DATABASE_URL\"}\n\ndef development_environment(raw: str, inherited: dict[str, str]) -> dict[str, str]:\n    parsed = dotenv_values(stream=StringIO(raw), interpolate=False)\n    file_values = {key: value for key, value in parsed.items() if value is not None}\n    unknown = file_values.keys() - ALLOWED_DEVELOPMENT_KEYS\n    if unknown:\n        raise ValueError(f\"unknown .env settings: {sorted(unknown)}\")\n    inherited_values = {\n        key: inherited[key] for key in ALLOWED_DEVELOPMENT_KEYS & inherited.keys()\n    }\n    return file_values | inherited_values\n"
    }
  ]
};
