window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Endpoint Exposure, Authentication, and Access Control through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Reject malformed webhook transport requests early",
      "language": "python",
      "blurb": "The endpoint requires POST, the vendor media type, a present bounded length, and raw bytes under the same limit before authentication or parsing.",
      "code": "MAX_WEBHOOK_BYTES = 1_000_000\n\ndef read_webhook_body(request, maximum: int = 256_000) -> bytes:\n    if type(maximum) is not int or not 1 <= maximum <= MAX_WEBHOOK_BYTES:\n        raise ValueError(\"webhook byte limit rejected\")\n    try:\n        method = request.method\n        content_type = request.content_type\n        content_length = request.content_length\n    except Exception:\n        raise ValueError(\"webhook request metadata rejected\") from None\n    if method != \"POST\" or content_type != \"application/json\":\n        raise ValueError(\"webhook request metadata rejected\")\n    if (\n        type(content_length) is not int\n        or not 1 <= content_length <= maximum\n    ):\n        raise ValueError(\"webhook declared length rejected\")\n    try:\n        body = request.get_data(cache=False, as_text=False)\n    except Exception:\n        raise ValueError(\"webhook body read rejected\") from None\n    if (\n        type(body) is not bytes\n        or len(body) != content_length\n        or not 1 <= len(body) <= maximum\n    ):\n        raise ValueError(\"webhook actual length rejected\")\n    return body\n"
    },
    {
      "title": "Resolve a vendor verification key by identifier",
      "language": "python",
      "blurb": "A finite key identifier selects provider-held verification material; source IP may supplement telemetry but is never treated as webhook authentication.",
      "code": "from typing import Protocol\n\nclass WebhookKeyProvider(Protocol):\n    def read_bytes(self, reference: str) -> bytes: ...\n\nKEY_REFERENCES = {\n    \"vendor-2026-a\": \"vault://production/webhooks/vendor-2026-a\",\n    \"vendor-2026-b\": \"vault://production/webhooks/vendor-2026-b\",\n}\nMIN_WEBHOOK_KEY_BYTES = 32\nMAX_WEBHOOK_KEY_BYTES = 4096\n\ndef webhook_key(provider: WebhookKeyProvider, key_id: str) -> bytes:\n    if type(key_id) is not str:\n        raise PermissionError(\"webhook key identifier rejected\")\n    reference = KEY_REFERENCES.get(key_id)\n    if reference is None:\n        raise PermissionError(\"webhook key identifier rejected\")\n    key = provider.read_bytes(reference)\n    if (\n        type(key) is not bytes\n        or not MIN_WEBHOOK_KEY_BYTES <= len(key) <= MAX_WEBHOOK_KEY_BYTES\n    ):\n        raise ValueError(\"webhook key material rejected\")\n    return bytes(key)\n"
    }
  ]
};
