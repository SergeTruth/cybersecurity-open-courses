window.COURSE_MODULE = {
  "title": "Hardware Access, Peripherals, and Unsafe Boundaries",
  "graphicAlt": "A safe hardware interface preserves initialization order and peripheral ownership while containing a documented unsafe contract.",
  "narration": "Firmware often accesses hardware through memory-mapped registers, peripheral access crates, hardware abstraction layers, board support packages, drivers, and device-specific configuration. These layers are where Rust code meets behavior the compiler cannot fully model.\n\nMemory-mapped I/O is not ordinary memory. Register reads and writes may acknowledge interrupts, start transfers, clear flags, change power state, or affect hardware outside the processor. Initialization order, clock configuration, pin modes, reset behavior, interrupt setup, and peripheral ownership all influence safe operation.\n\nSome hardware-facing code requires `unsafe` because Rust cannot prove the validity of hardware side effects, raw addresses, volatile access, or aliasing rules at the device boundary. That does not make the code wrong. It makes the boundary important enough to document and review carefully.\n\nSafe wrappers should protect hardware invariants. They should make invalid operation order harder to express, prevent unrelated code from controlling the same peripheral unexpectedly, and hide low-level details behind APIs that communicate ownership, initialization state, and valid transitions.\n\nUnsafe code should be small, justified, documented, tested where practical, and revisited when hardware, platform crates, board support code, generated register definitions, or toolchain behavior changes. A safety contract should explain why assumptions hold and how safe callers are prevented from violating them.",
  "narrationPoints": [
    "Firmware often accesses hardware through memory-mapped.",
    "Memory-mapped I/O is not ordinary memory.",
    "Some hardware-facing code requires `unsafe`.",
    "Safe wrappers should protect hardware invariants.",
    "Unsafe code should be small, justified, documented, tested.",
    "It makes the boundary important enough to document."
  ]
};
