window.COURSE_MODULE = {
  "title": "Code Review and Legacy Refactoring",
  "graphicAlt": "Legacy adapter diagram rejecting oversized spans before narrowing to a 16-bit length and calling an older function only with a representable value.",
  "narration": "Most organizations already have integer-heavy legacy code. Improving it does not require stopping all feature work. It requires prioritization. Start with paths where integers influence memory allocation, buffer bounds, parser state, loop limits, permissions, quota decisions, resource limits, persistence formats, and cross-platform behavior.\n\nDuring review, look for values whose domain is unclear. A plain int might represent an index, byte count, status code, timeout, offset, or business identifier. Replacing unclear types with domain-appropriate types, clearer aliases, wrapper objects, or named constants can reduce guesswork for future maintainers.\n\nAdd range checks before behavior-sensitive conversions. If a value is parsed from outside the process, loaded from storage, received from another component, or derived from user-controlled configuration, the conversion point should not be casual. The code should show why the destination type can safely represent the value.\n\nRefactoring should be incremental and protected by regression tests. For a risky size calculation, add tests around current behavior before changing it. Then wrap the calculation, add checked arithmetic, clarify units, and verify that callers handle failure. Small changes are easier to review and safer to deploy.\n\nSome assumptions cannot be removed immediately. When that happens, document the assumption near the code, link it to a follow-up item if appropriate, and add tests or diagnostics that make future changes safer. Legacy improvement is a steady engineering practice, not a one-time cleanup.",
  "narrationPoints": [
    "Start with paths where integers influence memory allocation, buffer bounds, parser state, loop limits, permissions, quota decisions, resource limits, persistence formats, and cross-platform behavior.",
    "During review, look for values whose domain is unclear.",
    "The code should show why the destination type can safely represent the value.",
    "For a risky size calculation, add tests around current behavior before changing it.",
    "Small changes are easier to review and safer to deploy.",
    "When that happens, document the assumption near the code, link it to a follow-up item if appropriate, and add tests or diagnostics that make future changes safer."
  ]
};
