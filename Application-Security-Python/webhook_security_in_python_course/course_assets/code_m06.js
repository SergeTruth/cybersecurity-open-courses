window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Payload Validation and Business Logic Safety through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Validate a strictly versioned webhook payload",
      "language": "python",
      "blurb": "The parser rejects Boolean versions, invalid event identifiers, duplicate or unknown fields, non-standard numbers, unsupported event types, and malformed nested payment data before dispatch.",
      "code": "import json\nimport re\n\nEVENT_ID = re.compile(r\"evt_[A-Za-z0-9_-]{16,80}\")\nPAYMENT_ID = re.compile(r\"pay_[A-Za-z0-9]{16,40}\")\n\ndef parse_payment_event(body: bytes) -> dict[str, object]:\n    def unique_object(pairs: list[tuple[str, object]]) -> dict[str, object]:\n        result: dict[str, object] = {}\n        for key, value in pairs:\n            if key in result:\n                raise ValueError(\"duplicate webhook member\")\n            result[key] = value\n        return result\n    document = json.loads(\n        body.decode(\"utf-8\"),\n        object_pairs_hook=unique_object,\n        parse_constant=lambda value: (_ for _ in ()).throw(ValueError(f\"invalid number {value}\")),\n    )\n    if not isinstance(document, dict) or set(document) != {\"version\", \"event_id\", \"type\", \"data\"}:\n        raise ValueError(\"webhook envelope rejected\")\n    version = document[\"version\"]\n    event_id = document[\"event_id\"]\n    if type(version) is not int or version != 1 or document[\"type\"] not in {\"payment.settled\", \"payment.failed\"}:\n        raise ValueError(\"webhook event type rejected\")\n    if not isinstance(event_id, str) or EVENT_ID.fullmatch(event_id) is None:\n        raise ValueError(\"webhook event identifier rejected\")\n    data = document[\"data\"]\n    if not isinstance(data, dict) or set(data) != {\"payment_id\"}:\n        raise ValueError(\"webhook data shape rejected\")\n    if not isinstance(data[\"payment_id\"], str) or PAYMENT_ID.fullmatch(data[\"payment_id\"]) is None:\n        raise ValueError(\"payment identifier rejected\")\n    return document\n"
    },
    {
      "title": "Authorize webhook business effects independently",
      "language": "python",
      "blurb": "A valid vendor signature does not choose the tenant or transition; stored integration ownership and current object state decide whether the event may act.",
      "code": "def authorize_payment_event(repository, integration_id: str, event: dict[str, object]) -> object:\n    integration = repository.integration(integration_id)\n    if integration is None or not integration.enabled or integration.vendor != \"payment_partner\":\n        raise PermissionError(\"webhook integration rejected\")\n    payment_id = event[\"data\"][\"payment_id\"]\n    payment = repository.payment_for_tenant(integration.tenant_id, payment_id)\n    if payment is None or payment.status != \"pending\":\n        raise PermissionError(\"webhook business target rejected\")\n    return payment\n"
    }
  ]
};
