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
      "blurb": "A database uniqueness constraint decides collisions, generation remains cryptographic on every attempt, and a finite retry count turns repeated conflicts into a controlled failure.",
      "code": "import secrets\n\ndef reserve_public_identifier(repository) -> str:\n    for _ in range(5):\n        candidate = secrets.token_urlsafe(18)\n        try:\n            repository.insert_unique_identifier(candidate)\n        except repository.UniqueViolation:\n            continue\n        return candidate\n    raise RuntimeError(\"identifier collision retry budget exhausted\")\n"
    }
  ]
};
