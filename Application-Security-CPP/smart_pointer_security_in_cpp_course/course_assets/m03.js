window.COURSE_MODULE = {
  "title": "Using std::unique_ptr Safely",
  "graphicAlt": "Exclusive ownership transfers visibly through a move, while short borrows and release handoffs retain explicit lifetime contracts.",
  "narration": "std::unique_ptr is often the right default when dynamic ownership is necessary. It says that exactly one owner is responsible for destroying the object. That simplicity is valuable during security review because ownership transfer is visible through move semantics. A copied unique_ptr is not allowed; a moved one makes the handoff explicit.\n\nFactory functions are a common pattern. A factory can build an object and return std::unique_ptr , making the caller's ownership clear. Member fields can also use unique_ptr when an object owns a subobject whose lifetime should end with the containing object. This avoids raw owning pointers and makes destruction predictable through RAII.\n\nSafe use still requires discipline. Passing ptr.get() can be appropriate for short borrowed access, but the callee must not delete or store that raw pointer unless a separate contract guarantees lifetime. Calling release() is review-sensitive because it gives up ownership without destroying the object. If release is used, a new owner should take responsibility immediately.\n\nunique_ptr can also carry a custom deleter for resources that are not released with ordinary delete . That makes it useful at library boundaries, but the deleter must match the creation API. Overall, exclusive ownership keeps object graphs smaller, cleanup paths easier to test, and lifetime responsibilities easier to maintain.",
  "narrationPoints": [
    "std::unique_ptr is often the right default when dynamic ownership is necessary.",
    "Member fields can also use unique_ptr when an object owns a subobject whose lifetime should end with the containing object.",
    "A factory can build an object and return std::unique_ptr , making the caller's ownership clear.",
    "Passing ptr.get() can be appropriate for short borrowed access, but the callee must not delete or store that raw pointer unless a separate contract guarantees lifetime.",
    "Calling release() is review-sensitive because it gives up ownership without destroying the object.",
    "Overall, exclusive ownership keeps object graphs smaller, cleanup paths easier to test, and lifetime responsibilities easier to maintain."
  ]
};
