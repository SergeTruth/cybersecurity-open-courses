window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Connection Strings, Credentials, and Secret Handling through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Validate one exact PostgreSQL connection descriptor",
      "language": "python",
      "blurb": "The application requires exactly one nonblank sslmode parameter and its production host, database, account, TLS mode, and port, with no password, fragment, duplicate, or ignored query field.",
      "code": "from dataclasses import dataclass\nfrom urllib.parse import parse_qsl, urlsplit\n\n@dataclass(frozen=True)\nclass DatabaseTarget:\n    host: str\n    port: int\n    database: str\n    user: str\n\ndef parse_database_target(dsn: str) -> DatabaseTarget:\n    parsed = urlsplit(dsn)\n    query_pairs = parse_qsl(\n        parsed.query,\n        keep_blank_values=True,\n        strict_parsing=True,\n    )\n    if parsed.password is not None or parsed.username != \"orders_runtime\" or parsed.fragment:\n        raise ValueError(\"embedded or unexpected database identity\")\n    if parsed.scheme != \"postgresql\" or parsed.hostname != \"orders-db.internal.example\":\n        raise ValueError(\"database endpoint rejected\")\n    if (\n        parsed.port != 5432\n        or parsed.path != \"/orders\"\n        or query_pairs != [(\"sslmode\", \"verify-full\")]\n    ):\n        raise ValueError(\"database connection policy rejected\")\n    return DatabaseTarget(parsed.hostname, parsed.port, \"orders\", parsed.username)\n"
    },
    {
      "title": "Resolve a database password at connection time",
      "language": "python",
      "blurb": "A narrow provider interface returns the secret for an application-owned reference, while the resulting connection arguments keep logging and configuration free of the password.",
      "code": "from typing import Protocol\n\nclass SecretProvider(Protocol):\n    def read_bytes(self, reference: str) -> bytes: ...\n\ndef database_connect_kwargs(provider: SecretProvider) -> dict[str, object]:\n    password = provider.read_bytes(\"vault://production/orders/runtime-password\")\n    if not 16 <= len(password) <= 1024 or b\"\\x00\" in password:\n        raise ValueError(\"database credential rejected\")\n    return {\n        \"host\": \"orders-db.internal.example\",\n        \"port\": 5432,\n        \"dbname\": \"orders\",\n        \"user\": \"orders_runtime\",\n        \"password\": password.decode(\"utf-8\"),\n        \"connect_timeout\": 5,\n        \"sslmode\": \"verify-full\",\n    }\n"
    }
  ]
};
