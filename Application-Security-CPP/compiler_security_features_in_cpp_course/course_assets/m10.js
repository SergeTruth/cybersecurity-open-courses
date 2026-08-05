window.COURSE_MODULE = {
  "title": "Course Summary: A Practical Hardening Roadmap",
  "graphicAlt": "A compiler-hardening roadmap links policy, capability detection, build targets, testing, documented exceptions, binary inspection, and release approval.",
  "narration": "A practical hardening roadmap starts with diagnostics. Raise warning quality, decide which warnings are treated as defects, control suppressions, and make the diagnostic policy consistent across local builds and CI. Clean builds make real problems easier to see.\n\nNext, add sanitizer coverage where it fits the project. Address, undefined behavior, leak, and thread checks help expose defects that ordinary tests may miss. The value comes from meaningful tests, realistic workloads, prompt triage, and repeatable CI jobs.\n\nThen define release hardening settings for stack protection, object-size checks, executable layout, memory permissions, relocation behavior, and control-flow protection where the platform supports them. Treat toolchain-specific flags as mappings from security intent, not as copy-and-paste guarantees.\n\nUse runtime and standard library hardening where appropriate. Development profiles can favor strict checking. Release profiles should balance risk, compatibility, and performance. Every profile should be documented so teams know what evidence each one provides.\n\nFinally, verify outputs in CI, inspect delivered artifacts, document exceptions, and revisit the baseline as compilers, platforms, dependencies, and product requirements evolve. Compiler security features are part of disciplined engineering. They support safer C++ design; they do not replace it.",
  "narrationPoints": [
    "Raise warning quality, decide which warnings are treated as defects, control suppressions, and make the diagnostic policy consistent across local builds and CI.",
    "Next, add sanitizer coverage where it fits the project.",
    "The value comes from meaningful tests, realistic workloads, prompt triage, and repeatable CI jobs.",
    "Use runtime and standard library hardening where appropriate.",
    "Every profile should be documented so teams know what evidence each one provides.",
    "Compiler security features are part of disciplined engineering."
  ]
};
