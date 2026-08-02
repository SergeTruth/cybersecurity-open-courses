window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Certificate and Hostname Validation through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Perform a hostname-verified TLS handshake",
      "language": "python",
      "blurb": "The client supplies the intended DNS name to a default verified context and closes the raw socket if certificate or hostname validation fails.",
      "code": "import socket\nimport ssl\n\ndef connect_to_inventory(ca_file: str) -> ssl.SSLSocket:\n    context = ssl.create_default_context(cafile=ca_file)\n    context.minimum_version = ssl.TLSVersion.TLSv1_2\n    raw = socket.create_connection((\"inventory.internal.example\", 443), timeout=3)\n    try:\n        secured = context.wrap_socket(raw, server_hostname=\"inventory.internal.example\")\n        secured.settimeout(5)\n        return secured\n    except BaseException:\n        raw.close()\n        raise\n"
    },
    {
      "title": "Fail closed on certificate validation errors",
      "language": "python",
      "blurb": "The boundary maps TLS failures to a stable application error and never retries with hostname checks disabled or an unverified context.",
      "code": "import ssl\n\nclass TrustedChannelUnavailable(ConnectionError):\n    pass\n\ndef fetch_inventory(open_connection) -> bytes:\n    try:\n        with open_connection() as secured:\n            secured.sendall(b\"GET /inventory HTTP/1.1\\r\\nHost: inventory.internal.example\\r\\nConnection: close\\r\\n\\r\\n\")\n            return secured.recv(4096)\n    except (ssl.SSLCertVerificationError, ssl.SSLError):\n        raise TrustedChannelUnavailable(\"verified inventory channel unavailable\") from None\n"
    }
  ]
};
