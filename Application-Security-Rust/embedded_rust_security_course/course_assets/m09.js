window.COURSE_MODULE = {
  "title": "Course Summary: Embedded Rust Security Checklist",
  "graphicAlt": "Embedded Rust security combines threat modeling, resource bounds, hardware ownership, input validation, and lifecycle protection.",
  "narration": "Embedded Rust security is a layered engineering practice. Start with assets, protected functions, interfaces, trust boundaries, physical access assumptions, and lifecycle requirements. The device is not only code; it is hardware, firmware, manufacturing, updates, service, and field operation.\n\nUse safe Rust abstractions wherever possible. When hardware access or platform integration requires `unsafe`, keep it small, justified, documented, tested, and wrapped in safe APIs that protect hardware invariants. Review register assumptions, initialization order, peripheral ownership, interrupts, and platform changes over time.\n\nDesign for bounded memory and predictable failure. Review stack, heap, static storage, buffers, integer conversions, allocation assumptions, queues, timeouts, retries, watchdog behavior, and worst-case input. Safe Rust reduces memory-corruption risk, but availability and resource safety still require explicit limits.\n\nProtect concurrent and interrupt-driven behavior with clear ownership rules. Define how shared state is protected, when DMA buffers are owned by hardware or software, how completion is signaled, and how cleanup works after cancellation or error. Make timing assumptions visible enough to test.\n\nValidate all external inputs through defensive parsing, protect secrets and device identity, and treat boot, updates, debug, dependencies, builds, artifacts, and production release as part of the security boundary. The goal is firmware whose assumptions are safe, bounded, documented, tested, and reviewable across the product lifecycle.",
  "narrationPoints": [
    "Embedded Rust security is a layered engineering practice.",
    "Use safe Rust abstractions wherever possible.",
    "Design for bounded memory and predictable failure.",
    "Protect concurrent and interrupt-driven behavior with clear.",
    "Validate all external inputs through defensive parsing.",
    "Review register assumptions."
  ]
};
