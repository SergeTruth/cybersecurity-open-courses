window.COURSE_MODULE = {
  "title": "Why Ownership Matters in Rust",
  "graphicAlt": "A value's ownership responsibility follows its creation, use, transfer, and cleanup.",
  "narration": "Ownership is the foundation of Rust's approach to memory safety. Instead of relying on a garbage collector in ordinary safe code, and instead of asking developers to manually free memory in routine application logic, Rust tracks which part of the program owns each value and when that value should be cleaned up.\n\nThis model gives the compiler a practical way to prevent many mistakes before runtime. A value has a responsible owner. That owner controls when the value is available, when it can be moved, when it can be borrowed, and when cleanup should occur. When ownership reaches the end of its scope, Rust can run cleanup predictably through the value's destructor behavior.\n\nOwnership is also a design tool. It makes developers answer important engineering questions: who is responsible for this data, who may read it, who may change it, and how long should it live? Those are security and reliability questions as much as language questions. Clear answers make code easier to review.\n\nCompiler feedback around ownership should not be treated as a nuisance to silence. It often shows that data flow is unclear, mutation is happening in the wrong place, a value is being used after responsibility has moved, or an API is asking for more control than it really needs. Good Rust design uses that feedback to make responsibility explicit.\n\nA secure Rust codebase benefits from ownership because data flow becomes visible. Reviewers can see where values are created, passed, borrowed, modified, returned, and cleaned up. That visibility helps teams write programs with fewer lifetime surprises, fewer accidental shared-mutation assumptions, and clearer resource management.",
  "narrationPoints": [
    "Ownership is the foundation of Rust's approach to memory.",
    "This model gives the compiler a practical way to prevent.",
    "Ownership is also a design tool.",
    "Compiler feedback around ownership should not be treated.",
    "A secure Rust codebase benefits from ownership.",
    "When ownership reaches the end of its scope."
  ]
};
