window.COURSE_MODULE = {
  "title": "Ownership, Deref, and Drop Foundations",
  "graphicAlt": "Deref provides pointer-like access, while Drop follows the wrapper's cleanup contract; different wrappers use different enforcement mechanisms.",
  "narration": "Most Rust smart pointers build on a few foundational ideas. Ownership determines which value is responsible for cleanup. Borrowing controls temporary access without transferring ownership. Smart pointers combine these ideas with pointer-like behavior so code can access data indirectly while still keeping ownership rules visible.\n\n`Deref` is the trait that allows many smart pointers to behave like references for access. In practical terms, it lets code call methods or read data through a wrapper without manually unpacking the pointer every time. That convenience is useful, but it should not make every smart pointer feel interchangeable. The wrapper still carries important ownership semantics.\n\n`Drop` is the cleanup side of the contract. When an owner goes out of scope, Rust runs drop behavior for the owned value. For a simple owner this is straightforward. For smart pointers, drop behavior may release heap memory, decrement a reference count, unlock or release a resource, close a handle, or trigger cleanup only when the final owner disappears.\n\nBorrowing through a smart pointer should still be understood in terms of access rules. Some pointers preserve compile-time borrowing. Others introduce runtime borrow checks, reference counts, or synchronization. That distinction matters during review because it changes what failure modes are possible and where they appear.\n\nA smart pointer type is an API contract. It tells callers whether they receive ownership, shared ownership, borrowed access, interior mutability, or synchronized access. Good Rust APIs make that contract obvious, keep pointer types as simple as the design allows, and avoid using smart pointers to hide unclear lifecycle decisions.",
  "narrationPoints": [
    "Most Rust smart pointers build on a few foundational ideas.",
    "`Deref` is the trait that allows many smart pointers.",
    "`Drop` is the cleanup side of the contract.",
    "Borrowing through a smart pointer should still.",
    "A smart pointer type is an API contract.",
    "That convenience is useful."
  ]
};
