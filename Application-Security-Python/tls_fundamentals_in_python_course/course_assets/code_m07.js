window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Mutual TLS and Service Identity through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Require client certificates for mutual TLS",
      "language": "python",
      "blurb": "The service context loads a client-authentication CA, requires a verified client certificate, and keeps server identity material separate from its trust anchors.",
      "code": "import ssl\n\ndef mutual_tls_server_context(server_cert: str, server_key: str, client_ca: str) -> ssl.SSLContext:\n    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)\n    context.minimum_version = ssl.TLSVersion.TLSv1_2\n    context.load_cert_chain(server_cert, server_key)\n    context.load_verify_locations(cafile=client_ca)\n    context.verify_mode = ssl.CERT_REQUIRED\n    return context\n"
    },
    {
      "title": "Present a client identity to a verified server",
      "language": "python",
      "blurb": "The client context verifies the server with its CA and loads a distinct client certificate and key for mutual service authentication.",
      "code": "import ssl\n\ndef mutual_tls_client_context(server_ca: str, client_cert: str, client_key: str) -> ssl.SSLContext:\n    context = ssl.create_default_context(ssl.Purpose.SERVER_AUTH, cafile=server_ca)\n    context.minimum_version = ssl.TLSVersion.TLSv1_2\n    context.load_cert_chain(client_cert, client_key)\n    context.check_hostname = True\n    context.verify_mode = ssl.CERT_REQUIRED\n    return context\n"
    }
  ]
};
