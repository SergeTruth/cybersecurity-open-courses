window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Structured Logging and Event Design with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Emit a typed structured event",
      "language": "python",
      "blurb": "A dataclass creates a stable schema and serializes only declared fields rather than arbitrary local variables.",
      "code": "from dataclasses import asdict, dataclass\nfrom datetime import datetime, timezone\n\n@dataclass(frozen=True)\nclass AuditEvent:\n    name: str\n    actor_id: str\n    resource_id: str\n    outcome: str\n\ndef write_audit_event(logger, event: AuditEvent) -> None:\n    payload = asdict(event)\n    payload[\"recorded_at\"] = datetime.now(timezone.utc).isoformat()\n    logger.info(event.name, extra={\"audit\": payload})\n"
    },
    {
      "title": "Validate a correlation identifier",
      "language": "python",
      "blurb": "Only bounded application-generated identifiers enter structured logs, preventing arbitrary header content from becoming a log field.",
      "code": "from uuid import UUID, uuid4\n\ndef request_correlation_id(supplied: str | None) -> str:\n    if supplied is not None:\n        try:\n            parsed = UUID(supplied)\n            if parsed.version == 4:\n                return str(parsed)\n        except ValueError:\n            pass\n    return str(uuid4())\n"
    }
  ]
};
