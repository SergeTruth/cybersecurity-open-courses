window.COURSE_MODULE = {
  "title": "Course Summary: Rust Anti-Pattern Review Checklist",
  "graphicAlt": "Rust anti-pattern review checks ownership, errors, domain types, unsafe boundaries, and operational limits.",
  "narration": "Common Rust anti-patterns are review signals. They do not mean the author failed; they mean the code is telling the team where assumptions need to become clearer. Treat borrow checker friction, repeated clones, broad lifetimes, shared ownership, panics, raw primitives, and broad mutable state as prompts to ask better design questions.\n\nPrefer clear ownership and narrow borrows. Use compiler feedback constructively. Handle expected errors with `Result`, `Option`, and deliberate recovery decisions. Model important domain concepts with newtypes, enums, validated constructors, and APIs that make invalid states harder to express.\n\nKeep unsafe and FFI boundaries small, documented, justified, tested, and wrapped where possible. Explain safety contracts in terms another reviewer can verify. Validate input after parsing and before use. Review numeric conversions, indexes, allocation sizes, resource limits, and boundary assumptions before they influence sensitive or expensive operations.\n\nLook beyond the core language. Async systems need timeouts, cancellation rules, backpressure, lock discipline, and cleanup behavior. Dependencies, feature flags, build scripts, procedural macros, logs, metrics, release processes, and deployment checks are part of the program's real security posture.\n\nThe goal is not perfect code. The goal is code whose assumptions are visible enough to review and improve. Rust gives teams a strong foundation, and anti-pattern review helps keep that foundation aligned with maintainable, secure, production-ready engineering.",
  "narrationPoints": [
    "Common Rust anti-patterns are review signals.",
    "Prefer clear ownership and narrow borrows.",
    "Keep unsafe and FFI boundaries small.",
    "Look beyond the core language.",
    "The goal is not perfect code.",
    "Explain safety contracts in terms another reviewer can."
  ]
};
