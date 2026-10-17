window.COURSE_MODULE = {
  "title": "Testing, Diagnostics, and Review Practices",
  "graphicAlt": "Boundary tests, redaction verification and diagnostics feed review and regression coverage for explicit string assumptions.",
  "narration": "String-heavy code needs tests around boundaries and unusual cases. Typical examples are not enough. Include empty strings, very long strings, maximum allowed length, embedded nulls, invalid encodings, unusual Unicode forms, leading and trailing whitespace, case differences, path-like values, malformed serialized data, and sensitive value redaction.\n\nTests should verify both acceptance and rejection. If a parser rejects malformed input, test the failure path. If logging redacts a token, test that the token does not appear in the emitted event. If a validation rule depends on canonical form, test the canonicalization step and the comparison that follows.\n\nDiagnostics help catch issues earlier. Compiler warnings and static analysis can reveal unsafe conversions, suspicious casts, or lifetime problems. Sanitizers can reveal related memory errors. Runtime assertions can document assumptions near string boundaries during development builds. No single tool is enough, but layered diagnostics make defects easier to find.\n\nCode review should ask practical questions: where did the string come from, who owns it, how long does it live, which encoding is expected, how is length validated, where is it logged, and what output context does it enter? Those questions turn string security from a vague concern into a concrete review checklist.\n\nWhen a defect is found, add a regression test that captures the boundary condition. String bugs often repeat because teams fix one symptom without documenting the assumption that failed.",
  "narrationPoints": [
    "String-heavy code needs tests around boundaries and unusual cases.",
    "If a parser rejects malformed input, test the failure path.",
    "If a validation rule depends on canonical form, test the canonicalization step and the comparison that follows.",
    "Compiler warnings and static analysis can reveal unsafe conversions, suspicious casts, or lifetime problems.",
    "Code review should ask practical questions: where did the string come from, who owns it, how long does it live, which encoding is expected, how is length validated, where is it logged, and what output context does it enter?",
    "When a defect is found, add a regression test that captures the boundary condition."
  ]
};
