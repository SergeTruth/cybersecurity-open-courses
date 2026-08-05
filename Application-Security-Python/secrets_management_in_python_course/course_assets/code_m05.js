window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Access Control and Least Privilege with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Authorize access by workload identity",
      "language": "python",
      "blurb": "The broker validates workload and secret identifiers, then checks workload-to-secret policy instead of accepting arbitrary secret names from the caller.",
      "code": "SECRET_GRANTS = {\n    \"invoice-worker\": frozenset({\"billing/database\"}),\n    \"mailer\": frozenset({\"notifications/smtp\"}),\n}\n\ndef authorize_secret(workload: str, secret_name: str) -> None:\n    if not isinstance(workload, str) or not isinstance(secret_name, str):\n        raise PermissionError(\"workload is not allowed to read this secret\")\n    allowed_secrets = SECRET_GRANTS.get(workload)\n    if allowed_secrets is None or secret_name not in allowed_secrets:\n        raise PermissionError(\"workload is not allowed to read this secret\")\n"
    },
    {
      "title": "Issue narrow database credentials",
      "language": "python",
      "blurb": "A request to the credential broker carries a reviewed workload identity, approved role, and short lifetime instead of returning a shared administrator password.",
      "code": "from datetime import timedelta\n\nDATABASE_CREDENTIAL_GRANTS = {\n    \"orders-api\": frozenset({\"orders-reader\", \"orders-writer\"}),\n    \"invoice-worker\": frozenset({\"orders-writer\"}),\n}\n\ndef request_database_credential(broker, workload_id: str, role: str):\n    if not isinstance(workload_id, str) or workload_id not in DATABASE_CREDENTIAL_GRANTS:\n        raise PermissionError(\"workload identity is not approved\")\n    if not isinstance(role, str) or role not in DATABASE_CREDENTIAL_GRANTS[workload_id]:\n        raise ValueError(\"database role is not approved for this workload\")\n    return broker.issue_database_credential(\n        subject=workload_id,\n        role=role,\n        lifetime=timedelta(minutes=15),\n    )\n"
    }
  ]
};
