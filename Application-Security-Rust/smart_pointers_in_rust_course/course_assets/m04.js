window.COURSE_MODULE = {
  "title": "Rc<T>, Arc<T>, and Shared Ownership",
  "graphicAlt": "Rc and Arc coordinate shared lifetimes in their appropriate thread contexts, while mutation remains separately controlled.",
  "narration": "Some designs have legitimate shared ownership. A configuration object may be used by several components. A graph node may be reached through multiple paths. A service client may be shared by many tasks. Rust supports these patterns with reference-counted smart pointers, primarily `Rc<T>` and `Arc<T>`.\n\n`Rc<T>` provides shared ownership inside a single thread. It keeps a strong reference count and drops the inner value when the final strong owner goes away. It is useful when several parts of a single-threaded structure need ownership-level access to the same value without copying the value itself.\n\n`Arc<T>` provides atomically reference-counted shared ownership that can cross thread boundaries. It is common in threaded and async systems, especially for shared configuration, clients, caches, pools, and handles. The atomic count has a cost, so `Arc<T>` should be chosen because thread-safe shared ownership is needed, not as a default replacement for ordinary ownership.\n\nShared ownership is not duplicate ownership. The pointer coordinates a single underlying value and a single eventual cleanup event. That distinction matters because cleanup timing becomes distributed across all strong owners. A value may live longer than any one caller expects if another owner remains somewhere else in the system.\n\nShared ownership is also not shared mutation. `Rc<T>` and `Arc<T>` let multiple owners keep a value alive; they do not by themselves make mutation safe or allowed. If shared state must change, the design needs an appropriate pattern such as interior mutability, synchronization, message passing, or a narrower ownership boundary.\n\nDuring review, ask why shared ownership is needed, who creates owners, where owners are stored, when they are dropped, whether any owner can live unexpectedly long, and whether mutation is controlled separately. Reference counting is powerful, but lifecycle clarity must be maintained deliberately.",
  "narrationPoints": [
    "Some designs have legitimate shared ownership.",
    "`Rc<T>` provides shared ownership inside a single thread.",
    "`Arc<T>` provides atomically reference-counted shared.",
    "Shared ownership is not duplicate ownership.",
    "Shared ownership is also not shared mutation.",
    "During review, ask why shared ownership is needed, who."
  ]
};
