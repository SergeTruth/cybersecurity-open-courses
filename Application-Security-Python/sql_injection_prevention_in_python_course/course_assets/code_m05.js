window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Dynamic SQL, Identifiers, and Stored Procedures through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Map dynamic SQL identifiers to static fragments",
      "language": "python",
      "blurb": "The caller chooses a symbolic sort and direction, while application-owned fragments provide the actual SQL identifiers and keywords.",
      "code": "import re\n\nIDENTIFIER = re.compile(r\"[A-Za-z0-9][A-Za-z0-9_-]{0,63}\")\nSORTS = {\n    (\"created\", \"ascending\"): \"created_at asc\",\n    (\"created\", \"descending\"): \"created_at desc\",\n    (\"total\", \"ascending\"): \"total_cents asc\",\n    (\"total\", \"descending\"): \"total_cents desc\",\n}\n\ndef sorted_orders(\n    connection,\n    tenant_id: str,\n    sort: str,\n    direction: str,\n):\n    if type(tenant_id) is not str or IDENTIFIER.fullmatch(tenant_id) is None:\n        raise ValueError(\"tenant identifier rejected\")\n    if type(sort) is not str or type(direction) is not str:\n        raise ValueError(\"order sort policy rejected\")\n    order_clause = SORTS.get((sort, direction))\n    if order_clause is None:\n        raise ValueError(\"order sort policy rejected\")\n    return connection.execute(\n        \"select id, status from orders where tenant_id = %s \"\n        f\"order by {order_clause} limit 100\",\n        (tenant_id,),\n    ).fetchall()\n"
    },
    {
      "title": "Call a stored procedure with bound parameters",
      "language": "python",
      "blurb": "The procedure name is application-owned and every value is bound separately; stored procedure use does not authorize dynamic procedure or SQL text.",
      "code": "from decimal import Decimal\nimport re\n\nIDENTIFIER = re.compile(r\"[A-Za-z0-9][A-Za-z0-9_-]{0,63}\")\nRESERVATION_ID = re.compile(r\"res_[A-Za-z0-9_-]{8,80}\")\n\ndef reserve_credit(\n    connection,\n    tenant_id: str,\n    account_id: str,\n    amount: Decimal,\n) -> str:\n    if type(tenant_id) is not str or IDENTIFIER.fullmatch(tenant_id) is None:\n        raise ValueError(\"tenant identifier rejected\")\n    if type(account_id) is not str or IDENTIFIER.fullmatch(account_id) is None:\n        raise ValueError(\"account identifier rejected\")\n    if (\n        type(amount) is not Decimal\n        or not amount.is_finite()\n        or amount.as_tuple().exponent < -2\n        or not Decimal(\"0.01\") <= amount <= Decimal(\"10000.00\")\n    ):\n        raise ValueError(\"credit amount rejected\")\n    row = connection.execute(\n        \"select reservation_id from reserve_account_credit(%s, %s, %s)\",\n        (tenant_id, account_id, amount),\n    ).fetchone()\n    if type(row) not in {tuple, list} or len(row) != 1:\n        raise RuntimeError(\"credit reservation failed\")\n    reservation_id = row[0]\n    if (\n        type(reservation_id) is not str\n        or RESERVATION_ID.fullmatch(reservation_id) is None\n    ):\n        raise RuntimeError(\"credit reservation result rejected\")\n    return reservation_id\n"
    }
  ]
};
