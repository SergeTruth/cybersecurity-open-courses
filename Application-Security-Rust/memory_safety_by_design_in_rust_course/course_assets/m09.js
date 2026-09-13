window.COURSE_MODULE = {
  "title": "Course Summary: Memory Safety Design Checklist",
  "graphicAlt": "Clear ownership, valid states, invariant-preserving APIs, small trusted boundaries, and ongoing evidence summarize memory safety by design.",
  "narration": "Memory safety by design in Rust is a layered engineering practice. Use ownership and borrowing to make responsibility clear. Let lifetimes, references, and the borrow checker expose design questions early. Model valid states with types so invalid combinations are harder to express and downstream code receives clearer guarantees.\n\nBuild safe APIs that protect invariants. Keep internal representation private when callers should not modify it directly. Define what public interfaces guarantee, what callers must provide, and which states are impossible through safe use. Prefer checked access, clear parsing boundaries, and explicit rejection behavior when working with collections, strings, slices, and external input.\n\nTreat unsafe code, FFI, and concurrency as small, documented trust boundaries. Unsafe code should be isolated, justified, reviewed, and wrapped in safe APIs where practical. FFI should document ownership, allocation, thread, pointer, and representation assumptions. Concurrent and async designs need explicit ownership, synchronization, cancellation, backpressure, and resource limits.\n\nFinally, support compiler checks with tests, tools, review, and continuous improvement. Test boundary cases and unusual input. Use tooling where it fits the risk. Review assumptions around unsafe, indexing, panics, public contracts, shared state, and dependencies. Rust gives strong safety tools; disciplined design turns those tools into dependable software.",
  "narrationPoints": [
    "Memory safety by design in Rust is a layered engineering.",
    "Build safe APIs that protect invariants.",
    "Treat unsafe code.",
    "Finally, support compiler checks with tests, tools, review,.",
    "Use ownership and borrowing to make responsibility clear.",
    "Keep internal representation private."
  ]
};
