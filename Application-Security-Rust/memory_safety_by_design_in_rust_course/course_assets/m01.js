window.COURSE_MODULE = {
  "title": "Why Memory Safety by Design Matters",
  "graphicAlt": "Memory safety is supported by ownership, valid-state types, safe APIs, boundary review, and compiler checks.",
  "narration": "Memory safety is not just a compiler feature. It is a design outcome produced by language rules, API boundaries, data modeling, review practices, and operational discipline. Rust gives developers a major advantage because safe Rust prevents many memory-corruption mistakes that teams have historically had to control through convention, testing, and defensive review.\n\nThat advantage matters because memory-safety problems are often rooted in unclear ownership, invalid references, unchecked assumptions, and boundary confusion. Rust's ownership model, borrowing rules, lifetimes, and type system push those questions into the open. The compiler asks who owns a value, who may borrow it, when it may be mutated, and how long a reference remains valid.\n\nCompiler guarantees do not remove developer responsibility. A Rust program can still expose unsafe public APIs, model data poorly, panic in fragile paths, trust invalid input, misuse unsafe code, or rely on an FFI boundary whose assumptions are not documented. Memory safety improves when teams design APIs and data flows so invalid states and unclear ownership are difficult to express.\n\nThe defensive goal is safe defaults, clear ownership, small trusted boundaries, and reviewable code. The compiler is a powerful partner, but teams still need to design for maintainability, test edge cases, review unsafe boundaries, and verify that abstractions preserve their promises. Rust supports memory safety strongly; disciplined design turns that support into dependable software.\n\nA practical memory-safety review therefore looks beyond individual lines. It asks whether ownership is visible, whether public APIs preserve invariants, whether data is validated at the right boundary, whether unsafe code is isolated, and whether future maintainers can understand the design without guessing. Rust makes those reviews more productive because many low-level mistakes are already constrained.",
  "narrationPoints": [
    "Memory safety is not just a compiler feature.",
    "That advantage matters.",
    "Compiler guarantees do not remove developer responsibility.",
    "The defensive goal is safe defaults.",
    "A practical memory-safety review therefore looks beyond.",
    "It is a design outcome produced by language rules."
  ]
};
