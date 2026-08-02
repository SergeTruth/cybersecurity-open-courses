window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Verification Workflows and Failure Handling with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Verify RSA-PSS with a fixed algorithm",
      "language": "python",
      "blurb": "The verifier fixes the approved hash and padding instead of accepting algorithm choices from the message.",
      "code": "from cryptography.exceptions import InvalidSignature\nfrom cryptography.hazmat.primitives import hashes\nfrom cryptography.hazmat.primitives.asymmetric import padding, rsa\n\ndef verify_rsa_pss(key: rsa.RSAPublicKey, payload: bytes, signature: bytes) -> bool:\n    try:\n        key.verify(\n            signature,\n            payload,\n            padding.PSS(mgf=padding.MGF1(hashes.SHA256()), salt_length=32),\n            hashes.SHA256(),\n        )\n    except InvalidSignature:\n        return False\n    return True\n"
    },
    {
      "title": "Decode a transport signature strictly",
      "language": "python",
      "blurb": "The transport layer rejects whitespace, malformed Base64, and unexpected Ed25519 signature lengths before verification.",
      "code": "import base64\nimport binascii\n\ndef decode_ed25519_signature(encoded: str) -> bytes:\n    try:\n        signature = base64.b64decode(encoded, validate=True)\n    except (binascii.Error, ValueError) as error:\n        raise ValueError(\"signature encoding is invalid\") from error\n    if len(signature) != 64:\n        raise ValueError(\"signature length is invalid\")\n    return signature\n"
    }
  ]
};
