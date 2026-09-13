window.COURSE_MODULE = {
  "title": "Custom Resource Types and Safe Abstractions",
  "graphicAlt": "A private resource wrapper exposes controlled operations and explicit open/closed states so early close and Drop cannot release twice.",
  "narration": "Rust applications often wrap resources that are not just ordinary memory: file descriptors, sockets, database handles, device handles, temporary directories, native handles, lock objects, or externally allocated buffers. A safe abstraction should make ownership and cleanup authority clear.\n\nPrivate fields are a powerful design tool. If callers cannot manufacture duplicate owners from raw handles, they are less likely to create duplicate cleanup paths. Constructors can validate that a handle is valid, establish ownership, and return a wrapper that controls how the resource is used and released.\n\nMethods should expose controlled operations rather than exposing raw cleanup mechanisms. A resource wrapper can provide read, write, query, close, flush, or shutdown behavior while keeping the actual release contract inside the type. `Drop` can then release the resource once when the wrapper's ownership ends.\n\nSome external resources provide idempotent close behavior, where repeated close calls are tolerated. That can be useful, but idempotence should not be a substitute for ownership clarity. If code depends on repeated cleanup calls being harmless, the lifecycle design is harder to review and may fail when the underlying resource changes.\n\nA good resource abstraction states who owns the resource, when cleanup happens, what happens on error, whether early close is allowed, and what methods remain valid after close or shutdown. The safe API should make duplicate cleanup difficult even when callers are under pressure during error handling.",
  "narrationPoints": [
    "Rust applications often wrap resources that are not just.",
    "Private fields are a powerful design tool.",
    "Methods should expose controlled operations rather than.",
    "Some external resources provide idempotent close behavior.",
    "A good resource abstraction states who owns the resource.",
    "A safe abstraction should make ownership and cleanup."
  ]
};
