window.COURSE_MODULE = {
  "title": "Course Summary: Defensive TypeScript Habits",
  "graphicAlt": "Defensive TypeScript validates boundaries, models valid states, keeps contracts clear and tests predictable operational failures.",
  "narration": "Defensive TypeScript starts with a simple mindset: values are uncertain until proven otherwise. Type annotations make expectations visible, but runtime values still need appropriate checks when they cross trust boundaries. Strong systems combine compile-time help with runtime validation where it matters.\n\nValidate at trust boundaries, then keep internal contracts clear. Raw input should be parsed, checked, and converted into safer internal shapes before business logic depends on it. Once data has been validated, the rest of the system can operate with fewer repeated checks and more meaningful assumptions.\n\nUse the type system to make invalid states harder to represent. Prefer unknown over any at boundaries, model workflows with discriminated unions, enable strict settings where practical, use readonly contracts when mutation is not intended, and handle cases exhaustively so future changes are visible.\n\nDesign error handling, async behavior, configuration, dependencies, authorization, serialization, and data flow intentionally. Defensive code treats operational failure as normal engineering input. It uses timeouts, careful retries, safe logging, startup configuration validation, minimal data exposure, and clear permission checks near protected actions.\n\nPrefer safe failure over surprising success. A system that rejects bad input clearly is easier to operate than a system that accepts almost anything and fails later. Defensive programming is not about adding noise. It is about making important assumptions visible, testable, and maintainable so TypeScript applications remain reliable as teams, dependencies, and runtime conditions change.",
  "narrationPoints": [
    "Defensive TypeScript starts with a simple mindset: values are uncertain until proven otherwise.",
    "Validate at trust boundaries, then keep internal contracts clear.",
    "Use the type system to make invalid states harder to represent.",
    "Design error handling, async behavior, configuration, dependencies, authorization, serialization, and data flow intentionally.",
    "Prefer safe failure over surprising success."
  ]
};
