window.COURSE_MODULE = {
  "title": "Warnings, Diagnostics, and Secure Build Discipline",
  "graphicAlt": "A warning flows from compiler diagnostic to triage, code correction, narrowly documented exception, and a warning-clean continuous-integration gate.",
  "narration": "Warning policy is often the first security boundary in the build process. A compiler warning may point to an implicit conversion, an uninitialized value, a suspicious comparison, unreachable cleanup, an ignored return value, or code that depends on fragile assumptions. Treating important warnings as real defects helps teams find problems before runtime.\n\nHigh warning levels and targeted warnings are useful because they increase visibility. Teams may choose strict warnings for new code, additional diagnostics for security-sensitive modules, or static-analysis integrations for selected build profiles. The policy should match the codebase, but it should be intentional rather than whatever the compiler default happens to be.\n\nWarning fatigue is real. If the build produces hundreds of known warnings, developers stop noticing new ones. Broad suppressions create the opposite problem: they make the build look clean while hiding useful evidence. A better practice is to fix warnings where practical, suppress narrowly where necessary, and document why the suppression exists.\n\nDiagnostic policy should be consistent across developer machines and CI. If CI uses stricter settings than local builds, developers get surprises late. If local builds are stricter than CI, release evidence is incomplete. The build system should make the expected settings reproducible.\n\nExceptions should have owners, rationale, and review dates. A warning suppression for a vendor header, generated file, or platform-specific limitation may be reasonable. It should still be visible and revisited as compilers, dependencies, and source code change.",
  "narrationPoints": [
    "Warning policy is often the first security boundary in the build process.",
    "High warning levels and targeted warnings are useful because they increase visibility.",
    "If the build produces hundreds of known warnings, developers stop noticing new ones.",
    "A better practice is to fix warnings where practical, suppress narrowly where necessary, and document why the suppression exists.",
    "If local builds are stricter than CI, release evidence is incomplete.",
    "A warning suppression for a vendor header, generated file, or platform-specific limitation may be reasonable."
  ]
};
