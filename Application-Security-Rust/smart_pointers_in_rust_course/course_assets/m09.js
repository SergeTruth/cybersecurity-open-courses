window.COURSE_MODULE = {
  "title": "Course Summary: Smart Pointer Checklist",
  "graphicAlt": "The smart-pointer checklist starts simple, justifies shared ownership, uses Weak for observation, controls mutation, and tests lifecycles.",
  "narration": "Smart pointers are typed ownership tools. They help Rust programs represent heap allocation, shared ownership, non-owning references, controlled mutation, thread-safe sharing, stable-location assumptions, and flexible borrow-or-own APIs. Their value comes from making ownership visible, not from making ownership disappear.\n\nStart with ordinary ownership and borrowing. If owned heap indirection is needed, consider `Box<T>` before adding shared ownership. If several parts of a single-threaded design truly need ownership, `Rc<T>` may fit. If ownership must cross threads or tasks, `Arc<T>` may fit. If a relationship should not keep the value alive, use `Weak<T>`.\n\nInterior mutability and synchronization deserve special attention. `Cell<T>`, `RefCell<T>`, `Mutex<T>`, and `RwLock<T>` can support valid designs, but they change where access rules are enforced and what runtime behaviors must be reviewed. Keep mutation scope small, lock scope narrow, and failure behavior explicit.\n\nFor async and concurrent systems, smart pointers are not a complete safety design. Review shutdown, cancellation, backpressure, resource limits, observability, and cleanup behavior. Shared ownership should not become a place where tasks, handles, and resources live indefinitely because no one knows who should release them.\n\nThe practical checklist is to keep ownership choices simple, document lifecycle assumptions, avoid unnecessary shared mutation, use weak relationships for observers or back-references, test cleanup paths, and review smart pointer use whenever it affects resource lifetime, concurrency, API contracts, or long-running service behavior.",
  "narrationPoints": [
    "Smart pointers are typed ownership tools.",
    "Start with ordinary ownership and borrowing.",
    "Interior mutability and synchronization deserve special.",
    "For async and concurrent systems.",
    "The practical checklist is to keep ownership choices simple.",
    "If ownership must cross threads or tasks, `Arc<T>` may fit."
  ]
};
