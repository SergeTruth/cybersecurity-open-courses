window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Output, Logging, Storage, and Review through concrete, reviewable Python controls.",
  "codeExamples": [
    {
      "title": "Serialize only an approved public projection",
      "language": "python",
      "blurb": "Output construction selects public fields and a version explicitly, excluding credentials, internal state, and ORM attributes from the serialized document.",
      "code": "import json\n\ndef public_user_json(user) -> bytes:\n    document = {\n        \"version\": 1,\n        \"id\": str(user.public_id),\n        \"display_name\": user.display_name,\n        \"joined_at\": user.created_at.isoformat(),\n    }\n    return json.dumps(\n        document,\n        ensure_ascii=False,\n        allow_nan=False,\n        separators=(\",\", \":\"),\n        sort_keys=True,\n    ).encode(\"utf-8\")\n"
    },
    {
      "title": "Log parser failures without copying input",
      "language": "python",
      "blurb": "The event contains a stable parser, source, and error category while omitting raw documents, field values, stack-derived messages, and file paths.",
      "code": "PARSER_ERRORS = {\"invalid_utf8\", \"invalid_syntax\", \"schema_rejected\", \"resource_limit\"}\n\ndef record_parse_failure(logger, metrics, parser: str, source: str, category: str) -> None:\n    parsers = {\"json\", \"yaml\"}\n    sources = {\"api\", \"configuration\", \"queue\"}\n    safe_parser = parser if parser in parsers else \"other\"\n    safe_source = source if source in sources else \"other\"\n    safe_category = category if category in PARSER_ERRORS else \"other\"\n    logger.warning(\n        \"structured_document_rejected\",\n        extra={\"parser\": safe_parser, \"source\": safe_source, \"category\": safe_category},\n    )\n    metrics.increment(\"document_rejections\", tags={\"parser\": safe_parser, \"category\": safe_category})\n"
    }
  ]
};
