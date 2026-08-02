window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Detection, Logging, Testing, and Incident Response with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Redact secrets recursively before logging",
      "language": "python",
      "blurb": "Nested dictionaries and lists are copied while exact sensitive field names are replaced at every depth.",
      "code": "SENSITIVE_FIELDS = {\"password\", \"token\", \"api_key\", \"client_secret\"}\n\ndef redact(value):\n    if isinstance(value, dict):\n        return {\n            key: \"[REDACTED]\" if key.casefold() in SENSITIVE_FIELDS else redact(item)\n            for key, item in value.items()\n        }\n    if isinstance(value, list):\n        return [redact(item) for item in value]\n    return value\n"
    },
    {
      "title": "Coordinate response to an exposed secret",
      "language": "python",
      "blurb": "The runbook revokes first, records a non-secret incident event, and only then requests a replacement credential.",
      "code": "from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass ExposureResult:\n    revoked_version: str\n    replacement_version: str\n\ndef respond_to_exposure(provider, audit, secret_name: str, exposed_version: str) -> ExposureResult:\n    provider.revoke(secret_name, exposed_version)\n    audit.record(\"secret_revoked\", secret=secret_name, version=exposed_version)\n    replacement = provider.rotate(secret_name)\n    return ExposureResult(exposed_version, replacement.version)\n"
    }
  ]
};
