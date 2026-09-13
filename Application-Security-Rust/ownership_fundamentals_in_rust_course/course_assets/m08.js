window.COURSE_MODULE = {
  "title": "Shared Ownership, Smart Pointers, and Concurrency",
  "graphicAlt": "Box provides owned indirection, Rc shares within one thread, and Arc supports appropriate cross-thread sharing; mutation needs separate control.",
  "narration": "Single ownership is the default in Rust, but some designs need shared ownership or indirection. Smart pointers support these patterns while still keeping responsibility visible. They are not escape hatches from ownership. They are tools for expressing more specific ownership designs.\n\n`Box<T>` gives owned indirection. It stores a value behind a stable owning pointer, which can be useful for large values, recursive types, trait objects, or cases where moving the pointer is simpler than moving the underlying value. The box still has one owner, and cleanup still happens when that owner is dropped.\n\n`Rc<T>` supports shared ownership within a single-threaded context. Multiple owners can point to the same value, and the value is cleaned up when the last owner is gone. `Arc<T>` supports shared ownership across threads. The distinction matters because thread-safe sharing has different costs and constraints than single-threaded sharing.\n\nShared ownership is not the same as shared mutation. If multiple parts of the program need to mutate shared data, the design needs controlled synchronization or an interior mutability pattern. These tools can be appropriate, but they should be used deliberately because they move some checks from compile time into runtime rules or synchronization behavior.\n\nThreads and async tasks make ownership lifetimes explicit. Data moved into a task must live long enough for that task. Data shared across tasks must be safe to share under the chosen model. Resource cleanup and cancellation behavior should be part of the design. Ownership gives teams a language for reasoning about these lifecycle questions before production behavior becomes surprising.",
  "narrationPoints": [
    "Single ownership is the default in Rust.",
    "`Box<T>` gives owned indirection.",
    "`Rc<T>` supports shared ownership within a single-threaded.",
    "Shared ownership is not the same as shared mutation.",
    "Threads and async tasks make ownership lifetimes explicit.",
    "Data moved into a task must live long enough for that task."
  ]
};
