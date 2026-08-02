window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Access Control, Retention, and Privacy with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Authorize access to a log export",
      "language": "python",
      "blurb": "The export service checks a dedicated permission and records the request without placing the exported records in the audit event.",
      "code": "def export_logs(subject, query, authorizer, exporter, audit):\n    if not authorizer.allows(subject, \"logs:export\", tenant_id=query.tenant_id):\n        audit.record(\"log_export_denied\", subject_id=subject.id, tenant_id=query.tenant_id)\n        raise PermissionError(\"log export not permitted\")\n    result = exporter.create(query, maximum_records=50_000)\n    audit.record(\"log_export_created\", subject_id=subject.id, export_id=result.id)\n    return result\n"
    },
    {
      "title": "Select retention by data classification",
      "language": "python",
      "blurb": "A trusted policy maps known event classes to bounded retention; request data cannot choose how long logs persist.",
      "code": "from datetime import timedelta\n\nRETENTION = {\n    \"security_audit\": timedelta(days=365),\n    \"application_error\": timedelta(days=30),\n    \"request_metric\": timedelta(days=14),\n}\n\ndef retention_for(event_class: str) -> timedelta:\n    try:\n        return RETENTION[event_class]\n    except KeyError:\n        raise ValueError(\"unclassified log event\") from None\n"
    }
  ]
};
