window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Query Safety and Parameter Binding with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Bind ORM query values",
      "language": "python",
      "blurb": "SQLAlchemy builds query structure from model attributes while the email value remains a bound parameter.",
      "code": "from sqlalchemy import select\n\ndef account_by_email(session, Account, tenant_id: str, email: str):\n    statement = select(Account).where(\n        Account.tenant_id == tenant_id,\n        Account.email == email,\n        Account.deleted_at.is_(None),\n    )\n    return session.scalar(statement)\n"
    },
    {
      "title": "Parameterize necessary text SQL",
      "language": "python",
      "blurb": "Static SQL text uses named parameters for values and returns explicit columns rather than interpolating user input.",
      "code": "from sqlalchemy import text\n\nACTIVE_ACCOUNT = text(\"\"\"\n    SELECT id, display_name\n    FROM account\n    WHERE tenant_id = :tenant_id AND id = :account_id AND disabled_at IS NULL\n\"\"\")\n\ndef active_account_row(session, tenant_id: str, account_id: str):\n    return session.execute(\n        ACTIVE_ACCOUNT, {\"tenant_id\": tenant_id, \"account_id\": account_id}\n    ).mappings().one_or_none()\n"
    }
  ]
};
