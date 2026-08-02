window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Safe User-Facing Error Messages with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Map internal failures to a stable API response",
      "language": "python",
      "blurb": "The client receives a correlation identifier and safe message while the diagnostic event remains internal.",
      "code": "from uuid import uuid4\nfrom flask import jsonify\n\ndef safe_internal_error(logger, error: Exception):\n    incident_id = uuid4().hex\n    logger.error(\n        \"request_failed\",\n        extra={\"incident_id\": incident_id, \"exception_type\": type(error).__name__},\n    )\n    return jsonify(error=\"request could not be completed\", incident_id=incident_id), 500\n"
    },
    {
      "title": "Use one authentication failure message",
      "language": "python",
      "blurb": "Unknown accounts and bad credentials produce the same public result so account existence is not disclosed.",
      "code": "from werkzeug.security import check_password_hash\n\nDUMMY_HASH = \"scrypt:32768:8:1$placeholder$5bfeb117\"\n\ndef authenticate(username: str, password: str, load_account):\n    account = load_account(username)\n    expected = account.password_hash if account else DUMMY_HASH\n    valid = check_password_hash(expected, password)\n    if account is None or not valid:\n        raise PermissionError(\"credentials were not accepted\")\n    return account\n"
    }
  ]
};
