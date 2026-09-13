window.COURSE_MODULE = {
  "title": "Course Summary: Lifetime Security Checklist",
  "graphicAlt": "The lifetime review checklist identifies owners, narrows borrows, chooses owned returns when needed, and checks boundary contracts.",
  "narration": "Lifetimes for security are a practical design and review discipline. Start by identifying the owner before reasoning about a reference. A reference is valid only because some owner keeps the data alive. If the owner cannot outlive the reference, the design should change.\n\nKeep borrows narrow and tied to real use. Avoid holding references across unrelated work. Be careful with temporary values, borrowed fields, collection references, and data that crosses async or thread boundaries. Shorter, clearer lifetimes make code easier for the compiler and easier for humans to review.\n\nUse annotations to describe real relationships, not to force a design that should own data instead. If a function cannot return a valid borrowed reference, return owned data. If a struct with borrowed fields makes the API difficult for callers, consider whether owned or shared data would be clearer.\n\nTreat async tasks, threads, unsafe code, and FFI as areas that need explicit lifetime review. These boundaries may outlive local scopes or move beyond what Rust can fully check. Document safety contracts, test boundary behavior, and update lifetime assumptions as APIs and dependencies evolve.\n\nThe main goal is clear trust boundaries. Lifetimes help Rust teams design code with valid references, visible ownership relationships, safe APIs, and reviewable data flow. That is why lifetimes matter not only for compilation, but for secure engineering.",
  "narrationPoints": [
    "Lifetimes for security are a practical design and review.",
    "Keep borrows narrow and tied to real use.",
    "Use annotations to describe real relationships.",
    "Treat async tasks.",
    "The main goal is clear trust boundaries.",
    "If the owner cannot outlive the reference."
  ]
};
