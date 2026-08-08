window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Choosing Safer Serialization Formats with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Serialize a versioned JSON envelope",
      "language": "python",
      "blurb": "The producer emits plain data with an explicit version, exact runtime type checks, and non-finite-number rejection.",
      "code": "import json\n\ndef serialize_order(order_id: str, total_cents: int) -> bytes:\n    if type(order_id) is not str or not 1 <= len(order_id) <= 64:\n        raise ValueError(\"order_id is invalid\")\n    if type(total_cents) is not int or not 0 <= total_cents <= 100_000_000:\n        raise ValueError(\"total_cents is invalid\")\n    envelope = {\"version\": 1, \"order_id\": order_id, \"total_cents\": total_cents}\n    return json.dumps(envelope, allow_nan=False, separators=(\",\", \":\")).encode(\"utf-8\")\n"
    },
    {
      "title": "Select a parser by trusted media type",
      "language": "python",
      "blurb": "The application maps an allowlisted Content-Type to a parser rather than accepting a class or decoder name from input. The JSON branch uses strict parsing so duplicate fields and non-finite numbers are rejected at the boundary.",
      "code": "import json\nimport tomllib\n\nMAX_DOCUMENT_BYTES = 262_144\n\ndef unique_object(pairs):\n    value = {}\n    for key, item in pairs:\n        if key in value:\n            raise ValueError(f\"duplicate JSON field: {key}\")\n        value[key] = item\n    return value\n\ndef strict_json_loads(raw: bytes):\n    return json.loads(\n        raw.decode(\"utf-8\"),\n        object_pairs_hook=unique_object,\n        parse_constant=lambda token: (_ for _ in ()).throw(\n            ValueError(f\"invalid number: {token}\")\n        ),\n    )\n\nPARSERS = {\n    \"application/json\": strict_json_loads,\n    \"application/toml\": lambda raw: tomllib.loads(raw.decode(\"utf-8\")),\n}\n\ndef parse_document(media_type: str, raw: bytes):\n    if type(media_type) is not str or media_type not in PARSERS:\n        raise ValueError(\"serialization format is not supported\")\n    if type(raw) is not bytes or not 1 <= len(raw) <= MAX_DOCUMENT_BYTES:\n        raise ValueError(\"serialized document is too large\")\n    return PARSERS[media_type](raw)\n"
    }
  ]
};
