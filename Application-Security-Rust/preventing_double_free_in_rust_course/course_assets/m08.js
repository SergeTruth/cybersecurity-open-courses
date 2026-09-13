window.COURSE_MODULE = {
  "title": "Testing, Tooling, Review, and Maintenance",
  "graphicAlt": "Lifecycle tests cover creation, transfer, cancellation, shutdown, and Drop while checking one cleanup authority.",
  "narration": "Double-free prevention in safe Rust comes from ownership rules, but lifecycle-sensitive code still needs tests and review. Tests should cover creation, ownership transfer, cleanup, repeated calls, failed initialization, cancellation, shutdown, and wrapper drop behavior. These are the paths where cleanup assumptions are easiest to miss.\n\nError-path testing is especially important. If construction fails halfway through, which resources have been acquired and which must be released? If shutdown is called before startup completes, what is still owned? If an external API reports an error after taking ownership, which side must clean up?\n\nCode review should focus on custom `Drop`, unsafe blocks, raw pointers, FFI ownership transfer, allocator assumptions, callback lifetimes, shared ownership, `Weak` upgrade behavior, and any path where cleanup can happen in more than one place. Reviewers should ask whether exactly one cleanup authority exists for each resource.\n\nTooling concepts such as Miri and sanitizers can support confidence near unsafe or FFI code. They do not replace a clear ownership model, but they can help teams validate assumptions around low-level boundaries. Dependency review also matters when external crates provide wrappers over native resources.\n\nRegression tests should be added when ownership and cleanup bugs are fixed. If a duplicate cleanup path was possible, capture the lifecycle edge in a test where practical. Update safety contracts and API documentation so future maintainers understand which path owns cleanup and why.",
  "narrationPoints": [
    "Double-free prevention in safe Rust comes from ownership.",
    "Error-path testing is especially important.",
    "Code review should focus on custom `Drop`.",
    "Tooling concepts such as Miri and sanitizers can support.",
    "Regression tests should be added.",
    "Tests should cover creation."
  ]
};
