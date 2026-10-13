window.COURSE_MODULE = {
  "title": "Safe Resizing and realloc",
  "graphicAlt": "For a nonzero resize, the original owner is retained until success; pointer and size commit together, failures retain the old allocation, and invalidated aliases are rebuilt.",
  "narration": "Resizing heap memory is easy to get wrong because a resize changes more than capacity. It can change the address, object layout assumptions, aliases, and failure behavior. A realloc-style operation should be treated as an ownership and lifetime transition.\n\nIf resizing fails, the original allocation remains the object the program must manage. Assigning the result directly to the only owning pointer can lose the original allocation on failure. A safer pattern preserves the original pointer until success is confirmed and then updates ownership state.\n\nWhen resizing succeeds, the allocation may have moved. Old aliases, interior pointers, cached element addresses, and borrowed references may no longer be valid. Code that resizes a buffer should review every place that may still refer to the old storage.\n\nPointer and size metadata must be updated together. Capacity, current length, element count, and object state should describe the same allocation. A mismatch between pointer and metadata can make later accesses appear checked while still using the wrong bounds.\n\nA good resize workflow defines what happens when expanding, shrinking, failing, moving, or receiving a zero-size request. That definition makes resizing reviewable instead of relying on scattered assumptions.",
  "narrationPoints": [
    "Resizing heap memory is easy to get wrong because a resize changes more than capacity.",
    "A safer pattern preserves the original pointer until success is confirmed and then updates ownership state.",
    "Code that resizes a buffer should review every place that may still refer to the old storage.",
    "Capacity, current length, element count, and object state should describe the same allocation.",
    "A good resize workflow defines what happens when expanding, shrinking, failing, moving."
  ]
};
