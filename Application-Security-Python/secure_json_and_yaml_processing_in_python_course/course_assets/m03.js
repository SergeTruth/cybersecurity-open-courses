window.COURSE_MODULE = {
  "title": "Safe JSON Parsing Principles",
  "graphicAlt": "A JSON object is checked for UTF-8, duplicate members, NaN, exact required keys, scalar types, ranges, and unknown fields; an empty filtered mapping is shown on the rejected side.",
  "narration": "JSON is a data format, not an authorization mechanism and not a business rule engine. A JSON document can represent strings, numbers, booleans, null values, arrays, objects, and nested structures. That structure still needs expectations. The application should know which fields are required, which fields are optional, which fields are allowed, and what each value is permitted to mean.\n\nShape and type matter. A value that should be a list should not silently become a string. A field that should contain a small positive integer should not accept an arbitrary number. Numeric range and precision assumptions can affect identifiers, money, counters, and timestamps. Character encoding expectations also matter when data moves between clients, logs, databases, and downstream services.\n\nJSON processing should include size limits and nesting expectations. Large payloads, deeply nested objects, or repeated structures can consume memory, CPU, and time before business logic runs. Some applications should reject oversized requests early. Others may need streaming or incremental processing for intentionally large data. The key is to choose deliberately rather than allowing any structure by default.\n\nAfter parsing, validate the schema and the business intent. Duplicate keys, unknown fields, extra nesting, surprising nulls, and unexpected arrays can all lead to confused behavior. Rejecting unknown fields may be appropriate for strict APIs, while versioned compatibility may require a different strategy. Either way, the code should make the decision visible and testable.",
  "narrationPoints": [
    "JSON is a data format, not an authorization mechanism and not a business rule engine.",
    "A field that should contain a small positive integer should not accept an arbitrary number.",
    "Large payloads, deeply nested objects, or repeated structures can consume memory, CPU, and time before business logic runs.",
    "Duplicate keys, unknown fields, extra nesting, surprising nulls, and unexpected arrays can all lead to confused behavior.",
    "A JSON document can represent strings, numbers, booleans, null values, arrays, objects, and nested structures.",
    "Character encoding expectations also matter when data moves between clients, logs, databases, and downstream services."
  ]
};
