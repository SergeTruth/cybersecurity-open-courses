window.COURSE_MODULE = {
  "title": "Course Summary: Double-Free Prevention Checklist",
  "graphicAlt": "Clear owners, deliberate Drop, coordinated sharing, safe wrappers, and lifecycle tests preserve one cleanup authority.",
  "narration": "Preventing double free in Rust is a layered engineering practice. Prefer safe ownership and borrowing. Make cleanup responsibility explicit. Use moves and ownership transfer so old bindings cannot continue acting as owners. Remember that borrowed references access data but do not own cleanup.\n\nUse `Drop` deliberately. Resource cleanup should be tied to ownership, not scattered through unrelated code paths. Custom `Drop` implementations deserve careful review because they define release behavior. Keep cleanup paths simple, predictable, and testable.\n\nChoose smart pointers intentionally. `Box` gives owned indirection. `Rc` and `Arc` coordinate shared ownership so cleanup happens when the final strong owner goes away. `Weak` expresses non-owning relationships that can expire. Shared ownership is not duplicate ownership.\n\nWrap external resources in safe owner types. Use private fields, controlled constructors, and documented cleanup behavior. Keep unsafe and FFI boundaries small, documented, tested, and wrapped in APIs that prevent duplicate owners for one raw resource.\n\nFinally, test lifecycle edges and maintain cleanup contracts as dependencies, APIs, and platforms change. Review custom `Drop`, unsafe code, raw pointers, allocator compatibility, external cleanup functions, callbacks, retained pointers, and error paths. The goal is one clear cleanup authority from design through release.",
  "narrationPoints": [
    "Preventing double free in Rust is a layered engineering.",
    "Use `Drop` deliberately.",
    "Choose smart pointers intentionally.",
    "Wrap external resources in safe owner types.",
    "Finally, test lifecycle edges and maintain cleanup.",
    "Use moves and ownership transfer."
  ]
};
