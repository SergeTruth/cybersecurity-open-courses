window.COURSE_MODULE = {
  "title": "Unsafe Rust, Raw Pointers, and FFI",
  "graphicAlt": "An FFI callback lifecycle registers against live state, quiesces callbacks, and only then releases the state.",
  "narration": "Safe Rust prevents ordinary use-after-free, but unsafe code and FFI boundaries require extra care. Raw pointers do not carry the same checked lifetime guarantees as safe references. External libraries may allocate, free, retain, or call back into Rust using rules the compiler cannot verify.\n\nReview should cover pointer validity and lifetime assumptions. Is the pointer still valid when it is used? Who owns the memory? Who allocated it? Who may free it? Can external code retain the pointer after the call returns? Can Rust continue using a value after ownership has moved across the boundary?\n\nCallbacks are a common lifetime pressure point. External code may store a callback and invoke it later. The callback may depend on Rust state that could be dropped before invocation. A safe design needs a clear registration, ownership, cancellation, and cleanup story so callback use cannot outlive referenced data.\n\nAllocation and deallocation pairs deserve the same attention. If Rust allocates memory and another library frees it, the contract must say that explicitly and use compatible mechanisms. If external code allocates memory and returns it to Rust, the wrapper must know how and when to release it without letting callers keep stale handles.\n\nUnsafe code should be small, justified, documented, and tested. Safety comments should explain ownership transfer, allocation and deallocation contracts, callback lifetime, pointer validity, synchronization, and what callers must not violate. A vague comment that says the block is safe is not enough evidence.\n\nA safe wrapper should protect ordinary safe callers from stale access. It should encode ownership and lifetime rules in types and runtime checks where possible. It should prevent callers from using handles after shutdown, passing temporary buffers to retained pointers, or depending on external state that may already be freed.",
  "narrationPoints": [
    "Safe Rust prevents ordinary use-after-free.",
    "Review should cover pointer validity and lifetime.",
    "Callbacks are a common lifetime pressure point.",
    "Allocation and deallocation pairs deserve the same.",
    "Unsafe code should be small.",
    "A safe wrapper should protect ordinary safe callers."
  ]
};
