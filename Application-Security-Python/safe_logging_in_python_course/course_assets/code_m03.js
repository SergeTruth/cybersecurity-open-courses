window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Sensitive Data and Redaction with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Redact sensitive fields at every depth",
      "language": "python",
      "blurb": "The recursive copier normalizes snake_case, camelCase, and punctuation variants, redacts common singular and plural credential/session/token fields at every depth, and leaves the caller's object unchanged.",
      "code": "import re\n\nSENSITIVE_FIELD_EXACT = {\n    \"access_token\", \"api_key\", \"authorization\", \"bearer_token\",\n    \"client_secret\", \"connection_string\", \"cookie\", \"credential\", \"credentials\",\n    \"password\", \"passwords\", \"password_hash\", \"private_key\", \"refresh_token\",\n    \"reset_link\", \"secret\", \"secrets\", \"session_cookie\", \"session_id\", \"token\", \"tokens\",\n}\nSENSITIVE_FIELD_TERMS = {\n    \"authorization\", \"bearer\", \"cookie\", \"cookies\", \"credential\", \"credentials\",\n    \"key\", \"keys\", \"password\", \"passwords\", \"secret\", \"secrets\",\n    \"session\", \"sessions\", \"token\", \"tokens\",\n}\n\ndef normalized_field_name(field_name: object) -> str:\n    text = str(field_name)\n    text = re.sub(r\"(?<=[a-z0-9])(?=[A-Z])\", \"_\", text)\n    return re.sub(r\"[^a-z0-9]+\", \"_\", text.casefold()).strip(\"_\")\n\ndef is_sensitive_field(field_name: object) -> bool:\n    normalized = normalized_field_name(field_name)\n    if normalized in SENSITIVE_FIELD_EXACT:\n        return True\n    return bool(set(normalized.split(\"_\")) & SENSITIVE_FIELD_TERMS)\n\ndef redact_fields(value: object, field_name: object | None = None) -> object:\n    if field_name is not None and is_sensitive_field(field_name):\n        return \"[REDACTED]\"\n    if isinstance(value, dict):\n        return {str(key): redact_fields(item, key) for key, item in value.items()}\n    if isinstance(value, list):\n        return [redact_fields(item) for item in value]\n    if isinstance(value, tuple):\n        return tuple(redact_fields(item) for item in value)\n    return value\n"
    },
    {
      "title": "Allowlist fields for an authentication event",
      "language": "python",
      "blurb": "The event builder accepts a fixed outcome vocabulary and only opaque bounded identifiers; it omits usernames, passwords, tokens, request bodies, and exception strings.",
      "code": "import re\n\nAUTH_OUTCOMES = {\"success\", \"bad_credentials\", \"locked\", \"rate_limited\"}\nOPAQUE_ID = re.compile(r\"[A-Za-z0-9][A-Za-z0-9._-]{0,63}\")\n\ndef require_opaque_id(value: str, field_name: str) -> str:\n    if not isinstance(value, str) or OPAQUE_ID.fullmatch(value) is None:\n        raise ValueError(f\"{field_name} must be an opaque bounded identifier\")\n    return value\n\ndef authentication_event(request_id: str, subject_id: str | None, outcome: str) -> dict[str, object]:\n    if outcome not in AUTH_OUTCOMES:\n        raise ValueError(\"unknown authentication outcome\")\n    return {\n        \"event\": \"authentication_completed\",\n        \"request_id\": require_opaque_id(request_id, \"request_id\"),\n        \"subject_id\": None if subject_id is None else require_opaque_id(subject_id, \"subject_id\"),\n        \"outcome\": outcome,\n    }\n"
    }
  ]
};
