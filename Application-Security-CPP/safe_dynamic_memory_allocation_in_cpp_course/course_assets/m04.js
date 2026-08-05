window.COURSE_MODULE = {
  "title": "Smart Pointers for Dynamic Allocation",
  "graphicAlt": "Smart-pointer decision diagram routing exclusive objects to unique ownership, genuinely shared lifetimes to shared ownership, non-owning observation to weak references, and custom resources to a matching deleter.",
  "narration": "Smart pointers are the preferred way to express dynamic ownership when value ownership or containers are not enough. They connect allocation to object lifetime and make cleanup behavior visible in the type. They also reduce manual cleanup paths that are easy to miss during error handling.\n\nstd::unique_ptr is usually the default for exclusive dynamic ownership. It says that one owner is responsible for the object. Transfer happens through move semantics, which makes ownership handoff visible. Destruction is predictable when the unique owner leaves scope or is replaced.\n\nstd::shared_ptr is appropriate when multiple owners genuinely need to keep an object alive. It should represent real shared ownership, not uncertainty about who should own the object. Shared ownership adds lifecycle complexity because cleanup happens only when the last owner releases its reference.\n\nstd::weak_ptr observes an object managed by shared ownership without extending lifetime. It helps break cycles and lets observers check whether the object still exists before use. Expired weak observations need clear handling rather than being treated as impossible.\n\nSmart pointers should replace owning raw pointers, but they are not magic security wrappers. They still require clear lifecycle design, consistent construction, documented ownership expectations, and tests around destruction, transfer, callbacks, and shutdown behavior.",
  "narrationPoints": [
    "Smart pointers are the preferred way to express dynamic ownership when value ownership or containers are not enough.",
    "std::unique_ptr is usually the default for exclusive dynamic ownership.",
    "std::shared_ptr is appropriate when multiple owners genuinely need to keep an object alive.",
    "Shared ownership adds lifecycle complexity because cleanup happens only when the last owner releases its reference.",
    "Expired weak observations need clear handling rather than being treated as impossible.",
    "Smart pointers should replace owning raw pointers, but they are not magic security wrappers."
  ]
};
