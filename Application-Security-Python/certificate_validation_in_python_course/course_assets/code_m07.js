window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Mutual TLS and Client Certificate Validation with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Build a mutual-TLS client context",
      "language": "python",
      "blurb": "The context validates the server and presents a separately stored client certificate and private key.",
      "code": "import ssl\n\ndef create_mtls_context(ca_file: str, certificate: str, private_key: str) -> ssl.SSLContext:\n    context = ssl.create_default_context(cafile=ca_file)\n    context.minimum_version = ssl.TLSVersion.TLSv1_2\n    context.load_cert_chain(certfile=certificate, keyfile=private_key)\n    return context\n"
    },
    {
      "title": "Authorize an mTLS workload identity",
      "language": "python",
      "blurb": "TLS identity is converted into a narrow application principal before permissions are evaluated.",
      "code": "from cryptography import x509\nfrom cryptography.x509.oid import ExtensionOID\n\nWORKLOAD_ROLES = {\"spiffe://example.test/billing-reader\": {\"invoice:read\"}}\n\ndef permissions_for_client(certificate_bytes: bytes) -> frozenset[str]:\n    certificate = x509.load_pem_x509_certificate(certificate_bytes)\n    sans = certificate.extensions.get_extension_for_oid(\n        ExtensionOID.SUBJECT_ALTERNATIVE_NAME\n    ).value.get_values_for_type(x509.UniformResourceIdentifier)\n    identities = set(sans) & WORKLOAD_ROLES.keys()\n    if len(identities) != 1:\n        raise PermissionError(\"client certificate identity rejected\")\n    return frozenset(WORKLOAD_ROLES[identities.pop()])\n"
    }
  ]
};
