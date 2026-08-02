window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply TLS, Certificates, and Transport Protection through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Configure PostgreSQL TLS from an immutable deployment directory",
      "language": "python",
      "blurb": "The CA pathname is a direct child of a privileged, non-writable deployment directory; psycopg may safely reopen it only while that trusted-directory assumption remains true.",
      "code": "from pathlib import Path\nfrom typing import Any\nimport os\nimport stat\n\ndef open_verified_postgres(psycopg: Any, password: str, ca_file: Path, deployment_root: Path):\n    if not deployment_root.is_absolute() or ca_file.parent != deployment_root:\n        raise ValueError(\"direct deployment CA file required\")\n    if deployment_root.is_symlink() or ca_file.is_symlink():\n        raise ValueError(\"deployment path links rejected\")\n    root_info = deployment_root.stat()\n    ca_info = ca_file.stat()\n    if not stat.S_ISDIR(root_info.st_mode) or root_info.st_uid != 0 or root_info.st_mode & 0o022:\n        raise PermissionError(\"immutable root-owned deployment directory required\")\n    if not stat.S_ISREG(ca_info.st_mode) or ca_info.st_uid != 0 or ca_info.st_mode & 0o022:\n        raise PermissionError(\"trusted CA file required\")\n    return psycopg.connect(\n        host=\"orders-db.internal.example\",\n        port=5432,\n        dbname=\"orders\",\n        user=\"orders_runtime\",\n        password=password,\n        sslmode=\"verify-full\",\n        sslrootcert=str(ca_file),\n        connect_timeout=5,\n    )\n"
    },
    {
      "title": "Reject a database session with the wrong endpoint identity",
      "language": "python",
      "blurb": "A post-connect check confirms the expected database, runtime role, and TLS use before the connection is released to application code.",
      "code": "def verify_database_session(connection) -> None:\n    row = connection.execute(\n        \"select current_database(), current_user, ssl from pg_stat_ssl where pid = pg_backend_pid()\"\n    ).fetchone()\n    if row is None:\n        raise ConnectionError(\"database session evidence unavailable\")\n    database, role, tls_active = row\n    if (database, role, tls_active) != (\"orders\", \"orders_runtime\", True):\n        connection.close()\n        raise ConnectionError(\"database session identity rejected\")\n"
    }
  ]
};
