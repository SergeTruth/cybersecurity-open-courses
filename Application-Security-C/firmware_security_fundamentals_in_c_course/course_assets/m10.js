window.COURSE_MODULE = {
  "title": "Course Summary: Secure Firmware Design Habits",
  "graphicAlt": "Mapped boundaries, predictable C memory behavior, verified startup and update transitions, and controlled support rest on realistic failure testing.",
  "narration": "Secure firmware is built from repeatable engineering habits. Start by defining device trust boundaries. What code runs before the application? What interfaces bring input into the device? What state is stored? Which code can control hardware? Which paths have higher authority? Clear boundaries make review possible.\n\nValidate inputs and protect secrets. Peripheral data, communication messages, configuration records, update metadata, and service commands should be checked before they influence behavior. Keys, certificates, identifiers, and credentials should have defined purpose, storage assumptions, logging rules, and lifecycle ownership.\n\nKeep C behavior predictable. Review fixed buffers, stack usage, heap policy, memory pools, object lifetime, pointer ownership, integer sizes, parser behavior, interrupt interactions, and memory-mapped I/O. Firmware security improves when memory rules are visible and tested under realistic constraints.\n\nVerify startup, updates, and failure behavior. Ask what the device checks before running firmware, how update integrity and compatibility are evaluated, what happens during power loss, how rollback or recovery works, and how invalid state is handled. The negative paths matter as much as the normal path.\n\nFinally, review production hardening and diagnostics. What debug features remain enabled? What commands are available in release builds? What logs are retained? What happens on reset, fault, or failed update? Are these paths tested on hardware under realistic timing, storage, and power conditions? Those questions help firmware teams ship devices that can be maintained responsibly.",
  "narrationPoints": [
    "Secure firmware is built from repeatable engineering habits.",
    "Peripheral data, communication messages, configuration records, update metadata.",
    "Review fixed buffers, stack usage, heap policy, memory pools, object lifetime.",
    "Ask what the device checks before running firmware, how update integrity and compatibility are evaluated, what happens during power loss.",
    "What happens on reset, fault, or failed update."
  ]
};
