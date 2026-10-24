window.COURSE_MODULE = {
  "title": "Error Handling and Fail-Safe Behavior",
  "graphicAlt": "Temporary state is committed only after validation, with cleanup on failure and defined reload policy.",
  "narration": "Configuration failure handling should be predictable. If parsing or validation fails, the program should reject invalid settings and avoid continuing with ambiguous or unsafe state. Continuing after a serious configuration error often moves uncertainty deeper into code that expects validated settings.\n\nAvoid partial state updates during parse failure. A parser should not apply some settings to global state, then discover a later field is invalid and leave the program running with a mixture of old, default, and rejected values. Parse into temporary state, validate the full result, and commit only when the contract is satisfied.\n\nTemporary parser state needs cleanup. Buffers, field lists, intermediate maps, allocated strings, file handles, and parsed resource descriptors should have clear ownership during failure paths. The cleanup logic should be reviewed as carefully as the success path.\n\nFor systems that support runtime reload, rollback to a prior known-good configuration may be appropriate. The rule should be explicit: either reject startup, keep the current active configuration, or fall back to safe defaults. The program should not improvise at the point of failure.\n\nDiagnostics should be clear without exposing sensitive values. Report the source, field, failure category, expected type, or range when useful. Redact secrets and avoid dumping raw configuration content into logs.",
  "narrationPoints": [
    "If parsing or validation fails, the program should reject invalid settings and avoid continuing with ambiguous or unsafe state.",
    "Parse into temporary state, validate the full result, and commit only when the contract is satisfied.",
    "The cleanup logic should be reviewed as carefully as the success path.",
    "The rule should be explicit: either reject startup, keep the current active configuration, or fall back to safe defaults.",
    "Report the source, field, failure category, expected type, or range when useful."
  ]
};
