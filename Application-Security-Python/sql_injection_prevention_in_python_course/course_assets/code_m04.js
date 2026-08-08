window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply ORM and Query Builder Safety through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Build a SQLAlchemy query from expressions",
      "language": "python",
      "blurb": "Column comparisons and ordering remain SQLAlchemy objects, while a finite sort map controls the only dynamic identifier.",
      "code": "import re\nfrom sqlalchemy import select\n\nTENANT_ID = re.compile(r\"[A-Za-z0-9][A-Za-z0-9_-]{0,63}\")\nSORT_COLUMNS = {\n    \"created\": lambda table: table.c.created_at,\n    \"total\": lambda table: table.c.total_cents,\n}\n\ndef order_statement(order_table, tenant_id: str, sort: str):\n    if type(tenant_id) is not str or TENANT_ID.fullmatch(tenant_id) is None:\n        raise ValueError(\"tenant identifier rejected\")\n    if type(sort) is not str:\n        raise ValueError(\"order sort rejected\")\n    column_factory = SORT_COLUMNS.get(sort)\n    if column_factory is None:\n        raise ValueError(\"order sort rejected\")\n    column = column_factory(order_table)\n    return (\n        select(\n            order_table.c.id,\n            order_table.c.status,\n            order_table.c.total_cents,\n        )\n        .where(order_table.c.tenant_id == tenant_id)\n        .order_by(column.desc())\n        .limit(100)\n    )\n"
    },
    {
      "title": "Apply authorization before a Django ORM lookup",
      "language": "python",
      "blurb": "The queryset includes both tenant and owner boundaries before selecting explicit columns, so parameterization is not mistaken for object authorization.",
      "code": "import re\n\nIDENTIFIER = re.compile(r\"[A-Za-z0-9][A-Za-z0-9_-]{0,63}\")\nDOCUMENT_ID = re.compile(r\"doc-[A-Za-z0-9_-]{1,60}\")\n\ndef owned_document(\n    Document,\n    *,\n    tenant_id: str,\n    user_id: str,\n    document_id: str,\n) -> dict[str, object]:\n    if type(tenant_id) is not str or IDENTIFIER.fullmatch(tenant_id) is None:\n        raise ValueError(\"tenant identifier rejected\")\n    if type(user_id) is not str or IDENTIFIER.fullmatch(user_id) is None:\n        raise ValueError(\"user identifier rejected\")\n    if (\n        type(document_id) is not str\n        or DOCUMENT_ID.fullmatch(document_id) is None\n    ):\n        raise ValueError(\"document identifier rejected\")\n    return Document.objects.values(\n        \"public_id\",\n        \"title\",\n        \"updated_at\",\n    ).get(\n        public_id=document_id,\n        tenant_id=tenant_id,\n        owner_id=user_id,\n        deleted_at__isnull=True,\n    )\n"
    }
  ]
};
