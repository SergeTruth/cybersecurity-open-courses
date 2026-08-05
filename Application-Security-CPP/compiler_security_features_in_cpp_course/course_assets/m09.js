window.COURSE_MODULE = {
  "title": "Verification, Governance, and Release Readiness",
  "graphicAlt": "A release verifier inspects executable type, relocation protection, stack metadata, imported hardening functions, and expected control-flow notes.",
  "narration": "Verification is where hardening policy becomes evidence. A documented flag does not protect a binary unless it is actually used in the build that ships. Build systems can have conditionals, profile differences, dependency overrides, cached settings, or packaging steps that change the final result.\n\nCI should verify compiler commands, linker commands, selected profiles, and expected build settings. Logs should make it possible to confirm that the intended hardening profile ran. Automated checks can fail the build when required settings are absent or when an unapproved profile is used for release artifacts.\n\nRelease checks should inspect delivered artifacts, not just source files. Binary property inspection can confirm layout, permissions, relocation properties, and other platform-specific attributes where tooling supports it. Dependency consistency also matters because libraries may be built with different settings.\n\nExceptions require management. A platform limitation, dependency compatibility issue, or performance constraint may justify a specific exception. That exception should have an owner, rationale, risk acceptance, compensating controls where appropriate, and an expiration or review date.\n\nHardening baselines need owners and recurring review. Compilers, operating systems, CPUs, dependencies, and build systems evolve. Someone should be responsible for maintaining the baseline, reviewing changes, and ensuring release readiness evidence remains current.",
  "narrationPoints": [
    "A documented flag does not protect a binary unless it is actually used in the build that ships.",
    "CI should verify compiler commands, linker commands, selected profiles, and expected build settings.",
    "Automated checks can fail the build when required settings are absent or when an unapproved profile is used for release artifacts.",
    "Binary property inspection can confirm layout, permissions, relocation properties, and other platform-specific attributes where tooling supports it.",
    "A platform limitation, dependency compatibility issue, or performance constraint may justify a specific exception.",
    "Someone should be responsible for maintaining the baseline, reviewing changes, and ensuring release readiness evidence remains current."
  ]
};
