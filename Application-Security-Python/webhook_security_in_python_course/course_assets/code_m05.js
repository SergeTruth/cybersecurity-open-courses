window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Replay Resistance, Freshness, and Idempotency through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Track replay state through retryable processing",
      "language": "python",
      "blurb": "An atomic store key includes integration and event identity; processing, applied, retryable-failure, and permanently-rejected states distinguish concurrent replay from a legitimate retry.",
      "code": "from dataclasses import dataclass\nfrom enum import Enum\nimport re\n\nEVENT_ID = re.compile(r\"evt_[A-Za-z0-9_-]{16,80}\")\nINTEGRATION_ID = re.compile(r\"int_[A-Za-z0-9_-]{8,40}\")\n\nclass ReplayState(Enum):\n    PROCESSING = \"processing\"\n    APPLIED = \"applied\"\n    RETRYABLE_FAILURE = \"retryable_failure\"\n    PERMANENTLY_REJECTED = \"permanently_rejected\"\n\n@dataclass(frozen=True)\nclass ReplayLease:\n    key: str\n    token: str\n\ndef begin_webhook_event(store, integration_id: str, event_id: str, timestamp: int) -> ReplayLease:\n    if INTEGRATION_ID.fullmatch(integration_id) is None or EVENT_ID.fullmatch(event_id) is None:\n        raise ValueError(\"webhook replay identity rejected\")\n    if type(timestamp) is not int:\n        raise ValueError(\"webhook timestamp rejected\")\n    key = f\"webhook-replay:{integration_id}:{event_id}\"\n    result = store.begin_or_resume(\n        key=key,\n        authenticated_timestamp=timestamp,\n        initial_state=ReplayState.PROCESSING.value,\n        resume_from={ReplayState.RETRYABLE_FAILURE.value},\n        expires_in_seconds=24 * 60 * 60,\n    )\n    if result.status not in {\"reserved\", \"resumed\"}:\n        raise PermissionError(\"concurrent or completed webhook replay rejected\")\n    return ReplayLease(key, result.lease_token)\n\ndef finish_webhook_event(store, lease: ReplayLease, outcome: ReplayState) -> None:\n    if outcome not in {\n        ReplayState.APPLIED,\n        ReplayState.RETRYABLE_FAILURE,\n        ReplayState.PERMANENTLY_REJECTED,\n    }:\n        raise ValueError(\"terminal webhook replay state rejected\")\n    store.transition(\n        key=lease.key,\n        lease_token=lease.token,\n        expected_state=ReplayState.PROCESSING.value,\n        new_state=outcome.value,\n    )\n"
    },
    {
      "title": "Make webhook application idempotent in one transaction",
      "language": "python",
      "blurb": "A unique event insert and the business state change commit together, so retries report the prior result instead of applying the effect twice.",
      "code": "def apply_payment_event(connection, event_id: str, payment_id: str, status: str) -> str:\n    if status not in {\"settled\", \"failed\"}:\n        raise ValueError(\"payment status rejected\")\n    with connection.transaction():\n        inserted = connection.execute(\n            \"insert into processed_webhook (event_id) values (%s) on conflict do nothing returning event_id\",\n            (event_id,),\n        ).fetchone()\n        if inserted is None:\n            return \"already_processed\"\n        updated = connection.execute(\n            \"update payments set status = %s where public_id = %s and status = 'pending'\",\n            (status, payment_id),\n        )\n        if updated.rowcount != 1:\n            raise ValueError(\"payment transition rejected\")\n    return \"applied\"\n"
    }
  ]
};
