window.COURSE_MODULE = {
  "title": "Testing, Tooling, Fuzzing, and Review",
  "graphicAlt": "Buffer tests exercise empty, short, oversized, malformed, and invalid-encoding inputs and preserve fixes as regressions.",
  "narration": "Rust's type system and bounds checks are powerful, but buffer-handling code still needs testing. Tests should cover expected input and unexpected shapes. Boundary tests are especially important because buffer bugs often live at edges: empty input, one element, maximum expected size, one beyond the expected size, truncated records, and invalid encoding.\n\nNegative tests should be routine for parsers and input handlers. Oversized input, malformed fields, extra delimiters, missing delimiters, inconsistent length fields, invalid UTF-8, unsupported versions, and incomplete records should produce predictable errors. The goal is not just to avoid memory corruption; it is to avoid fragile operational behavior.\n\nFuzzing concepts are useful for parsers because they explore unexpected input shapes. A fuzzer can generate many variations that humans would not manually write. The safe defensive framing is to use fuzzing to find crashes, panics, resource problems, parser confusion, and unexpected acceptance of malformed input before those issues reach production.\n\nTooling can support safer development. Formatting and linting improve readability. Miri concepts and sanitizer concepts can help teams reason about memory behavior in appropriate contexts. Dependency review helps when parser libraries, binary format crates, or FFI wrappers become part of the buffer-handling surface.\n\nCode review should focus on indexing, length assumptions, allocation limits, integer conversions, unsafe blocks, FFI contracts, parser boundaries, and places where a panic would create operational problems. After a buffer-safety fix, add regression tests so the same assumption does not quietly return later.",
  "narrationPoints": [
    "Rust's type system and bounds checks are powerful.",
    "Negative tests should be routine for parsers and input.",
    "Fuzzing concepts are useful for parsers.",
    "Tooling can support safer development.",
    "Code review should focus on indexing.",
    "Tests should cover expected input and unexpected shapes."
  ]
};
