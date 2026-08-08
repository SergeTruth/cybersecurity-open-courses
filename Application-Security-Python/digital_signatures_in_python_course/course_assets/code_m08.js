window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Logging, Monitoring, and Operations with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Record signature results without signed content",
      "language": "python",
      "blurb": "Telemetry keeps key and algorithm identifiers plus a stable event outcome, while omitting signatures, payloads, and private keys.",
      "code": "import logging\nimport re\n\naudit = logging.getLogger(\"signature_audit\")\nKEY_ID = re.compile(r\"[A-Za-z0-9][A-Za-z0-9_-]{0,63}\")\nALGORITHMS = {\"Ed25519\", \"RSA-PSS-SHA256\", \"ECDSA-SHA256\"}\n\ndef record_verification(\n    key_id: str,\n    algorithm: str,\n    accepted: bool,\n) -> None:\n    if type(key_id) is not str or KEY_ID.fullmatch(key_id) is None:\n        raise ValueError(\"signature key identifier rejected\")\n    if type(algorithm) is not str or algorithm not in ALGORITHMS:\n        raise ValueError(\"signature algorithm rejected\")\n    if type(accepted) is not bool:\n        raise ValueError(\"signature outcome rejected\")\n    audit.info(\n        \"signature_verification\",\n        extra={\n            \"key_id\": key_id,\n            \"algorithm\": algorithm,\n            \"outcome\": \"accepted\" if accepted else \"rejected\",\n        },\n    )\n"
    },
    {
      "title": "Test that modified data is rejected",
      "language": "python",
      "blurb": "The regression proves that changing one byte invalidates the signature while the original message still verifies.",
      "code": "from cryptography.exceptions import InvalidSignature\n\nMAX_TEST_MESSAGE_BYTES = 1_000_000\n\ndef assert_tampering_fails(\n    public_key,\n    message: bytes,\n    signature: bytes,\n) -> None:\n    if (\n        type(message) is not bytes\n        or len(message) > MAX_TEST_MESSAGE_BYTES\n        or type(signature) is not bytes\n        or not signature\n        or not callable(getattr(public_key, \"verify\", None))\n    ):\n        raise ValueError(\"signature regression input rejected\")\n    public_key.verify(signature, message)\n    changed = (\n        b\"\\x00\"\n        if not message\n        else message[:-1] + bytes([message[-1] ^ 1])\n    )\n    try:\n        public_key.verify(signature, changed)\n    except InvalidSignature:\n        return\n    raise AssertionError(\"modified message passed signature verification\")\n"
    }
  ]
};
