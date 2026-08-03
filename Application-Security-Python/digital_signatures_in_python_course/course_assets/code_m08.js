window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Logging, Monitoring, and Operations with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Record signature results without signed content",
      "language": "python",
      "blurb": "Telemetry keeps key and algorithm identifiers plus a stable event outcome, while omitting signatures, payloads, and private keys.",
      "code": "import logging\n\naudit = logging.getLogger(\"signature_audit\")\n\ndef record_verification(key_id: str, algorithm: str, accepted: bool) -> None:\n    audit.info(\n        \"signature_verification\",\n        extra={\n            \"key_id\": key_id,\n            \"algorithm\": algorithm,\n            \"outcome\": \"accepted\" if accepted else \"rejected\",\n        },\n    )\n"
    },
    {
      "title": "Test that modified data is rejected",
      "language": "python",
      "blurb": "The regression proves that changing one byte invalidates the signature while the original message still verifies.",
      "code": "from cryptography.exceptions import InvalidSignature\n\ndef assert_tampering_fails(public_key, message: bytes, signature: bytes) -> None:\n    public_key.verify(signature, message)\n    changed = b\"\\x00\" if not message else message[:-1] + bytes([message[-1] ^ 1])\n    try:\n        public_key.verify(signature, changed)\n    except InvalidSignature:\n        return\n    raise AssertionError(\"modified message passed signature verification\")\n"
    }
  ]
};
