window.COURSE_MODULE = {
  "title": "Course Summary: Secure API Design Habits",
  "graphicAlt": "Explicit contracts, types, validation, scoped authority and review reinforce secure API boundaries.",
  "narration": "Secure API design in C++ starts by treating interfaces as security boundaries. A function, class, plugin hook, callback, or component boundary can shape behavior across many future call sites.\n\nMake contracts explicit. Define caller responsibilities, callee guarantees, accepted input, rejected input, ownership, lifetime, authority, and failure behavior.\n\nUse expressive types to prevent common misuse. Strong domain types, scoped enums, clear optional values, and result types make important assumptions visible at compile time and review time.\n\nValidate input before trust, convert accepted data into narrow internal forms, and preserve invariants during failure. Keep diagnostics useful while avoiding sensitive leakage.\n\nLimit authority with scoped contexts or capability-style handles. Make powerful operations explicit and hard to call accidentally.\n\nFinally, version APIs deliberately, test invalid and denied cases, and review interface changes as security-critical. A small API decision can influence thousands of maintenance decisions over time.\n\nKeep unsafe shortcuts rare, named, and restricted. If an operation is meant only for migration, testing, or privileged maintenance, the interface should make that context obvious.\n\nSecure API design is ultimately about reducing surprise. Callers, reviewers, testers, and operators should all be able to see what the boundary trusts and what it refuses.\n\nThat visibility is what lets C++ systems stay maintainable as teams and call sites grow.",
  "narrationPoints": [
    "Secure API design in C++ starts by treating interfaces as security boundaries.",
    "Use expressive types to prevent common misuse.",
    "Keep diagnostics useful while avoiding sensitive leakage.",
    "Finally, version APIs deliberately, test invalid and denied cases, and review interface changes as security-critical.",
    "If an operation is meant only for migration, testing, or privileged maintenance, the interface should make that context obvious.",
    "That visibility is what lets C++ systems stay maintainable as teams and call sites grow."
  ]
};
