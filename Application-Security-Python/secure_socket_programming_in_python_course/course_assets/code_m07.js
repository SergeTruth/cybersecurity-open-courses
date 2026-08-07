window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply TLS, Certificates, and Socket Security through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Wrap a client socket with hostname-verified TLS",
      "language": "python",
      "blurb": "The expected DNS name is supplied to a verified context, and both the TCP connection and subsequent TLS I/O retain explicit deadlines.",
      "code": "import socket\nimport ssl\n\ndef connect_verified_tls(ca_file: str) -> ssl.SSLSocket:\n    context = ssl.create_default_context(cafile=ca_file)\n    context.minimum_version = ssl.TLSVersion.TLSv1_2\n    raw = socket.create_connection((\"events.internal.example\", 7443), timeout=3.0)\n    try:\n        secured = context.wrap_socket(raw, server_hostname=\"events.internal.example\")\n        secured.settimeout(5.0)\n        return secured\n    except BaseException:\n        try:\n            raw.close()\n        except Exception:\n            pass\n        raise\n"
    },
    {
      "title": "Build a TLS server context for socket clients",
      "language": "python",
      "blurb": "The server loads its certificate and private key, requires modern protocol versions, and can be paired with a finite handshake deadline on every accepted socket.",
      "code": "import ssl\n\ndef server_tls_context(certificate: str, private_key: str) -> ssl.SSLContext:\n    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)\n    context.minimum_version = ssl.TLSVersion.TLSv1_2\n    context.load_cert_chain(certfile=certificate, keyfile=private_key)\n    return context\n\ndef secure_accepted_socket(raw, context: ssl.SSLContext) -> ssl.SSLSocket:\n    try:\n        raw.settimeout(4.0)\n        return context.wrap_socket(raw, server_side=True)\n    except BaseException:\n        try:\n            raw.close()\n        except Exception:\n            pass\n        raise\n"
    }
  ]
};
