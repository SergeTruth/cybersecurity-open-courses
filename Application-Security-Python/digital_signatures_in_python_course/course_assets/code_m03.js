window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Signature Algorithms and Python Libraries with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Sign with an Ed25519 private key",
      "language": "python",
      "blurb": "The private key signs exact message bytes while verification remains a separate public-key operation.",
      "code": "from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey\n\nMAX_MANIFEST_BYTES = 1_000_000\n\ndef sign_release_manifest(\n    private_key: Ed25519PrivateKey,\n    manifest: bytes,\n) -> bytes:\n    if not isinstance(private_key, Ed25519PrivateKey):\n        raise TypeError(\"Ed25519 private key required\")\n    if (\n        type(manifest) is not bytes\n        or not 1 <= len(manifest) <= MAX_MANIFEST_BYTES\n    ):\n        raise ValueError(\"manifest size rejected\")\n    return private_key.sign(manifest)\n"
    },
    {
      "title": "Verify with an Ed25519 public key",
      "language": "python",
      "blurb": "Invalid signatures become a simple false result without treating malformed or modified content as trusted.",
      "code": "from cryptography.exceptions import InvalidSignature\nfrom cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey\n\nMAX_MANIFEST_BYTES = 1_000_000\n\ndef verify_manifest(\n    public_key: Ed25519PublicKey,\n    manifest: bytes,\n    signature: bytes,\n) -> bool:\n    if not isinstance(public_key, Ed25519PublicKey):\n        raise TypeError(\"Ed25519 public key required\")\n    if (\n        type(manifest) is not bytes\n        or not 1 <= len(manifest) <= MAX_MANIFEST_BYTES\n        or type(signature) is not bytes\n        or len(signature) != 64\n    ):\n        raise ValueError(\"manifest verification input rejected\")\n    try:\n        public_key.verify(signature, manifest)\n    except InvalidSignature:\n        return False\n    return True\n"
    }
  ]
};
