window.COURSE_MODULE = {
  "title": "Interrupts, Peripherals, DMA, and Hardware Boundaries",
  "graphicAlt": "The CPU prepares a buffer, yields access during DMA, and resumes only after completion under a documented hardware contract.",
  "narration": "RTIC systems often interact with hardware through interrupt handlers, peripheral access crates, hardware abstraction layers, memory-mapped registers, DMA engines, and device-specific drivers. These interfaces connect Rust code to behavior the compiler cannot fully model.\n\nPeripheral ownership should make it hard for unrelated code to control the same hardware unexpectedly. Initialization order, clock state, pin configuration, interrupt enablement, and reset behavior can all affect security and reliability. The architecture should make those assumptions visible.\n\nMemory-mapped I/O has side effects outside normal memory. Reads and writes may acknowledge interrupts, start transfers, clear flags, or change hardware state. Safe abstractions should guide callers toward valid sequences and prevent ordinary code from violating important hardware invariants.\n\nDMA requires special care because hardware may read from or write to buffers while software also wants access. The firmware should define who owns a buffer at each moment, when it is valid to read or modify it, how completion is signaled, and what happens if a transfer is cancelled or fails.\n\nUnsafe hardware access should be small, justified, documented, and tested. A safety contract should explain pointer validity, register assumptions, aliasing expectations, interrupt interactions, and ownership rules. Safe wrappers should protect callers from needing to remember those assumptions manually.",
  "narrationPoints": [
    "RTIC systems often interact with hardware through interrupt.",
    "Peripheral ownership should make it hard for unrelated code.",
    "Memory-mapped I/O has side effects outside normal memory.",
    "DMA requires special care.",
    "Unsafe hardware access should be small.",
    "The architecture should make those assumptions visible."
  ]
};
