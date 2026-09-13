window.COURSE_MODULE = {
  "title": "Error Handling, Panics, and Fail-Safe Behavior",
  "graphicAlt": "Result routes success and controlled failure, while Option separately represents presence or absence; reports exclude secrets.",
  "narration": "Rust's Result and Option types encourage explicit handling of failure and absence. That is a security advantage when teams use it intentionally. Instead of letting unexpected states drift silently through the program, Rust makes many failure paths visible in function signatures and compiler feedback. The value comes from designing those paths deliberately.\n\nCareless use of unwrap or expect can turn predictable failure into unexpected termination or fragile behavior. Panics may be acceptable in some startup validation, test code, or invariant-checking situations, but production request handling, background jobs, message processors, and long-running services need clear failure behavior. A malformed request, missing optional value, or unavailable dependency should not automatically become a service-wide reliability problem.\n\nError messages should be useful without exposing secrets, tokens, sensitive configuration, internal topology, private identifiers, or excessive implementation detail. Internal logs may need more context than user-facing responses, but even internal logs should avoid sensitive data. Error handling should support diagnosis without spreading secrets or turning implementation details into public behavior.\n\nSecure applications define which failures should be retried, rejected, logged, surfaced to the caller, escalated, or treated as startup-blocking conditions. They also avoid retry behavior that creates overload and avoid silent fallback behavior that weakens security. Fail-safe Rust code is not code that never fails; it is code that fails in controlled, observable, and appropriate ways.",
  "narrationPoints": [
    "Rust's Result and Option types encourage explicit handling.",
    "Careless use of unwrap or expect can turn predictable.",
    "Error messages should be useful without exposing secrets.",
    "Secure applications define which failures should be retried.",
    "That is a security advantage.",
    "A malformed request."
  ]
};
