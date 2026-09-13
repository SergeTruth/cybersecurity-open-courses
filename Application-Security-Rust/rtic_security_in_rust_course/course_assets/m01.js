window.COURSE_MODULE = {
  "title": "Why RTIC Security Matters",
  "graphicAlt": "RTIC task, priority, resource, and work-limit design combines with Rust safety and lifecycle controls.",
  "narration": "RTIC is used to structure embedded Rust firmware around tasks, priorities, resources, and interrupt-driven execution. That structure can make concurrent firmware easier to reason about because the program describes execution contexts and shared resources more explicitly than ad hoc interrupt code.\n\nSecurity in this setting is broader than memory safety. Real-time firmware must remain available, bounded, and predictable under normal operation, degraded operation, and unexpected input. A task that runs too long, a queue that grows without policy, or a debug path that remains broader than intended can become a product security concern.\n\nRust helps with memory safety in safe code, ownership, borrowing, and type-driven design. RTIC helps organize concurrent embedded behavior. Neither one automatically validates input, proves timing behavior, protects secrets, secures updates, or documents hardware assumptions. Those responsibilities still belong to the engineering team.\n\nInterrupt-driven systems need especially clear boundaries. Reviewers should understand which task handles which event, which resources it can access, what work is bounded, what happens when input is invalid, and how the system behaves when timing or resource pressure appears.\n\nThe defensive goal is field-ready firmware whose behavior is safe, bounded, documented, tested, and reviewable. RTIC can support that goal when task design, priority design, resource ownership, hardware access, updates, debug policy, dependency review, and release discipline are treated as one lifecycle.",
  "narrationPoints": [
    "RTIC is used to structure embedded Rust firmware around.",
    "Security in this setting is broader than memory safety.",
    "Rust helps with memory safety in safe code.",
    "Interrupt-driven systems need especially clear boundaries.",
    "The defensive goal is field-ready firmware whose behavior.",
    "Real-time firmware must remain available."
  ]
};
