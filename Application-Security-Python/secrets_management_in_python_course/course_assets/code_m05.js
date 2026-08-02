window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Access Control and Least Privilege with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Authorize access by workload identity",
      "language": "python",
      "blurb": "The broker checks a workload-to-secret policy rather than accepting arbitrary secret names from the caller.",
      "code": "SECRET_GRANTS = {\n    \"invoice-worker\": frozenset({\"billing/database\"}),\n    \"mailer\": frozenset({\"notifications/smtp\"}),\n}\n\ndef authorize_secret(workload: str, secret_name: str) -> None:\n    if secret_name not in SECRET_GRANTS.get(workload, frozenset()):\n        raise PermissionError(\"workload is not allowed to read this secret\")\n"
    },
    {
      "title": "Issue narrow database credentials",
      "language": "python",
      "blurb": "A request to the credential broker carries a reviewed role and short lifetime instead of returning a shared administrator password.",
      "code": "from datetime import timedelta\n\nAPPROVED_DATABASE_ROLES = {\"orders-reader\", \"orders-writer\"}\n\ndef request_database_credential(broker, workload_id: str, role: str):\n    if role not in APPROVED_DATABASE_ROLES:\n        raise ValueError(\"database role is not approved\")\n    return broker.issue_database_credential(\n        subject=workload_id,\n        role=role,\n        lifetime=timedelta(minutes=15),\n    )\n"
    }
  ]
};
