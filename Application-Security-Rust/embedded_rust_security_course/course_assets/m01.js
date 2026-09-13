window.COURSE_MODULE = {
  "title": "Why Embedded Rust Security Matters",
  "graphicAlt": "Embedded security spans sensors, actuators, communications, updates, debug access, and language-level memory safety.",
  "narration": "Embedded systems are not just smaller versions of server applications. They interact with sensors, actuators, radios, buses, storage, debug hardware, boot chains, update mechanisms, and physical environments. A firmware decision can affect not only data confidentiality or service availability, but also device behavior in the field.\n\nRust provides meaningful security advantages through ownership, borrowing, type safety, and memory safety in safe code. Those advantages are important in firmware because many embedded failures historically come from memory corruption, unclear buffer ownership, and fragile low-level interfaces. But Rust does not remove the need for hardware-aware design.\n\nFirmware can still fail through weak input validation, unsafe hardware assumptions, exposed debug paths, fragile update behavior, secret leakage, unbounded resource use, poor dependency review, or release processes that cannot be repeated reliably. These are engineering and lifecycle problems, not only language problems.\n\nEmbedded Rust security means treating hardware, firmware, build systems, manufacturing, update channels, and field operations as one system. Assumptions about memory, timing, storage, debug access, device identity, and failure behavior should be written down, tested, and reviewed.\n\nThe defensive goal is safe, bounded, field-ready behavior. Code should make ownership clear, keep unsafe boundaries small, reject invalid input predictably, protect secrets, constrain resources, and support maintenance without relying on hidden tribal knowledge.",
  "narrationPoints": [
    "Embedded systems are not just smaller versions of server.",
    "Rust provides meaningful security advantages through.",
    "Firmware can still fail through weak input validation.",
    "Embedded Rust security means treating hardware.",
    "The defensive goal is safe, bounded, field-ready behavior.",
    "Assumptions about memory."
  ]
};
