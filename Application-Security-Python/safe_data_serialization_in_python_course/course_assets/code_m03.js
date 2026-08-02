window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Choosing Safer Serialization Formats with reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Serialize a versioned JSON envelope",
      "language": "python",
      "blurb": "The producer emits plain data with an explicit version and rejects non-finite numbers that JSON consumers handle inconsistently.",
      "code": "import json\n\ndef serialize_order(order_id: str, total_cents: int) -> bytes:\n    if not order_id or not 0 <= total_cents <= 100_000_000:\n        raise ValueError(\"order fields rejected\")\n    envelope = {\"version\": 1, \"order_id\": order_id, \"total_cents\": total_cents}\n    return json.dumps(envelope, allow_nan=False, separators=(\",\", \":\")).encode(\"utf-8\")\n"
    },
    {
      "title": "Select a parser by trusted media type",
      "language": "python",
      "blurb": "The application maps an allowlisted Content-Type to a parser rather than accepting a class or decoder name from input.",
      "code": "import json\nimport tomllib\n\nPARSERS = {\n    \"application/json\": lambda raw: json.loads(raw.decode(\"utf-8\")),\n    \"application/toml\": lambda raw: tomllib.loads(raw.decode(\"utf-8\")),\n}\n\ndef parse_document(media_type: str, raw: bytes):\n    if len(raw) > 262_144:\n        raise ValueError(\"serialized document is too large\")\n    try:\n        parser = PARSERS[media_type]\n    except KeyError:\n        raise ValueError(\"serialization format is not supported\") from None\n    return parser(raw)\n"
    }
  ]
};
