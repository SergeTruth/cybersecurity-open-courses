window.COURSE_MODULE = {
  "title": "FFI, Allocators, and External Cleanup Contracts",
  "graphicAlt": "Foreign resources return to their matching release mechanism, and ownership on both success and error paths is specified.",
  "narration": "FFI is a common place where Rust's ownership model meets external cleanup rules. A C library, platform API, device SDK, or native runtime may allocate a resource that must be released by a matching cleanup function. Rust cannot automatically infer every rule from the external interface.\n\nAllocator compatibility is critical. Some objects must be freed by the same library that created them. Some buffers must be returned through a specific release function. Some handles must be closed once. If Rust allocates and external code frees, or external code allocates and Rust frees, the contract must be explicit and compatible.\n\nA wrapper should also make ownership transition points obvious. If an external function takes ownership, the Rust wrapper should consume the owner or move it into a state where ordinary callers cannot drop it again. If external code only borrows temporarily, the wrapper should not surrender cleanup authority by accident.\n\nError paths can change ownership responsibility. An external function might transfer ownership only on success, or it might require cleanup even after a partial failure. A wrapper should document these cases and encode them so callers do not have to remember subtle release rules under error pressure.\n\nCallbacks and retained pointers create additional cleanup questions. External code may store a pointer for later use, borrow only during the call, or take ownership of a handle. The wrapper should make those modes distinct and prevent duplicate cleanup or stale retained references.\n\nA safe FFI wrapper should prevent both leaks and double cleanup. It should know who allocates, who frees, which function releases the resource, when ownership transfers, and how cleanup behaves after errors. That knowledge belongs in types, constructors, `Drop`, and safety documentation, not only in tribal memory.",
  "narrationPoints": [
    "FFI is a common place.",
    "Allocator compatibility is critical.",
    "A wrapper should also make ownership transition points.",
    "Error paths can change ownership responsibility.",
    "Callbacks and retained pointers create additional cleanup.",
    "A safe FFI wrapper should prevent both leaks and double."
  ]
};
