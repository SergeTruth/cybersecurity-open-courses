window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Failure Handling, Logging, Testing, and Monitoring with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Fail closed on certificate errors",
      "language": "python",
      "blurb": "The handler records a bounded operational category and never retries with verification disabled.",
      "code": "import logging\nimport ssl\n\nlog = logging.getLogger(\"outbound_tls\")\n\ndef call_partner(operation):\n    try:\n        return operation()\n    except ssl.SSLCertVerificationError as error:\n        log.warning(\"partner_tls_rejected\", extra={\"reason_code\": error.verify_code})\n        raise RuntimeError(\"partner connection could not be verified\") from None\n"
    },
    {
      "title": "Monitor certificate expiry safely",
      "language": "python",
      "blurb": "The probe reports days remaining and the service name without logging certificate bodies or private material.",
      "code": "from datetime import datetime, timezone\nimport socket\nimport ssl\n\ndef certificate_days_remaining(host: str, port: int = 443) -> int:\n    context = ssl.create_default_context()\n    with socket.create_connection((host, port), timeout=4) as raw:\n        with context.wrap_socket(raw, server_hostname=host) as tls:\n            expires = tls.getpeercert()[\"notAfter\"]\n    deadline = datetime.fromtimestamp(ssl.cert_time_to_seconds(expires), timezone.utc)\n    return (deadline - datetime.now(timezone.utc)).days\n"
    }
  ]
};
