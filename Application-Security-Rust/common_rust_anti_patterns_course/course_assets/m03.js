window.COURSE_MODULE = {
  "title": "Panic-Driven Error Handling",
  "graphicAlt": "Expected failures use explicit Result paths with Ok and Err branches; panic-oriented calls deserve review.",
  "narration": "Rust makes failure explicit through `Result` and absence explicit through `Option`, but code can still become fragile if expected failures are handled with `unwrap`, `expect`, or ordinary panic paths. These tools are useful in examples, prototypes, tests, and places where failure truly means the program invariant has been broken. They become anti-patterns when predictable production conditions are treated as impossible.\n\nMany failures are ordinary and should be part of the design: missing files, invalid input, unavailable services, permission problems, malformed configuration, unsupported versions, expired sessions, failed network calls, and inconsistent external data. In services, CLIs, libraries, and parsers, these cases need clear behavior rather than abrupt surprises.\n\n`Result` and `Option` are design tools. They force the code to say what happens when a value is absent or an operation cannot complete. The response may be rejection, retry, fallback, controlled termination, fail-closed behavior, operator-facing diagnostics, or a sanitized user-facing message. The important part is that the decision is deliberate.\n\nError handling is also a security and operations concern. User-facing errors should not leak secrets, internal paths, tokens, database details, or sensitive configuration. Operator-facing logs need enough detail to support investigation without exposing data that should be redacted. Libraries should avoid panicking for caller-controllable conditions when returning an error would preserve control.\n\nA useful review practice is to search for panic-oriented calls and classify them. Is the condition truly impossible after validation? Is this test-only code? Is the failure recoverable? Would a caller expect an error instead of a crash? Panics should mark exceptional invariant failures, not replace ordinary error handling.",
  "narrationPoints": [
    "Rust makes failure explicit through `Result` and absence.",
    "Many failures are ordinary and should be part of the design.",
    "`Result` and `Option` are design tools.",
    "Error handling is also a security and operations concern.",
    "A useful review practice is to search for panic-oriented.",
    "The response may be rejection."
  ]
};
