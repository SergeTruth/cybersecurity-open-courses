window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply APIs, Background Jobs, and Third-Party Failures with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Map downstream timeouts without echoing details",
      "language": "python",
      "blurb": "A third-party timeout becomes a bounded service error and an internal metric instead of a raw upstream response.",
      "code": "import requests\n\nclass DependencyUnavailable(Exception):\n    pass\n\ndef fetch_risk_score(session: requests.Session, customer_id: str, metrics):\n    try:\n        response = session.get(\n            \"https://risk.example/v1/scores\", params={\"customer\": customer_id}, timeout=(2, 4)\n        )\n        response.raise_for_status()\n        return response.json()\n    except (requests.Timeout, requests.ConnectionError):\n        metrics.increment(\"risk_dependency_unavailable\")\n        raise DependencyUnavailable(\"risk service unavailable\") from None\n"
    },
    {
      "title": "Record a failed background job safely",
      "language": "python",
      "blurb": "The job store receives a bounded failure code and retry time, while exception text remains in protected telemetry.",
      "code": "from datetime import datetime, timedelta, timezone\n\ndef fail_job(job, error: Exception, attempts: int, logger) -> None:\n    logger.error(\"job_failed\", extra={\"job_id\": job.id, \"error_type\": type(error).__name__})\n    job.status = \"failed\" if attempts >= 3 else \"retry_scheduled\"\n    job.failure_code = \"processing_error\"\n    job.retry_at = None if attempts >= 3 else datetime.now(timezone.utc) + timedelta(minutes=5)\n    job.save()\n"
    }
  ]
};
