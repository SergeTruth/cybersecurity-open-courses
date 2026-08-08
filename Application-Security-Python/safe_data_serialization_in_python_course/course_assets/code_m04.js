window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Safe Parsing and Validation with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Reject duplicate keys and non-finite JSON numbers",
      "language": "python",
      "blurb": "Strict decoder hooks prevent duplicate fields and NaN or Infinity values from entering schema validation.",
      "code": "import json\n\ndef unique_object(pairs):\n    value = {}\n    for key, item in pairs:\n        if key in value:\n            raise ValueError(f\"duplicate JSON field: {key}\")\n        value[key] = item\n    return value\n\ndef parse_strict_json(raw: str):\n    return json.loads(\n        raw,\n        object_pairs_hook=unique_object,\n        parse_constant=lambda token: (_ for _ in ()).throw(ValueError(f\"invalid number: {token}\")),\n    )\n"
    },
    {
      "title": "Validate required fields and exact types",
      "language": "python",
      "blurb": "Unknown fields, missing fields, Boolean-as-integer values, and out-of-range quantities are rejected explicitly.",
      "code": "def validate_order(value: object) -> dict[str, object]:\n    if not isinstance(value, dict) or set(value) != {\"order_id\", \"quantity\"}:\n        raise ValueError(\"order fields do not match the schema\")\n    order_id = value[\"order_id\"]\n    quantity = value[\"quantity\"]\n    if not isinstance(order_id, str) or not 1 <= len(order_id) <= 64:\n        raise ValueError(\"order_id is invalid\")\n    if type(quantity) is not int or not 1 <= quantity <= 100:\n        raise ValueError(\"quantity is invalid\")\n    return {\"order_id\": order_id, \"quantity\": quantity}\n"
    }
  ]
};
