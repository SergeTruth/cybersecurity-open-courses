window.COURSE_MODULE = {
  "title": "Course Summary: A Bounds Safety Roadmap",
  "graphicAlt": "An array-safety checklist connects preserved extent, checked arithmetic, bounded views, explicit ownership, edge tests, and hardened builds.",
  "narration": "Array bounds safety is not a single feature. It is a disciplined engineering habit across design, implementation, testing, review, build, and release. The roadmap begins by preserving the information that makes access valid: size, range, ownership, mutability, and lifetime.\n\nPrefer containers, bounded views, and range-aware access when they fit the design. std::array, std::vector, std::string, std::span, iterator ranges, and standard algorithms can reduce manual tracking and make intent easier to review. Raw pointer interfaces should be narrow, justified, and clearly documented.\n\nValidate before access. Indexes, offsets, lengths, counts, and subranges should be checked as complete range decisions, especially when they come from external input or are derived from multiple fields. A valid start value does not prove the full range is valid.\n\nImprove legacy code incrementally. Prioritize code that handles external formats, crosses trust boundaries, manages memory, or mixes offsets and lengths. Add regression tests, wrap unsafe interfaces, replace unclear range logic, and document assumptions that remain.\n\nFinally, reinforce the process with tools and governance. Boundary tests, sanitizers, compiler diagnostics, hardened library modes, release verification, and code review all make defects visible earlier. Revisit exceptions as the codebase, compiler, platform, and team practices evolve.",
  "narrationPoints": [
    "Array bounds safety is not a single feature.",
    "Prefer containers, bounded views, and range-aware access when they fit the design. std::array, std::vector, std::string, std::span, iterator ranges, and standard algorithms can reduce manual tracking and make intent easier to review.",
    "Indexes, offsets, lengths, counts, and subranges should be checked as complete range decisions, especially when they come from external input or are derived from multiple fields.",
    "Prioritize code that handles external formats, crosses trust boundaries, manages memory, or mixes offsets and lengths.",
    "Finally, reinforce the process with tools and governance.",
    "Revisit exceptions as the codebase, compiler, platform, and team practices evolve."
  ]
};
