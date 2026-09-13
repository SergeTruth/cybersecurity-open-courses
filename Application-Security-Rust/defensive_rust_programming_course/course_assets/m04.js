window.COURSE_MODULE = {
  "title": "Error Handling, Panics, and Fail-Safe Behavior",
  "graphicAlt": "Failure policy explicitly chooses bounded retry, fail-closed behavior, or startup termination with safe diagnostics.",
  "narration": "Rust encourages explicit error handling through Result and Option, but defensive programming depends on using those types thoughtfully. The presence of a Result is not a guarantee of good failure behavior. The code still needs to decide what the failure means, who should see it, whether it is recoverable, and how it affects the rest of the workflow.\n\nCareless unwrap or expect can turn a predictable bad input, missing file, unavailable service, malformed response, or optional value into a crash. That may be acceptable in tests or in narrowly defined startup validation, but production request handlers, background jobs, long-running services, and command-line tools need deliberate failure behavior. A predictable problem should not become a surprising outage.\n\nPanics should have clear boundaries. If a panic is used to protect an internal invariant, the invariant should be documented and tested. If a process should fail fast during startup because required configuration is missing, that behavior should be intentional. If a service handles untrusted requests, panics should not be the normal path for ordinary invalid input.\n\nError messages should be useful without exposing secrets, internal topology, tokens, sensitive configuration, private identifiers, or excessive implementation detail. User-facing errors, internal logs, metrics, and alerts each have different audiences. Defensive code chooses what to reveal at each layer rather than dumping raw context everywhere.\n\nFail-safe behavior requires choices. Some failures should be retried with limits. Some should be rejected. Some should fail closed. Some should terminate startup. Some should be escalated to operators. Defensive Rust makes those decisions visible, testable, and aligned with the security and reliability needs of the application.",
  "narrationPoints": [
    "Rust encourages explicit error handling through Result.",
    "Careless unwrap or expect can turn a predictable bad input.",
    "Panics should have clear boundaries.",
    "Error messages should be useful without exposing secrets.",
    "Fail-safe behavior requires choices.",
    "A predictable problem should not become a surprising outage."
  ]
};
