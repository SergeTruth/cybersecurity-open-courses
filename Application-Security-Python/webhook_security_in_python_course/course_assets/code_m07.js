window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Processing Patterns, Queues, and Reliability through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Publish authenticated webhooks to a durable queue",
      "language": "python",
      "blurb": "The endpoint acknowledges only after a bounded, persistent queue publish succeeds, and the message contains validated identifiers rather than the signature or secret.",
      "code": "from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass WebhookJob:\n    event_id: str\n    event_type: str\n    integration_id: str\n\ndef enqueue_webhook(queue, event: dict[str, object], integration_id: str) -> tuple[str, int]:\n    job = WebhookJob(str(event[\"event_id\"]), str(event[\"type\"]), integration_id)\n    receipt = queue.publish(job, persistent=True, timeout=2.0)\n    if not receipt.confirmed:\n        raise RuntimeError(\"durable webhook publish unconfirmed\")\n    return \"accepted\", 202\n"
    },
    {
      "title": "Claim and retry webhook jobs transactionally",
      "language": "python",
      "blurb": "A worker acquires one due job with a database lock, records bounded attempts, and moves exhausted work to a dead-letter state without concurrent double processing.",
      "code": "def claim_webhook_job(connection, worker_id: str):\n    with connection.transaction():\n        job = connection.execute(\n            \"select id, attempt from webhook_jobs where status = 'queued' and available_at <= now() \"\n            \"order by available_at for update skip locked limit 1\"\n        ).fetchone()\n        if job is None:\n            return None\n        job_id, attempt = job\n        next_status = \"dead_letter\" if attempt >= 5 else \"processing\"\n        connection.execute(\n            \"update webhook_jobs set status = %s, worker_id = %s, attempt = attempt + 1 where id = %s\",\n            (next_status, worker_id, job_id),\n        )\n        return job_id, next_status\n"
    }
  ]
};
