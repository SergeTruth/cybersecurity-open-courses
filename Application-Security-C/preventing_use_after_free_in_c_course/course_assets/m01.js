window.COURSE_MODULE = {
  "title": "What Use-After-Free Means",
  "graphicAlt": "A live object crosses a release boundary to faded invalid storage.",
  "narration": "A use-after-free defect occurs when code accesses memory after that memory has been released. The access might be a read, a write, a call that passes the pointer as valid storage, or logic that treats the old address as an active object. The key issue is lifetime: the program is using storage after the object it represented is no longer alive.\n\nThe pointer value may still look like an address. It may be non-null, it may compare equal to a saved value, and it may even appear to work in a small test. None of that proves the object is still valid. Once the allocation is released, the program no longer owns that object, and later use depends on an assumption the program is not allowed to make.\n\nFreed memory must not be read, written, passed to APIs as valid storage, or interpreted as an active object. The memory manager may reuse that storage later. It may leave it untouched for a while. It may add diagnostics in a debug build. Defensive C code should not rely on any of those implementation details.\n\nUse-after-free defects can cause crashes, corrupted state, unpredictable behavior, accidental data exposure, or security defects. The safe engineering response is to prevent stale references from surviving release, and to make ownership and cleanup rules visible enough for review.\n\nPrevention begins by treating lifetime as a design rule, not as an afterthought. Every allocation should have an owner. Every borrowed pointer should have a clear lifetime. Every cleanup path should leave the program in a state where later code cannot accidentally continue using released storage.",
  "narrationPoints": [
    "A use-after-free defect occurs when code accesses memory after that memory has been released.",
    "Once the allocation is released, the program no longer owns that object.",
    "Freed memory must not be read, written, passed to APIs as valid storage.",
    "Use-after-free defects can cause crashes, corrupted state, unpredictable behavior, accidental data exposure, or security defects.",
    "Every cleanup path should leave the program in a state where later code cannot accidentally continue using released storage."
  ]
};
