window.COURSE_MODULE = {
  "title": "Custom Resources, Deleters, and Allocators",
  "graphicAlt": "Show custom resource acquisition paired with correct release plus pool/arena lifetime boundaries.",
  "narration": "C++ programs often manage resources beyond heap memory. File handles, sockets, operating system handles, library contexts, cryptographic contexts, GPU resources, memory-mapped files, pools, and arenas can all leak if ownership is unclear.\n\nResource ownership should be represented in types, usually through RAII wrappers. A wrapper can define how the resource is acquired, moved, released, and inspected. It can also prevent accidental copying when copying would duplicate ownership incorrectly.\n\nCustom deleters must match cleanup contracts. A resource created by one library function may require a specific release function. A mismatch can leak the resource or release it incorrectly. Reviewers should be able to connect creation and cleanup without tracing unrelated code.\n\nPools and arenas can be safe and useful, but they require clear reset rules. A pool reset may invalidate many objects at once. An arena may retain memory until a larger scope ends. These lifetime choices must be documented so callers do not assume ordinary individual cleanup.\n\nSpecialized allocators require documentation and review. State who owns the allocator, when memory is released, whether the allocator is thread-safe, what happens when it is exhausted, and how usage is measured. Performance optimization should not hide lifecycle responsibility.\n\nA good wrapper makes the correct cleanup path ordinary. It should be movable when transfer is allowed, noncopyable when ownership must remain unique, and small enough that teams will use it consistently.",
  "narrationPoints": [
    "File handles, sockets, operating system handles, library contexts, cryptographic contexts, GPU resources, memory-mapped files, pools, and arenas can all leak if ownership is unclear.",
    "Resource ownership should be represented in types, usually through RAII wrappers.",
    "A resource created by one library function may require a specific release function.",
    "Pools and arenas can be safe and useful, but they require clear reset rules.",
    "State who owns the allocator, when memory is released, whether the allocator is thread-safe, what happens when it is exhausted, and how usage is measured.",
    "A good wrapper makes the correct cleanup path ordinary."
  ]
};
