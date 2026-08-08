window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Verification Workflows and Failure Handling with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Verify RSA-PSS with a fixed algorithm",
      "language": "python",
      "blurb": "The verifier fixes the approved hash and padding instead of accepting algorithm choices from the message.",
      "code": "from cryptography.exceptions import InvalidSignature\nfrom cryptography.hazmat.primitives import hashes\nfrom cryptography.hazmat.primitives.asymmetric import padding, rsa\n\nMAX_SIGNED_PAYLOAD_BYTES = 1_000_000\n\ndef verify_rsa_pss(\n    key: rsa.RSAPublicKey,\n    payload: bytes,\n    signature: bytes,\n) -> bool:\n    if not isinstance(key, rsa.RSAPublicKey) or key.key_size < 2048:\n        raise ValueError(\"approved RSA public key required\")\n    if (\n        type(payload) is not bytes\n        or not 1 <= len(payload) <= MAX_SIGNED_PAYLOAD_BYTES\n        or type(signature) is not bytes\n        or len(signature) != key.key_size // 8\n    ):\n        raise ValueError(\"RSA signature input rejected\")\n    try:\n        key.verify(\n            signature,\n            payload,\n            padding.PSS(\n                mgf=padding.MGF1(hashes.SHA256()),\n                salt_length=32,\n            ),\n            hashes.SHA256(),\n        )\n    except InvalidSignature:\n        return False\n    return True\n"
    },
    {
      "title": "Decode a transport signature strictly",
      "language": "python",
      "blurb": "The transport layer rejects whitespace, malformed Base64, and unexpected Ed25519 signature lengths before verification.",
      "code": "import base64\nimport binascii\n\nED25519_SIGNATURE_BYTES = 64\nED25519_SIGNATURE_BASE64_CHARS = 88\n\ndef decode_ed25519_signature(encoded: str) -> bytes:\n    if (\n        type(encoded) is not str\n        or len(encoded) != ED25519_SIGNATURE_BASE64_CHARS\n    ):\n        raise ValueError(\"signature encoding is invalid\")\n    try:\n        signature = base64.b64decode(\n            encoded.encode(\"ascii\"),\n            validate=True,\n        )\n    except (UnicodeEncodeError, binascii.Error, ValueError):\n        raise ValueError(\"signature encoding is invalid\") from None\n    if (\n        len(signature) != ED25519_SIGNATURE_BYTES\n        or base64.b64encode(signature).decode(\"ascii\") != encoded\n    ):\n        raise ValueError(\"signature encoding is invalid\")\n    return signature\n"
    }
  ]
};
