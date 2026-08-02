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
      "title": "Roll back a transaction before translating failure",
      "language": "python",
      "blurb": "The context manager preserves the original exception, guarantees rollback, and commits only after the protected operation succeeds.",
      "code": "from contextlib import contextmanager\n\n@contextmanager\ndef transaction(session):\n    try:\n        yield session\n    except BaseException:\n        session.rollback()\n        raise\n    else:\n        session.commit()\n"
    }
  ]
};
