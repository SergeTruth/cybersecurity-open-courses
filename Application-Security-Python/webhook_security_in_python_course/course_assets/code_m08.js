window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Logging, Monitoring, and Incident Response through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Log webhook decisions without payloads or signatures",
      "language": "python",
      "blurb": "The audit event records finite verification and processing outcomes plus opaque identifiers, excluding request bodies, secret keys, signature values, and arbitrary headers.",
      "code": "import re\n\nWEBHOOK_STAGES = {\n    \"transport\", \"signature\", \"freshness\", \"schema\", \"authorization\", \"processing\",\n}\nWEBHOOK_OUTCOMES = {\"accepted\", \"rejected\", \"duplicate\", \"queued\", \"failed\"}\nEVENT_ID = re.compile(r\"evt_[A-Za-z0-9_-]{16,80}\")\n\ndef record_webhook_decision(\n    logger,\n    metrics,\n    event_id: str,\n    stage: str,\n    outcome: str,\n) -> None:\n    if type(event_id) is not str or EVENT_ID.fullmatch(event_id) is None:\n        raise ValueError(\"webhook event identifier rejected\")\n    safe_stage = (\n        stage\n        if type(stage) is str and stage in WEBHOOK_STAGES\n        else \"other\"\n    )\n    safe_outcome = (\n        outcome\n        if type(outcome) is str and outcome in WEBHOOK_OUTCOMES\n        else \"other\"\n    )\n    logger.info(\n        \"webhook_decision\",\n        extra={\n            \"event_id\": event_id,\n            \"stage\": safe_stage,\n            \"outcome\": safe_outcome,\n        },\n    )\n    metrics.increment(\n        \"webhook_decisions\",\n        tags={\"stage\": safe_stage, \"outcome\": safe_outcome},\n    )\n"
    },
    {
      "title": "Integration-test security helpers from a larger project",
      "language": "python",
      "blurb": "This listing is explicitly a larger-project integration test: the imported module supplies HMAC freshness verification and the durable replay-state implementation exercised by the fixture.",
      "code": "from datetime import datetime, timezone\nimport hashlib\nimport hmac\nimport pytest\nfrom webhook_service.security import (\n    ReplayState,\n    begin_webhook_event,\n    finish_webhook_event,\n    verify_hmac_webhook,\n)\n\ndef test_webhook_envelope_and_retry_state(replay_store) -> None:\n    now = datetime(2026, 1, 1, tzinfo=timezone.utc)\n    timestamp = int(now.timestamp())\n    body = b'{\"event_id\":\"evt_abcdefghijklmnop\"}'\n    key = b\"k\" * 32\n    signature = hmac.new(key, str(timestamp).encode() + b\".\" + body, hashlib.sha256).hexdigest()\n    verify_hmac_webhook(body, timestamp, signature, key, now)\n    lease = begin_webhook_event(replay_store, \"int_partner01\", \"evt_abcdefghijklmnop\", timestamp)\n    finish_webhook_event(replay_store, lease, ReplayState.RETRYABLE_FAILURE)\n    retry_lease = begin_webhook_event(replay_store, \"int_partner01\", \"evt_abcdefghijklmnop\", timestamp)\n    finish_webhook_event(replay_store, retry_lease, ReplayState.APPLIED)\n    with pytest.raises(PermissionError):\n        begin_webhook_event(replay_store, \"int_partner01\", \"evt_abcdefghijklmnop\", timestamp)\n    with pytest.raises(PermissionError):\n        verify_hmac_webhook(body, timestamp - 301, signature, key, now)\n"
    }
  ]
};
