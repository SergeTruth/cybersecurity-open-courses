window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Dynamic SQL, Identifiers, and Stored Procedures through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Map dynamic SQL identifiers to static fragments",
      "language": "python",
      "blurb": "The caller chooses a symbolic sort and direction, while application-owned fragments provide the actual SQL identifiers and keywords.",
      "code": "SORTS = {\n    (\"created\", \"ascending\"): \"created_at asc\",\n    (\"created\", \"descending\"): \"created_at desc\",\n    (\"total\", \"ascending\"): \"total_cents asc\",\n    (\"total\", \"descending\"): \"total_cents desc\",\n}\n\ndef sorted_orders(connection, tenant_id: str, sort: str, direction: str):\n    order_clause = SORTS.get((sort, direction))\n    if order_clause is None:\n        raise ValueError(\"order sort policy rejected\")\n    return connection.execute(\n        f\"select id, status from orders where tenant_id = %s order by {order_clause} limit 100\",\n        (tenant_id,),\n    ).fetchall()\n"
    },
    {
      "title": "Call a stored procedure with bound parameters",
      "language": "python",
      "blurb": "The procedure name is application-owned and every value is bound separately; stored procedure use does not authorize dynamic procedure or SQL text.",
      "code": "from decimal import Decimal\n\ndef reserve_credit(connection, tenant_id: str, account_id: str, amount: Decimal) -> str:\n    if not amount.is_finite() or amount.as_tuple().exponent < -2 or not Decimal(\"0.01\") <= amount <= Decimal(\"10000.00\"):\n        raise ValueError(\"credit amount rejected\")\n    row = connection.execute(\n        \"select reservation_id from reserve_account_credit(%s, %s, %s)\",\n        (tenant_id, account_id, amount),\n    ).fetchone()\n    if row is None:\n        raise RuntimeError(\"credit reservation failed\")\n    return str(row[0])\n"
    }
  ]
};
