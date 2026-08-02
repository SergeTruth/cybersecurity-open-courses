window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Certificates, Tokens, APIs, and Webhooks with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Cryptographically validate a signed API envelope",
      "language": "python",
      "blurb": "The verifier checks metadata and freshness, selects an application-owned Ed25519 key, and verifies canonical purpose-bound bytes.",
      "code": "import base64\nfrom collections.abc import Mapping\nfrom dataclasses import dataclass\nfrom datetime import datetime, timezone\nimport json\nfrom cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey\n\n@dataclass(frozen=True)\nclass SignedEnvelope:\n    key_id: str\n    algorithm: str\n    purpose: str\n    issued_at: datetime\n    payload: bytes\n    signature: bytes\n\ndef signed_envelope_bytes(envelope: SignedEnvelope) -> bytes:\n    document = {\n        \"algorithm\": envelope.algorithm,\n        \"issued_at\": envelope.issued_at.astimezone(timezone.utc).isoformat(),\n        \"key_id\": envelope.key_id,\n        \"payload\": base64.b64encode(envelope.payload).decode(\"ascii\"),\n        \"purpose\": envelope.purpose,\n    }\n    encoded = json.dumps(document, sort_keys=True, separators=(\",\", \":\")).encode(\"utf-8\")\n    return b\"inventory-envelope-v1\\x00\" + encoded\n\ndef validate_envelope(\n    envelope: SignedEnvelope,\n    known_keys: Mapping[str, Ed25519PublicKey],\n    now: datetime,\n) -> bytes:\n    if envelope.issued_at.tzinfo is None or now.tzinfo is None:\n        raise ValueError(\"timezone-aware timestamps are required\")\n    if envelope.algorithm != \"Ed25519\" or envelope.purpose != \"inventory-update\":\n        raise ValueError(\"envelope algorithm or purpose rejected\")\n    try:\n        public_key = known_keys[envelope.key_id]\n    except KeyError:\n        raise ValueError(\"unknown signing key\") from None\n    age = (now.astimezone(timezone.utc) - envelope.issued_at.astimezone(timezone.utc)).total_seconds()\n    if not 0 <= age <= 300:\n        raise ValueError(\"signed message is stale\")\n    public_key.verify(envelope.signature, signed_envelope_bytes(envelope))\n    return envelope.payload\n"
    },
    {
      "title": "Verify a webhook before parsing JSON",
      "language": "python",
      "blurb": "The raw request body is authenticated first so JSON normalization cannot change the signed byte sequence.",
      "code": "from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey\n\ndef verified_webhook_body(\n    key: Ed25519PublicKey, body: bytes, signature: bytes, content_length: int\n) -> bytes:\n    if content_length != len(body) or len(body) > 1_000_000:\n        raise ValueError(\"webhook body length rejected\")\n    key.verify(signature, body)\n    return body\n"
    }
  ]
};
