window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Sensitive Data and Redaction with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Redact sensitive fields at every depth",
      "language": "python",
      "blurb": "The recursive copier uses exact field policy, handles lists and tuples, and leaves the caller's object unchanged.",
      "code": "SENSITIVE_FIELDS = {\n    \"api_key\", \"authorization\", \"client_secret\", \"cookie\", \"credential\",\n    \"password\", \"refresh_token\", \"secret\", \"token\",\n}\n\ndef redact_fields(value, field_name: str | None = None):\n    if field_name and field_name.casefold() in SENSITIVE_FIELDS:\n        return \"[REDACTED]\"\n    if isinstance(value, dict):\n        return {str(key): redact_fields(item, str(key)) for key, item in value.items()}\n    if isinstance(value, list):\n        return [redact_fields(item) for item in value]\n    if isinstance(value, tuple):\n        return tuple(redact_fields(item) for item in value)\n    return value\n"
    },
    {
      "title": "Allowlist fields for an authentication event",
      "language": "python",
      "blurb": "The event builder accepts a fixed outcome vocabulary and omits usernames, passwords, tokens, request bodies, and exception strings.",
      "code": "AUTH_OUTCOMES = {\"success\", \"bad_credentials\", \"locked\", \"rate_limited\"}\n\ndef authentication_event(request_id: str, subject_id: str | None, outcome: str) -> dict[str, object]:\n    if outcome not in AUTH_OUTCOMES:\n        raise ValueError(\"unknown authentication outcome\")\n    return {\n        \"event\": \"authentication_completed\",\n        \"request_id\": request_id,\n        \"subject_id\": subject_id,\n        \"outcome\": outcome,\n    }\n"
    }
  ]
};
