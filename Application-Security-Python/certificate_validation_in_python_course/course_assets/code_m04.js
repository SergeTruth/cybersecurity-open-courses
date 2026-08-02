window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Hostname Validation and Service Identity with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Connect with hostname verification",
      "language": "python",
      "blurb": "The intended DNS name is supplied during the handshake while default chain and hostname checks remain enabled.",
      "code": "import socket\nimport ssl\n\ndef open_verified_tls(hostname: str, port: int = 443) -> ssl.SSLSocket:\n    context = ssl.create_default_context()\n    context.minimum_version = ssl.TLSVersion.TLSv1_2\n    raw = socket.create_connection((hostname, port), timeout=5)\n    try:\n        return context.wrap_socket(raw, server_hostname=hostname)\n    except BaseException:\n        raw.close()\n        raise\n"
    },
    {
      "title": "Validate the full authority of every redirect destination",
      "language": "python",
      "blurb": "Every hop must use HTTPS, an approved hostname, no URL credentials, and the default TLS port or explicit port 443; redirect responses and session resources are closed.",
      "code": "from urllib.parse import urljoin, urlsplit\nimport requests\n\nAPPROVED_HOSTS = {\"api.example.com\", \"api-backup.example.com\"}\n\ndef get_without_crossing_trust_boundary(url: str) -> requests.Response:\n    with requests.Session() as session:\n        for _ in range(4):\n            target = urlsplit(url)\n            try:\n                port = target.port\n            except ValueError as error:\n                raise ValueError(\"redirect destination rejected\") from error\n            if (\n                target.scheme != \"https\"\n                or target.hostname not in APPROVED_HOSTS\n                or target.username is not None\n                or target.password is not None\n                or port not in {None, 443}\n            ):\n                raise ValueError(\"redirect destination rejected\")\n            response = session.get(url, allow_redirects=False, timeout=(3, 10))\n            if not response.is_redirect:\n                return response\n            try:\n                url = urljoin(url, response.headers[\"Location\"])\n            finally:\n                response.close()\n    raise RuntimeError(\"redirect limit exceeded\")\n"
    }
  ]
};
