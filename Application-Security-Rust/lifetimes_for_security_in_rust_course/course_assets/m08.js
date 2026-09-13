window.COURSE_MODULE = {
  "title": "Unsafe, FFI, and Lifetime Contracts",
  "graphicAlt": "A safe wrapper controls external buffer and callback lifetimes, ensuring registration ends before associated state is released.",
  "narration": "Safe Rust uses lifetimes to enforce reference validity, but unsafe code and FFI boundaries can move some responsibility back to the programmer. Raw pointers do not carry the same checked lifetime relationships as safe references. External code may follow rules Rust cannot verify automatically.\n\nFFI boundaries often involve allocation, deallocation, buffers, callbacks, and thread behavior. Who owns the memory? Who may free it? How long must a buffer remain valid? Can external code retain a pointer after a call returns? Can a callback run after the Rust owner has gone away? These questions are lifetime questions even when no Rust lifetime annotation appears.\n\nA safe wrapper around unsafe or external code must preserve the lifetime contract for safe callers. The wrapper should prevent ordinary safe Rust code from creating invalid relationships. If the wrapper cannot enforce everything through types, it should document the remaining assumptions clearly.\n\nSafety contracts should explain what data must remain valid, who owns it, who may free it, how long references or callbacks may be used, and what the caller is responsible for. A comment that simply says a block is safe is not enough. The evidence needs to connect the unsafe operation to the lifetime assumptions that make it valid.\n\nA good review also asks whether the safe API prevents misuse by ordinary callers. If a caller can pass a temporary buffer to external code that stores it for later, the wrapper has not protected the lifetime contract. If callback registration can outlive the captured state, the API needs a clearer ownership or cancellation model.\n\nTesting and review are important because compiler enforcement is weaker at these boundaries. Reviewers should focus on ownership transfer, allocation pairing, callback lifetime, buffer validity, synchronization, and API shape. The best unsafe boundary is small, documented, tested, and wrapped in a safe interface that protects callers.",
  "narrationPoints": [
    "Safe Rust uses lifetimes to enforce reference validity.",
    "FFI boundaries often involve allocation.",
    "A safe wrapper around unsafe or external code must preserve.",
    "Safety contracts should explain what data must remain valid.",
    "A good review also asks whether the safe API prevents.",
    "Testing and review are important."
  ]
};
