window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Signing Workflows and Data Preparation with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Canonicalize structured data before signing",
      "language": "python",
      "blurb": "A documented UTF-8 JSON representation makes the bytes stable across producers and verifiers.",
      "code": "import json\nfrom typing import Any\n\ndef canonical_json(value: Any) -> bytes:\n    return json.dumps(\n        value,\n        ensure_ascii=False,\n        allow_nan=False,\n        sort_keys=True,\n        separators=(\",\", \":\"),\n    ).encode(\"utf-8\")\n"
    },
    {
      "title": "Bind a signature to its purpose",
      "language": "python",
      "blurb": "A domain separator prevents the same bytes from being interpreted as a different kind of signed instruction.",
      "code": "from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey\n\nDOMAIN = b\"example.test/payment-approval/v1\\x00\"\n\ndef sign_payment(private_key: Ed25519PrivateKey, canonical_payment: bytes) -> bytes:\n    if len(canonical_payment) > 16_384:\n        raise ValueError(\"payment payload is too large\")\n    return private_key.sign(DOMAIN + canonical_payment)\n"
    }
  ]
};
