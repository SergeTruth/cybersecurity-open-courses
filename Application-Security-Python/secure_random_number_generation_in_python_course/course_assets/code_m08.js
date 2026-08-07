window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Review, Logging, Monitoring, and Incident Response through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Log token issuance without logging the token",
      "language": "python",
      "blurb": "The audit record carries purpose, entropy class, and outcome only; generated values, digests, salts, nonces, and secret material remain outside logs.",
      "code": "TOKEN_PURPOSES = {\"password_reset\", \"email_verification\", \"session\"}\nTOKEN_OUTCOMES = {\"issued\", \"collision_retry\", \"storage_failure\"}\n\ndef record_token_issuance(logger, purpose: str, entropy_bits: int, outcome: str) -> None:\n    safe_purpose = purpose if isinstance(purpose, str) and purpose in TOKEN_PURPOSES else \"other\"\n    safe_outcome = outcome if isinstance(outcome, str) and outcome in TOKEN_OUTCOMES else \"other\"\n    if type(entropy_bits) is not int or not 0 <= entropy_bits <= 4096:\n        entropy_class = \"unknown\"\n    elif entropy_bits >= 256:\n        entropy_class = \"256_plus\"\n    elif entropy_bits >= 128:\n        entropy_class = \"128_to_255\"\n    else:\n        entropy_class = \"below_policy\"\n    logger.info(\n        \"security_token_issuance\",\n        extra={\"purpose\": safe_purpose, \"entropy_class\": entropy_class, \"outcome\": safe_outcome},\n    )\n"
    },
    {
      "title": "Retry storage collisions without weakening randomness",
      "language": "python",
      "blurb": "A database uniqueness constraint decides collisions, the repository returns True only after durable reservation, and a finite retry count turns repeated conflicts into a controlled failure.",
      "code": "import secrets\n\nclass IdentifierStorageError(RuntimeError):\n    pass\n\nBROAD_COLLISION_ERRORS = {Exception, RuntimeError, ValueError, LookupError, OSError}\n\ndef reserve_public_identifier(repository, collision_error: type[Exception]) -> str:\n    if (\n        not isinstance(collision_error, type)\n        or not issubclass(collision_error, Exception)\n        or collision_error in BROAD_COLLISION_ERRORS\n        or collision_error.__module__ == \"builtins\"\n    ):\n        raise ValueError(\"identifier repository contract rejected\")\n    try:\n        insert = getattr(repository, \"insert_unique_identifier\")\n    except Exception:\n        raise ValueError(\"identifier repository contract rejected\") from None\n    if not callable(insert):\n        raise ValueError(\"identifier repository contract rejected\")\n    for _ in range(5):\n        candidate = secrets.token_urlsafe(18)\n        try:\n            inserted = insert(candidate)\n        except collision_error:\n            continue\n        except Exception:\n            raise IdentifierStorageError(\"identifier storage unavailable\") from None\n        if inserted is True:\n            return candidate\n        raise IdentifierStorageError(\"identifier storage unavailable\")\n    raise IdentifierStorageError(\"identifier collision retry budget exhausted\")\n"
    }
  ]
};
