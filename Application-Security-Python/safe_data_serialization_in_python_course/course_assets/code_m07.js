window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Integrity, Authenticity, Versioning, and Compatibility with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Authenticate a serialized cache record",
      "language": "python",
      "blurb": "An application-owned key verifies the exact stored bytes before parsing, while freshness and schema remain separate checks.",
      "code": "import hashlib\nimport hmac\n\ndef verified_cache_bytes(key: bytes, payload: bytes, supplied_tag: bytes) -> bytes:\n    if len(payload) > 1_000_000 or len(supplied_tag) != hashlib.sha256().digest_size:\n        raise ValueError(\"cache record shape rejected\")\n    expected = hmac.digest(key, b\"cache-record-v1\\x00\" + payload, \"sha256\")\n    if not hmac.compare_digest(expected, supplied_tag):\n        raise ValueError(\"cache record integrity check failed\")\n    return payload\n"
    },
    {
      "title": "Migrate and validate a supported settings version",
      "language": "python",
      "blurb": "Older data is converted without truthiness coercion, then every version-two field and nested notification value is validated exactly.",
      "code": "def migrate_settings(document: dict[str, object]) -> dict[str, object]:\n    if not isinstance(document, dict):\n        raise TypeError(\"settings document must be a mapping\")\n    version = document.get(\"version\")\n    if type(version) is not int:\n        raise TypeError(\"settings version must be an integer\")\n    if version == 1:\n        if set(document) != {\"version\", \"name\", \"email_updates\"}:\n            raise ValueError(\"version-one settings schema mismatch\")\n        if not isinstance(document[\"name\"], str) or type(document[\"email_updates\"]) is not bool:\n            raise TypeError(\"version-one settings types rejected\")\n        document = {\n            \"version\": 2,\n            \"display_name\": document[\"name\"],\n            \"notifications\": {\"email\": document[\"email_updates\"]},\n        }\n    if document.get(\"version\") != 2 or set(document) != {\n        \"version\", \"display_name\", \"notifications\"\n    }:\n        raise ValueError(\"version-two settings schema mismatch\")\n    display_name = document[\"display_name\"]\n    notifications = document[\"notifications\"]\n    if not isinstance(display_name, str) or not 1 <= len(display_name) <= 80:\n        raise ValueError(\"display_name is invalid\")\n    if (\n        not isinstance(notifications, dict)\n        or set(notifications) != {\"email\"}\n        or type(notifications[\"email\"]) is not bool\n    ):\n        raise ValueError(\"notifications schema is invalid\")\n    return document\n"
    }
  ]
};
