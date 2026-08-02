window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Least Privilege and Environment Separation through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Keep runtime and migration identities separate",
      "language": "python",
      "blurb": "Each operation class maps to one application-owned database role, preventing a web process from silently borrowing schema-change authority.",
      "code": "from enum import Enum\n\nclass DatabasePurpose(Enum):\n    RUNTIME = \"runtime\"\n    MIGRATION = \"migration\"\n    REPORTING = \"reporting\"\n\nROLE_REFERENCES = {\n    DatabasePurpose.RUNTIME: \"vault://production/orders/runtime\",\n    DatabasePurpose.MIGRATION: \"vault://deployment/orders/migration\",\n    DatabasePurpose.REPORTING: \"vault://production/orders/reporting-readonly\",\n}\n\ndef role_reference(purpose: DatabasePurpose, *, deployment_job: bool) -> str:\n    if purpose is DatabasePurpose.MIGRATION and not deployment_job:\n        raise PermissionError(\"migration identity restricted to deployment jobs\")\n    return ROLE_REFERENCES[purpose]\n"
    },
    {
      "title": "Verify the runtime role's direct table grants",
      "language": "python",
      "blurb": "This check covers only direct grants on the orders table; deployment policy must separately reject superuser status, role administration, memberships, PUBLIC access, and non-table privileges.",
      "code": "REQUIRED_DIRECT_TABLE_GRANTS = {\n    (\"orders\", \"SELECT\"),\n    (\"orders\", \"INSERT\"),\n    (\"orders\", \"UPDATE\"),\n}\n\ndef verify_direct_table_grants(connection) -> None:\n    rows = connection.execute(\n        \"select table_name, privilege_type from information_schema.role_table_grants \"\n        \"where grantee = current_user and table_schema = 'public' and table_name = 'orders'\"\n    ).fetchall()\n    actual = {(row[0], row[1]) for row in rows}\n    if actual != REQUIRED_DIRECT_TABLE_GRANTS:\n        raise PermissionError(\"runtime direct table grants differ from policy\")\n"
    }
  ]
};
