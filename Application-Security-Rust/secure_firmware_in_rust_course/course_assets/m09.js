window.COURSE_MODULE = {
  "title": "Course Summary: Secure Firmware Checklist",
  "graphicAlt": "Asset mapping, safe hardware wrappers, bounded resources, input validation, verified updates, and lifecycle protection summarize secure firmware.",
  "narration": "Secure firmware in Rust is a layered lifecycle practice. Start with assets, interfaces, boundaries, physical access assumptions, protected functions, field maintenance, and end-of-life behavior. These assumptions should become requirements that the team can implement, test, and maintain.\n\nPrefer safe Rust abstractions where possible, and keep hardware-facing unsafe code small, justified, documented, reviewed, and wrapped in safe APIs. Register behavior, peripheral ownership, initialization order, interrupt interactions, and platform dependencies should be visible enough for another engineer to review.\n\nBound memory, queues, parsing, sizes, timeouts, update states, and recovery paths. Safe Rust reduces memory-corruption risk, but secure firmware also needs resource limits, predictable degraded behavior, and clear panic or recovery policy under pressure.\n\nTreat parsing as a security boundary. Validate length, framing, fields, mode, state, and relationships before sensitive actions. Convert valid input into domain types so later code operates on reviewed meaning rather than raw bytes and assumptions.\n\nFinally, harden the lifecycle. Protect firmware integrity, update behavior, rollback policy, secrets, device identity, debug interfaces, diagnostics, dependencies, toolchains, builds, artifacts, releases, and maintenance responsibilities. Test boundary cases, failure paths, recovery behavior, and lifecycle assumptions over time.",
  "narrationPoints": [
    "Secure firmware in Rust is a layered lifecycle practice.",
    "Prefer safe Rust abstractions.",
    "Bound memory, queues, parsing, sizes, timeouts, update.",
    "Treat parsing as a security boundary.",
    "Finally, harden the lifecycle.",
    "These assumptions should become requirements that the team."
  ]
};
