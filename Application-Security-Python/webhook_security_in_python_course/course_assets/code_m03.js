window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Endpoint Exposure, Authentication, and Access Control through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Reject malformed webhook transport requests early",
      "language": "python",
      "blurb": "The endpoint requires POST, the vendor media type, a present bounded length, and raw bytes under the same limit before authentication or parsing.",
      "code": "def read_webhook_body(request, maximum: int = 256_000) -> bytes:\n    if request.method != \"POST\" or request.content_type != \"application/json\":\n        raise ValueError(\"webhook request metadata rejected\")\n    if request.content_length is None or not 1 <= request.content_length <= maximum:\n        raise ValueError(\"webhook declared length rejected\")\n    body = request.get_data(cache=False, as_text=False)\n    if not 1 <= len(body) <= maximum:\n        raise ValueError(\"webhook actual length rejected\")\n    return body\n"
    },
    {
      "title": "Resolve a vendor verification key by identifier",
      "language": "python",
      "blurb": "A finite key identifier selects provider-held verification material; source IP may supplement telemetry but is never treated as webhook authentication.",
      "code": "from typing import Protocol\n\nclass WebhookKeyProvider(Protocol):\n    def read_bytes(self, reference: str) -> bytes: ...\n\nKEY_REFERENCES = {\n    \"vendor-2026-a\": \"vault://production/webhooks/vendor-2026-a\",\n    \"vendor-2026-b\": \"vault://production/webhooks/vendor-2026-b\",\n}\n\ndef webhook_key(provider: WebhookKeyProvider, key_id: str) -> bytes:\n    reference = KEY_REFERENCES.get(key_id)\n    if reference is None:\n        raise PermissionError(\"webhook key identifier rejected\")\n    key = provider.read_bytes(reference)\n    if len(key) < 32:\n        raise ValueError(\"webhook key material rejected\")\n    return key\n"
    }
  ]
};
