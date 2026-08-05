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
      "blurb": "The server records a bounded traceback summary when possible, while telemetry failure cannot replace the stable service-unavailable result.",
      "code": "import logging\nimport traceback\nfrom pathlib import Path\n\nlog = logging.getLogger(\"worker\")\n\ndef traceback_summary(error: BaseException) -> list[dict[str, object]]:\n    frames = traceback.extract_tb(error.__traceback__)[-8:]\n    return [\n        {\n            \"file\": Path(frame.filename).name[:120],\n            \"line\": frame.lineno,\n            \"function\": frame.name[:80],\n        }\n        for frame in frames\n    ]\n\ndef record_failure_safely(error: BaseException) -> bool:\n    try:\n        log.error(\n            \"worker_operation_failed\",\n            extra={\n                \"exception_type\": type(error).__name__,\n                \"traceback\": traceback_summary(error),\n            },\n        )\n    except Exception:\n        return False\n    return True\n\ndef perform_work(operation):\n    try:\n        return operation()\n    except Exception as error:\n        record_failure_safely(error)\n        raise RuntimeError(\"operation unavailable\") from None\n"
    }
  ]
};
