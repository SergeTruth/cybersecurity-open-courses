window.COURSE_MODULE = {
  "title": "Designing APIs That Prevent Stale References",
  "graphicAlt": "APIs make borrowing, ownership transfer, and owned returns explicit while encapsulating temporary internal state.",
  "narration": "Use-after-free prevention is not only a compiler feature. It is also an API design practice. A good API communicates whether the caller transfers ownership, borrows temporarily, receives owned data, or receives a reference tied to an existing owner. The signature should tell the lifecycle story.\n\nOwned returns are often safer when there is no durable owner to borrow from. If a function builds a result, normalizes input, or extracts a value that needs to survive beyond the input scope, returning an owned value can be clearer than forcing a borrowed relationship that is hard to satisfy.\n\nEncapsulation protects internal state lifetimes. A type can own its resources and expose methods that do not leak references into short-lived internals. Callers interact with stable operations instead of depending on private buffer locations, temporary parsing state, or internal handles that may be cleaned up later.\n\nConstructors and domain types can assemble validated owned data. Instead of passing around loosely related handles, flags, and references, an API can validate once and then expose a type that represents a valid resource state. This reduces repeated lifetime assumptions across the codebase.\n\nThe safe path should be obvious. If callers can accidentally store a borrowed reference beyond the owner, retain a callback after cleanup, or use a handle after shutdown, the API is asking too much of its users. Defensive API design makes invalid lifetime relationships difficult or impossible to express in safe code.",
  "narrationPoints": [
    "Use-after-free prevention is not only a compiler feature.",
    "Owned returns are often safer.",
    "Encapsulation protects internal state lifetimes.",
    "Constructors and domain types can assemble validated owned.",
    "The safe path should be obvious.",
    "The signature should tell the lifecycle story."
  ]
};
