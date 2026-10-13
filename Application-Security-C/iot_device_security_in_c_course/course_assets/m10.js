window.COURSE_MODULE = {
  "title": "Course Summary: Secure IoT Design Habits",
  "graphicAlt": "Trust mapping, identity protection, predictable C and controlled lifecycle maintenance rest on testing failures, recovery and privacy.",
  "narration": "Secure IoT device design is a set of repeatable habits. Start by defining trust boundaries across device components, network paths, local interfaces, physical access, stored state, identity, privileged code, and cloud communication. When the boundaries are visible, design review becomes concrete.\n\nValidate input and protect identity. Which interfaces accept external input? How is malformed input rejected? Where are credentials stored? What code may use keys or tokens? What network services are exposed? These questions should have clear answers in code, configuration, and release documentation.\n\nKeep C behavior predictable. Review fixed buffers, stack limits, heap policy, memory pools, parser state, integer sizes, object lifetime, and cleanup paths. A connected device is easier to secure when memory and state transitions are bounded under normal and unusual conditions.\n\nHarden production builds and update flows. Which debug or factory features remain enabled? How is startup integrity verified? How are updates authorized, staged, rolled back, or recovered? What happens if configuration is missing or a reset happens at an inconvenient time?\n\nFinally, test failure, recovery, and diagnostic behavior under realistic field conditions. Exercise credential errors, malformed messages, network timeouts, reset behavior, update failure, full storage, production versus debug builds, and privacy-aware logging. Secure IoT products are maintained over time, so the design must support operations as well as initial release.",
  "narrationPoints": [
    "Secure IoT device design is a set of repeatable habits.",
    "A connected device is easier to secure when memory and state transitions are bounded under normal and unusual conditions.",
    "What happens if configuration is missing or a reset happens at an inconvenient time.",
    "Finally, test failure, recovery, and diagnostic behavior under realistic field conditions.",
    "Secure IoT products are maintained over time, so the design must support operations as well as initial release."
  ]
};
