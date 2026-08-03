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
      "title": "Enforce certificate policy before using its public key",
      "language": "python",
      "blurb": "A platform or PKI library should validate the chain first; this code still enforces leaf policy, revocation stance, approved identity, key usage, and algorithm before verifying.",
      "code": "from collections.abc import Sequence\nfrom datetime import datetime, timezone\nfrom cryptography import x509\nfrom cryptography.hazmat.primitives import hashes\nfrom cryptography.hazmat.primitives.asymmetric import ec\nfrom cryptography.x509.oid import ObjectIdentifier\n\nDOCUMENT_SIGNING_EKU = ObjectIdentifier(\"1.3.6.1.4.1.55555.1.1\")\n\ndef verify_certificate_signature(\n    validated_chain: Sequence[x509.Certificate],\n    document: bytes,\n    signature: bytes,\n    now: datetime,\n    allowed_leaf_fingerprints: set[bytes],\n    revocation_checked: bool,\n) -> None:\n    if now.tzinfo is None:\n        raise ValueError(\"timezone-aware validation time required\")\n    if not validated_chain:\n        raise ValueError(\"certificate chain is required\")\n    if not revocation_checked:\n        raise ValueError(\"revocation status must be checked by policy\")\n    leaf = validated_chain[0]\n    now_utc = now.astimezone(timezone.utc)\n    if not (leaf.not_valid_before_utc <= now_utc <= leaf.not_valid_after_utc):\n        raise ValueError(\"certificate is outside its validity window\")\n    if leaf.fingerprint(hashes.SHA256()) not in allowed_leaf_fingerprints:\n        raise ValueError(\"certificate is not approved for this verifier\")\n    try:\n        key_usage = leaf.extensions.get_extension_for_class(x509.KeyUsage).value\n        eku = leaf.extensions.get_extension_for_class(x509.ExtendedKeyUsage).value\n    except x509.ExtensionNotFound as error:\n        raise ValueError(\"certificate is missing signing policy extensions\") from error\n    if not key_usage.digital_signature or DOCUMENT_SIGNING_EKU not in eku:\n        raise ValueError(\"certificate is not approved for document signatures\")\n    public_key = leaf.public_key()\n    if not isinstance(public_key, ec.EllipticCurvePublicKey):\n        raise TypeError(\"expected an elliptic-curve signing certificate\")\n    public_key.verify(signature, document, ec.ECDSA(hashes.SHA256()))\n"
    }
  ]
};
