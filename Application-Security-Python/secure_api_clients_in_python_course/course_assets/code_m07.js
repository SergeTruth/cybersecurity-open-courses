window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply TLS, Redirects, Proxies, and Destination Control with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Attach an idempotency key to a create request",
      "language": "python",
      "blurb": "A caller-generated operation identifier is validated and sent in a dedicated header so a retry represents the same intended action.",
      "code": "from uuid import UUID\n\ndef create_payment(session, payload: dict[str, object], operation_id: str):\n    identifier = str(UUID(operation_id))\n    return session.post(\n        \"https://payments.example/v1/payments\",\n        json=payload,\n        headers={\"Idempotency-Key\": identifier},\n        timeout=(3, 10),\n        allow_redirects=False,\n    )\n"
    },
    {
      "title": "Enforce an approved origin in a direct API client",
      "language": "python",
      "blurb": "The wrapper owns one normalized origin, disables environment proxies, maps operation names to relative paths, and never follows redirects.",
      "code": "from urllib.parse import urlsplit\nimport requests\n\nENDPOINTS = {\"inventory\": \"/v1/inventory\", \"health\": \"/health\"}\n\nclass DirectAPIClient:\n    def __init__(self, origin: str):\n        parsed = urlsplit(origin)\n        try:\n            port = parsed.port\n        except ValueError:\n            raise ValueError(\"API origin port rejected\") from None\n        if (\n            parsed.scheme != \"https\"\n            or parsed.hostname != \"api.example\"\n            or port not in {None, 443}\n            or parsed.username is not None\n            or parsed.password is not None\n            or parsed.path not in {\"\", \"/\"}\n            or parsed.query\n            or parsed.fragment\n        ):\n            raise ValueError(\"API origin rejected\")\n        self._origin = \"https://api.example\"\n        self._session = requests.Session()\n        self._session.trust_env = False\n\n    def get(self, operation: str, *, params: dict[str, str] | None = None):\n        try:\n            path = ENDPOINTS[operation]\n        except KeyError:\n            raise ValueError(\"API operation is not approved\") from None\n        return self._session.get(\n            self._origin + path,\n            params=params,\n            timeout=(3, 8),\n            allow_redirects=False,\n        )\n\n    def close(self) -> None:\n        self._session.close()\n"
    }
  ]
};
