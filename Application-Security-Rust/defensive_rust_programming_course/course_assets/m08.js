window.COURSE_MODULE = {
  "title": "Concurrency, Async, and Resource Safety",
  "graphicAlt": "Concurrency remains governed by bounded queues, worker limits, timeouts, cancellation, and narrow critical sections.",
  "narration": "Rust helps prevent data races in safe code, but defensive programming still matters in concurrent and async systems. Shared state, locks, channels, atomics, task lifetimes, cancellation, timeouts, connection pools, file handles, queues, and memory limits can all affect security and reliability. Memory safety is a major advantage, but it is not the same as operational resilience.\n\nShared state needs deliberate synchronization design. Traits such as Send and Sync express important thread-safety properties, but developers still choose the concurrency model. A lock may protect memory safety while still creating deadlock or starvation risk. A channel may simplify ownership while still allowing unbounded work to accumulate.\n\nAsync Rust adds additional design questions around task ownership, cancellation, timeout behavior, and blocking operations. A service can fail because it accepts unbounded work, waits forever, blocks the wrong executor, or holds a lock across an operation that should not block. These are defensive design issues, not just performance tuning details.\n\nResource controls are security controls. Bounded queues, connection limits, request timeouts, worker limits, backpressure, and graceful degradation help preserve availability when the system is stressed. A memory-safe application can still become unavailable if it does not control work, memory, and external dependency pressure.\n\nDefensive Rust designs concurrency around clear ownership, bounded resources, observable failure, and recoverable behavior. Reviewers should ask what happens when requests spike, dependencies slow down, tasks are cancelled, or partial work must be cleaned up. The safest concurrent design is the one future maintainers can explain.",
  "narrationPoints": [
    "Rust helps prevent data races in safe code.",
    "Shared state needs deliberate synchronization design.",
    "Async Rust adds additional design questions around task.",
    "Resource controls are security controls.",
    "Defensive Rust designs concurrency around clear ownership.",
    "A lock may protect memory safety."
  ]
};
