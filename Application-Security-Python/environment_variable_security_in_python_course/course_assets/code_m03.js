window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Loading and Validating Environment Variables with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Build a typed configuration at startup",
      "language": "python",
      "blurb": "Required environment values are parsed once, and the API origin is restricted to an approved HTTPS host without credentials, path, query, or fragment.",
      "code": "from dataclasses import dataclass\nfrom urllib.parse import urlsplit\nimport os\n\nAPPROVED_API_HOSTS = {\"api.example\", \"api-backup.example\"}\n\n@dataclass(frozen=True)\nclass Settings:\n    api_origin: str\n    worker_count: int\n\ndef load_settings(environment: dict[str, str] | None = None) -> Settings:\n    values = os.environ if environment is None else environment\n    origin = values.get(\"API_ORIGIN\", \"\")\n    parsed = urlsplit(origin)\n    try:\n        port = parsed.port\n    except ValueError:\n        raise ValueError(\"API_ORIGIN contains an invalid port\") from None\n    if (\n        parsed.scheme != \"https\"\n        or parsed.hostname not in APPROVED_API_HOSTS\n        or port not in {None, 443}\n        or parsed.username is not None\n        or parsed.password is not None\n        or parsed.path not in {\"\", \"/\"}\n        or parsed.query\n        or parsed.fragment\n    ):\n        raise ValueError(\"API_ORIGIN must be an approved HTTPS origin\")\n    workers = int(values.get(\"WORKER_COUNT\", \"4\"))\n    if not 1 <= workers <= 32:\n        raise ValueError(\"WORKER_COUNT is outside the supported range\")\n    return Settings(f\"https://{parsed.hostname}\", workers)\n"
    },
    {
      "title": "Parse security flags without permissive fallbacks",
      "language": "python",
      "blurb": "Only documented Boolean spellings are accepted, and a missing authentication setting fails startup.",
      "code": "TRUE_VALUES = {\"1\", \"true\", \"yes\"}\nFALSE_VALUES = {\"0\", \"false\", \"no\"}\n\ndef required_boolean(environment: dict[str, str], name: str) -> bool:\n    try:\n        raw = environment[name].strip().casefold()\n    except KeyError:\n        raise RuntimeError(f\"required setting {name} is missing\") from None\n    if raw in TRUE_VALUES:\n        return True\n    if raw in FALSE_VALUES:\n        return False\n    raise ValueError(f\"{name} must be an explicit Boolean value\")\n"
    }
  ]
};
