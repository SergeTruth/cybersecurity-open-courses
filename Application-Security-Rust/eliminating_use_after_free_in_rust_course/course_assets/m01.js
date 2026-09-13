window.COURSE_MODULE = {
  "title": "Why Use-After-Free Matters",
  "graphicAlt": "A value is created, used while valid, and cleaned up; stale access after its lifetime is blocked.",
  "narration": "A use-after-free condition happens when code continues to use memory or an object after its valid lifetime has ended. In manual-memory environments, this class of mistake has caused serious reliability and security failures because stale references can point to data that is no longer valid for the original purpose.\n\nThe defensive concept is lifecycle integrity. A value is created, used, possibly shared or borrowed, and eventually cleaned up. If some part of the program keeps acting as though the value is still valid after cleanup, the program is no longer reasoning about the object that it thinks it is using.\n\nRust changes the default model by making ownership, borrowing, and lifetimes part of the language. Safe Rust prevents ordinary references from outliving the values they borrow. It also prevents moved values from being used as though ownership still exists. Those rules turn many stale-access risks into compiler feedback.\n\nThis does not mean every Rust boundary is automatically safe. Risk can re-enter through unsafe code, raw pointers, foreign function interfaces, external libraries, callback registration, allocators, and low-level abstractions where the compiler cannot fully check the lifetime contract. Those areas need deliberate review.\n\nUse-after-free prevention in Rust is lifecycle design. Know who owns each value. Know who may borrow it. Know when cleanup happens. Know where references, callbacks, tasks, and external code can outlive the scope that created them. The safe path should make invalid lifetime relationships impossible or at least explicit.",
  "narrationPoints": [
    "A use-after-free condition happens.",
    "The defensive concept is lifecycle integrity.",
    "Rust changes the default model by making ownership.",
    "This does not mean every Rust boundary is automatically.",
    "Use-after-free prevention in Rust is lifecycle design.",
    "Know where references."
  ]
};
