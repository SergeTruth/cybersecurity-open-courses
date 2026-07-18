window.COURSE_MODULE = {
  "title": "Ownership Transfer Across APIs",
  "graphicAlt": "Bullet summary graphic for Ownership Transfer Across APIs.",
  "narration": "Ownership transfer across APIs is a common source of double-free risk because caller and callee may silently disagree about what happened after a function call. The caller may believe the callee consumed the object. The callee may believe it only borrowed it. Or both may believe they are responsible for cleanup after success.\n\nReturned objects need documented cleanup rules. If a function creates and returns a dynamic object, the caller needs to know which destroy function or allocator family applies. If the returned pointer is borrowed or points to internal storage, the caller needs to know that it must not free it.\n\nOutput parameters need the same clarity. An API may allocate a new object through an output pointer, fill a caller-owned buffer, or return an existing borrowed object. The contract should explain state after success and failure. If failure leaves an output pointer untouched, say so. If failure may allocate partial state, cleanup responsibility must be explicit.\n\nContainers are especially important. Inserting an object into a list, map, queue, cache, or ownership table should define whether the container takes ownership, copies the object, borrows it, or rejects it while leaving ownership with the caller. The caller's cleanup behavior depends on that answer.\n\nDestroy functions should match transfer rules. If an API takes ownership on success, the previous owner should stop freeing the object after success. If ownership remains with the caller, the callee should not release it. Transfer should be explicit enough to test and review.",
  "narrationPoints": [
    "Ownership transfer across APIs is a common source of double-free risk.",
    "If the returned pointer is borrowed or points to internal storage, the caller needs to know that it must not free it.",
    "If failure may allocate partial state, cleanup responsibility must be explicit.",
    "Inserting an object into a list, map, queue, cache, or ownership table should define whether the container takes ownership.",
    "If an API takes ownership on success, the previous owner should stop freeing the object after success."
  ]
};
