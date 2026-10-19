window.COURSE_MODULE = {
  "title": "Borrowing, Aliasing, and Const-Correctness",
  "graphicAlt": "Aliases share one object lifetime; borrowing windows restrict use and const communicates only mutation intent.",
  "narration": "Aliasing means more than one reference can designate the same object. One pointer may own the object, another may borrow it during a call, another may point into a member, and another may be stored in a container. The object still has one lifetime, but multiple references can make that lifetime harder to reason about.\n\nBorrowed pointers need valid-use windows. A function may be allowed to read an object only during the call. A callback may be allowed to retain a pointer only until a related unregister operation. A parser may borrow input text only until the input buffer is reused. Those windows should be documented.\n\nAliases can become stale after cleanup, transfer, resize, or object replacement. If the owner releases an object, every borrower must stop using it. If a container takes ownership, callers should not continue to mutate the object unless the contract permits it. If storage moves, interior aliases need review.\n\nConst-correctness communicates mutation intent. A pointer to const data tells the callee not to modify the object through that pointer. It does not prove ownership, storage duration, or thread safety, but it makes one part of the lifetime contract clearer.\n\nRetained references require explicit permission. An API should state whether it copies data, borrows it temporarily, or stores the pointer for later. Without that rule, callers cannot know how long the referenced object must remain alive or who may modify or destroy it.",
  "narrationPoints": [
    "Aliasing means more than one reference can designate the same object.",
    "A parser may borrow input text only until the input buffer is reused.",
    "If a container takes ownership, callers should not continue to mutate the object unless the contract permits it.",
    "A pointer to const data tells the callee not to modify the object through that pointer.",
    "An API should state whether it copies data, borrows it temporarily, or stores the pointer for later."
  ]
};
