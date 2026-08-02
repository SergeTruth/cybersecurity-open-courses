window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Monitoring, and Incident Response with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Test a self-contained recursive log redactor",
      "language": "python",
      "blurb": "The listing defines recursive field redaction before capturing structured output and checking that sentinels at nested dictionary and list locations never reach logs.",
      "code": "SENSITIVE_LOG_FIELDS = {\"access_token\", \"api_key\", \"password\", \"refresh_token\", \"secret\", \"token\"}\n\ndef redact_fields(value: object) -> object:\n    if isinstance(value, dict):\n        return {\n            key: \"[REDACTED]\" if key.casefold() in SENSITIVE_LOG_FIELDS else redact_fields(item)\n            for key, item in value.items()\n        }\n    if isinstance(value, list):\n        return [redact_fields(item) for item in value]\n    return value\n\ndef test_nested_credentials_are_redacted(caplog, application_logger):\n    sentinel = \"test-only-password-9f3a\"\n    application_logger.info(\n        \"profile_update\",\n        extra={\"payload\": redact_fields({\"profile\": {\"password\": sentinel}, \"tokens\": [{\"refresh_token\": \"r-123\"}]})},\n    )\n    combined = \"\\n\".join(record.getMessage() + repr(record.__dict__) for record in caplog.records)\n    assert sentinel not in combined\n    assert \"r-123\" not in combined\n"
    },
    {
      "title": "Alert on bounded security-event rates",
      "language": "python",
      "blurb": "The monitor aggregates a finite event name and tenant identifier without using usernames, messages, or payloads as metric dimensions.",
      "code": "def observe_authorization_denial(metrics, tenant_id: str, policy_reason: str) -> None:\n    reasons = {\"missing_scope\", \"wrong_tenant\", \"object_denied\", \"account_disabled\"}\n    metrics.increment(\n        \"authorization_denied\",\n        tags={\n            \"tenant_id\": tenant_id,\n            \"reason\": policy_reason if policy_reason in reasons else \"other\",\n        },\n    )\n"
    }
  ]
};
