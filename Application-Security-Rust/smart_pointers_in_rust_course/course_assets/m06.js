window.COURSE_MODULE = {
  "title": "Interior Mutability and Runtime Borrow Rules",
  "graphicAlt": "Cell supports replacement-style mutation, RefCell checks borrows at runtime, and locks coordinate threaded access.",
  "narration": "Rust normally enforces borrowing rules at compile time. That is the preferred path because invalid access patterns are rejected before the program runs. Interior mutability types exist for cases where the design needs mutation through a shared structure and the rules cannot be expressed with ordinary borrowing alone.\n\n`Cell<T>` supports simple replacement-oriented patterns for copyable or movable values. It can be useful for small pieces of internal state where the operation is limited and easy to understand. The important review point is that mutation is still intentional and scoped, not a hidden workaround for unclear ownership.\n\n`RefCell<T>` enforces borrowing rules at runtime. It allows code to request shared or mutable borrows dynamically, and it can fail if the rules are violated. That makes `RefCell<T>` useful for certain single-threaded structures, tests, or graph-like designs, but runtime borrow failures are operational concerns that should be considered during review.\n\nFor threaded code, `Mutex<T>` and `RwLock<T>` coordinate access through locking. These types are synchronization tools, not only smart pointers. They can make shared mutation safe when used correctly, but they also introduce questions about lock scope, contention, failure handling, and whether a simpler ownership model could avoid shared mutation entirely.\n\nInterior mutability should be documented. Explain why compile-time borrowing did not fit the design, what invariant the wrapper protects, how long borrows or locks are held, and what happens on failure. Defensive Rust uses these tools to make a necessary pattern safe and explicit, not to hide a design that has become too tangled to reason about.",
  "narrationPoints": [
    "Rust normally enforces borrowing rules at compile time.",
    "`Cell<T>` supports simple replacement-oriented patterns.",
    "`RefCell<T>` enforces borrowing rules at runtime.",
    "For threaded code.",
    "Interior mutability should be documented.",
    "The important review point is that mutation is still."
  ]
};
