window.COURSE_MODULE = {
  "title": "Course Summary: Memory-Safe C Habits",
  "graphicAlt": "Bullet summary graphic for Course Summary: Memory-Safe C Habits.",
  "narration": "Memory safety in C depends on explicit engineering discipline. The language gives direct access to memory, but the program must preserve the rules that make that access meaningful: which object is being accessed, how large it is, who owns it, how long it lives, and which operations are valid.\n\nTrack size, lifetime, ownership, and valid ranges together. A pointer should travel with the bounds and ownership facts that make it safe to use. A buffer should distinguish count, capacity, and byte size. A dynamically allocated object should have a clear owner and a predictable cleanup path.\n\nValidate before reading, writing, copying, resizing, or freeing. Check indexes and ranges before pointer arithmetic. Check allocation math before allocating. Check lifetime and ownership before retaining or releasing pointers. Treat strings as bounded buffers with terminator rules rather than assuming every character array is a valid string.\n\nFinally, use tools, tests, and reviews as layered support. Compiler warnings, static analysis, sanitizers, assertions, boundary tests, and robustness testing all help, but they work best when APIs are clear and contracts are reviewable. Prefer maintainable designs over clever assumptions, and make memory decisions visible enough for the next developer to trust.",
  "narrationPoints": [
    "The language gives direct access to memory, but the program must preserve the rules that make that access meaningful.",
    "A pointer should travel with the bounds and ownership facts that make it safe to use.",
    "Track size, lifetime, ownership, and valid ranges together.",
    "Treat strings as bounded buffers with terminator rules rather than assuming every character array is a valid string.",
    "Prefer maintainable designs over clever assumptions, and make memory decisions visible enough for the next developer to trust."
  ]
};
