window.COURSE_MODULE = {
  "title": "Unsafe Rust, Raw Pointers, and FFI Boundaries",
  "graphicAlt": "FFI buffer contracts cover length, alignment, initialization, ownership, and allocation responsibilities.",
  "narration": "Safe Rust prevents many buffer-overflow classes, but unsafe code and foreign interfaces require special care. Raw pointers, external C APIs, platform calls, device interfaces, and custom low-level abstractions may not carry Rust's checked reference and bounds information. At those boundaries, human review and safety contracts matter.\n\nReview starts with pointer validity and buffer contracts. Is the pointer non-null when required? Is it aligned for the type being accessed? Is the memory initialized? How many bytes or elements are valid? Can the external function write into the buffer? Does the Rust side reserve enough space for that write?\n\nOwnership transfer and allocation responsibility are equally important. Who allocated the memory? Who is allowed to free it? Which allocator must be used? Can external code retain a pointer after the call returns? Can Rust safely access the buffer after handing it across the boundary? These questions should be documented, not guessed.\n\nUnsafe code should be small, justified, and isolated. A short unsafe block with a clear safety comment is easier to review than a broad module where assumptions are spread across many functions. The comment should explain why the buffer contract is valid, what has been checked, and what future maintainers must preserve.\n\nA safe wrapper should protect callers from invalid buffer use. Ordinary safe code should not need to remember raw pointer length rules, allocation pairing, or callback lifetime requirements. The wrapper should encode those rules in types and runtime checks where possible, and document the remaining assumptions clearly.",
  "narrationPoints": [
    "Safe Rust prevents many buffer-overflow classes.",
    "Review starts with pointer validity and buffer contracts.",
    "Ownership transfer and allocation responsibility.",
    "Unsafe code should be small, justified, and isolated.",
    "A safe wrapper should protect callers from invalid buffer.",
    "At those boundaries."
  ]
};
