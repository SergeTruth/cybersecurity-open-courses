window.COURSE_MODULE = {
  "title": "Course Summary: A Prevention Roadmap",
  "graphicAlt": "A prevention roadmap links safer containers, explicit ranges, checked arithmetic, bounded APIs, legacy isolation, testing, and release hardening.",
  "narration": "A practical buffer overflow prevention roadmap begins with design. Preserve bounds and ownership information for as long as possible. Avoid pointer-only contracts when containers, views, strings, or buffer objects can express the real relationship more clearly.\n\nPrefer modern C++ abstractions by default. Use `std::array` for fixed-size storage, `std::vector` for dynamic contiguous storage, `std::string` for owned text, `std::span` for bounded non-owning views, and RAII to keep lifetime and cleanup visible.\n\nValidate sizes before memory operations. Check external length fields, maximum supported sizes, unit conversions, arithmetic, source availability, destination capacity, and output requirements before allocating, copying, parsing, or transforming data.\n\nRefactor legacy code incrementally. Prioritize externally reachable parsers and buffer-heavy paths. Add wrappers, strengthen tests, replace ambiguous APIs, and document remaining risk. Prevention improves when every change makes the contract easier to review.\n\nFinally, test, harden, verify, and revisit the baseline over time. Use boundary tests, sanitizers, defensive fuzzing, compiler diagnostics, hardened release profiles, artifact verification, and governance. Buffer overflow prevention is not one technique; it is disciplined engineering across design, implementation, testing, build, and release.",
  "narrationPoints": [
    "A practical buffer overflow prevention roadmap begins with design.",
    "Avoid pointer-only contracts when containers, views, strings, or buffer objects can express the real relationship more clearly.",
    "Check external length fields, maximum supported sizes, unit conversions, arithmetic, source availability, destination capacity, and output requirements before allocating, copying, parsing, or transforming data.",
    "Add wrappers, strengthen tests, replace ambiguous APIs, and document remaining risk.",
    "Finally, test, harden, verify, and revisit the baseline over time.",
    "Buffer overflow prevention is not one technique; it is disciplined engineering across design, implementation, testing, build, and release."
  ]
};
