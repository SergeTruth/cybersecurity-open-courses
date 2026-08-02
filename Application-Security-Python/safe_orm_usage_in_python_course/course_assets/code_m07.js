window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Raw SQL, Migrations, and Advanced ORM Features with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Allowlist dynamic SQL identifiers",
      "language": "python",
      "blurb": "A report selector maps public tokens to fixed SQL fragments while date values remain parameters.",
      "code": "from sqlalchemy import text\n\nREPORT_COLUMNS = {\"daily\": \"date(created_at)\", \"owner\": \"owner_id\"}\n\ndef report_statement(grouping: str):\n    try:\n        column = REPORT_COLUMNS[grouping]\n    except KeyError:\n        raise ValueError(\"report grouping is not supported\") from None\n    return text(\n        f\"SELECT {column} AS bucket, count(*) AS total FROM orders \"\n        f\"WHERE tenant_id = :tenant_id AND created_at >= :since GROUP BY {column}\"\n    )\n"
    },
    {
      "title": "Use a transaction for a state transition",
      "language": "python",
      "blurb": "The row is locked, its current state is checked, and the audit record is added in the same commit.",
      "code": "from sqlalchemy import select\n\ndef approve_invoice(session, Invoice, Audit, invoice_id: str, actor_id: str) -> None:\n    with session.begin():\n        invoice = session.scalar(\n            select(Invoice).where(Invoice.id == invoice_id).with_for_update()\n        )\n        if invoice is None or invoice.state != \"pending\":\n            raise ValueError(\"invoice is not pending\")\n        invoice.state = \"approved\"\n        session.add(Audit(event=\"invoice_approved\", resource_id=invoice.id, actor_id=actor_id))\n"
    }
  ]
};
