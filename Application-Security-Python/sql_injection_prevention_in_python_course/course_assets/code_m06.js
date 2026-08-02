window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Input Validation, Authorization, and Least Privilege through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Combine input validation with tenant authorization",
      "language": "python",
      "blurb": "Validation constrains the identifier grammar, while the SQL predicate independently enforces tenant and subject ownership before an update.",
      "code": "import re\n\nDOCUMENT_ID = re.compile(r\"doc-[0-9a-f]{16}\")\n\ndef rename_document(connection, *, tenant_id: str, user_id: str, document_id: str, title: str) -> bool:\n    if DOCUMENT_ID.fullmatch(document_id) is None or not 1 <= len(title.strip()) <= 120:\n        raise ValueError(\"document update rejected\")\n    cursor = connection.execute(\n        \"update documents set title = %s where id = %s and tenant_id = %s and owner_id = %s\",\n        (title.strip(), document_id, tenant_id, user_id),\n    )\n    return cursor.rowcount == 1\n"
    },
    {
      "title": "Reject unknown update fields and validate every value",
      "language": "python",
      "blurb": "An exact operation schema fails on unexpected fields and applies type, range, and format rules before any values reach the parameterized update.",
      "code": "def validated_account_update(document: object) -> tuple[str, str]:\n    if not isinstance(document, dict) or set(document) != {\"display_name\", \"timezone\"}:\n        raise ValueError(\"account update shape rejected\")\n    name, timezone = document[\"display_name\"], document[\"timezone\"]\n    if not isinstance(name, str) or not 1 <= len(name.strip()) <= 80:\n        raise ValueError(\"display name rejected\")\n    if timezone not in {\"UTC\", \"America/New_York\", \"America/Chicago\", \"America/Los_Angeles\"}:\n        raise ValueError(\"timezone rejected\")\n    return name.strip(), timezone\n\ndef update_account(connection, account_id: str, document: object) -> None:\n    name, timezone = validated_account_update(document)\n    connection.execute(\n        \"update accounts set display_name = %s, timezone = %s where id = %s\",\n        (name, timezone, account_id),\n    )\n"
    }
  ]
};
