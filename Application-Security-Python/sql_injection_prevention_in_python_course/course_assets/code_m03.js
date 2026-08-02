window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Parameterized Queries through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Parameterize a SQLite query and map tuple rows explicitly",
      "language": "python",
      "blurb": "All data values remain placeholders, and cursor metadata supplies column names so the example works with SQLite's default tuple row configuration.",
      "code": "import sqlite3\nfrom typing import Any\n\ndef find_orders(connection: sqlite3.Connection, tenant_id: str, minimum_cents: int) -> list[dict[str, Any]]:\n    if type(minimum_cents) is not int or not 0 <= minimum_cents <= 10_000_000:\n        raise ValueError(\"minimum total rejected\")\n    cursor = connection.execute(\n        \"select id, status, total_cents from orders where tenant_id = ? and total_cents >= ? limit 100\",\n        (tenant_id, minimum_cents),\n    )\n    columns = tuple(description[0] for description in cursor.description)\n    return [dict(zip(columns, row, strict=True)) for row in cursor.fetchall()]\n"
    },
    {
      "title": "Parameterize a bounded batch insert",
      "language": "python",
      "blurb": "Each row is type-checked before executemany binds it, keeping both values and batch size outside SQL syntax.",
      "code": "import sqlite3\n\ndef insert_audit_events(connection: sqlite3.Connection, events: list[tuple[str, str]]) -> int:\n    if not 1 <= len(events) <= 100:\n        raise ValueError(\"audit batch size rejected\")\n    for event_id, category in events:\n        if not event_id.startswith(\"evt-\") or category not in {\"login\", \"logout\", \"denied\"}:\n            raise ValueError(\"audit event rejected\")\n    with connection:\n        cursor = connection.executemany(\n            \"insert into audit_event (event_id, category) values (?, ?)\",\n            events,\n        )\n    return cursor.rowcount\n"
    }
  ]
};
