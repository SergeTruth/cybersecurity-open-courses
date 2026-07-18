window.COURSE_MODULE = {
  "title": "Stack, Heap, and Static Buffers",
  "graphicAlt": "Bullet summary graphic for Stack, Heap, and Static Buffers.",
  "narration": "Buffer overflow risk can occur with automatic, allocated, static, or global storage. The storage location changes lifetime, initialization, sharing, and cleanup behavior, but it does not remove the need for bounds checking.\n\nAutomatic buffers, often called stack-like local buffers, live for the duration of their scope. They are convenient for small temporary work, but their capacity is fixed at declaration time. Code that writes into them still needs to know the intended maximum data size and handle oversized input safely.\n\nHeap buffers depend on allocation size, ownership, lifetime, and cleanup discipline. A heap allocation may be sized from input, a file header, a message field, or a calculation. If that size is wrong, unchecked, or later confused with another length, the buffer contract breaks.\n\nStatic and global buffers can create shared-state concerns. They may be reused across calls, accessed by multiple functions, or touched by concurrent execution paths. A fixed global buffer can appear convenient while making ownership, current length, and thread access harder to reason about.\n\nDefensive review should focus on capacity, lifetime, ownership, thread access, and error handling rather than storage mythology. The question is not whether a buffer lives in one storage region or another. The question is whether every operation respects the finite region it is allowed to use.",
  "narrationPoints": [
    "The storage location changes lifetime, initialization, sharing, and cleanup behavior, but it does not remove the need for bounds checking.",
    "Code that writes into them still needs to know the intended maximum data size and handle oversized input safely.",
    "Heap buffers depend on allocation size, ownership, lifetime, and cleanup discipline.",
    "A fixed global buffer can appear convenient while making ownership, current length, and thread access harder to reason about.",
    "Defensive review should focus on capacity, lifetime, ownership, thread access, and error handling rather than storage mythology."
  ]
};
