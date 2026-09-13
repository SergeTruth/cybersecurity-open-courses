window.COURSE_MODULE = {
  "title": "Why Smart Pointers Matter",
  "graphicAlt": "Smart pointers express deliberate ownership, sharing, observation, and mutation-control choices, with complexity justified by need.",
  "narration": "Rust's ordinary ownership model is one of the language's strongest safety tools, but real programs often need ownership shapes that are more expressive than a value directly owned by one variable. Applications may need heap allocation, recursive structures, shared configuration, long-lived service state, reference-counted graphs, thread-safe handles, or resource wrappers that clean up at a specific point in the lifecycle.\n\nSmart pointers encode those patterns in types. They are not just convenience wrappers around references. A smart pointer can communicate who owns data, whether ownership can be shared, when cleanup happens, whether mutation is allowed, whether access is checked at compile time or runtime, and whether the value can safely cross a thread boundary.\n\nThis makes smart pointer choice a security and reliability review point. A type such as `Box<T>`, `Rc<T>`, `Arc<T>`, `Weak<T>`, `RefCell<T>`, or `Mutex<T>` tells reviewers how the code expects data to live, move, mutate, and be cleaned up. The wrong pointer type can make lifecycle behavior harder to reason about even when the code remains memory safe.\n\nSmart pointers also show where ownership complexity has entered the design. Shared ownership may delay cleanup. Interior mutability may move borrow enforcement from compile time to runtime. Thread-safe sharing may require lock discipline and shutdown rules. These choices can be correct, but they deserve explicit intent rather than accidental growth.\n\nThe defensive goal is simple: choose the least complex smart pointer that accurately expresses the design. Start with ordinary ownership and borrowing when they are enough. Reach for heap indirection, reference counting, interior mutability, or synchronization only when the ownership problem truly requires it and the lifecycle behavior can be documented and reviewed.",
  "narrationPoints": [
    "Rust's ordinary ownership model is one of the language's.",
    "Smart pointers encode those patterns in types.",
    "This makes smart pointer choice a security and reliability.",
    "Smart pointers also show.",
    "The defensive goal is simple: choose the least complex.",
    "They are not just convenience wrappers around references."
  ]
};
