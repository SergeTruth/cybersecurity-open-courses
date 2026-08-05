window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Logging and Observability Without Leakage with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Log selected exception attributes",
      "language": "python",
      "blurb": "Known database errors become bounded fields, and only an explicit SQLite result-code policy identifies a possible retry candidate.",
      "code": "import sqlite3\n\nRETRY_CANDIDATE_CODES = frozenset({sqlite3.SQLITE_BUSY})\n\ndef database_error_event(error: sqlite3.Error) -> dict[str, object]:\n    code = getattr(error, \"sqlite_errorcode\", None)\n    primary_code = code & 0xFF if isinstance(code, int) else None\n    return {\n        \"event\": \"database_operation_failed\",\n        \"error_type\": type(error).__name__,\n        \"sqlite_code\": code,\n        \"retry_candidate\": primary_code in RETRY_CANDIDATE_CODES,\n    }\n"
    },
    {
      "title": "Redact nested diagnostic context",
      "language": "python",
      "blurb": "The copier masks secret-like fields, bounds width and depth, and replaces cyclic or unreadable containers without failing the original error path.",
      "code": "import math\nimport re\nfrom collections.abc import Mapping\n\nMAX_DEPTH = 6\nSENSITIVE_KEY = re.compile(\n    r\"(authorization|cookie|password|passwd|pwd|secret|token|api[_-]?key|private[_-]?key|credential)\",\n    re.IGNORECASE,\n)\n\ndef is_sensitive_key(key: str) -> bool:\n    normalized = re.sub(r\"(?<!^)([A-Z])\", r\"_\\1\", key).replace(\"-\", \"_\")\n    return bool(SENSITIVE_KEY.search(normalized))\n\ndef safe_type_name(value) -> str:\n    return re.sub(r\"[^A-Za-z0-9_.-]\", \"_\", type(value).__name__)[:80]\n\ndef safe_key(value) -> str:\n    if isinstance(value, str):\n        return value[:64]\n    if value is None or isinstance(value, (bool, int)):\n        return str(value)[:64]\n    return f\"[{safe_type_name(value)}]\"\n\ndef _safe_context(value, key: str, depth: int, active: set[int]):\n    if key and is_sensitive_key(key):\n        return \"[REDACTED]\"\n    if isinstance(value, str):\n        return value[:200]\n    if value is None or isinstance(value, bool) or isinstance(value, int):\n        return value\n    if isinstance(value, float):\n        return value if math.isfinite(value) else \"[NON_FINITE_NUMBER]\"\n    if not isinstance(value, (Mapping, list, tuple)):\n        return f\"[{safe_type_name(value)}]\"\n    if depth >= MAX_DEPTH:\n        return \"[MAX_DEPTH]\"\n\n    identity = id(value)\n    if identity in active:\n        return \"[CYCLE]\"\n    active.add(identity)\n    try:\n        if isinstance(value, Mapping):\n            safe = {}\n            for index, (item_key, item_value) in enumerate(value.items()):\n                if index >= 50:\n                    safe[\"[TRUNCATED]\"] = True\n                    break\n                output_key = safe_key(item_key)\n                lookup_key = item_key if isinstance(item_key, str) else output_key\n                safe[output_key] = _safe_context(item_value, lookup_key, depth + 1, active)\n            return safe\n        return [_safe_context(item, \"\", depth + 1, active) for item in value[:20]]\n    except Exception:\n        return \"[UNREADABLE_CONTAINER]\"\n    finally:\n        active.discard(identity)\n\ndef safe_context(value, key: str = \"\"):\n    lookup_key = key if isinstance(key, str) else safe_key(key)\n    return _safe_context(value, lookup_key, 0, set())\n"
    }
  ]
};
