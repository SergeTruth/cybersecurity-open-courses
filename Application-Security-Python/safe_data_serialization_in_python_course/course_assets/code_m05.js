window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Python Object Serialization Risks with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Replace pickle input with an explicit data transfer object",
      "language": "python",
      "blurb": "The boundary constructs a frozen application value from validated plain fields and never reconstructs arbitrary Python objects.",
      "code": "from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass Profile:\n    display_name: str\n    timezone: str\n\ndef profile_from_data(data: dict[str, object]) -> Profile:\n    if set(data) != {\"display_name\", \"timezone\"}:\n        raise ValueError(\"profile schema mismatch\")\n    if not all(isinstance(data[name], str) for name in data):\n        raise TypeError(\"profile values must be strings\")\n    return Profile(display_name=data[\"display_name\"][:80], timezone=data[\"timezone\"])\n"
    },
    {
      "title": "Block unsafe object serialization at a boundary",
      "language": "python",
      "blurb": "A format allowlist makes the prohibition reviewable and prevents a caller from selecting pickle, marshal, or a dynamic loader.",
      "code": "SAFE_IMPORT_FORMATS = {\"json\", \"csv\"}\nUNSAFE_OBJECT_FORMATS = {\"pickle\", \"shelve\", \"marshal\", \"dill\"}\n\ndef approve_import_format(requested: str) -> str:\n    normalized = requested.casefold().strip()\n    if normalized in UNSAFE_OBJECT_FORMATS:\n        raise ValueError(\"object deserialization is not accepted\")\n    if normalized not in SAFE_IMPORT_FORMATS:\n        raise ValueError(\"unsupported import format\")\n    return normalized\n"
    }
  ]
};
