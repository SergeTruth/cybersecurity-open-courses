window.COURSE_MODULE = {
  "title": "Course Summary: Lifetime-Safe C Habits",
  "graphicAlt": "Clear owner token, borrowed access window inside a lifetime bar and predictable cleanup container rest on an explicit-API-contract foundation.",
  "narration": "Use-after-free prevention depends on explicit ownership and lifetime discipline. A pointer is not enough. The code must know who owns the allocation, who may borrow it, who may retain it, and when the object is released. Those rules should be visible at function boundaries and cleanup points.\n\nAvoid stale aliases and ambiguous cleanup responsibilities. If more than one pointer can reach an allocation, the design should say which component owns it and how borrowed references become invalid. Setting one pointer to null can help locally, but it does not clear other aliases or replace a clear ownership model.\n\nHandle error paths and reallocation with predictable state transitions. Partial initialization should clean up only what was acquired. Resizing should preserve the original allocation on failure and update metadata only after success. Cleanup should leave objects in a defined state and prevent later code from treating released storage as live.\n\nFinally, use clear API contracts, code review, tests, sanitizers, static analysis, and compiler diagnostics as layered defenses. Tools are strongest when they support maintainable lifetime design. Prefer straightforward ownership rules over assumptions that are only obvious to the original author.",
  "narrationPoints": [
    "The code must know who owns the allocation, who may borrow it, who may retain it.",
    "Setting one pointer to null can help locally, but it does not clear other aliases or replace a clear ownership model.",
    "If more than one pointer can reach an allocation, the design should say.",
    "Resizing should preserve the original allocation on failure and update metadata only after success.",
    "Tools are strongest when they support maintainable lifetime design."
  ]
};
