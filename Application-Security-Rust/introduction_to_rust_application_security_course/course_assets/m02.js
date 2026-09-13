window.COURSE_MODULE = {
  "title": "Ownership, Memory Safety, and unsafe Boundaries",
  "graphicAlt": "A small reviewed unsafe boundary sits inside a safe Rust application and connects to foreign code through a controlled interface.",
  "narration": "Ownership and borrowing help Rust enforce clear rules about memory access, mutation, and lifetime. In safe Rust, the compiler prevents many mistakes that can lead to memory corruption. It checks that values are not used after they are moved, that references do not outlive the data they point to, and that mutation follows clear borrowing rules. These guarantees are a major reason Rust is attractive for security-sensitive software.\n\nTeams still need to understand where the guarantees end. The unsafe keyword allows certain operations that the compiler cannot fully verify. Unsafe code is not automatically wrong, and some low-level libraries legitimately need it. But unsafe code changes the review expectation. It asks the human reviewer to confirm invariants that the compiler cannot prove on its own.\n\nA healthy Rust security practice keeps unsafe surface area small, isolated, justified, and documented. The code should explain what assumptions must hold, who owns the boundary, how callers are expected to use it, and what tests or reviews support those assumptions. Reviewers should be able to tell why unsafe is needed and why the safe wrapper around it is trustworthy.\n\nForeign function interfaces, raw pointers, global mutable state, low-level performance code, custom allocators, and platform integrations should be treated as boundary areas. Those areas may depend on contracts outside Rust's normal safety model. Secure teams make those contracts visible, test them carefully, and avoid letting unsafe assumptions spread casually through the application.",
  "narrationPoints": [
    "Ownership and borrowing help Rust enforce clear rules about.",
    "Teams still need to understand where the guarantees end.",
    "A healthy Rust security practice keeps unsafe surface area.",
    "Foreign function interfaces.",
    "The unsafe keyword allows certain operations.",
    "But unsafe code changes the review expectation."
  ]
};
