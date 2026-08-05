window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Log Levels, Exceptions, and Error Detail with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Choose log levels from event policy",
      "language": "python",
      "blurb": "A finite event table controls severity and allowed fields; arbitrary caller dictionaries cannot add secrets or inject unregistered dimensions.",
      "code": "import logging\nimport re\n\nOPAQUE_ID = re.compile(r\"[A-Za-z0-9][A-Za-z0-9._-]{0,63}\")\nREASONS = {\"bad_credentials\", \"missing_scope\", \"wrong_tenant\", \"rate_limited\", \"dependency_failed\"}\nEVENT_POLICIES = {\n    \"login_succeeded\": {\n        \"level\": logging.INFO,\n        \"fields\": {\"request_id\", \"subject_id\"},\n    },\n    \"login_rejected\": {\n        \"level\": logging.WARNING,\n        \"fields\": {\"request_id\", \"subject_id\", \"reason\"},\n    },\n    \"authorization_denied\": {\n        \"level\": logging.WARNING,\n        \"fields\": {\"request_id\", \"subject_id\", \"resource_id\", \"reason\"},\n    },\n    \"service_failed\": {\n        \"level\": logging.ERROR,\n        \"fields\": {\"request_id\", \"reason\"},\n    },\n}\n\ndef require_opaque_id(value: object, field_name: str) -> str:\n    if not isinstance(value, str) or OPAQUE_ID.fullmatch(value) is None:\n        raise ValueError(f\"{field_name} must be an opaque bounded identifier\")\n    return value\n\ndef sanitize_security_fields(event_name: str, fields: dict[str, object]) -> dict[str, object]:\n    policy = EVENT_POLICIES[event_name]\n    result: dict[str, object] = {}\n    for field_name in policy[\"fields\"]:\n        if field_name not in fields:\n            continue\n        value = fields[field_name]\n        if field_name.endswith(\"_id\") or field_name == \"request_id\":\n            result[field_name] = require_opaque_id(value, field_name)\n        elif field_name == \"reason\":\n            result[field_name] = value if isinstance(value, str) and value in REASONS else \"other\"\n        else:\n            raise ValueError(\"unhandled security field policy\")\n    return result\n\ndef log_security_event(logger, event_name: str, fields: dict[str, object]) -> None:\n    try:\n        policy = EVENT_POLICIES[event_name]\n    except KeyError:\n        raise ValueError(\"unregistered security event\") from None\n    logger.log(policy[\"level\"], event_name, extra={\"security\": sanitize_security_fields(event_name, fields)})\n"
    },
    {
      "title": "Summarize an exception without its message",
      "language": "python",
      "blurb": "The event records a controlled category and bounded correlation ID but does not copy exception text, arguments, or traceback into a broadly visible log.",
      "code": "import re\n\nOPAQUE_ID = re.compile(r\"[A-Za-z0-9][A-Za-z0-9._-]{0,63}\")\n\ndef exception_summary(error: Exception, correlation_id: str) -> dict[str, str]:\n    if not isinstance(correlation_id, str) or OPAQUE_ID.fullmatch(correlation_id) is None:\n        raise ValueError(\"correlation_id must be an opaque bounded identifier\")\n    if isinstance(error, TimeoutError):\n        category = \"timeout\"\n    elif isinstance(error, PermissionError):\n        category = \"permission_denied\"\n    elif isinstance(error, ValueError):\n        category = \"invalid_value\"\n    else:\n        category = \"internal_error\"\n    return {\"event\": \"operation_failed\", \"category\": category, \"correlation_id\": correlation_id}\n"
    }
  ]
};
