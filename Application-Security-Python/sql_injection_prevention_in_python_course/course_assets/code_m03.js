window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Parameterized Queries through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Parameterize a SQLite query and map tuple rows explicitly",
      "language": "python",
      "blurb": "All data values remain placeholders, and cursor metadata supplies column names so the example works with SQLite's default tuple row configuration.",
      "code": "import re\nimport sqlite3\nfrom typing import Any\n\nTENANT_ID = re.compile(r\"[A-Za-z0-9][A-Za-z0-9_-]{0,63}\")\n\ndef find_orders(\n    connection: sqlite3.Connection,\n    tenant_id: str,\n    minimum_cents: int,\n) -> list[dict[str, Any]]:\n    if type(tenant_id) is not str or TENANT_ID.fullmatch(tenant_id) is None:\n        raise ValueError(\"tenant identifier rejected\")\n    if type(minimum_cents) is not int or not 0 <= minimum_cents <= 10_000_000:\n        raise ValueError(\"minimum total rejected\")\n    cursor = connection.execute(\n        \"select id, status, total_cents from orders \"\n        \"where tenant_id = ? and total_cents >= ? limit 100\",\n        (tenant_id, minimum_cents),\n    )\n    columns = tuple(description[0] for description in cursor.description)\n    return [\n        dict(zip(columns, row, strict=True))\n        for row in cursor.fetchall()\n    ]\n"
    },
    {
      "title": "Parameterize a bounded batch insert",
      "language": "python",
      "blurb": "Each row is type-checked before executemany binds it, keeping both values and batch size outside SQL syntax.",
      "code": "import re\nimport sqlite3\n\nEVENT_ID = re.compile(r\"evt-[A-Za-z0-9_-]{1,60}\")\nEVENT_CATEGORIES = {\"login\", \"logout\", \"denied\"}\nMAX_AUDIT_BATCH_TEXT = 10_000\n\ndef insert_audit_events(\n    connection: sqlite3.Connection,\n    events: list[tuple[str, str]],\n) -> int:\n    if type(events) is not list or not 1 <= len(events) <= 100:\n        raise ValueError(\"audit batch size rejected\")\n    clean: list[tuple[str, str]] = []\n    total_text = 0\n    for event in events:\n        if type(event) is not tuple or len(event) != 2:\n            raise ValueError(\"audit event rejected\")\n        event_id, category = event\n        if (\n            type(event_id) is not str\n            or EVENT_ID.fullmatch(event_id) is None\n            or type(category) is not str\n            or category not in EVENT_CATEGORIES\n        ):\n            raise ValueError(\"audit event rejected\")\n        total_text += len(event_id) + len(category)\n        if total_text > MAX_AUDIT_BATCH_TEXT:\n            raise ValueError(\"audit batch text limit exceeded\")\n        clean.append((event_id, category))\n    with connection:\n        cursor = connection.executemany(\n            \"insert into audit_event (event_id, category) values (?, ?)\",\n            clean,\n        )\n    if type(cursor.rowcount) is not int or not 0 <= cursor.rowcount <= len(clean):\n        raise RuntimeError(\"audit insert result rejected\")\n    return cursor.rowcount\n"
    }
  ]
};
