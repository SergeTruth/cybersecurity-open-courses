window.COURSE_MODULE = {
  "title": "Testing, Tooling, Review, and Maintenance",
  "graphicAlt": "Lifecycle tests cover construction, transfer, cancellation, partial failure, shutdown, and regressions.",
  "narration": "Use-after-free prevention in safe Rust comes from the language model, but lifecycle-sensitive code still needs testing and review. Tests should cover construction, ownership transfer, cleanup, cancellation, retries, dropped handles, failed initialization, and shutdown paths. These are the places where lifecycle assumptions are easiest to miss.\n\nDrop-path review matters for resource-owning types. What happens if initialization fails halfway through? What happens if a handle is dropped while background work is still pending? What happens during service shutdown? Does cleanup happen once, in the right order, and without leaving callbacks or tasks with stale state?\n\nCode review should focus on unsafe blocks, FFI, callbacks, raw pointers, shared ownership, `Weak` upgrade behavior, interior mutability, async task boundaries, and custom `Drop` implementations. Reviewers should ask what owns each resource, how long references remain valid, and what prevents use after cleanup.\n\nTooling concepts such as Miri and sanitizers can support review, especially near unsafe or FFI code. They do not replace design, documentation, or tests, but they can provide extra confidence around boundary behavior. Dependency review also matters when external crates manage lifetimes, callbacks, or low-level resources.\n\nRegression tests are important when a lifetime bug, cleanup bug, or stale-reference assumption is fixed. The fix should not remain only in a review comment. Capture the lifecycle edge in a test where practical, update safety contracts, and make sure future refactors preserve the intended behavior.",
  "narrationPoints": [
    "Use-after-free prevention in safe Rust comes.",
    "Drop-path review matters for resource-owning types.",
    "Code review should focus on unsafe blocks.",
    "Tooling concepts such as Miri and sanitizers can support.",
    "Regression tests are important.",
    "Tests should cover construction."
  ]
};
