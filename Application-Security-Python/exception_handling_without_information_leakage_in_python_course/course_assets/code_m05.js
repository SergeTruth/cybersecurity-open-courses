window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Logging and Observability Without Leakage with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Log selected exception attributes",
      "language": "python",
      "blurb": "Known database errors are translated to bounded fields rather than copying driver messages that may include queries or values.",
      "code": "import sqlite3\n\ndef database_error_event(error: sqlite3.Error) -> dict[str, object]:\n    return {\n        \"event\": \"database_operation_failed\",\n        \"error_type\": type(error).__name__,\n        \"sqlite_code\": getattr(error, \"sqlite_errorcode\", None),\n        \"retryable\": isinstance(error, sqlite3.OperationalError),\n    }\n"
    },
    {
      "title": "Redact nested diagnostic context",
      "language": "python",
      "blurb": "The copier preserves useful structure but masks exact sensitive fields and truncates untrusted strings.",
      "code": "SENSITIVE = {\"password\", \"authorization\", \"cookie\", \"token\"}\n\ndef safe_context(value, key: str = \"\"):\n    if key.casefold() in SENSITIVE:\n        return \"[REDACTED]\"\n    if isinstance(value, dict):\n        return {str(k)[:64]: safe_context(v, str(k)) for k, v in value.items()}\n    if isinstance(value, (list, tuple)):\n        return [safe_context(item) for item in value[:20]]\n    return value[:200] if isinstance(value, str) else value\n"
    }
  ]
};
