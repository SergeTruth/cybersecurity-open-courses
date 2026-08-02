window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Mass Assignment, Serialization, and Data Exposure with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Validate and allowlist mutable profile fields",
      "language": "python",
      "blurb": "Each writable field must be an exact string type and satisfy its own normalization, format, and allowlist policy before reaching the ORM.",
      "code": "import re\n\nWRITABLE_PROFILE_FIELDS = {\"display_name\", \"timezone\", \"locale\"}\nLOCALES = {\"en-US\", \"en-GB\", \"es-ES\", \"fr-FR\"}\nTIMEZONES = {\"UTC\", \"America/New_York\", \"Europe/London\", \"Europe/Paris\"}\nCONTROL_CHARACTER = re.compile(r\"[\\x00-\\x1f\\x7f]\")\n\ndef profile_changes(payload: dict[str, object]) -> dict[str, str]:\n    if not isinstance(payload, dict):\n        raise TypeError(\"profile update must be a mapping\")\n    unknown = payload.keys() - WRITABLE_PROFILE_FIELDS\n    if unknown:\n        raise ValueError(f\"fields are not writable: {sorted(unknown)}\")\n    changes: dict[str, str] = {}\n    for name in WRITABLE_PROFILE_FIELDS & payload.keys():\n        value = payload[name]\n        if type(value) is not str:\n            raise TypeError(f\"{name} must be a string\")\n        changes[name] = value\n    if \"display_name\" in changes:\n        changes[\"display_name\"] = changes[\"display_name\"].strip()\n        if not 1 <= len(changes[\"display_name\"]) <= 80 or CONTROL_CHARACTER.search(changes[\"display_name\"]):\n            raise ValueError(\"display name is invalid\")\n    if \"timezone\" in changes:\n        if changes[\"timezone\"] not in TIMEZONES:\n            raise ValueError(\"timezone is not supported\")\n    if \"locale\" in changes and changes[\"locale\"] not in LOCALES:\n        raise ValueError(\"locale is not supported\")\n    return changes\n"
    },
    {
      "title": "Serialize an explicit ORM response",
      "language": "python",
      "blurb": "The response projection names public fields and does not traverse relationships or expose internal columns automatically.",
      "code": "from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass AccountResponse:\n    id: str\n    display_name: str\n    state: str\n\n    @classmethod\n    def from_model(cls, account):\n        return cls(id=str(account.public_id), display_name=account.display_name, state=account.state)\n"
    }
  ]
};
