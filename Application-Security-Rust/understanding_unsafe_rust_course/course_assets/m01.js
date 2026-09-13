window.COURSE_MODULE = {
  "title": "Why Unsafe Rust Exists",
  "graphicAlt": "A large safe application contains a small justified unsafe boundary for operating-system APIs, hardware, and foreign libraries.",
  "narration": "Rust's safe subset is intentionally strict. That strictness is one of the language's main security strengths because it prevents many memory-safety mistakes before code runs. The compiler asks hard questions about ownership, borrowing, lifetimes, aliasing, and mutation so that ordinary safe code can rely on strong guarantees.\n\nReal systems sometimes need operations the compiler cannot fully reason about. A Rust program may need to call an operating-system API, interact with embedded hardware, wrap a C library, implement a custom allocator, optimize a data structure, or work with a platform-specific representation. These cases can require operations outside safe Rust's normal guarantees.\n\nUnsafe Rust exists for those cases. It is a controlled escape hatch, not a shortcut around discipline. The unsafe keyword marks places where the programmer is taking responsibility for specific assumptions that the compiler cannot prove. That signal is valuable because it tells reviewers where the trust boundary begins.\n\nUnsafe code is not automatically wrong. Some of Rust's most useful libraries and platform abstractions rely on carefully reviewed unsafe internals. The important question is whether unsafe is necessary, whether it is small, whether it is justified, and whether the surrounding API prevents ordinary callers from misusing the low-level behavior.\n\nA professional unsafe Rust practice treats every unsafe block as something that must earn its place. If safe Rust can express the behavior clearly, use safe Rust. If unsafe is required, scope it tightly, document the safety contract, test boundary behavior, and make review evidence easy to find.",
  "narrationPoints": [
    "Rust's safe subset is intentionally strict.",
    "Real systems sometimes need operations the compiler cannot.",
    "Unsafe Rust exists for those cases.",
    "Unsafe code is not automatically wrong.",
    "A professional unsafe Rust practice treats every unsafe.",
    "If safe Rust can express the behavior clearly."
  ]
};
