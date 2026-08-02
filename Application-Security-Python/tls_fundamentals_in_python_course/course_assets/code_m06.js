window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply TLS for Python Servers and Web Applications through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Configure a Python TLS server context",
      "language": "python",
      "blurb": "The server context loads an application-owned certificate chain and key, disables legacy protocol versions through a minimum, and advertises only its application protocol.",
      "code": "import ssl\n\ndef web_server_context(certificate: str, private_key: str) -> ssl.SSLContext:\n    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)\n    context.minimum_version = ssl.TLSVersion.TLSv1_2\n    context.load_cert_chain(certfile=certificate, keyfile=private_key)\n    context.set_alpn_protocols([\"http/1.1\"])\n    context.options |= ssl.OP_NO_COMPRESSION\n    return context\n"
    },
    {
      "title": "Bound a server-side TLS handshake",
      "language": "python",
      "blurb": "The accepted TCP socket has a deadline before the blocking handshake begins, and every failure closes the connection without entering the application protocol.",
      "code": "import ssl\n\ndef accept_tls_connection(raw_socket, context: ssl.SSLContext) -> ssl.SSLSocket:\n    raw_socket.settimeout(4.0)\n    secured = context.wrap_socket(raw_socket, server_side=True, do_handshake_on_connect=False)\n    try:\n        secured.do_handshake()\n        secured.settimeout(10.0)\n        return secured\n    except BaseException:\n        secured.close()\n        raise\n"
    }
  ]
};
