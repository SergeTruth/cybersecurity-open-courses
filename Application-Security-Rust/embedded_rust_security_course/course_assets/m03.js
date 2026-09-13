window.COURSE_MODULE = {
  "title": "Memory Safety, no_std, and Resource Constraints",
  "graphicAlt": "A no_std system still needs explicit stack, static-storage, optional-heap, buffer, and failure policies.",
  "narration": "Many embedded Rust projects use `no_std`, limited memory, fixed buffers, static allocation, or carefully controlled heap use. These constraints shape security design. A firmware component may have no operating system services, limited diagnostics, strict timing behavior, and little room for unbounded allocation or panic-oriented failure.\n\nRust's ownership and borrowing rules help clarify who owns buffers, peripherals, handles, and state. That clarity can prevent many classes of memory corruption and aliasing mistakes. In embedded systems, ownership clarity also helps reviewers understand when a buffer can be reused, when a peripheral is initialized, and which component is responsible for cleanup or reset.\n\nSafe Rust does not automatically solve every resource problem. Stack usage, buffer sizes, static storage layout, allocator choices, integer conversions, watchdog timing, maximum frame sizes, and worst-case input behavior still need design review. A memory-safe program can still exhaust memory, miss timing expectations, or fail poorly under resource pressure.\n\nDefensive embedded Rust favors bounded data structures, explicit limits, predictable failure behavior, and small trusted surfaces. When a heap is used, its policy should be clear. When static buffers are used, their ownership and maximum use should be clear. When conversion or arithmetic determines a size, the failure path should be explicit.\n\nThe practical question is what happens under pressure. If input is larger than expected, if a queue fills, if a timer fires late, if parsing cannot complete, or if a peripheral fails to respond, the firmware should fail in a controlled way that matches the product's safety and reliability requirements.",
  "narrationPoints": [
    "Many embedded Rust projects use `no_std`.",
    "Rust's ownership and borrowing rules help clarify who owns.",
    "Safe Rust does not automatically solve every resource.",
    "Defensive embedded Rust favors bounded data structures.",
    "The practical question is what happens under pressure.",
    "A memory-safe program can still exhaust memory."
  ]
};
