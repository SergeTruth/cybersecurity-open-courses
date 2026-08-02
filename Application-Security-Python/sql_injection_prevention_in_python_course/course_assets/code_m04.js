window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply ORM and Query Builder Safety through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Build a SQLAlchemy query from expressions",
      "language": "python",
      "blurb": "Column comparisons and ordering remain SQLAlchemy objects, while a finite sort map controls the only dynamic identifier.",
      "code": "from sqlalchemy import select\n\nSORT_COLUMNS = {\n    \"created\": lambda table: table.c.created_at,\n    \"total\": lambda table: table.c.total_cents,\n}\n\ndef order_statement(order_table, tenant_id: str, sort: str):\n    column_factory = SORT_COLUMNS.get(sort)\n    if column_factory is None:\n        raise ValueError(\"order sort rejected\")\n    column = column_factory(order_table)\n    return (\n        select(order_table.c.id, order_table.c.status, order_table.c.total_cents)\n        .where(order_table.c.tenant_id == tenant_id)\n        .order_by(column.desc())\n        .limit(100)\n    )\n"
    },
    {
      "title": "Apply authorization before a Django ORM lookup",
      "language": "python",
      "blurb": "The queryset includes both tenant and owner boundaries before selecting explicit columns, so parameterization is not mistaken for object authorization.",
      "code": "def owned_document(Document, *, tenant_id: str, user_id: str, document_id: str) -> dict[str, object]:\n    if not document_id.startswith(\"doc-\") or len(document_id) > 64:\n        raise ValueError(\"document identifier rejected\")\n    return Document.objects.values(\"public_id\", \"title\", \"updated_at\").get(\n        public_id=document_id,\n        tenant_id=tenant_id,\n        owner_id=user_id,\n        deleted_at__isnull=True,\n    )\n"
    }
  ]
};
