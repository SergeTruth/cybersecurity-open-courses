window.COURSE_MODULE = {
  "title": "Smart Pointers for Leak Prevention",
  "graphicAlt": "Show unique ownership, genuine shared ownership and weak observation as distinct contracts.",
  "narration": "Smart pointers support leak prevention when dynamic ownership is necessary. They connect ownership to object lifetime and reduce the need for manual cleanup calls. They also make ownership easier to see in function signatures, member variables, and factory returns.\n\nstd::unique_ptr is usually the default tool for exclusive dynamic ownership. It automatically destroys the object when the owner goes away and makes transfer visible through move semantics. A unique pointer tells reviewers that one owner is responsible for cleanup.\n\nstd::shared_ptr is appropriate when multiple owners genuinely need to keep an object alive. Shared ownership should not be used just because ownership is unclear. If the design has one natural owner, unique ownership or value ownership is usually simpler and easier to review.\n\nstd::weak_ptr observes shared objects without extending lifetime. It can help prevent cycles and support callbacks, registries, or caches that should check whether a target still exists before using it. Expired weak observations need clear handling.\n\nSmart pointers are not magic. A program can still leak through shared ownership cycles, long-lived globals, unbounded caches, retained callbacks, or ownership graphs that never release. Smart pointers work best when they express a clear lifecycle design rather than hiding one.\n\nFunction boundaries are a good place to enforce intent. Returning unique ownership, accepting borrowed references, and storing shared ownership in narrow, reviewed locations helps prevent smart pointers from becoming a substitute for design.",
  "narrationPoints": [
    "Smart pointers connect dynamic ownership to object lifetime and reduce manual cleanup paths.",
    "std::unique_ptr makes exclusive ownership and transfer visible through move semantics.",
    "Use std::shared_ptr only when multiple owners genuinely need to keep an object alive.",
    "std::weak_ptr observes shared objects without extending lifetime and helps prevent ownership cycles.",
    "Shared ownership cycles, long-lived globals, unbounded caches, and retained callbacks can still leak.",
    "Function boundaries should express ownership intent through returns, references, and narrow shared ownership."
  ]
};
