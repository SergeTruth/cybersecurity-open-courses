window.COURSE_MODULE = {
  "title": "Course Summary: Use-After-Free Prevention Checklist",
  "graphicAlt": "Preventing stale access requires explicit ownership, valid lifetimes, defined shutdown, and reviewed FFI contracts.",
  "narration": "Use-after-free prevention in Rust is a layered engineering practice. Prefer safe ownership and borrowing. Know who owns each value, who may borrow it, and when cleanup happens. Keep lifetime relationships visible in function signatures, type design, and module boundaries.\n\nReturn owned data when no valid borrowed owner remains. Avoid references into short-lived internals. Encapsulate internal state so callers cannot depend on temporary locations or invalid handles. Use constructors and domain types to represent valid owned state instead of spreading lifetime assumptions across callers.\n\nUse shared ownership only when it matches the design. Understand how `Rc`, `Arc`, and `Weak` affect cleanup timing. Make async and thread ownership explicit. Define cancellation and shutdown behavior for long-lived tasks. Keep shared mutation synchronized and reviewable.\n\nKeep unsafe and FFI boundaries small, documented, tested, and wrapped in safe APIs. Review callbacks, raw pointers, allocation contracts, deallocation responsibility, retained pointers, and cleanup paths. The wrapper should prevent safe callers from creating stale access.\n\nFinally, maintain lifecycle safety over time. Test construction, transfer, shutdown, cancellation, failed initialization, and regression cases. Update safety contracts as APIs evolve. The goal is Rust code where stale access is prevented by ownership, made visible by lifetimes, and contained by careful boundary design.",
  "narrationPoints": [
    "Use-after-free prevention in Rust is a layered engineering.",
    "Return owned data when no valid borrowed owner remains.",
    "Use shared ownership only when it matches the design.",
    "Keep unsafe and FFI boundaries small.",
    "Finally, maintain lifecycle safety over time.",
    "Use constructors and domain types to represent valid owned."
  ]
};
