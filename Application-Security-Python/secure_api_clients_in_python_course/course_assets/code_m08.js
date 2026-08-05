window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply SDKs, Dependencies, Testing, Logging, and Monitoring with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Wrap an SDK behind an application boundary",
      "language": "python",
      "blurb": "The adapter exposes only one approved operation and validates SDK result shape before returning a domain value.",
      "code": "from dataclasses import dataclass\nimport re\n\nDELIVERY_ID = re.compile(r\"del_[A-Za-z0-9]{1,60}\\Z\")\n\nclass DeliveryServiceError(Exception):\n    pass\n\n@dataclass(frozen=True)\nclass DeliveryReceipt:\n    identifier: str\n    state: str\n\ndef validated_delivery_id(value: object) -> str:\n    if not isinstance(value, str) or not DELIVERY_ID.fullmatch(value):\n        raise ValueError(\"delivery identifier rejected\")\n    return value\n\ndef sdk_field(raw: object, name: str) -> object:\n    if isinstance(raw, dict):\n        return raw.get(name)\n    return getattr(raw, name, None)\n\nclass DeliveryClient:\n    def __init__(self, sdk): self._sdk = sdk\n\n    def status(self, delivery_id: str) -> DeliveryReceipt:\n        request_id = validated_delivery_id(delivery_id)\n        try:\n            raw = self._sdk.deliveries.retrieve(request_id)\n            identifier = sdk_field(raw, \"id\")\n            state = sdk_field(raw, \"status\")\n        except Exception:\n            raise DeliveryServiceError(\"delivery status lookup failed\") from None\n        if not isinstance(state, str) or state not in {\"queued\", \"sent\", \"failed\"}:\n            raise ValueError(\"SDK returned an unknown delivery state\")\n        return DeliveryReceipt(identifier=validated_delivery_id(identifier), state=state)\n"
    },
    {
      "title": "Log API outcomes without credentials or bodies",
      "language": "python",
      "blurb": "Telemetry records a fixed operation, status class, latency bucket, and correlation identifier without request or response data.",
      "code": "import re\n\nREQUEST_ID = re.compile(r\"req_[A-Za-z0-9_-]{8,80}\\Z\")\n\ndef record_api_call(logger, *, operation: str, status: int, elapsed_ms: int, request_id: str) -> None:\n    operations = {\"inventory_lookup\", \"payment_create\", \"delivery_status\"}\n    if not isinstance(operation, str) or operation not in operations:\n        raise ValueError(\"unregistered API operation\")\n    if type(status) is not int or not 100 <= status <= 599:\n        raise ValueError(\"HTTP status rejected\")\n    if type(elapsed_ms) is not int or not 0 <= elapsed_ms <= 600_000:\n        raise ValueError(\"elapsed time rejected\")\n    if not isinstance(request_id, str) or not REQUEST_ID.fullmatch(request_id):\n        raise ValueError(\"request identifier rejected\")\n    logger.info(\n        \"outbound_api_call\",\n        extra={\n            \"operation\": operation,\n            \"status_class\": f\"{status // 100}xx\",\n            \"latency_bucket\": \"slow\" if elapsed_ms > 1000 else \"normal\",\n            \"request_id\": request_id,\n        },\n    )\n"
    }
  ]
};
