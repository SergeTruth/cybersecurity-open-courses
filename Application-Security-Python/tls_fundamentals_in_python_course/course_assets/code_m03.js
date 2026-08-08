window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Certificates, Keys, and PKI Concepts through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Inspect a certificate's identity and validity window",
      "language": "python",
      "blurb": "The loader parses one PEM certificate, compares aware UTC times, and requires the expected DNS identity before deployment.",
      "code": "from datetime import datetime, timezone\nfrom cryptography import x509\nfrom cryptography.x509.oid import ExtensionOID\nimport re\n\nDNS_NAME = re.compile(\n    r\"[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\"\n    r\"(?:\\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+\"\n)\nMAX_CERTIFICATE_BYTES = 64_000\n\ndef validate_service_certificate(\n    pem: bytes,\n    expected_dns: str,\n    now: datetime | None = None,\n) -> x509.Certificate:\n    if type(pem) is not bytes or not 1 <= len(pem) <= MAX_CERTIFICATE_BYTES:\n        raise ValueError(\"certificate input rejected\")\n    if (\n        type(expected_dns) is not str\n        or len(expected_dns) > 253\n        or DNS_NAME.fullmatch(expected_dns) is None\n    ):\n        raise ValueError(\"expected DNS identity rejected\")\n    current = datetime.now(timezone.utc) if now is None else now\n    if (\n        type(current) is not datetime\n        or current.tzinfo is None\n        or current.utcoffset() is None\n    ):\n        raise ValueError(\"aware validation time required\")\n    certificate = x509.load_pem_x509_certificate(pem)\n    current_utc = current.astimezone(timezone.utc)\n    if not (\n        certificate.not_valid_before_utc\n        <= current_utc\n        <= certificate.not_valid_after_utc\n    ):\n        raise ValueError(\"certificate validity window rejected\")\n    names = certificate.extensions.get_extension_for_oid(\n        ExtensionOID.SUBJECT_ALTERNATIVE_NAME\n    ).value\n    if expected_dns not in names.get_values_for_type(x509.DNSName):\n        raise ValueError(\"certificate DNS identity rejected\")\n    return certificate\n"
    },
    {
      "title": "Check a private key under an immutable deployment root",
      "language": "python",
      "blurb": "This POSIX startup check assumes the TLS loader immediately reopens a direct child of a privileged, non-writable deployment directory; mutable pathname trees require another loading mechanism.",
      "code": "from pathlib import Path\nimport os\nimport stat\n\ndef validate_deployed_private_key(path: Path, deployment_root: Path) -> None:\n    if not deployment_root.is_absolute() or path.parent != deployment_root:\n        raise ValueError(\"direct deployment key required\")\n    if deployment_root.is_symlink() or path.is_symlink():\n        raise PermissionError(\"TLS deployment link rejected\")\n    root_info = deployment_root.stat()\n    key_info = path.stat()\n    if not stat.S_ISDIR(root_info.st_mode) or root_info.st_uid != 0 or root_info.st_mode & 0o022:\n        raise PermissionError(\"immutable root-owned deployment directory required\")\n    if not stat.S_ISREG(key_info.st_mode) or key_info.st_uid not in {0, os.geteuid()}:\n        raise PermissionError(\"TLS private key ownership rejected\")\n    if stat.S_IMODE(key_info.st_mode) not in {0o400, 0o600}:\n        raise PermissionError(\"TLS private key permissions rejected\")\n"
    }
  ]
};
