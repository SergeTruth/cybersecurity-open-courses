window.COURSE_MODULE = {
  "title": "Course Summary: Unsafe Rust Review Checklist",
  "graphicAlt": "An unsafe Rust review sequence justifies the need, limits scope, states the safety contract, protects invariants, and tests and maintains the boundary.",
  "narration": "Unsafe Rust is a disciplined engineering tool. Use it only when safe Rust cannot express the required behavior clearly enough. Before accepting unsafe code, ask what low-level need it serves, why a safe alternative is not sufficient, and whether the scope can be smaller. Unsafe should earn its place in the design.\n\nKeep unsafe code small, isolated, justified, and documented. Treat every unsafe block as a boundary with a safety contract. The contract should explain preconditions, invariants, caller obligations, ownership expectations, lifetime assumptions, thread assumptions, layout assumptions, and error behavior. A comment that merely says the code is safe is not enough.\n\nReview raw pointers, aliasing, lifetimes, layout, mutable statics, unsafe traits, and FFI assumptions carefully. Prefer safe wrappers that protect invariants and prevent ordinary safe callers from breaking unsafe assumptions. The best unsafe abstraction makes the difficult reasoning local while exposing a clear, safe interface to the rest of the code.\n\nFinally, maintain unsafe code over time. Test boundaries and regression cases. Use review tooling where it fits. Update safety documentation when surrounding code changes. Revisit unsafe areas as dependencies, platforms, compilers, and APIs evolve. The goal is to use, review, document, test, and maintain unsafe Rust as a small, justified, controlled trust boundary.",
  "narrationPoints": [
    "Unsafe Rust is a disciplined engineering tool.",
    "Keep unsafe code small, isolated, justified, and documented.",
    "Review raw pointers.",
    "Finally, maintain unsafe code over time.",
    "Use it only.",
    "Unsafe should earn its place in the design."
  ]
};
