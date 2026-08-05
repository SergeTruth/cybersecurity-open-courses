window.COURSE_MODULE = {
  "title": "Compiler, Library, and Release Hardening",
  "graphicAlt": "A release-hardening panel combines stack protection, fortified library calls, PIE, non-executable memory, warnings, and artifact verification.",
  "narration": "Compiler, library, and release hardening features help catch some mistakes and reduce risk, but they do not replace safe code. They are defense-in-depth controls that work best alongside safer APIs, clear ownership, testing, review, and release verification.\n\nWarnings and static diagnostics catch risky patterns early. Suspicious conversions, ignored results, uninitialized reads, deprecated functions, and size mismatches are useful signals. Teams should fix important warnings or document narrow exceptions rather than hiding large classes of diagnostics.\n\nStack protection, object-size-aware checks, and fortified library behavior can add runtime checks for selected patterns. Coverage depends on compiler, optimization, platform, library, and code shape. These features should be enabled deliberately and verified in release builds.\n\nHardened standard library modes and debug runtimes can expose invalid iterator use, bounds mistakes, and invalid assumptions during development or testing. Release settings may differ for performance or compatibility, but the choice should be documented.\n\nToolchain flags vary across GCC, Clang, MSVC, operating systems, architectures, and versions. Define the security intent first, then map that intent to the selected toolchain. Do not assume that a flag copied from another project has the same effect in your build.\n\nRelease artifacts should be verified against the hardening policy. Check build logs, compiler and linker commands, binary properties, dependency settings, and packaging steps. A policy is only useful when the delivered artifact actually reflects it.",
  "narrationPoints": [
    "Compiler, library, and release hardening features help catch some mistakes and reduce risk, but they do not replace safe code.",
    "Teams should fix important warnings or document narrow exceptions rather than hiding large classes of diagnostics.",
    "Coverage depends on compiler, optimization, platform, library, and code shape.",
    "Toolchain flags vary across GCC, Clang, MSVC, operating systems, architectures, and versions.",
    "Do not assume that a flag copied from another project has the same effect in your build.",
    "A policy is only useful when the delivered artifact actually reflects it."
  ]
};
