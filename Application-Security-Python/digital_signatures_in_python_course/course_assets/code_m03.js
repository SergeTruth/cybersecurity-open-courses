window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Signature Algorithms and Python Libraries with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Sign with an Ed25519 private key",
      "language": "python",
      "blurb": "The private key signs exact message bytes while verification remains a separate public-key operation.",
      "code": "from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey\n\ndef sign_release_manifest(private_key: Ed25519PrivateKey, manifest: bytes) -> bytes:\n    if not manifest:\n        raise ValueError(\"manifest must not be empty\")\n    return private_key.sign(manifest)\n"
    },
    {
      "title": "Verify with an Ed25519 public key",
      "language": "python",
      "blurb": "Invalid signatures become a simple false result without treating malformed or modified content as trusted.",
      "code": "from cryptography.exceptions import InvalidSignature\nfrom cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey\n\ndef verify_manifest(public_key: Ed25519PublicKey, manifest: bytes, signature: bytes) -> bool:\n    try:\n        public_key.verify(signature, manifest)\n    except InvalidSignature:\n        return False\n    return True\n"
    }
  ]
};
