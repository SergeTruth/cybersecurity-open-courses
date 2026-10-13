window.COURSE_MODULE = {
  "title": "Structured Input and Parser Discipline",
  "graphicAlt": "Records pass grammar, field and cross-field checks before becoming validated objects, with required, optional and duplicate-field rules made explicit.",
  "narration": "Structured input appears in records, delimited fields, key-value files, headers, simple messages, and configuration formats. The program should parse structure before trusting individual fields. A value is not meaningful until the parser knows which field it belongs to, whether the record is complete, and whether the surrounding structure is valid.\n\nRequired and optional fields should be validated separately. A required field must be present and valid. An optional field may be absent, but if it appears, it still needs type, length, range, and format checks. Defaults should be explicit and should not hide malformed input.\n\nDuplicate fields need intentional handling. Some formats may allow repeated fields, some may treat the last value as authoritative, and others should reject duplicates. The program should not accidentally accept whichever value happens to be parsed last if that is not part of the contract.\n\nField-level validation should match each field's meaning. A name, count, size, flag, path segment, identifier, timeout, and message type are different even if they all arrive as text. Cross-field consistency may also matter when one field controls the length, type, or allowed range of another.\n\nSafe rejection is part of parser discipline. If a record is incomplete, ambiguous, oversized, inconsistent, or outside the accepted grammar, the parser should return a predictable error and avoid partial state updates. Deeper code should receive either a validated representation or no representation at all.",
  "narrationPoints": [
    "Structured input appears in records, delimited fields, key-value files, headers, simple messages.",
    "An optional field may be absent, but if it appears, it still needs type, length, range.",
    "Some formats may allow repeated fields, some may treat the last value as authoritative, and others should reject duplicates.",
    "Cross-field consistency may also matter when one field controls the length, type, or allowed range of another.",
    "Deeper code should receive either a validated representation or no representation at all."
  ]
};
