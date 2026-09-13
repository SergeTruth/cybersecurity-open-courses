window.COURSE_MODULE = {
  "title": "Safe APIs, Encapsulation, and Invariants",
  "graphicAlt": "Private representation is accessed through public methods that preserve invariants, with direct mutation blocked.",
  "narration": "A safe API should make the correct path natural. Rust modules, visibility rules, ownership, borrowing, and type design help developers hide internal representation and expose controlled operations. The public interface should guide callers toward valid use instead of requiring them to remember fragile internal rules.\n\nEncapsulation matters because invariants are easy to break when too much internal state is public. If callers can directly change fields that must remain consistent, the type's safety story depends on caller discipline. A stronger design keeps representation private and exposes methods that preserve the expected relationships among fields.\n\nA library or internal module should define what it guarantees, what callers must provide, and what states are impossible through the public interface. Documentation is not only for external users. It helps internal reviewers understand the contract around ownership, mutation, lifetime, concurrency, error handling, and any unsafe assumptions hidden behind a safe wrapper.\n\nSafe APIs reduce the amount of code that needs to understand low-level details. Reviewers can focus on module boundaries and contracts rather than chasing every internal assumption across the codebase. When a boundary is clear, it becomes easier to test, document, harden, and maintain. Memory safety by design is often API design by another name.",
  "narrationPoints": [
    "A safe API should make the correct path natural.",
    "Encapsulation matters because invariants are easy to break.",
    "A library or internal module should define what it.",
    "Safe APIs reduce the amount of code that needs.",
    "The public interface should guide callers toward valid use.",
    "If callers can directly change fields that must remain."
  ]
};
