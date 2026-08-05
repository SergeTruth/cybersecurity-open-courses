window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Response Validation and Safe Parsing through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Stream a JSON response under a real byte ceiling",
      "language": "python",
      "blurb": "The client enforces media type and actual streamed bytes before strict JSON decoding, so a false Content-Length cannot bypass the response budget.",
      "code": "import json\n\ndef unique_json_object(pairs: list[tuple[str, object]]) -> dict[str, object]:\n    result: dict[str, object] = {}\n    for key, value in pairs:\n        if key in result:\n            raise ValueError(\"duplicate JSON member\")\n        result[key] = value\n    return result\n\ndef bounded_json_response(response, maximum: int = 65_536) -> object:\n    media_type = response.headers.get(\"Content-Type\", \"\").partition(\";\")[0].lower()\n    if media_type != \"application/json\":\n        raise ValueError(\"JSON media type required\")\n    body = bytearray()\n    for chunk in response.iter_content(8192):\n        body.extend(chunk)\n        if len(body) > maximum:\n            raise ValueError(\"HTTP response exceeded its byte limit\")\n    return json.loads(\n        body.decode(\"utf-8\"),\n        object_pairs_hook=unique_json_object,\n        parse_constant=lambda value: (_ for _ in ()).throw(ValueError(f\"invalid number {value}\")),\n    )\n"
    },
    {
      "title": "Validate a strictly versioned partner response schema",
      "language": "python",
      "blurb": "An exact nested schema requires an actual integer version, rejects Boolean-as-integer confusion and unknown fields, and bounds every partner-controlled identifier and value.",
      "code": "import re\n\nPARTNER_ORDER_ID = re.compile(r\"[A-Za-z0-9_-]{1,40}\")\n\ndef parse_partner_order(document: object) -> dict[str, object]:\n    if not isinstance(document, dict) or set(document) != {\"version\", \"order\"}:\n        raise ValueError(\"partner envelope rejected\")\n    version = document[\"version\"]\n    if type(version) is not int or version != 1 or not isinstance(document[\"order\"], dict):\n        raise ValueError(\"partner version rejected\")\n    order = document[\"order\"]\n    if set(order) != {\"id\", \"total_cents\", \"currency\"}:\n        raise ValueError(\"partner order shape rejected\")\n    order_id = order[\"id\"]\n    total_cents = order[\"total_cents\"]\n    currency = order[\"currency\"]\n    if not isinstance(order_id, str) or PARTNER_ORDER_ID.fullmatch(order_id) is None:\n        raise ValueError(\"partner order identifier rejected\")\n    if type(total_cents) is not int or not 0 <= total_cents <= 10_000_000:\n        raise ValueError(\"partner total rejected\")\n    if not isinstance(currency, str) or currency not in {\"USD\", \"CAD\"}:\n        raise ValueError(\"partner currency rejected\")\n    return {\"id\": order_id, \"total_cents\": total_cents, \"currency\": currency}\n"
    }
  ]
};
