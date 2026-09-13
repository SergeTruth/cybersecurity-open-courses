window.COURSE_MODULE = {
  "title": "Drop Semantics and Resource Lifecycle",
  "graphicAlt": "Normal scope completion and error handling converge on the owning value's single Drop cleanup path.",
  "narration": "`Drop` is Rust's structured cleanup mechanism. When an owned value reaches the end of its scope, Rust runs the cleanup logic for that value. This deterministic behavior helps developers reason about memory, files, sockets, buffers, locks, handles, and other resources without scattering manual release calls throughout ordinary code.\n\nThe important point is that cleanup is tied to ownership. A value is dropped when its owner ends, not when any random reference stops using it. That connection is what prevents safe borrowed access from becoming cleanup authority and what keeps release behavior aligned with the ownership model.\n\nCustom `Drop` implementations can be useful when a type owns a resource that needs explicit release. They can close a file descriptor, release a native handle, return a buffer to a pool, or notify another component that ownership has ended. Because they define cleanup behavior, they deserve careful review.\n\nCleanup ordering also matters. Fields are dropped when their owner is dropped. Partially initialized states, error paths, and wrapper types should be designed so cleanup remains predictable. A resource-owning type should not rely on scattered flags or external calls when ownership can express the lifecycle more clearly.\n\nDefensive Rust keeps cleanup paths simple, testable, and easy to audit. If the same resource appears to be released through several paths, ask whether there is truly one owner. If manual release is still needed, document how it interacts with `Drop` so cleanup cannot happen twice.",
  "narrationPoints": [
    "`Drop` is Rust's structured cleanup mechanism.",
    "cleanup is tied to ownership.",
    "Custom `Drop` implementations can be useful.",
    "Cleanup ordering also matters.",
    "Defensive Rust keeps cleanup paths simple.",
    "When an owned value reaches the end of its scope."
  ]
};
