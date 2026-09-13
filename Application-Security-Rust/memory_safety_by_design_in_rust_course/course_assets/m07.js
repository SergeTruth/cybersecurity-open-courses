window.COURSE_MODULE = {
  "title": "Concurrency and Shared State Safety",
  "graphicAlt": "Send and Sync support data-race safety, while lock order, backpressure, and timeouts require explicit availability design.",
  "narration": "Rust helps prevent data races in safe code, which is a major advantage for concurrent systems. Traits such as Send and Sync express important thread-safety properties. They help the compiler decide when values can move across threads or be shared by reference. This makes many unsafe concurrent designs harder to write accidentally.\n\nSafe Rust still needs careful concurrency design. Shared state, locks, channels, atomics, task lifetimes, cancellation behavior, timeouts, queues, and resource limits all matter. The compiler can prevent many data races, but it cannot decide whether the chosen locking strategy is fair, whether a queue can grow forever, or whether a task should be cancelled when a request ends.\n\nAsync Rust adds more design questions. Tasks need clear ownership, timeout expectations, cancellation behavior, and error reporting. Blocking operations inside async contexts can create performance collapse. Unbounded task growth can harm availability. A memory-safe service can still fail if it accepts more work than it can process or holds resources longer than expected.\n\nLocks and shared resources should be reviewed for deadlocks, starvation, and hidden performance bottlenecks. Backpressure, bounded queues, worker limits, connection pool limits, and graceful degradation are safety controls. Memory safety by design includes protecting reliability because availability is part of secure software behavior.",
  "narrationPoints": [
    "Rust helps prevent data races in safe code.",
    "Safe Rust still needs careful concurrency design.",
    "Async Rust adds more design questions.",
    "Locks and shared resources should be reviewed for deadlocks.",
    "A memory-safe service can still fail if it accepts more.",
    "The compiler can prevent many data races."
  ]
};
