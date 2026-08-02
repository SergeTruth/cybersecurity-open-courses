window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Certificate Validation in Python Clients with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Use one SSL context in Requests",
      "language": "python",
      "blurb": "A transport adapter integrates the reviewed SSLContext into the HTTP client instead of leaving it disconnected from requests.",
      "code": "import ssl\nimport requests\nfrom requests.adapters import HTTPAdapter\n\nclass TLSAdapter(HTTPAdapter):\n    def __init__(self, context: ssl.SSLContext):\n        self._context = context\n        super().__init__()\n\n    def init_poolmanager(self, *args, **kwargs):\n        kwargs[\"ssl_context\"] = self._context\n        return super().init_poolmanager(*args, **kwargs)\n\ndef verified_session(cafile: str | None = None) -> requests.Session:\n    context = ssl.create_default_context(cafile=cafile)\n    context.minimum_version = ssl.TLSVersion.TLSv1_2\n    session = requests.Session()\n    session.mount(\"https://\", TLSAdapter(context))\n    return session\n"
    },
    {
      "title": "Require full validation in a database driver",
      "language": "python",
      "blurb": "The PostgreSQL connection verifies both the private trust chain and the database service name.",
      "code": "import psycopg\n\ndef connect_to_inventory(dsn: str, root_ca: str):\n    return psycopg.connect(\n        dsn,\n        sslmode=\"verify-full\",\n        sslrootcert=root_ca,\n        connect_timeout=5,\n    )\n"
    }
  ]
};
