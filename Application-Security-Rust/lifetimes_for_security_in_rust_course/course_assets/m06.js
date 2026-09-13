window.COURSE_MODULE = {
  "title": "Scoped Borrows, Temporary Values, and Sensitive Data Lifetime",
  "graphicAlt": "A short validation borrow is separated from later work, and reference validity is distinguished from secret retention and erasure.",
  "narration": "Lifetimes are about reference validity, but the same design mindset helps with security-sensitive data flow. A reference should usually last only as long as it serves a real purpose. Narrow borrows make code easier to reason about and reduce conflicts with later mutation, movement, or cleanup.\n\nAvoid holding references across unrelated work. A reference used for validation does not need to remain active while the program performs logging, mutation, network calls, or response construction. Shorter scopes make the relationship between owner and borrower more obvious.\n\nTemporary values deserve attention. A reference to a temporary value is only valid while that temporary value exists. If code tries to keep the reference longer, Rust should reject the design. When the data must outlive the temporary scope, use an owned value or restructure the owner relationship.\n\nSensitive data such as tokens, credentials, keys, personal data, or confidential configuration also benefits from lifetime thinking. Ask where the data enters, who owns it, who borrows it, whether it is cloned, where it might be logged, and how long it remains available. Lifetimes do not automatically erase sensitive data, but they encourage explicit data-flow review.\n\nRuntime retention and compile-time lifetime are not identical. Rust can help prove reference validity, but teams still need policy and careful code for redaction, zeroization where appropriate, log hygiene, retention, and secure transfer. Lifetime thinking is one piece of a broader secure data handling discipline.",
  "narrationPoints": [
    "Lifetimes are about reference validity.",
    "Avoid holding references across unrelated work.",
    "Temporary values deserve attention.",
    "Sensitive data such as tokens.",
    "Runtime retention and compile-time lifetime are not.",
    "A reference should usually last only as long as it serves."
  ]
};
