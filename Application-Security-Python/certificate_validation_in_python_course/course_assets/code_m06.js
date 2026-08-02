window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Private PKI, Self-Signed Certificates, and Development Environments with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Add one private CA without disabling validation",
      "language": "python",
      "blurb": "The private root augments a normal validating context; hostname checks and required certificate verification remain explicit.",
      "code": "from pathlib import Path\nimport ssl\n\ndef context_for_private_pki(ca_bundle: Path) -> ssl.SSLContext:\n    if not ca_bundle.is_file():\n        raise FileNotFoundError(\"approved CA bundle is unavailable\")\n    context = ssl.create_default_context(cafile=str(ca_bundle))\n    if not context.check_hostname or context.verify_mode != ssl.CERT_REQUIRED:\n        raise RuntimeError(\"validating TLS context required\")\n    return context\n"
    },
    {
      "title": "Confine development trust overrides",
      "language": "python",
      "blurb": "A development endpoint must be loopback and use a named CA file; production cannot select this exception path.",
      "code": "from dataclasses import dataclass\nfrom ipaddress import ip_address\nfrom pathlib import Path\n\n@dataclass(frozen=True)\nclass DevelopmentTLS:\n    host: str\n    ca_file: Path\n\ndef approve_development_tls(config: DevelopmentTLS, environment: str) -> DevelopmentTLS:\n    if environment != \"development\":\n        raise PermissionError(\"development trust is disabled\")\n    if not ip_address(config.host).is_loopback or not config.ca_file.is_file():\n        raise ValueError(\"development TLS must use loopback and an explicit CA\")\n    return config\n"
    }
  ]
};
