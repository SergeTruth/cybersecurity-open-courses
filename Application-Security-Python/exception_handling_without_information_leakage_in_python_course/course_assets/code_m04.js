window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Tracebacks, Debug Mode, and Environment Separation with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Refuse debug mode in production",
      "language": "python",
      "blurb": "Configuration validation prevents a deployment flag from exposing interactive tracebacks on a production service.",
      "code": "def validate_debug_setting(environment: str, debug: bool) -> None:\n    if environment == \"production\" and debug:\n        raise RuntimeError(\"debug mode is forbidden in production\")\n    if environment not in {\"development\", \"test\", \"production\"}:\n        raise ValueError(\"unknown application environment\")\n"
    },
    {
      "title": "Keep traceback detail in a restricted sink",
      "language": "python",
      "blurb": "The exception is recorded by the server logger while the caller sees only a stable service-unavailable response.",
      "code": "import logging\n\nlog = logging.getLogger(\"worker\")\n\ndef perform_work(operation):\n    try:\n        return operation()\n    except Exception:\n        log.exception(\"worker_operation_failed\")\n        raise RuntimeError(\"operation unavailable\") from None\n"
    }
  ]
};
