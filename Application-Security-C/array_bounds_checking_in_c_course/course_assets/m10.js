window.COURSE_MODULE = {
  "title": "Course Summary: Bounds-Safe C Habits",
  "graphicAlt": "Bullet summary graphic for Course Summary: Bounds-Safe C Habits.",
  "narration": "Bounds-safe C starts with keeping data and size information together. A pointer should travel with the number of valid elements or bytes it can read, and writable storage should travel with its capacity. When a function appends, it also needs the current count. These facts should be part of the API, not hidden assumptions.\n\nValidate before access. Check indexes before reading or writing, and check ranges before copying, appending, parsing, or advancing a cursor. Validate both the start offset and requested length, and avoid pointer arithmetic until the range has been confirmed. Failure behavior should be explicit and should leave program state trustworthy.\n\nDistinguish count, capacity, bytes, elements, and string terminators. A C string is a bounded character buffer plus a terminator rule. A dynamic buffer is a pointer plus count, capacity, ownership, and lifetime. A loop bound is a promise about every index the loop will use. Keeping those meanings separate prevents many common mistakes.\n\nFinally, use review, tests, compiler diagnostics, static analysis, assertions, and sanitizers as layered support. Tools catch defects earlier when APIs are clear and tests exercise boundaries. The long-term habit is simple but demanding: every time code indexes, copies, appends, parses, resizes, or treats bytes as a string, ask what bounds fact makes that operation safe.",
  "narrationPoints": [
    "A pointer should travel with the number of valid elements or bytes it can read.",
    "Validate both the start offset and requested length, and avoid pointer arithmetic until the range has been confirmed.",
    "A C string is a bounded character buffer plus a terminator rule.",
    "A dynamic buffer is a pointer plus count, capacity, ownership, and lifetime.",
    "Tools catch defects earlier when APIs are clear and tests exercise boundaries."
  ]
};
