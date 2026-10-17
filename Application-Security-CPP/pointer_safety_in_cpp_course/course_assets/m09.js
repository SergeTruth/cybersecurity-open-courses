window.COURSE_MODULE = {
  "title": "Course Summary: Pointer Safety Review Habits",
  "graphicAlt": "Summarize pointer role contract, safer types, async checks and tooling.",
  "narration": "Pointer safety review begins by identifying the role of every pointer. Does it own, borrow, observe, describe a buffer, accept optional input, or represent an external handle? Once the role is clear, the reviewer can check the matching contract: lifetime, nullability, mutability, bounds, storage, and cleanup.\n\nAvoid raw ownership in new designs. Prefer RAII, containers, references for required non-null access, smart pointers for ownership, spans for bounded views, and focused wrappers for legacy handles. Keep borrowed access short-lived, and do not store raw pointers unless the lifetime relationship is explicit and tested.\n\nPreserve bounds with data. Validate pointer-plus-length pairs, index calculations, output parameters, and assumptions about null termination. Review callbacks, async work, captured this pointers, and containers of pointers carefully because they use access later, often after the original scope has ended.\n\nFinally, use tooling and workflow. Compiler warnings, sanitizers, static analysis, focused tests, and code review can reveal pointer mistakes earlier. A short checklist during review helps: identify the role, find the owner, find the bounds, and confirm the pointer is never used after its contract ends. The durable habit is simple: never leave pointer meaning to inference when the code can make it explicit.",
  "narrationPoints": [
    "Once the role is clear, the reviewer can check the matching contract: lifetime, nullability, mutability, bounds, storage, and cleanup.",
    "Pointer safety review begins by identifying the role of every pointer.",
    "Prefer RAII, containers, references for required non-null access, smart pointers for ownership, spans for bounded views, and focused wrappers for legacy handles.",
    "Validate pointer-plus-length pairs, index calculations, output parameters, and assumptions about null termination.",
    "Callbacks, asynchronous work, captured this pointers, and pointer containers require explicit lifetime review before deferred access.",
    "Compiler warnings, sanitizers, static analysis, focused tests, and code review can reveal pointer mistakes earlier."
  ]
};
