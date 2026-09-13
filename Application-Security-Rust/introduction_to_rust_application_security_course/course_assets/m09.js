window.COURSE_MODULE = {
  "title": "Course Summary: Rust Security Checklist",
  "graphicAlt": "Six practices summarize safe types, reviewed unsafe boundaries, validated input, crate review, secret protection, and operational control.",
  "narration": "Rust application security is a layered engineering practice. Use ownership, borrowing, lifetimes, and the type system intentionally, but do not confuse memory safety with complete application security. Keep unsafe code small, justified, documented, and reviewed. Treat FFI, raw pointers, global mutable state, and low-level boundaries as security-sensitive areas.\n\nTreat external input as untrusted until it has been parsed and validated. Use explicit types and validation boundaries. Handle errors deliberately, avoid unnecessary panics in production paths, and keep error messages useful without exposing secrets or sensitive implementation detail. Protect configuration and secrets from source code, logs, artifacts, and accidental serialization.\n\nReview crates, feature flags, transitive dependencies, and build-time behavior as part of the application. Keep dependency records and update discipline. Design concurrency and async behavior with resource limits, timeouts, cancellation, backpressure, and failure modes in mind. Availability and reliability are part of the security story.\n\nFinally, test security-relevant behavior, log safely, monitor operations, and harden releases. Review build profiles, feature selections, dependency inventories, configuration defaults, and deployment documentation. Improve based on incidents, dependency changes, review findings, and operational feedback. The goal is to use Rust's strengths while engineering the whole application securely.",
  "narrationPoints": [
    "Rust application security is a layered engineering practice.",
    "Treat external input as untrusted until it has been parsed.",
    "Review crates, feature flags, transitive dependencies,.",
    "Finally, test security-relevant behavior, log safely.",
    "Use ownership, borrowing, lifetimes, and the type system.",
    "Use explicit types and validation boundaries."
  ]
};
