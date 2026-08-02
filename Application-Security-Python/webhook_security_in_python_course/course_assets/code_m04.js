window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Signature Verification and Shared Secrets through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Verify a timestamped HMAC with a provider-selected key",
      "language": "python",
      "blurb": "The boundary requires a provider-selected bytes key of at least 32 bytes, authenticates the exact timestamp and body, compares the hexadecimal signature in constant time, and enforces aware-time freshness.",
      "code": "from datetime import datetime, timezone\nimport hashlib\nimport hmac\nimport re\n\nSHA256_HEX = re.compile(r\"[0-9A-Fa-f]{64}\")\n\ndef verify_hmac_webhook(\n    body: bytes,\n    timestamp: int,\n    signature_hex: str,\n    key: bytes,\n    now: datetime | None = None,\n) -> None:\n    current = datetime.now(timezone.utc) if now is None else now\n    if type(timestamp) is not int or current.tzinfo is None or current.utcoffset() is None:\n        raise ValueError(\"aware webhook time and integer timestamp required\")\n    if abs(int(current.timestamp()) - timestamp) > 300:\n        raise PermissionError(\"webhook timestamp rejected\")\n    if type(key) is not bytes or len(key) < 32:\n        raise ValueError(\"provider-selected HMAC key rejected\")\n    if not isinstance(signature_hex, str) or SHA256_HEX.fullmatch(signature_hex) is None:\n        raise PermissionError(\"webhook signature encoding rejected\")\n    signed = str(timestamp).encode(\"ascii\") + b\".\" + body\n    expected = hmac.new(key, signed, hashlib.sha256).hexdigest()\n    if not hmac.compare_digest(expected, signature_hex.casefold()):\n        raise PermissionError(\"webhook signature rejected\")\n"
    },
    {
      "title": "Verify a fresh Ed25519 webhook envelope",
      "language": "python",
      "blurb": "The verifier requires an aware current time, enforces a five-minute timestamp window, and authenticates the exact timestamp and body bytes with the vendor's public key.",
      "code": "from datetime import datetime, timezone\nfrom cryptography.exceptions import InvalidSignature\nfrom cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey\nimport base64\n\ndef verify_ed25519_webhook(\n    public_key: Ed25519PublicKey,\n    timestamp: int,\n    body: bytes,\n    encoded_signature: str,\n    now: datetime | None = None,\n) -> None:\n    current = datetime.now(timezone.utc) if now is None else now\n    if type(timestamp) is not int or current.tzinfo is None:\n        raise ValueError(\"aware webhook time and integer timestamp required\")\n    if abs(int(current.timestamp()) - timestamp) > 300:\n        raise PermissionError(\"webhook timestamp rejected\")\n    try:\n        signature = base64.b64decode(encoded_signature, validate=True)\n    except (ValueError, TypeError) as error:\n        raise PermissionError(\"webhook signature encoding rejected\") from error\n    if len(signature) != 64:\n        raise PermissionError(\"webhook signature length rejected\")\n    message = str(timestamp).encode(\"ascii\") + b\".\" + body\n    try:\n        public_key.verify(signature, message)\n    except InvalidSignature:\n        raise PermissionError(\"webhook signature rejected\") from None\n"
    }
  ]
};
