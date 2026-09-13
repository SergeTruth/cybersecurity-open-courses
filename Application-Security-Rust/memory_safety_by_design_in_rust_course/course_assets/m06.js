window.COURSE_MODULE = {
  "title": "Unsafe Boundaries and FFI Review",
  "graphicAlt": "A small unsafe core is contained by a reviewed interface with explicit pointer, ownership, layout, and thread contracts.",
  "narration": "Rust's unsafe keyword marks code where the programmer must uphold rules the compiler cannot fully check. Unsafe code is sometimes necessary for performance, low-level systems work, hardware interaction, custom abstractions, or interoperability with other languages. The keyword does not mean the code is wrong, but it does mean the review model changes.\n\nUnsafe blocks should be rare, isolated, justified, and documented. The goal is to keep the trusted surface small enough that reviewers can understand it. When possible, unsafe internals should be wrapped behind safe APIs that preserve documented invariants. Callers should not need to understand raw pointer rules or allocation contracts just to use an ordinary high-level operation.\n\nFFI boundaries require special care. Code that crosses into another language may involve pointer validity, ownership transfer, allocation and deallocation responsibility, thread assumptions, error conventions, data representation, and lifetime expectations that Rust cannot verify on its own. Those assumptions should be written down and tested, not left as tribal knowledge.\n\nThe goal is not to forbid unsafe code categorically. The goal is to prevent unsafe assumptions from spreading. A good boundary explains what must be true before the call, what the call guarantees afterward, who owns returned data, how errors are represented, and which tests exercise the boundary. Small, documented, reviewable unsafe areas let the rest of the code remain easier to reason about.",
  "narrationPoints": [
    "Rust's unsafe keyword marks code.",
    "Unsafe blocks should be rare.",
    "FFI boundaries require special care.",
    "The goal is not to forbid unsafe code categorically.",
    "The keyword does not mean the code is wrong.",
    "When possible, unsafe internals should be wrapped behind."
  ]
};
