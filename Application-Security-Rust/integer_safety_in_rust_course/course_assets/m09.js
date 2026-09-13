window.COURSE_MODULE = {
  "title": "Course Summary: Integer Safety Checklist",
  "graphicAlt": "Integer safety chooses meaningful types, validates conversions, selects arithmetic behavior, bounds sizes, and tests edges.",
  "narration": "Integer safety in Rust is a repeatable engineering practice. Start by choosing integer types based on meaning, range, and boundary requirements. Signedness, width, platform behavior, and serialization needs should all be deliberate. A number's type should help reviewers understand what the value represents.\n\nValidate external numbers after parsing and before use. Parsing confirms representation, not permission. Check range, unit, tenant context, operation context, related fields, and default behavior. Reject unsupported values clearly and convert validated values into domain types when possible.\n\nUse fallible conversions when narrowing or changing signedness. Treat `as` casts as review points. Choose arithmetic behavior deliberately: checked, saturating, wrapping, or overflowing only when the domain calls for it. Test numeric edge cases around every important behavior.\n\nTreat indexes, offsets, lengths, capacities, and allocation calculations as high-value review points. Use checked arithmetic for size calculations. Apply explicit maximums. Fail safely when a request exceeds supported limits. Resource exhaustion is still a security concern in memory-safe code.\n\nFinally, document numeric contracts at protocol, serialization, unsafe, and FFI boundaries. Translate external representations into validated Rust types early. Maintain tests for minimums, maximums, invalid values, conversion edges, and boundary combinations as the code evolves.",
  "narrationPoints": [
    "Make Integer safety in Rust repeatable.",
    "Validate external numbers after parsing and before use.",
    "Use fallible conversions.",
    "Treat indexes, offsets, lengths, capacities, and allocation.",
    "Finally, document numeric contracts at protocol.",
    "Signedness, width, platform behavior, and serialization."
  ]
};
