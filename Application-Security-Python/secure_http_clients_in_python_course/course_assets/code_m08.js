window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Resilience, Logging, Testing, and Monitoring through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Retry only bounded idempotent HTTP operations",
      "language": "python",
      "blurb": "The adapter retries GET requests for a finite set of transient statuses with backoff while leaving writes outside automatic replay behavior.",
      "code": "import requests\nfrom requests.adapters import HTTPAdapter\nfrom urllib3.util.retry import Retry\n\ndef resilient_read_session() -> requests.Session:\n    retry = Retry(\n        total=3,\n        connect=2,\n        read=2,\n        status=2,\n        backoff_factor=0.2,\n        status_forcelist={429, 502, 503, 504},\n        allowed_methods={\"GET\"},\n        respect_retry_after_header=True,\n    )\n    session = requests.Session()\n    session.mount(\"https://\", HTTPAdapter(max_retries=retry, pool_connections=4, pool_maxsize=8))\n    return session\n"
    },
    {
      "title": "Record bounded outbound-request telemetry",
      "language": "python",
      "blurb": "Metrics use an operation identifier and finite outcome category; URLs, query strings, credentials, response bodies, and raw exception messages never become dimensions.",
      "code": "HTTP_OUTCOMES = {\"success\", \"timeout\", \"tls_rejected\", \"invalid_response\", \"unavailable\"}\n\ndef record_http_result(logger, metrics, operation: str, outcome: str, elapsed_ms: int) -> None:\n    operations = {\"account_lookup\", \"health_check\", \"token_exchange\"}\n    safe_operation = operation if operation in operations else \"other\"\n    safe_outcome = outcome if outcome in HTTP_OUTCOMES else \"other\"\n    duration = min(max(elapsed_ms, 0), 60_000)\n    logger.info(\n        \"outbound_http_result\",\n        extra={\"operation\": safe_operation, \"outcome\": safe_outcome, \"elapsed_ms\": duration},\n    )\n    metrics.increment(\"outbound_http_requests\", tags={\"operation\": safe_operation, \"outcome\": safe_outcome})\n"
    }
  ]
};
