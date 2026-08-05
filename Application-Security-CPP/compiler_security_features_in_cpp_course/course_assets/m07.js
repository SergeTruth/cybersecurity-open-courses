window.COURSE_MODULE = {
  "title": "Runtime Library and Standard Library Hardening",
  "graphicAlt": "Standard-library bounds assertions and runtime hardening detect invalid container use during configured builds, with compatibility and performance tradeoffs labeled.",
  "narration": "Security is affected not only by compiler flags, but also by runtime library and standard library configuration. Debug runtimes, checked iterators, hardened library modes, bounds-related checks, and allocator diagnostics can expose assumptions that ordinary release settings may not show.\n\nChecked iterators and debug runtime modes can catch invalid iterator use, container misuse, mismatched allocation behavior, and other defects during development. They are often too expensive or too behavior-changing for all production builds, but they provide valuable evidence in test profiles.\n\nSafer C++ abstractions reduce reliance on low-level manual memory handling. `std::span`, `std::string`, `std::vector`, smart pointers, RAII wrappers, and range-based operations can make ownership and bounds easier to review. Library hardening works best when the code already uses abstractions that carry useful information.\n\nBuild profiles should balance safety checks, performance, and compatibility. Development and sanitizer profiles can be stricter. Staging can mirror production while adding selected diagnostics. Release profiles should be intentional and verified against risk, performance requirements, and platform support.\n\nThe important habit is to document the tradeoff. If a hardened library mode is enabled only in testing, say why. If a release build disables a check for performance or compatibility, record the rationale and compensating controls. Governance turns configuration into an engineering decision.",
  "narrationPoints": [
    "Security is affected not only by compiler flags, but also by runtime library and standard library configuration.",
    "Checked iterators and debug runtime modes can catch invalid iterator use, container misuse, mismatched allocation behavior, and other defects during development.",
    "Library hardening works best when the code already uses abstractions that carry useful information.",
    "Staging can mirror production while adding selected diagnostics.",
    "The important habit is to document the tradeoff.",
    "If a release build disables a check for performance or compatibility, record the rationale and compensating controls."
  ]
};
