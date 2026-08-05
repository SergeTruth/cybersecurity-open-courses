window.COURSE_MODULE = {
  "title": "Control-Flow and Return-Address Protection",
  "graphicAlt": "Indirect calls pass through control-flow validation, while return-address protection detects a modified return path on supported architectures.",
  "narration": "Control-flow and return-address protection features are designed to reduce the chance that a memory-safety defect can change execution into an unintended path. The details vary by compiler, architecture, operating system, and dependency set, but the defensive goal is to preserve expected control flow.\n\nCommon hardening targets include indirect calls, indirect branches, function returns, and stored return addresses. Some approaches rely on compiler instrumentation. Some rely on CPU features such as branch target enforcement or shadow stacks. Some require operating-system support and compatible libraries.\n\nThese protections are platform-specific. A setting available in one compiler may have a different name, different maturity, or different runtime dependency in another. A team should document the intended control-flow protection category and then map that intent to each supported toolchain and platform.\n\nCompatibility testing matters. Control-flow features can interact with assembly code, JIT behavior, callbacks, plug-ins, older dependencies, exception handling, and platform libraries. Staged rollout lets teams identify compatibility issues without turning a release profile into guesswork.\n\nControl-flow protection adds depth, but it does not replace memory-safe coding. Clear ownership, bounds-aware access, initialization discipline, safer APIs, code review, and sanitizer testing remain essential. The compiler feature is one layer in a broader engineering system.",
  "narrationPoints": [
    "Control-flow and return-address protection features are designed to reduce the chance that a memory-safety defect can change execution into an unintended path.",
    "Common hardening targets include indirect calls, indirect branches, function returns, and stored return addresses.",
    "A setting available in one compiler may have a different name, different maturity, or different runtime dependency in another.",
    "Control-flow features can interact with assembly code, JIT behavior, callbacks, plug-ins, older dependencies, exception handling, and platform libraries.",
    "Control-flow protection adds depth, but it does not replace memory-safe coding.",
    "The compiler feature is one layer in a broader engineering system."
  ]
};
