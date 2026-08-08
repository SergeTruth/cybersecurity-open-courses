window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Safe User-Facing Error Messages with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Map internal failures to a stable API response",
      "language": "python",
      "blurb": "The client receives a correlation identifier and safe message even if the protected telemetry sink is temporarily unavailable.",
      "code": "from uuid import uuid4\nfrom flask import jsonify\n\ndef record_error_safely(logger, event: str, fields: dict[str, object]) -> bool:\n    try:\n        logger.error(event, extra=fields)\n    except Exception:\n        return False\n    return True\n\ndef safe_internal_error(logger, error: Exception):\n    incident_id = uuid4().hex\n    record_error_safely(\n        logger,\n        \"request_failed\",\n        {\"incident_id\": incident_id, \"exception_type\": type(error).__name__},\n    )\n    return jsonify(error=\"request could not be completed\", incident_id=incident_id), 500\n"
    },
    {
      "title": "Use one authentication failure message",
      "language": "python",
      "blurb": "Unknown accounts and bad credentials produce the same public result so account existence is not disclosed.",
      "code": "import re\n\nfrom werkzeug.security import check_password_hash\n\nDUMMY_HASH = \"scrypt:32768:8:1$placeholder$5bfeb117\"\nUSERNAME = re.compile(r\"[A-Za-z0-9][A-Za-z0-9._-]{0,63}\\Z\")\nMAX_PASSWORD_BYTES = 1_024\nMAX_HASH_BYTES = 512\n\nclass AuthenticationFailed(Exception):\n    pass\n\ndef authenticate(username: str, password: str, load_account):\n    if not isinstance(username, str) or USERNAME.fullmatch(username) is None:\n        raise AuthenticationFailed(\"credentials were not accepted\")\n    if (\n        not isinstance(password, str)\n        or not 1 <= len(password.encode(\"utf-8\")) <= MAX_PASSWORD_BYTES\n        or not callable(load_account)\n    ):\n        raise AuthenticationFailed(\"credentials were not accepted\")\n    account = load_account(username)\n    expected = DUMMY_HASH if account is None else getattr(account, \"password_hash\", None)\n    if (\n        not isinstance(expected, str)\n        or not 1 <= len(expected.encode(\"utf-8\")) <= MAX_HASH_BYTES\n    ):\n        raise AuthenticationFailed(\"credentials were not accepted\")\n    try:\n        valid = check_password_hash(expected, password)\n    except (TypeError, ValueError):\n        valid = False\n    if account is None or valid is not True:\n        raise AuthenticationFailed(\"credentials were not accepted\")\n    return account\n"
    }
  ]
};
