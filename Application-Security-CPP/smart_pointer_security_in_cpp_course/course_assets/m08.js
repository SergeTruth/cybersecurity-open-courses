window.COURSE_MODULE = {
  "title": "Concurrency and Shared Lifetime",
  "graphicAlt": "Reference-count lifetime management is separate from synchronization of mutable state and the shutdown rules of asynchronous work.",
  "narration": "std::shared_ptr makes reference-count ownership operations safe to use across threads, but that does not make the pointed-to object itself safe for concurrent access. The control block can manage lifetime while the object still needs synchronization, immutability, thread confinement, message passing, or another concurrency strategy. Lifetime safety and data-race safety are related, but they are not the same guarantee.\n\nCapturing smart pointers in threads, tasks, callbacks, and asynchronous continuations is common. Capturing a shared_ptr can intentionally keep an object alive until work finishes. That can be the right design when the work requires the object to exist. It can also delay cleanup, retain sensitive state longer than intended, or create cycles when callbacks hold owners that also own the callback.\n\nWeak observation is often useful in asynchronous code. A task can store a weak_ptr , lock it when it runs, and skip work if the target no longer exists. This supports cancellation-friendly behavior, but it still needs clear handling for expiration and still needs synchronization for mutable state.\n\nConcurrent systems need documented ownership and shutdown rules. Who owns work while it is queued? What happens during cancellation? Can callbacks outlive their registrants? What protects shared state? Tests should cover delayed execution, shutdown order, cancellation paths, and repeated registration. Smart pointers help express lifetime, but they do not replace a concurrency design.",
  "narrationPoints": [
    "The control block can manage lifetime while the object still needs synchronization, immutability, thread confinement, message passing, or another concurrency strategy.",
    "std::shared_ptr makes reference-count ownership operations safe to use across threads, but that does not make the pointed-to object itself safe for concurrent access.",
    "Capturing a shared_ptr can intentionally keep an object alive until work finishes.",
    "A task can store a weak_ptr , lock it when it runs, and skip work if the target no longer exists.",
    "Smart pointers help express lifetime, but they do not replace a concurrency design.",
    "Tests should cover delayed execution, shutdown order, cancellation paths, and repeated registration."
  ]
};
