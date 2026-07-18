window.COURSE_MODULE = {
  "title": "Compiler, Runtime, and Testing Support",
  "graphicAlt": "Bullet summary graphic for Compiler, Runtime, and Testing Support.",
  "narration": "Tooling helps find buffer problems earlier, but it does not replace correct design. A compiler warning, static analysis finding, sanitizer failure, or boundary test result is evidence that the code's assumptions need review.\n\nEnable useful compiler warnings and treat warning changes as review items. Warnings about truncation, conversion, array bounds, uninitialized data, suspicious formats, and unreachable paths can all point to buffer-related assumptions that deserve attention.\n\nStatic analysis can identify suspicious copies, array indexing, length calculations, unchecked results, risky API use, and inconsistent error handling. It can examine paths that are tedious for humans to trace manually, especially in code with many cleanup branches.\n\nSanitizers and runtime checks in development or test environments can catch memory and boundary issues where supported. They are most useful when tests exercise uncommon inputs, error paths, partial reads, and size boundaries instead of only the normal path.\n\nFuzzing can be used at a safe defensive level to find crashes, boundary mistakes, parser failures, and unexpected behavior before release. The goal is to improve robustness and fix defects before they become production problems.\n\nBoundary tests should cover empty input, minimum sizes, maximum allowed sizes, overlong input, malformed records, truncated data, unexpected delimiters, allocation failures, and conversion boundaries. Build hardening options can reduce impact, but they should not be treated as permission to write unsafe code.",
  "narrationPoints": [
    "A compiler warning, static analysis finding, sanitizer failure, or boundary test result is evidence that the code's assumptions need review.",
    "Enable useful compiler warnings and treat warning changes as review items.",
    "Static analysis can identify suspicious copies, array indexing, length calculations, unchecked results, risky API use.",
    "Sanitizers and runtime checks in development or test environments can catch memory and boundary issues.",
    "Fuzzing can be used at a safe defensive level to find crashes, boundary mistakes, parser failures."
  ]
};
