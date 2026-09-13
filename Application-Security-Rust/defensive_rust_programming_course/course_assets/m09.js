window.COURSE_MODULE = {
  "title": "Course Summary: Defensive Rust Checklist",
  "graphicAlt": "The defensive Rust checklist models valid states, validates inputs, handles failure, governs dependencies, and bounds operations.",
  "narration": "Defensive Rust programming is a layered engineering practice. Start by using Rust's type system to model valid states. Prefer domain types over ambiguous primitives when the distinction matters. Use enums to model states and intent. Make absence and failure explicit with Option and Result. Validate input at trust boundaries and convert it into types that downstream code can trust.\n\nHandle errors deliberately. Review unwrap, expect, panic paths, retry behavior, rejection behavior, and fail-closed decisions. Keep error messages useful without exposing secrets or sensitive implementation detail. Treat unsafe code and FFI as small, documented, tested, and reviewed trust boundaries.\n\nGovern dependencies, features, build inputs, secrets, logs, and configuration. Review crates and transitive dependencies. Understand which feature flags are enabled. Protect secrets from source code, logs, artifacts, and accidental serialization. Validate configuration and use structured logging with deliberate redaction.\n\nDesign concurrency and async behavior with ownership, synchronization, backpressure, cancellation, timeouts, and resource limits in mind. Test expected behavior, boundary cases, negative cases, and regressions. Use tooling, code review, monitoring, and incident lessons to keep improving the codebase. The main goal is Rust software that is explicit, constrained, reviewable, tested, observable, and resilient.",
  "narrationPoints": [
    "Defensive Rust programming is a layered engineering.",
    "Handle errors deliberately.",
    "Govern dependencies, features, build inputs, secrets, logs,.",
    "Design concurrency and async behavior with ownership.",
    "Use enums to model states and intent.",
    "Validate input at trust boundaries and convert it."
  ]
};
