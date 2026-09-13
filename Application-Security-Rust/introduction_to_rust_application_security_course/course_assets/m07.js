window.COURSE_MODULE = {
  "title": "Concurrency, Async, and Resource Safety",
  "graphicAlt": "Bounded queues, worker limits, timeouts, cancellation, and backpressure protect an asynchronous service from uncontrolled work.",
  "narration": "Rust's type system helps reduce data races in safe code, but concurrent and async applications still need careful design. Shared state, locks, channels, task lifetimes, cancellation behavior, request timeouts, connection pools, file handles, memory usage, and queue sizes all affect security and reliability. Memory safety is valuable, but it does not automatically make a service resilient under load.\n\nAsync tasks should have clear ownership, timeout expectations, cancellation behavior, and error reporting. A background task that never stops, a request that waits indefinitely, or a queue that grows without bounds can harm availability. A service that accepts unlimited work can fail even if the code is memory safe. Resource limits are part of secure application behavior.\n\nLocks and shared resources need review for deadlocks, starvation, priority inversion, and hidden performance collapse. Safe Rust can make shared state safer, but it cannot decide which lock order, retry strategy, or queue policy is right for the application. Those are design decisions that should be tested and monitored.\n\nBackpressure and graceful degradation help systems fail in controlled ways. Connection pools, worker limits, bounded queues, timeouts, and clear rejection behavior can protect the application and its dependencies. Security includes availability and operational control, so concurrency design should be reviewed alongside input validation, error handling, and release behavior.",
  "narrationPoints": [
    "Rust's type system helps reduce data races in safe code.",
    "Async tasks should have clear ownership.",
    "Locks and shared resources need review for deadlocks.",
    "Backpressure and graceful degradation help systems fail.",
    "A service that accepts unlimited work can fail even.",
    "Those are design decisions that should be tested."
  ]
};
