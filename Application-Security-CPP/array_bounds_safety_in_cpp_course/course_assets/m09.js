window.COURSE_MODULE = {
  "title": "Testing, Sanitizers, and Build-Time Defenses",
  "graphicAlt": "Boundary tests cover empty, one-element, exact-end, and rejected over-end ranges while sanitizer and static-analysis jobs run beside them.",
  "narration": "Array bounds defects often appear only at edge sizes and failure paths. Tests should cover zero elements, one element, expected maximums, just-below and just-above limits, empty input, truncated input, inconsistent lengths, and indexes near the beginning and end of a range.\n\nAddressSanitizer can help reveal memory access defects while tests exercise the code. UndefinedBehaviorSanitizer can reveal behavior that the program should not rely on. These tools are most useful in development and continuous integration, where the extra checks can run before a defect reaches users.\n\nCompiler warnings and static diagnostics add another layer. Warnings can flag suspicious conversions, signed and unsigned comparisons, array indexing concerns, unreachable conditions, and other code patterns worth review. A useful warning policy explains which findings are required to fix and how exceptions are documented.\n\nHardened library modes and debug iterators can catch invalid range assumptions in some builds. They are not a substitute for safe design, and they may not match production performance settings, but they give teams valuable feedback when integrated into test and CI pipelines.\n\nTools need process around them. A sanitizer report, warning, or boundary test failure should become a tracked engineering defect with an owner, fix, regression test, and follow-up review. Bounds-safety checks become stronger when they are repeatable, visible, and part of normal delivery.",
  "narrationPoints": [
    "Array bounds defects often appear only at edge sizes and failure paths.",
    "AddressSanitizer can help reveal memory access defects while tests exercise the code.",
    "Compiler warnings and static diagnostics add another layer.",
    "Warnings can flag suspicious conversions, signed and unsigned comparisons, array indexing concerns, unreachable conditions, and other code patterns worth review.",
    "Hardened library modes and debug iterators can catch invalid range assumptions in some builds.",
    "Bounds-safety checks become stronger when they are repeatable, visible, and part of normal delivery."
  ]
};
