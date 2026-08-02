window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Key Management and Rotation with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Select rotated verification keys by identifier",
      "language": "python",
      "blurb": "A bounded, application-owned key ring supports overlap during rotation without trying every key.",
      "code": "from collections.abc import Mapping\nfrom cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey\n\ndef select_verification_key(\n    key_id: str, active_keys: Mapping[str, Ed25519PublicKey]\n) -> Ed25519PublicKey:\n    if len(key_id) > 64:\n        raise ValueError(\"key identifier is too long\")\n    try:\n        return active_keys[key_id]\n    except KeyError:\n        raise ValueError(\"unknown signing key\") from None\n"
    },
    {
      "title": "Verify a certificate-backed signature",
      "language": "python",
      "blurb": "The certificate is validated separately before its public key is used for the approved document signature algorithm.",
      "code": "from cryptography import x509\nfrom cryptography.hazmat.primitives import hashes\nfrom cryptography.hazmat.primitives.asymmetric import ec\n\ndef verify_certificate_signature(\n    validated_certificate: x509.Certificate, document: bytes, signature: bytes\n) -> None:\n    public_key = validated_certificate.public_key()\n    if not isinstance(public_key, ec.EllipticCurvePublicKey):\n        raise TypeError(\"expected an elliptic-curve signing certificate\")\n    public_key.verify(signature, document, ec.ECDSA(hashes.SHA256()))\n"
    }
  ]
};
