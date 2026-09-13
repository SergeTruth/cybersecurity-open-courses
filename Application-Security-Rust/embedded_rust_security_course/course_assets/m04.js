window.COURSE_MODULE = {
  "title": "Hardware Access, Peripherals, and Unsafe Boundaries",
  "graphicAlt": "A safe hardware abstraction protects peripheral ownership and initialization constraints around a small unsafe boundary.",
  "narration": "Embedded Rust often interacts directly with hardware through memory-mapped registers, peripheral access crates, hardware abstraction layers, and device-specific drivers. These layers are where language-level safety meets hardware behavior that the compiler cannot fully understand.\n\nMemory-mapped I/O is different from ordinary memory. Register reads and writes can have side effects, timing requirements, ordering constraints, or relationships with clocks, pins, interrupts, DMA engines, and power states. The defensive goal is to represent those constraints through types and APIs wherever practical.\n\nSome hardware access requires `unsafe` internally. That does not make the code wrong, but it changes the review model. Unsafe code should be small, justified, documented, and tested. A safety comment should explain the hardware and memory assumptions that make the operation valid, not simply assert that it is safe.\n\nPeripheral ownership and exclusivity matter. If two parts of firmware believe they own the same peripheral or pin configuration, behavior can become unpredictable. Initialization order, clock setup, pin mode, interrupt configuration, and reset behavior should be expressed in a way that safe callers cannot misuse accidentally.\n\nThe best hardware abstractions protect invariants. Safe APIs should guide callers toward valid register states, valid transitions, bounded operations, and documented timing expectations. Reviewers should pay close attention to places where safe code crosses into low-level assumptions that cannot be checked by Rust alone.",
  "narrationPoints": [
    "Embedded Rust often interacts directly with hardware.",
    "Memory-mapped I/O is different from ordinary memory.",
    "Some hardware access requires `unsafe` internally.",
    "Peripheral ownership and exclusivity matter.",
    "The best hardware abstractions protect invariants.",
    "That does not make the code wrong."
  ]
};
