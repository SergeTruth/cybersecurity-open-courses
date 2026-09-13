window.COURSE_MODULE = {
  "title": "Async, Dependencies, Logging, and Operational Blind Spots",
  "graphicAlt": "Operational review covers bounded async work, narrow lock scopes, dependencies, and protected telemetry.",
  "narration": "Rust code can be correct in isolation and still fail operationally. Async systems make this especially visible. Anti-patterns include unbounded task spawning, queues with no backpressure, retries without limits, missing timeouts, ignored cancellation, and cleanup behavior that depends on tasks finishing in a perfect order.\n\nLocks also need attention in async and concurrent code. Holding a lock across unrelated work, slow operations, or code that can wait indefinitely can create availability problems. The defensive pattern is to keep critical sections narrow, define cancellation behavior, set timeouts, and make queue and retry limits explicit.\n\nDependency governance is another Rust anti-pattern area. Adding crates casually, enabling broad feature flags, ignoring lockfile changes, or failing to review build scripts and procedural macros can expand the trusted computing base. A dependency may bring parsers, network behavior, native code, optional protocols, or transitive crates that deserve review.\n\nLogging and tracing should support operations without leaking sensitive material. Logs should avoid secrets, tokens, credentials, private configuration, personal data, and excessive internals. Structured logging is useful, but fields still need classification and redaction. Debug-friendly output should not become permanent disclosure.\n\nOperational blind spots include missing metrics, unclear readiness checks, weak error reporting, no release review, and tests that stop at unit-level behavior while ignoring runtime limits. Defensive Rust treats the running system as part of the security boundary. Observability, configuration review, dependency review, and release discipline are part of the code's trust story.",
  "narrationPoints": [
    "Rust code can be correct in isolation and still fail.",
    "Locks also need attention in async and concurrent code.",
    "Dependency governance is another Rust anti-pattern area.",
    "Logging and tracing should support operations.",
    "Operational blind spots include missing metrics.",
    "A dependency may bring parsers."
  ]
};
