window.COURSE_MODULE = {
  "title": "Testing, Sanitizers, and Diagnostics",
  "graphicAlt": "Sanitizer test pipeline showing an intentional unoptimized use-after-free target, ASan report matching, and expected-failure CTest result.",
  "narration": "Lifetime defects can be intermittent because stale access may appear to work until timing, allocation layout, compiler settings, or container behavior changes. That makes ordinary happy-path testing insufficient. Tests need to exercise lifecycle boundaries directly.\n\nSanitizers can reveal memory lifetime defects during development and CI. They can make invalid access visible close to the operation that triggers it, which is far easier to debug than a later corrupted state. These tools do not replace design, but they provide valuable feedback while tests run.\n\nDebug iterator modes, hardened library settings, compiler diagnostics, and static analysis can add useful coverage. They may catch invalid container access, suspicious lifetime patterns, or dangerous captures before the issue appears in production. Tool settings should be documented so developers know which builds provide which checks.\n\nTests should cover destruction order, container mutation, move operations, callback cancellation, asynchronous completion, observer removal, and error paths. These are the situations where access often outlives the object it depends on. Boundary lifecycle tests are just as important as boundary value tests.\n\nTool findings should become tracked engineering defects with an owner, a fix, a regression test, and follow-up review. Suppressions should be rare and documented. A team gets stronger lifetime safety when diagnostics become part of normal delivery rather than a separate cleanup campaign.",
  "narrationPoints": [
    "Lifetime defects can be intermittent because stale access may appear to work until timing, allocation layout, compiler settings, or container behavior changes.",
    "Sanitizers can reveal memory lifetime defects during development and CI.",
    "These tools do not replace design, but they provide valuable feedback while tests run.",
    "Tool settings should be documented so developers know which builds provide which checks.",
    "These are the situations where access often outlives the object it depends on.",
    "A team gets stronger lifetime safety when diagnostics become part of normal delivery rather than a separate cleanup campaign."
  ]
};
