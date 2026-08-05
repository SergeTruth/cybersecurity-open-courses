window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Access Control, Retention, and Privacy with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Authorize access to a log export",
      "language": "python",
      "blurb": "The export service checks a dedicated permission and records only validated opaque identifiers, not exported records, usernames, raw tenant names, or request details.",
      "code": "import re\n\nOPAQUE_ID = re.compile(r\"[A-Za-z0-9][A-Za-z0-9._-]{0,63}\")\n\ndef require_opaque_id(value: object, field_name: str) -> str:\n    if not isinstance(value, str) or OPAQUE_ID.fullmatch(value) is None:\n        raise ValueError(f\"{field_name} must be an opaque bounded identifier\")\n    return value\n\ndef export_logs(subject, query, authorizer, exporter, audit):\n    subject_id = require_opaque_id(subject.id, \"subject_id\")\n    tenant_id = require_opaque_id(query.tenant_id, \"tenant_id\")\n    if not authorizer.allows(subject, \"logs:export\", tenant_id=tenant_id):\n        audit.record(\"log_export_denied\", subject_id=subject_id, tenant_id=tenant_id)\n        raise PermissionError(\"log export not permitted\")\n    result = exporter.create(query, maximum_records=50_000)\n    audit.record(\n        \"log_export_created\",\n        subject_id=subject_id,\n        tenant_id=tenant_id,\n        export_id=require_opaque_id(result.id, \"export_id\"),\n    )\n    return result\n"
    },
    {
      "title": "Select retention by data classification",
      "language": "python",
      "blurb": "A trusted policy maps known event classes to bounded retention; request data cannot choose how long logs persist.",
      "code": "from datetime import timedelta\n\nRETENTION = {\n    \"security_audit\": timedelta(days=365),\n    \"application_error\": timedelta(days=30),\n    \"request_metric\": timedelta(days=14),\n}\n\ndef retention_for(event_class: str) -> timedelta:\n    try:\n        return RETENTION[event_class]\n    except KeyError:\n        raise ValueError(\"unclassified log event\") from None\n"
    }
  ]
};
