window.COURSE_MODULE = {
  "title": "Aliasing, Shared References, and API Design",
  "graphicAlt": "Borrowed, callback and interior references are tied to an owner's live object; resize or release can invalidate them, and const does not establish ownership.",
  "narration": "Multiple references to heap memory complicate safety. A pointer may be owned by one component, borrowed by another, cached in a structure, passed to a callback, or used as an interior reference into a larger object. Each reference needs a lifetime that does not exceed the object it names.\n\nShared mutation needs clear rules. If two modules can modify the same heap object, reviewers need to know which invariants must be preserved and which operations can resize or release storage. Without those rules, one caller can invalidate another caller's assumptions.\n\nResizing or freeing can invalidate aliases. A pointer that was safe before a resize may become stale afterward. A pointer that was safe before cleanup may become invalid after release. APIs that expose interior pointers should document when those pointers stop being valid.\n\nConst-correctness can communicate intended access. A const pointer does not solve ownership by itself, but it can tell callers when data should be treated as read-only. That makes accidental mutation easier to spot during review.\n\nSafer APIs reduce ambiguous ownership. Prefer functions that clearly borrow, clearly return ownership, or operate through a well-defined owner object. Avoid designs where any caller can free shared storage or where size metadata is separated from the pointer it describes.",
  "narrationPoints": [
    "Each reference needs a lifetime that does not exceed the object it names.",
    "If two modules can modify the same heap object, reviewers need to know.",
    "A pointer that was safe before cleanup may become invalid after release.",
    "A const pointer does not solve ownership by itself, but it can tell callers when data should be treated as read-only.",
    "Avoid designs where any caller can free shared storage or where size metadata is separated from the pointer it describes."
  ]
};
