window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Structured Logging and Event Design with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Emit a typed structured event",
      "language": "python",
      "blurb": "A dataclass creates a stable schema, while finite event names, bounded identifiers, and fixed outcomes prevent arbitrary values from becoming log structure.",
      "code": "from dataclasses import asdict, dataclass\nfrom datetime import datetime, timezone\nimport re\n\nAUDIT_EVENT_NAMES = {\n    \"admin_setting_changed\", \"permission_denied\", \"export_created\",\n    \"job_failed\", \"record_updated\",\n}\nAUDIT_OUTCOMES = {\"success\", \"denied\", \"failed\"}\nOPAQUE_ID = re.compile(r\"[A-Za-z0-9][A-Za-z0-9._-]{0,63}\")\n\n@dataclass(frozen=True)\nclass AuditEvent:\n    name: str\n    actor_id: str\n    resource_id: str\n    outcome: str\n\ndef require_opaque_id(value: str, field_name: str) -> str:\n    if not isinstance(value, str) or OPAQUE_ID.fullmatch(value) is None:\n        raise ValueError(f\"{field_name} must be an opaque bounded identifier\")\n    return value\n\ndef write_audit_event(logger, event: AuditEvent) -> None:\n    if event.name not in AUDIT_EVENT_NAMES:\n        raise ValueError(\"unregistered audit event\")\n    if event.outcome not in AUDIT_OUTCOMES:\n        raise ValueError(\"unknown audit outcome\")\n    payload = asdict(event)\n    payload[\"actor_id\"] = require_opaque_id(event.actor_id, \"actor_id\")\n    payload[\"resource_id\"] = require_opaque_id(event.resource_id, \"resource_id\")\n    payload[\"recorded_at\"] = datetime.now(timezone.utc).isoformat()\n    logger.info(event.name, extra={\"audit\": payload})\n"
    },
    {
      "title": "Validate a correlation identifier",
      "language": "python",
      "blurb": "Only bounded application-generated identifiers enter structured logs, preventing arbitrary header content from becoming a log field.",
      "code": "from uuid import UUID, uuid4\n\ndef request_correlation_id(supplied: str | None) -> str:\n    if supplied is not None:\n        try:\n            parsed = UUID(supplied)\n            if parsed.version == 4:\n                return str(parsed)\n        except ValueError:\n            pass\n    return str(uuid4())\n"
    }
  ]
};
