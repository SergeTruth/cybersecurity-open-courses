window.COURSE_MODULE = {
  "title": "Safe Rust Guarantees and Unsafe Responsibilities",
  "graphicAlt": "Compiler checks for types, ownership, and borrowing remain while unsafe operations require documented preconditions, invariants, and review evidence.",
  "narration": "Safe Rust gives strong guarantees around memory access, aliasing, lifetimes, and data races in safe code. Those guarantees let developers build abstractions with confidence. When a value is borrowed immutably, safe Rust limits mutation through that reference. When a reference has a lifetime, the compiler checks that it does not outlive the data it points to.\n\nUnsafe does not turn off the whole language. Rust still has types, ownership, borrowing, pattern matching, modules, visibility, and ordinary compiler checks around the unsafe operation. What unsafe does is permit specific operations whose correctness depends on promises the compiler cannot verify completely.\n\nThe distinction is responsibility. Safe code relies heavily on compiler enforcement. Unsafe code relies on a combination of compiler checks, human reasoning, documented invariants, tests, and careful review. The programmer must know which rule is being manually upheld and why the surrounding code preserves it.\n\nUndefined behavior should be understood at a safe conceptual level: it is behavior the program must avoid because the language no longer promises predictable results. Defensive unsafe Rust does not explore undefined behavior or treat it as a clever edge. It designs code so the documented preconditions keep execution within valid behavior.\n\nReview expectations are higher around unsafe code because the evidence burden is higher. Reviewers should ask what safe Rust could not express, what assumptions are being made, how those assumptions are documented, how callers are constrained, and how tests or tools support the safety story.",
  "narrationPoints": [
    "Safe Rust gives strong guarantees around memory access.",
    "Unsafe does not turn off the whole language.",
    "The distinction is responsibility.",
    "Undefined behavior should be understood at a safe.",
    "Review expectations are higher around unsafe code.",
    "What unsafe does is permit specific operations whose."
  ]
};
