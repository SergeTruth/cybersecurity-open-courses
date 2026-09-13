window.COURSE_MODULE = {
  "title": "Concurrency, Context, and Cancellation",
  "graphicAlt": "Worker ownership, deadlines, error returns and cancellation combine with channel ownership, synchronized shared state and graceful shutdown.",
  "narration": "Go's concurrency model is one of its strengths, but concurrency still needs design. A goroutine should have an owner, a reason to exist, an error path, and a way to stop. Unbounded goroutines, missing cancellation, blocked sends, and forgotten workers can turn a clean service into one that leaks resources or behaves unpredictably under load.\n\ncontext.Context is an important tool for defensive services. Context can carry deadlines, cancellation signals, and request scope through handlers, database calls, service clients, and background work. It should not become a general storage bag, but it should make cancellation and time limits visible as work moves across boundaries.\n\nChannels need clear rules. Teams should know who sends, who receives, who closes, whether buffering is intentional, and what happens during shutdown. Ambiguous channel ownership can lead to blocked work, missed errors, or panics during cleanup. The safest channel designs are simple enough to explain during review.\n\nShared state needs synchronization. Mutexes, atomic values, channel ownership, immutable copies, and single-writer designs can all be reasonable when used deliberately. Race conditions can become more than reliability issues when they affect authorization state, cached configuration, session data, counters, limits, or security decisions.\n\nGraceful shutdown protects data integrity and operational stability. A service should stop accepting new work, cancel or finish in-flight work according to policy, flush important logs or metrics, and release resources. Concurrency is secure when its lifecycle is bounded, observable, and testable. The review question is simple: if this goroutine starts, who can stop it, who sees its error, and what data remains consistent?",
  "narrationPoints": [
    "Go's concurrency model is one of its strengths, but concurrency still needs design.",
    "context.Context is an important tool for defensive services.",
    "Channels need clear rules.",
    "Shared state needs synchronization.",
    "Graceful shutdown protects data integrity and operational stability."
  ]
};
