window.COURSE_MODULE = {
  "title": "Detecting Heap Memory Defects",
  "graphicAlt": "Runtime checks, leak detection and static analysis feed root-cause investigation and regression tests without claiming complete proof of safety.",
  "narration": "Tool-assisted detection helps teams find heap memory defects earlier. AddressSanitizer-style diagnostics can expose invalid heap access during executed tests. Leak detection can highlight missing cleanup, unclear ownership, or failure paths that do not release allocated memory.\n\nStatic analysis can flag risky patterns such as unchecked allocation results, suspicious size calculations, possible stale use, double cleanup paths, and missing releases. Compiler warnings can also reveal conversions, ignored return values, and assumptions that deserve review.\n\nDebug allocators and targeted runtime checks can support focused investigation. They can help reveal misuse in development and test environments, especially when paired with meaningful test inputs and repeatable commands. The exact tools depend on compiler, platform, and project constraints.\n\nTools are powerful, but they do not prove every heap use is safe. They detect what they can observe or reason about. Untested paths, unsupported build configurations, uninstrumented dependencies, and unclear contracts can still hide defects.\n\nA mature workflow combines tools with design, tests, and review. Findings should lead to root-cause fixes, regression tests, and clearer ownership conventions. The goal is not only to close one report, but to make the next mistake easier to catch.",
  "narrationPoints": [
    "Leak detection can highlight missing cleanup, unclear ownership, or failure paths that do not release allocated memory.",
    "Static analysis can flag risky patterns such as unchecked allocation results, suspicious size calculations, possible stale use.",
    "Debug allocators and targeted runtime checks can support focused investigation.",
    "Tools are powerful, but they do not prove every heap use is safe.",
    "Findings should lead to root-cause fixes, regression tests, and clearer ownership conventions."
  ]
};
