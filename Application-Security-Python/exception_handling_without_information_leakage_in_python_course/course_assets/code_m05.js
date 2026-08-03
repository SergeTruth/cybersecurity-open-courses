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
      "blurb": "The copier preserves useful structure but masks secret-like field names and truncates untrusted strings.",
      "code": "import math\nimport re\nfrom collections.abc import Mapping\n\nSENSITIVE_KEY = re.compile(\n    r\"(authorization|cookie|password|passwd|pwd|secret|token|api[_-]?key|private[_-]?key|credential)\",\n    re.IGNORECASE,\n)\n\ndef is_sensitive_key(key: str) -> bool:\n    normalized = re.sub(r\"(?<!^)([A-Z])\", r\"_\\1\", key).replace(\"-\", \"_\")\n    return bool(SENSITIVE_KEY.search(normalized))\n\ndef safe_context(value, key: str = \"\"):\n    if key and is_sensitive_key(key):\n        return \"[REDACTED]\"\n    if isinstance(value, Mapping):\n        safe = {}\n        for index, (item_key, item_value) in enumerate(value.items()):\n            if index >= 50:\n                safe[\"[TRUNCATED]\"] = True\n                break\n            safe[str(item_key)[:64]] = safe_context(item_value, str(item_key))\n        return safe\n    if isinstance(value, (list, tuple)):\n        return [safe_context(item) for item in value[:20]]\n    if isinstance(value, str):\n        return value[:200]\n    if value is None or isinstance(value, bool) or isinstance(value, int):\n        return value\n    if isinstance(value, float):\n        return value if math.isfinite(value) else \"[NON_FINITE_NUMBER]\"\n    safe_type = re.sub(r\"[^A-Za-z0-9_.-]\", \"_\", type(value).__name__)[:80]\n    return f\"[{safe_type}]\"\n"
    }
  ]
};
