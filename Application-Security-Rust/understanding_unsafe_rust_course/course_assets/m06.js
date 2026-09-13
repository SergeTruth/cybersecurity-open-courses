window.COURSE_MODULE = {
  "title": "FFI and External Code Boundaries",
  "graphicAlt": "A narrow FFI wrapper mediates calls between safe Rust and external code, covering allocation and release, representation, errors, callbacks, and threading.",
  "narration": "Foreign function interfaces are one of the most common reasons unsafe Rust exists. Rust may call into C libraries, operating-system APIs, device interfaces, embedded platforms, or other external runtimes. At those boundaries, Rust's type system cannot automatically verify every promise made by the other side.\n\nReview should start with ownership. Who owns the memory passed across the boundary? Who allocates it? Who frees it? Is the same allocator used on both sides? Can the external code retain a pointer after the call returns? Can Rust safely use the value after handing it to external code? These questions determine whether the boundary is safe to use repeatedly.\n\nError conventions and data representation also need review. External code may signal errors through return values, output parameters, global state, or platform-specific conventions. Strings and buffers may have different encoding, length, and termination expectations. Structures may rely on layout guarantees that must be documented and preserved.\n\nThreading and callbacks add more assumptions. External code may not be thread-safe. It may call back into Rust after the original owner has gone away. It may require a callback to remain valid for a certain lifetime. These assumptions need explicit design, not hopeful comments.\n\nA good FFI wrapper converts external behavior into safe Rust types and clear APIs as soon as practical. Callers should not have to remember every pointer, lifetime, and allocation rule. The wrapper should capture those rules, enforce them where possible, and document the remaining safety contract where enforcement is not possible.",
  "narrationPoints": [
    "Foreign function interfaces are one of the most common.",
    "Review should start with ownership.",
    "Error conventions and data representation also need review.",
    "Threading and callbacks add more assumptions.",
    "A good FFI wrapper converts external behavior into safe.",
    "At those boundaries."
  ]
};
