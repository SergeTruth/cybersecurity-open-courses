window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Authentication, Tokens, and Credential Handling with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Build a bearer-authenticated session",
      "language": "python",
      "blurb": "The credential enters one Authorization header, never the URL, and the session has a fixed API media type and identity.",
      "code": "import requests\n\ndef authenticated_session(access_token: str) -> requests.Session:\n    if not access_token or any(ch.isspace() for ch in access_token):\n        raise ValueError(\"access token format rejected\")\n    session = requests.Session()\n    session.headers.update({\n        \"Authorization\": f\"Bearer {access_token}\",\n        \"Accept\": \"application/json\",\n        \"User-Agent\": \"inventory-client/3\",\n    })\n    return session\n"
    },
    {
      "title": "Refresh credentials under a lock",
      "language": "python",
      "blurb": "Only one thread refreshes an expiring token, and the credential provider—not a remote response—sets the resulting scope.",
      "code": "from datetime import datetime, timedelta, timezone\nfrom threading import Lock\n\nclass TokenCache:\n    def __init__(self, provider):\n        self._provider = provider\n        self._lock = Lock()\n        self._token = None\n\n    def current(self):\n        with self._lock:\n            now = datetime.now(timezone.utc)\n            if self._token is None or self._token.expires_at <= now + timedelta(seconds=30):\n                self._token = self._provider.issue(scope=\"inventory:read\")\n            return self._token.value\n"
    }
  ]
};
