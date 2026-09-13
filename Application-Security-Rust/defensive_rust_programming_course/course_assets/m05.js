window.COURSE_MODULE = {
  "title": "unsafe, FFI, and Trusted Boundaries",
  "graphicAlt": "Small unsafe and FFI boundaries are enclosed by safe interfaces backed by documented invariants and tests.",
  "narration": "The unsafe keyword marks code where the programmer must uphold rules the compiler cannot fully check. Unsafe Rust is not automatically bad, and some low-level libraries, performance-sensitive code, platform integration, and interoperability work legitimately require it. But unsafe changes the review model. It creates a trusted boundary.\n\nDefensive Rust keeps unsafe code rare, justified, isolated, and documented. Reviewers should be able to answer why unsafe is needed, what invariants must hold, what callers may assume, and how the code prevents unsafe assumptions from leaking across the rest of the application. The smaller the unsafe surface, the easier that review becomes.\n\nSafe wrappers are often the right pattern. Unsafe internals can sometimes expose a safe public API when the wrapper enforces the required invariants. That wrapper should define what inputs are valid, who owns returned values, what lifetimes mean, how errors are represented, and whether concurrent use is allowed.\n\nForeign function interfaces require special attention because Rust's normal guarantees may not apply across language boundaries. Review should cover pointer validity, ownership transfer, allocation and deallocation responsibility, thread assumptions, error conventions, data layout, and representation. These details should be written down, not carried as unwritten tribal knowledge.\n\nBoundary tests and documentation are part of the safety story. The goal is not to forbid unsafe code categorically. The goal is to keep trusted assumptions small, explicit, reviewable, and exercised by tests so safe Rust remains the default experience for the rest of the codebase.",
  "narrationPoints": [
    "The unsafe keyword marks code.",
    "Defensive Rust keeps unsafe code rare.",
    "Safe wrappers are often the right pattern.",
    "Foreign function interfaces require special attention.",
    "Boundary tests and documentation are part of the safety.",
    "But unsafe changes the review model."
  ]
};
