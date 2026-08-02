window.COURSE_MODULE = {
  "title": "Schema Validation and Type Normalization",
  "graphicAlt": "A raw mapping is transformed into an immutable typed object through required-field, nested-shape, Boolean-versus-integer, range, format, and cross-field checks.",
  "narration": "Schema validation gives structure to trust. It checks required fields, allowed fields, types, ranges, formats, relationships, and sometimes conditional rules. JSON Schema concepts and Python validation libraries can help, but the durable idea is independent of any one tool: parsed data should be compared against explicit expectations before the application relies on it.\n\nType normalization should be deliberate. Applications often need to convert strings to dates, numbers, enums, paths, identifiers, or booleans. Those conversions should be predictable and reviewed. Ambiguous values, surprising defaults, locale assumptions, case sensitivity, and implicit coercion can create bugs or security mistakes. Normalization should reduce ambiguity, not hide it.\n\nUnknown fields deserve a policy. In strict command, API, and configuration surfaces, rejecting unknown fields can catch client errors, version mismatches, or attempts to control unintended behavior. In some compatibility scenarios, ignoring unknown fields may be appropriate. The mistake is allowing extra fields to flow into internal objects without deciding whether they should have meaning.\n\nValidation should be close to the trust boundary and should produce useful but safe errors. Developers and legitimate users need enough information to correct input. Attackers and unauthorized users should not receive sensitive internals, stack traces, secrets, or implementation details. Good validation makes expected structure visible in code, tests, logs, and review discussions.",
  "narrationPoints": [
    "It checks required fields, allowed fields, types, ranges, formats, relationships, and sometimes conditional rules.",
    "Ambiguous values, surprising defaults, locale assumptions, case sensitivity, and implicit coercion can create bugs or security mistakes.",
    "The mistake is allowing extra fields to flow into internal objects without deciding whether they should have meaning.",
    "Validation should be close to the trust boundary and should produce useful but safe errors.",
    "Attackers and unauthorized users should not receive sensitive internals, stack traces, secrets, or implementation details.",
    "Applications often need to convert strings to dates, numbers, enums, paths, identifiers, or booleans."
  ]
};
