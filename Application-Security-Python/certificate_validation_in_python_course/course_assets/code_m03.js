window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply What Validation Checks with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Reject certificates outside their validity window",
      "language": "python",
      "blurb": "The check parses the peer certificate dates and compares them with the application host's current UTC time rather than a caller-selected instant.",
      "code": "import ssl\nfrom datetime import datetime, timezone\n\ndef require_current_certificate(peer_certificate: dict) -> None:\n    now = datetime.now(timezone.utc)\n    not_before = datetime.fromtimestamp(\n        ssl.cert_time_to_seconds(peer_certificate[\"notBefore\"]), timezone.utc\n    )\n    not_after = datetime.fromtimestamp(\n        ssl.cert_time_to_seconds(peer_certificate[\"notAfter\"]), timezone.utc\n    )\n    if not not_before <= now <= not_after:\n        raise ssl.SSLCertVerificationError(\"certificate is not currently valid\")\n"
    },
    {
      "title": "Constrain certificate purposes",
      "language": "python",
      "blurb": "A reviewed extended-key-usage allowlist prevents accepting a certificate issued only for an unrelated purpose.",
      "code": "from cryptography import x509\nfrom cryptography.x509.oid import ExtendedKeyUsageOID, ExtensionOID\n\ndef require_server_auth(certificate: x509.Certificate) -> None:\n    usages = certificate.extensions.get_extension_for_oid(\n        ExtensionOID.EXTENDED_KEY_USAGE\n    ).value\n    if ExtendedKeyUsageOID.SERVER_AUTH not in usages:\n        raise ValueError(\"certificate is not valid for server authentication\")\n"
    }
  ]
};
