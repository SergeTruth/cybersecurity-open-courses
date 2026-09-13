window.COURSE_MODULE = {
  "title": "Concurrency, Async, and Resource Safety",
  "graphicAlt": "Shared asynchronous resources need narrow lock scope, bounded work, cancellation, and shutdown behavior beyond Arc ownership.",
  "narration": "Concurrent Rust frequently uses `Arc<T>` to share ownership across threads or async tasks. The pattern is common for configuration, clients, connection pools, queues, caches, metrics handles, and application state. `Arc<T>` solves the ownership problem of keeping a value alive while multiple tasks need it.\n\nWhen shared data must be mutated, ownership sharing is only one part of the design. The code still needs controlled access through synchronization, channels, ownership transfer, or specialized concurrent structures. A common pattern such as `Arc<Mutex<T>>` can be appropriate, but it should not be treated as a universal answer.\n\nLock scope deserves careful review. Holding a lock while performing unrelated work, waiting on slow operations, calling out to complex code, or crossing async boundaries can create reliability problems. The defensive pattern is to keep locked sections narrow, make lock ordering clear, and avoid mixing synchronization with work that does not need protected access.\n\nSmart pointers do not automatically prevent deadlock, starvation, priority inversion, unbounded queues, or unclear shutdown behavior. They make ownership explicit, but the concurrency design must still define who produces work, who consumes it, how backpressure works, and how resources are released when tasks stop.\n\nAsync systems also need cancellation and cleanup behavior. A shared handle may outlive a request. A task may be dropped before completing. A pool may need graceful shutdown. Reviewers should ask what happens when tasks are cancelled, whether cleanup is deterministic enough for the application, and whether shared resources have limits and observability.\n\nDefensive Rust treats smart pointers as one part of safe concurrent design. Use them to express ownership, then review synchronization, shutdown, limits, metrics, and error handling as first-class parts of the same lifecycle.",
  "narrationPoints": [
    "Concurrent Rust frequently uses `Arc<T>` to share ownership.",
    "When shared data must be mutated.",
    "Lock scope deserves careful review.",
    "Smart pointers do not automatically prevent deadlock.",
    "Async systems also need cancellation and cleanup behavior.",
    "Defensive Rust treats smart pointers as one part of safe."
  ]
};
