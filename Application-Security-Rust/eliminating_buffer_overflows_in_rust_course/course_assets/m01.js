window.COURSE_MODULE = {
  "title": "Why Buffer Overflows Matter",
  "graphicAlt": "Checked access stays within a buffer boundary; unsafe and FFI paths require explicit review.",
  "narration": "A buffer overflow occurs when code reads or writes beyond the intended boundary of a buffer. In many low-level programming environments, that class of mistake has historically caused severe reliability and security failures. The defensive lesson is simple: memory boundaries matter because they define which data an operation is allowed to reach.\n\nRust changes the default risk model. In safe Rust, developers normally work through checked abstractions, ownership rules, borrowing rules, and type-aware access patterns. Arrays, vectors, slices, strings, and byte buffers carry information about length and validity. Safe APIs are designed so out-of-bounds memory access is not an ordinary outcome of a small indexing mistake.\n\nThe point of this course is not to memorize old failure modes or learn offensive techniques. The point is to understand why buffer boundaries matter and how Rust helps developers build software where invalid memory access is prevented by default. That matters for parsers, network services, file processing, embedded code, libraries, and backend systems.\n\nRust's protections are strongest when code stays in safe abstractions. Risk can re-enter at unsafe blocks, raw pointer handling, foreign function interfaces, platform APIs, device interfaces, and custom low-level buffer abstractions. Those boundaries need explicit review because the compiler may not be able to prove the full buffer contract.\n\nThe defensive goal is layered design. Prefer safe Rust. Make buffer ownership and length visible. Validate input at trust boundaries. Control allocation and resource use. Keep unsafe code small and documented. Wrap external behavior in safe APIs. Test boundary cases over time so buffer safety remains part of normal engineering practice.",
  "narrationPoints": [
    "A buffer overflow occurs.",
    "Rust changes the default risk model.",
    "The point of this course is not to memorize old failure.",
    "Rust's protections are strongest.",
    "The defensive goal is layered design.",
    "Those boundaries need explicit review."
  ]
};
