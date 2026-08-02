window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Log Levels, Exceptions, and Error Detail with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Choose log levels from event policy",
      "language": "python",
      "blurb": "A finite event table controls severity; an attacker cannot promote messages or inject arbitrary level names.",
      "code": "import logging\n\nEVENT_LEVELS = {\n    \"login_succeeded\": logging.INFO,\n    \"login_rejected\": logging.WARNING,\n    \"authorization_denied\": logging.WARNING,\n    \"service_failed\": logging.ERROR,\n}\n\ndef log_security_event(logger, event_name: str, fields: dict[str, object]) -> None:\n    try:\n        level = EVENT_LEVELS[event_name]\n    except KeyError:\n        raise ValueError(\"unregistered security event\") from None\n    logger.log(level, event_name, extra={\"security\": fields})\n"
    },
    {
      "title": "Summarize an exception without its message",
      "language": "python",
      "blurb": "The event records a controlled category and correlation ID but does not copy exception text, arguments, or traceback into a broadly visible log.",
      "code": "def exception_summary(error: Exception, correlation_id: str) -> dict[str, str]:\n    if isinstance(error, TimeoutError):\n        category = \"timeout\"\n    elif isinstance(error, PermissionError):\n        category = \"permission_denied\"\n    elif isinstance(error, ValueError):\n        category = \"invalid_value\"\n    else:\n        category = \"internal_error\"\n    return {\"event\": \"operation_failed\", \"category\": category, \"correlation_id\": correlation_id}\n"
    }
  ]
};
