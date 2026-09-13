window.COURSE_MODULE = {
  "title": "JSON, XML, YAML, and Polymorphic Type Handling",
  "graphicAlt": "JSON, XML and YAML parser capabilities can introduce arbitrary types, external resources or rich object construction; a separate safe-design lane uses explicit DTOs, schemas and limits.",
  "narration": "Moving away from native Java serialization helps, but it is not the end of serialization security. JSON, XML, and YAML are common Java data formats, and they are often safer when used as constrained data formats. They can still create risk when parser settings are broad, when untrusted data controls types, when external resources are allowed unexpectedly, or when application code binds directly into sensitive domain objects without validation.\n\nPolymorphic type handling deserves careful review. Some libraries and framework features can choose implementation classes based on type metadata in the input. Default typing, class-name-based binding, broad subtype handling, and custom deserializers can be dangerous when driven by untrusted input. If the application expects a request DTO, the caller should not be able to decide which arbitrary Java class gets instantiated to satisfy it.\n\nXML parsing should consider external entities, schema behavior, entity expansion, external resource access, and parser configuration. YAML parsers can construct richer structures or types depending on library and configuration. JSON parsers can allow unknown fields, deeply nested structures, very large arrays, or coercions that surprise developers. Framework defaults should be reviewed rather than assumed safe because defaults may vary by version, library, and integration.\n\nPrefer explicit DTOs, schemas, and allowlisted fields over arbitrary maps or type-driven object construction. Unknown fields, unexpected types, oversized values, deeply nested data, and unsupported versions should be handled intentionally. The lesson is not that JSON, XML, or YAML are bad. The lesson is that constrained parsing and explicit mapping are what make ordinary formats safer at trust boundaries.",
  "narrationPoints": [
    "Moving away from native Java serialization helps.",
    "Polymorphic type handling deserves careful review.",
    "XML parsing should consider external entities.",
    "Prefer explicit DTOs.",
    "Framework defaults should be reviewed rather than assumed.",
    "Unknown fields, unexpected types, oversized values, deeply."
  ]
};
