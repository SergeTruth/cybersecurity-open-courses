window.COURSE_MODULE = {
  "title": "Cross-Compiler Configuration Strategy",
  "graphicAlt": "A compiler matrix maps GCC, Clang, MSVC, Linux, Windows, and architecture-specific controls to capability checks and equivalent security outcomes.",
  "narration": "Many C++ teams support more than one compiler, operating system, architecture, or build mode. A strong hardening strategy begins with security intent rather than a memorized list of flags. Define the category first: diagnostics, stack protection, binary layout, memory permissions, control-flow protection, sanitizer testing, or runtime checks.\n\nGCC, Clang, and MSVC do not always map one-to-one. Similar options may differ in behavior, maturity, defaults, dependencies, or supported platforms. A flag that is useful on one target may be unavailable or inappropriate on another. Teams should verify against the selected compiler, version, platform, and build system.\n\nBuild profiles help organize the strategy. Debug builds may favor diagnostics and library checks. Sanitizer builds add runtime instrumentation for tests. Staging builds may closely resemble release with extra observability. Release builds emphasize verified hardening, compatibility, and performance requirements.\n\nDocumentation should include compiler versions, flag rationale, profile definitions, exceptions, and known compatibility issues. This documentation should live close enough to the build system that it stays current. A stale wiki is less useful than a checked-in hardening matrix reviewed with build changes.\n\nThe hardening matrix should be revisited as platforms and dependencies change. New compiler versions may add features or change defaults. Dependencies may require compatibility exceptions. Operating systems may expose new protection mechanisms. Governance keeps the strategy alive.",
  "narrationPoints": [
    "Many C++ teams support more than one compiler, operating system, architecture, or build mode.",
    "GCC, Clang, and MSVC do not always map one-to-one.",
    "A flag that is useful on one target may be unavailable or inappropriate on another.",
    "Staging builds may closely resemble release with extra observability.",
    "Documentation should include compiler versions, flag rationale, profile definitions, exceptions, and known compatibility issues.",
    "New compiler versions may add features or change defaults."
  ]
};
