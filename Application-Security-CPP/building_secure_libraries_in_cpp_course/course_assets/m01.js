window.COURSE_MODULE = {
  "title": "Libraries as Security Boundaries",
  "graphicAlt": "Library boundaries connect input validation, ownership, failures and maintained releases.",
  "narration": "A C++ library is more than an implementation detail. It is a reusable security boundary that other applications depend on. A library may parse files, manage memory, open local resources, create network connections, expose callbacks, allocate buffers, or run inside products the library author does not control. Each public function becomes part of another team's design surface. That surface may be used for years after the original implementation decisions are forgotten.\n\nThis means library defaults matter. Error behavior matters. Ownership rules matter. Thread-safety guarantees, resource cleanup, dependency choices, and documentation all influence how callers use the library under real pressure. If the safe path is difficult or unclear, callers may build workarounds that weaken the product around the library.\n\nSecure library design is not only about avoiding internal bugs. It is about making correct use predictable. Callers need to know what the library validates, what it assumes, what it owns, what it borrows, what can fail, and how failures are reported. The API should make the intended contract visible without forcing callers to read private implementation details.\n\nReusable code multiplies impact. A confusing API can be misused across many applications, while a well-designed API can improve security across the same ecosystem. Building a secure library means designing for correct use, predictable failure, maintainability, compatibility, and responsible release practices over the full life of the component. The library should help callers make safe choices even when they only use a small part of its surface.",
  "narrationPoints": [
    "A C++ library is more than an implementation detail.",
    "Each public function becomes part of another team's design surface.",
    "If the safe path is difficult or unclear, callers may build workarounds that weaken the product around the library.",
    "Callers need to know what the library validates, what it assumes, what it owns, what it borrows, what can fail, and how failures are reported.",
    "A confusing API can be misused across many applications, while a well-designed API can improve security across the same ecosystem.",
    "The library should help callers make safe choices even when they only use a small part of its surface."
  ]
};
