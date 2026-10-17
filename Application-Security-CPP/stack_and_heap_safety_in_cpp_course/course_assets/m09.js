window.COURSE_MODULE = {
  "title": "Course Summary: Safer Stack and Heap Habits",
  "graphicAlt": "Lifetime, ownership, bounds, cleanup, invalidation and budgets are reviewed for both storage kinds and reinforced by testing.",
  "narration": "Safer stack and heap habits begin with reviewable lifetime and ownership. Keep stack lifetimes simple, and do not let pointers, references, iterators, or views escape the objects they describe. When heap allocation is needed, make the owner, transfer point, and cleanup rule visible in the interface.\n\nPrefer RAII, containers, smart pointers, and bounded views. Let destructors release resources. Preserve size information with data, validate indexes and externally influenced sizes, and avoid raw buffer assumptions that require every caller to remember hidden rules.\n\nBe skeptical of dangling access, stale aliases, invalidated iterators, moved-from objects, and long-lived views into unstable storage. Respect resource limits by avoiding large local objects by default, bounding recursion where needed, and budgeting heap use for variable-size input.\n\nFinally, use tools and workflow to reinforce the design. Sanitizers, static analysis, compiler warnings, boundary tests, regression tests, and focused code review all help catch mistakes earlier. Modernize incrementally, starting with code that handles untrusted input, complex ownership, or manual memory management.\n\nThe lasting goal is not to choose stack or heap as a slogan. It is to make every memory decision understandable. If another engineer can identify lifetime, owner, valid range, cleanup path, and resource limit from the interface and nearby code, the design is far easier to maintain safely.",
  "narrationPoints": [
    "Safer stack and heap habits begin with reviewable lifetime and ownership.",
    "Keep stack lifetimes simple, and do not let pointers, references, iterators, or views escape the objects they describe.",
    "Preserve size information with data, validate indexes and externally influenced sizes, and avoid raw buffer assumptions that require every caller to remember hidden rules.",
    "Respect resource limits by avoiding large local objects by default, bounding recursion where needed, and budgeting heap use for variable-size input.",
    "Sanitizers, static analysis, compiler warnings, boundary tests, regression tests, and focused code review all help catch mistakes earlier.",
    "The lasting goal is not to choose stack or heap as a slogan."
  ]
};
