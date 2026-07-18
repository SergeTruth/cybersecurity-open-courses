window.COURSE_MODULE = {
  "title": "Course Summary: A Practical C Memory Baseline",
  "graphicAlt": "Bullet summary graphic for Course Summary: A Practical C Memory Baseline.",
  "narration": "A practical C memory baseline starts with object reasoning. Think in terms of objects, not just addresses. Know storage duration, object lifetime, pointer validity, ownership, and cleanup responsibility before data crosses a function boundary.\n\nRespect effective type, aliasing, and alignment rules. Initialize data before use, define serialization formats explicitly, avoid raw structure comparisons when padding may exist, and keep lengths and capacities attached to buffers.\n\nDynamic allocation needs disciplined ownership, checked allocation-size arithmetic, careful realloc handling, and cleanup paths that handle partial initialization. After free, the object's lifetime has ended, even if pointer values still exist elsewhere.\n\nFinally, avoid undefined behavior and unclear evaluation order. Use clear, sequenced statements, synchronize shared memory with atomics or locks, and review memory assumptions before release. The C memory model is demanding, but disciplined reasoning makes defensive C code more portable, maintainable, and trustworthy.",
  "narrationPoints": [
    "Know storage duration, object lifetime, pointer validity, ownership, and cleanup responsibility before data crosses a function boundary.",
    "Initialize data before use, define serialization formats explicitly, avoid raw structure comparisons.",
    "Dynamic allocation needs disciplined ownership, checked allocation-size arithmetic, careful realloc handling.",
    "After free, the object's lifetime has ended, even if pointer values still exist elsewhere.",
    "Use clear, sequenced statements, synchronize shared memory with atomics or locks, and review memory assumptions before release."
  ]
};
