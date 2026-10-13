window.COURSE_MODULE = {
  "title": "Course Summary: Leak-Resistant C Habits",
  "graphicAlt": "Leak-resistant C makes ownership explicit, covers normal and failure exits, releases nested owned allocations, preserves state on resize failure, and verifies these rules with tools and review.",
  "narration": "Memory leak prevention depends on clear ownership and predictable cleanup. Every allocation should have an intended owner and a release path. The owner may be a caller, a structure, a container, a module, or a lifecycle function, but it should be identifiable when the allocation is introduced.\n\nError paths, replacement paths, and partial initialization paths deserve the same attention as successful execution. Early returns should not skip cleanup. Replacing a pointer should not abandon the old allocation. Cleanup for partially initialized objects should release what succeeded without assuming every field is ready.\n\nContainers, nested allocations, duplicated strings, and reallocation require explicit rules. A container should say whether it owns its elements. A structure cleanup routine should release every owned field. Resize logic should preserve the original allocation on failure and update metadata only after success.\n\nTools help detect missed cases, but design and review prevent many leaks before testing. Leak checkers, sanitizers, static analysis, allocation tracing, and boundary-focused tests are strongest when APIs use simple ownership contracts. Prefer maintainable cleanup rules over clever assumptions that only the original author remembers.",
  "narrationPoints": [
    "Every allocation should have an intended owner and a release path.",
    "Cleanup for partially initialized objects should release what succeeded without assuming every field is ready.",
    "Resize logic should preserve the original allocation on failure and update metadata only after success.",
    "Tools help detect missed cases, but design and review prevent many leaks before testing.",
    "Prefer maintainable cleanup rules over clever assumptions that only the original author remembers."
  ]
};
