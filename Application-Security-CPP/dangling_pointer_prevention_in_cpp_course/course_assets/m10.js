window.COURSE_MODULE = {
  "title": "Course Summary: A Lifetime Safety Roadmap",
  "graphicAlt": "Lifetime-safety roadmap connecting ownership types, invalidation rules, temporary views, API contracts, refactoring, and sanitizer diagnostics.",
  "narration": "Dangling pointer prevention begins with ownership. Before optimizing pointer usage or changing storage strategy, clarify who owns each object, who may borrow it, who may store access to it, and who is responsible for destruction. When ownership is clear, many lifetime decisions become simpler.\n\nUse RAII to make cleanup predictable. Use values when ownership is simple. Use std::unique_ptr for exclusive dynamic ownership. Use std::shared_ptr only when shared ownership is truly part of the design, and use std::weak_ptr when observation should not keep an object alive.\n\nKeep borrowed access short, local, and explicit. Raw pointers, references, spans, string views, iterators, and handles are useful, but they depend on the owner. A borrowed value should not be stored or scheduled for later use unless the lifetime relationship is visible and tested.\n\nTreat containers, temporaries, callbacks, captures, and asynchronous work with care. Container mutation can invalidate observers. Views can outlive their storage. Captured references can outlive local variables. Deferred work can run after the expected owner has changed state or ended.\n\nFinally, reinforce the design with tests, diagnostics, review, and governance. Use sanitizers, debug library modes, compiler diagnostics, and lifecycle-focused tests in development and CI. Review lifetime-sensitive code deliberately. Document remaining assumptions and revisit them as the codebase evolves.",
  "narrationPoints": [
    "Dangling pointer prevention begins with ownership.",
    "Use std::unique_ptr for exclusive dynamic ownership.",
    "Keep borrowed access short, local, and explicit.",
    "Treat containers, temporaries, callbacks, captures, and asynchronous work with care.",
    "Deferred work can run after the expected owner has changed state or ended.",
    "Document remaining assumptions and revisit them as the codebase evolves."
  ]
};
