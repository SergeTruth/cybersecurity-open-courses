window.COURSE_MODULE = {
  "title": "The Unsafe Operations",
  "graphicAlt": "Five unsafe operation categories are illustrated: raw-pointer dereferencing, unsafe function calls, mutable statics, unsafe trait implementations, and union-field reads.",
  "narration": "Unsafe Rust is not a vague label. It is tied to specific categories of operations that need extra care. Code may need unsafe to dereference raw pointers, call unsafe functions, access or modify mutable static variables, implement unsafe traits, or access fields of unions. Each category asks the programmer to uphold rules the compiler cannot fully check.\n\nRaw pointer dereferencing requires review of validity, alignment, initialization, lifetime, and aliasing assumptions. A pointer-like value is not the same as a Rust reference. The code must establish that the memory is live, suitable for the type, and used according to the rules the abstraction depends on.\n\nCalling an unsafe function means the caller must satisfy preconditions that the compiler cannot check. The function may require a pointer to be valid, a buffer length to be accurate, a value to follow a representation contract, or a thread-safety condition to hold. Review should look at both the function contract and the caller's evidence.\n\nMutable statics introduce global shared-state concerns. Any design that allows process-wide mutable state needs careful synchronization and clear ownership. Unsafe traits are also sensitive because other code may rely on the implementer correctly upholding guarantees. A wrong implementation can break assumptions far away from where it appears.\n\nUnion field access depends on representation and initialization assumptions. Reviewers should ask what data is active, how that is known, and how the abstraction prevents accidental misuse. The practical goal of this module is recognition: when you see one of these categories, you know what kind of safety questions to ask.",
  "narrationPoints": [
    "Unsafe Rust is not a vague label.",
    "Raw pointer dereferencing requires review of validity.",
    "Calling an unsafe function means the caller must satisfy.",
    "Mutable statics introduce global shared-state concerns.",
    "Union field access depends on representation.",
    "Each category asks the programmer to uphold rules."
  ]
};
