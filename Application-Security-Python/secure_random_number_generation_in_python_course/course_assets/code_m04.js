window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Tokens, Reset Links, and Session Identifiers through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Issue a high-entropy reset token",
      "language": "python",
      "blurb": "Thirty-two operating-system random bytes provide a documented 256-bit token before URL-safe encoding; no four-byte authentication default is available.",
      "code": "import secrets\n\nRESET_TOKEN_BYTES = 32\n\ndef new_reset_token() -> str:\n    return secrets.token_urlsafe(RESET_TOKEN_BYTES)\n"
    },
    {
      "title": "Store only a digest of a reset token",
      "language": "python",
      "blurb": "The raw token is returned once, while a domain-separated SHA-256 digest supports constant-time lookup comparison without retaining the bearer credential.",
      "code": "import hashlib\nimport hmac\nimport secrets\n\ndef issue_reset_credential() -> tuple[str, bytes]:\n    token = secrets.token_urlsafe(32)\n    digest = hashlib.sha256(b\"password-reset\\x00\" + token.encode(\"ascii\")).digest()\n    return token, digest\n\ndef reset_token_matches(presented: str, stored_digest: bytes) -> bool:\n    if len(stored_digest) != hashlib.sha256().digest_size:\n        return False\n    try:\n        encoded = presented.encode(\"ascii\", \"strict\")\n    except UnicodeEncodeError:\n        return False\n    candidate = hashlib.sha256(b\"password-reset\\x00\" + encoded).digest()\n    return hmac.compare_digest(candidate, stored_digest)\n"
    }
  ]
};
