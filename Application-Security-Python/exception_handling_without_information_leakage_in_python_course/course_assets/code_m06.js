window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Exception Types, Control Flow, and Safe Handling Patterns with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Catch only an expected business exception",
      "language": "python",
      "blurb": "The transfer maps an insufficient-funds outcome but lets programming errors and infrastructure failures propagate to central handling.",
      "code": "class InsufficientFunds(Exception):\n    pass\n\ndef transfer_funds(ledger, source: str, target: str, amount: int) -> dict[str, str]:\n    try:\n        ledger.transfer(source, target, amount)\n    except InsufficientFunds:\n        return {\"status\": \"declined\", \"reason\": \"insufficient_funds\"}\n    return {\"status\": \"accepted\"}\n"
    },
    {
      "title": "Roll back without masking the original failure",
      "language": "python",
      "blurb": "The context manager attempts rollback and records a bounded rollback failure without replacing the original exception.",
      "code": "from contextlib import contextmanager\n\n@contextmanager\ndef transaction(session, logger):\n    try:\n        yield session\n    except BaseException:\n        try:\n            session.rollback()\n        except Exception as rollback_error:\n            try:\n                logger.error(\n                    \"transaction_rollback_failed\",\n                    extra={\"error_type\": type(rollback_error).__name__},\n                )\n            except Exception:\n                pass\n        raise\n    else:\n        session.commit()\n"
    }
  ]
};
