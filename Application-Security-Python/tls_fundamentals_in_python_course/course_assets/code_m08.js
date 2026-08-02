window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Monitoring, and TLS Lifecycle Management through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Measure certificate expiry through a verified channel",
      "language": "python",
      "blurb": "The monitor completes ordinary certificate and hostname validation first, then converts the peer's expiry into a bounded remaining-days metric.",
      "code": "from datetime import datetime, timezone\nimport ssl\n\ndef peer_certificate_days_remaining(open_verified_connection, now: datetime | None = None) -> int:\n    current = datetime.now(timezone.utc) if now is None else now\n    if current.tzinfo is None:\n        raise ValueError(\"aware monitoring time required\")\n    with open_verified_connection() as secured:\n        certificate = secured.getpeercert()\n    raw_expiry = certificate.get(\"notAfter\")\n    if not isinstance(raw_expiry, str):\n        raise ValueError(\"peer certificate expiry missing\")\n    expiry = datetime.fromtimestamp(ssl.cert_time_to_seconds(raw_expiry), tz=timezone.utc)\n    return max(-1, min((expiry - current).days, 3660))\n"
    },
    {
      "title": "Rotate certificates through one complete TLS policy builder",
      "language": "python",
      "blurb": "Initial creation and every replacement call the same builder, preserving protocol, ALPN, client-certificate trust, compression, and verification policy for new connections.",
      "code": "from threading import Lock\nimport ssl\n\ndef build_server_context(certificate: str, private_key: str, client_ca: str) -> ssl.SSLContext:\n    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)\n    context.minimum_version = ssl.TLSVersion.TLSv1_2\n    context.load_cert_chain(certificate, private_key)\n    context.load_verify_locations(cafile=client_ca)\n    context.verify_mode = ssl.CERT_REQUIRED\n    context.set_alpn_protocols([\"http/1.1\"])\n    context.options |= ssl.OP_NO_COMPRESSION\n    return context\n\nclass RotatingServerContext:\n    def __init__(self, certificate: str, private_key: str, client_ca: str):\n        self._client_ca = client_ca\n        self._active = build_server_context(certificate, private_key, client_ca)\n        self._lock = Lock()\n\n    def current(self) -> ssl.SSLContext:\n        with self._lock:\n            return self._active\n\n    def replace(self, certificate: str, private_key: str) -> None:\n        replacement = build_server_context(certificate, private_key, self._client_ca)\n        with self._lock:\n            self._active = replacement\n"
    }
  ]
};
