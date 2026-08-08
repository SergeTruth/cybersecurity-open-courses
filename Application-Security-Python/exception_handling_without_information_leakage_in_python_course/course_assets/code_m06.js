window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Exception Types, Control Flow, and Safe Handling Patterns with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Catch only an expected business exception",
      "language": "python",
      "blurb": "The transfer maps an insufficient-funds outcome but lets programming errors and infrastructure failures propagate to central handling.",
      "code": "import re\n\nACCOUNT_ID = re.compile(r\"acct_[A-Za-z0-9_-]{8,64}\\Z\")\nMAX_TRANSFER_CENTS = 1_000_000_000\n\nclass InsufficientFunds(Exception):\n    pass\n\ndef transfer_funds(ledger, source: str, target: str, amount: int) -> dict[str, str]:\n    if (\n        not isinstance(source, str)\n        or ACCOUNT_ID.fullmatch(source) is None\n        or not isinstance(target, str)\n        or ACCOUNT_ID.fullmatch(target) is None\n        or source == target\n    ):\n        raise ValueError(\"transfer account identifier rejected\")\n    if type(amount) is not int or not 1 <= amount <= MAX_TRANSFER_CENTS:\n        raise ValueError(\"transfer amount rejected\")\n    transfer = ledger.transfer\n    if not callable(transfer):\n        raise TypeError(\"ledger transfer capability required\")\n    try:\n        transfer(source, target, amount)\n    except InsufficientFunds:\n        return {\"status\": \"declined\", \"reason\": \"insufficient_funds\"}\n    return {\"status\": \"accepted\"}\n"
    },
    {
      "title": "Roll back without masking the original failure",
      "language": "python",
      "blurb": "Work and commit share one failure boundary, so commit failure triggers best-effort rollback without replacing the triggering exception; its outcome remains unknown.",
      "code": "from contextlib import contextmanager\n\ndef record_rollback_failure(logger, error: BaseException) -> None:\n    try:\n        logger.error(\n            \"transaction_rollback_failed\",\n            extra={\"error_type\": type(error).__name__},\n        )\n    except Exception:\n        pass\n\n@contextmanager\ndef transaction(session, logger):\n    try:\n        yield session\n        session.commit()\n    except BaseException:\n        try:\n            session.rollback()\n        except BaseException as rollback_error:\n            record_rollback_failure(logger, rollback_error)\n        raise\n"
    }
  ]
};
