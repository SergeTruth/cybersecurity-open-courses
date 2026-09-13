window.COURSE_MODULE = {
  "title": "Lifetimes and Valid References",
  "graphicAlt": "Valid reference lifetime stays within the owner's lifetime; annotations describe rather than extend that relationship.",
  "narration": "Lifetimes are Rust's way of reasoning about reference validity. A reference must not outlive the data it points to. That rule prevents a function, struct, or caller from keeping a reference to a value that has already been moved, dropped, or otherwise made unavailable.\n\nMost lifetime reasoning is inferred automatically. In everyday Rust code, developers often write references without explicit lifetime annotations. The compiler can usually determine how long those references are valid based on scope, ownership, and how values are used. That inference keeps common code readable while still enforcing safety.\n\nLifetime annotations appear when relationships among references need to be described explicitly. An annotation does not make data live longer. It tells the compiler that one reference's validity is related to another value's lifetime. If the relationship is not true, the compiler rejects the code rather than allow an invalid reference.\n\nReturning references requires a valid owner relationship. A function cannot safely return a reference to a temporary local value that will disappear when the function ends. It can return a reference tied to an input if the input owner lives long enough. It can also return owned data when the function creates something new that must survive after the call.\n\nLifetime errors are design feedback. They often mean ownership is unclear, a reference is trying to outlive its owner, or a function is promising more than it can safely provide. Good refactoring options include returning owned data, keeping the owner alive longer, restructuring data ownership, or avoiding references to temporary values.",
  "narrationPoints": [
    "Lifetimes are Rust's way of reasoning about reference.",
    "Most lifetime reasoning is inferred automatically.",
    "Lifetime annotations appear.",
    "Returning references requires a valid owner relationship.",
    "Lifetime errors are design feedback.",
    "A reference must not outlive the data it points."
  ]
};
