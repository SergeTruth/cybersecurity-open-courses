window.COURSE_MODULE = {
  "title": "Raw Pointers, References, and Borrowed Access",
  "graphicAlt": "Buffer boundary showing size validation before allocation and an owned vector copy crossing the lifetime boundary instead of a span.",
  "narration": "Raw pointers and references are not automatically unsafe. They are ordinary C++ tools. They become risky when their meaning is unclear. In modern C++ code, a raw pointer should usually communicate non-owning access unless the project has an explicit and consistently enforced convention.\n\nReferences also depend on lifetime. A reference cannot be reseated and is not null in normal use, but it still refers to an object that must remain alive. A reference member, cached reference, or reference captured by a callable can become a lifetime problem when the referenced object ends first.\n\nStoring borrowed access is more demanding than using it briefly. A function parameter that is used only during the call is usually easier to reason about. A member variable, global cache, callback capture, or deferred task that stores a pointer or reference needs a stronger contract because the owner must remain valid for longer.\n\nFunction signatures should make ownership expectations clear. Passing by value can communicate independent ownership of a copy. Passing by reference can communicate required borrowed access during the call. Passing a pointer can communicate optional or non-owning access when the convention is clear. Transferring ownership should use a type that says so directly.\n\nGood API contracts state whether the callee owns, borrows, stores, or merely observes a value. They also state whether null is permitted, whether the value may be retained after return, and what object is responsible for keeping it alive. That contract turns hidden lifetime assumptions into reviewable engineering decisions.",
  "narrationPoints": [
    "Raw pointers and references are not automatically unsafe.",
    "A reference cannot be reseated and is not null in normal use, but it still refers to an object that must remain alive.",
    "A function parameter that is used only during the call is usually easier to reason about.",
    "Passing by value can communicate independent ownership of a copy.",
    "Transferring ownership should use a type that says so directly.",
    "That contract turns hidden lifetime assumptions into reviewable engineering decisions."
  ]
};
