window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Signing Workflows and Data Preparation with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Create stable JSON bytes for constrained data",
      "language": "python",
      "blurb": "This is a stable encoding for a tightly controlled JSON schema. For cross-language signatures, use a documented canonical JSON profile such as RFC 8785.",
      "code": "import json\nfrom collections.abc import Mapping\nfrom typing import Any\n\nJsonValue = None | bool | int | str | list[\"JsonValue\"] | dict[str, \"JsonValue\"]\n\ndef _reject_ambiguous_json(value: Any) -> None:\n    if value is None or isinstance(value, (bool, int, str)):\n        return\n    if isinstance(value, float):\n        raise ValueError(\"floating-point values are not allowed in signed JSON\")\n    if isinstance(value, Mapping):\n        for key, item in value.items():\n            if not isinstance(key, str):\n                raise ValueError(\"JSON object keys must be strings\")\n            _reject_ambiguous_json(item)\n        return\n    if isinstance(value, list):\n        for item in value:\n            _reject_ambiguous_json(item)\n        return\n    raise TypeError(f\"unsupported signed JSON value: {type(value).__name__}\")\n\ndef stable_json_bytes(value: JsonValue) -> bytes:\n    _reject_ambiguous_json(value)\n    return json.dumps(\n        value,\n        ensure_ascii=False,\n        allow_nan=False,\n        sort_keys=True,\n        separators=(\",\", \":\"),\n    ).encode(\"utf-8\")\n"
    },
    {
      "title": "Bind a signature to its purpose",
      "language": "python",
      "blurb": "A domain separator prevents the same bytes from being interpreted as a different kind of signed instruction.",
      "code": "from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey\n\nDOMAIN = b\"example.test/payment-approval/v1\\x00\"\n\ndef sign_payment(private_key: Ed25519PrivateKey, stable_payment: bytes) -> bytes:\n    if len(stable_payment) > 16_384:\n        raise ValueError(\"payment payload is too large\")\n    return private_key.sign(DOMAIN + stable_payment)\n"
    }
  ]
};
