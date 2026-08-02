window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Safe JSON Parsing Principles through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Reject duplicate keys and non-standard JSON numbers",
      "language": "python",
      "blurb": "Strict decoder hooks reject duplicate object members and NaN or infinity before an exact required schema and field types are validated.",
      "code": "import json\n\ndef unique_object(pairs: list[tuple[str, object]]) -> dict[str, object]:\n    result: dict[str, object] = {}\n    for key, value in pairs:\n        if key in result:\n            raise ValueError(f\"duplicate JSON member: {key}\")\n        result[key] = value\n    return result\n\ndef parse_job(raw: bytes) -> dict[str, object]:\n    if not 1 <= len(raw) <= 16_384:\n        raise ValueError(\"JSON byte limit rejected\")\n    document = json.loads(\n        raw.decode(\"utf-8\"),\n        object_pairs_hook=unique_object,\n        parse_constant=lambda value: (_ for _ in ()).throw(ValueError(f\"invalid number: {value}\")),\n    )\n    if not isinstance(document, dict) or set(document) != {\"job_id\", \"attempt\"}:\n        raise ValueError(\"job JSON shape rejected\")\n    if not isinstance(document[\"job_id\"], str) or not 1 <= len(document[\"job_id\"]) <= 40:\n        raise ValueError(\"job identifier rejected\")\n    if type(document[\"attempt\"]) is not int or not 1 <= document[\"attempt\"] <= 5:\n        raise ValueError(\"job attempt rejected\")\n    return document\n"
    },
    {
      "title": "Decode a bounded JSON array into typed values",
      "language": "python",
      "blurb": "The parser requires UTF-8, a top-level list, a finite item count, and exact scalar types instead of filtering unknown input into an empty object.",
      "code": "import json\n\ndef parse_measurements(raw: bytes) -> tuple[int, ...]:\n    if len(raw) > 8192:\n        raise ValueError(\"measurement document too large\")\n    values = json.loads(raw.decode(\"utf-8\"))\n    if not isinstance(values, list) or not 1 <= len(values) <= 100:\n        raise ValueError(\"measurement array rejected\")\n    if any(type(value) is not int or not -1000 <= value <= 1000 for value in values):\n        raise ValueError(\"measurement value rejected\")\n    return tuple(values)\n"
    }
  ]
};
