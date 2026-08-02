window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Frameworks, ORMs, Migrations, and Background Jobs through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Build an ORM engine with bounded pool behavior",
      "language": "python",
      "blurb": "The engine uses a structured URL, verified TLS parameters, pre-ping, recycling, finite capacity, and acquisition timeout rather than an opaque connection string.",
      "code": "from sqlalchemy import URL, create_engine\n\ndef build_runtime_engine(password: str):\n    target = URL.create(\n        \"postgresql+psycopg\",\n        username=\"orders_runtime\",\n        password=password,\n        host=\"orders-db.internal.example\",\n        port=5432,\n        database=\"orders\",\n        query={\"sslmode\": \"verify-full\", \"sslrootcert\": \"/etc/app/ca.pem\"},\n    )\n    return create_engine(\n        target,\n        pool_size=8,\n        max_overflow=4,\n        pool_timeout=2,\n        pool_recycle=900,\n        pool_pre_ping=True,\n    )\n"
    },
    {
      "title": "Guard a migration entry point",
      "language": "python",
      "blurb": "Schema changes require an explicit deployment environment, an approved revision, and the dedicated migration account before any migration code runs.",
      "code": "import re\n\nREVISION = re.compile(r\"[0-9a-f]{12}\")\n\ndef run_migration(connection, revision: str, environment: str, *, deployment_job: bool) -> None:\n    if environment != \"production\" or not deployment_job:\n        raise PermissionError(\"migration execution context rejected\")\n    if REVISION.fullmatch(revision) is None:\n        raise ValueError(\"migration revision rejected\")\n    role = connection.execute(\"select current_user\").fetchone()[0]\n    if role != \"orders_migrator\":\n        raise PermissionError(\"dedicated migration role required\")\n    connection.execute(\"select apply_approved_migration(%s)\", (revision,))\n"
    }
  ]
};
