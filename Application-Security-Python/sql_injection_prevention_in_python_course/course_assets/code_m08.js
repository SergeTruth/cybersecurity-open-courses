window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Review, and Remediation through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Regression-test classic injection payloads",
      "language": "python",
      "blurb": "A real in-memory database confirms that attacker-shaped values remain data and cannot broaden the result set or execute a second statement.",
      "code": "import sqlite3\n\ndef lookup_user(connection: sqlite3.Connection, username: str):\n    return connection.execute(\n        \"select username from users where username = ?\",\n        (username,),\n    ).fetchall()\n\ndef test_username_is_always_data() -> None:\n    connection = sqlite3.connect(\":memory:\")\n    connection.execute(\"create table users (username text primary key)\")\n    connection.executemany(\"insert into users values (?)\", [(\"alice\",), (\"bob\",)])\n    assert lookup_user(connection, \"' or 1=1 --\") == []\n    assert lookup_user(connection, \"alice'; drop table users; --\") == []\n    assert connection.execute(\"select count(*) from users\").fetchone() == (2,)\n"
    },
    {
      "title": "Test a self-contained dynamic sort policy",
      "language": "python",
      "blurb": "The listing includes the fixed identifier mapping and query helper before testing every approved choice and several SQL-shaped or unsupported values.",
      "code": "import pytest\n\nSORTS = {\n    (\"created\", \"ascending\"): \"created_at asc\",\n    (\"created\", \"descending\"): \"created_at desc\",\n    (\"total\", \"ascending\"): \"total_cents asc\",\n    (\"total\", \"descending\"): \"total_cents desc\",\n}\n\ndef sorted_orders(connection, tenant_id: str, sort: str, direction: str):\n    order_clause = SORTS.get((sort, direction))\n    if order_clause is None:\n        raise ValueError(\"order sort policy rejected\")\n    return connection.execute(\n        f\"select id, status from orders where tenant_id = %s order by {order_clause} limit 100\",\n        (tenant_id,),\n    ).fetchall()\n\ndef test_sort_policy_is_closed(connection) -> None:\n    for sort, direction in SORTS:\n        sorted_orders(connection, \"tenant-1\", sort, direction)\n    for sort, direction in (\n        (\"created_at desc; drop table orders\", \"ascending\"),\n        (\"total\", \"descending nulls last\"),\n        (\"unknown\", \"ascending\"),\n    ):\n        with pytest.raises(ValueError):\n            sorted_orders(connection, \"tenant-1\", sort, direction)\n"
    }
  ]
};
