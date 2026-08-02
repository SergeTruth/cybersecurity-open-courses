window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply SDKs, Dependencies, Testing, Logging, and Monitoring with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Wrap an SDK behind an application boundary",
      "language": "python",
      "blurb": "The adapter exposes only one approved operation and validates the SDK result before returning a domain value.",
      "code": "from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass DeliveryReceipt:\n    identifier: str\n    state: str\n\nclass DeliveryClient:\n    def __init__(self, sdk): self._sdk = sdk\n\n    def status(self, delivery_id: str) -> DeliveryReceipt:\n        raw = self._sdk.deliveries.retrieve(delivery_id)\n        if raw.status not in {\"queued\", \"sent\", \"failed\"}:\n            raise ValueError(\"SDK returned an unknown delivery state\")\n        return DeliveryReceipt(identifier=str(raw.id), state=raw.status)\n"
    },
    {
      "title": "Log API outcomes without credentials or bodies",
      "language": "python",
      "blurb": "Telemetry records a fixed operation, status class, latency bucket, and correlation identifier without request or response data.",
      "code": "def record_api_call(logger, *, operation: str, status: int, elapsed_ms: int, request_id: str) -> None:\n    operations = {\"inventory_lookup\", \"payment_create\", \"delivery_status\"}\n    if operation not in operations:\n        raise ValueError(\"unregistered API operation\")\n    logger.info(\n        \"outbound_api_call\",\n        extra={\n            \"operation\": operation,\n            \"status_class\": f\"{status // 100}xx\",\n            \"latency_bucket\": \"slow\" if elapsed_ms > 1000 else \"normal\",\n            \"request_id\": request_id,\n        },\n    )\n"
    }
  ]
};
