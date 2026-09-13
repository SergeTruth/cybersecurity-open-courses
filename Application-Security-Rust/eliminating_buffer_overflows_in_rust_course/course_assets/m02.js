window.COURSE_MODULE = {
  "title": "Safe Rust's Buffer Safety Model",
  "graphicAlt": "Arrays, vectors, slices, and UTF-8 text carry structure; out-of-bounds safe indexing panics rather than corrupting adjacent memory.",
  "narration": "Safe Rust protects buffers through multiple reinforcing rules. Ownership clarifies who controls a value and when that value is cleaned up. Borrowing controls who may read or mutate the value. Lifetimes help ensure references remain valid. These rules work together before the program runs.\n\nThe standard buffer abstractions carry structure with them. Arrays have fixed length. `Vec<T>` owns a growable sequence of values. Slices borrow views into existing data. `String` owns valid UTF-8 text. `&str` borrows valid UTF-8 text. Byte slices represent raw bytes. Each abstraction communicates different ownership, validity, and access expectations.\n\nSafe access checks bounds. If code uses safe indexing and an index is out of bounds, Rust produces controlled failure behavior instead of allowing arbitrary memory access. A panic is still an operational concern because it can affect availability or user experience, but it is not the same as memory corruption.\n\nThat distinction is important during security review. A service should still avoid panics on untrusted input, but a panic from safe indexing is a contained failure mode. It does not mean another buffer was overwritten or unrelated memory was read. Defensive code should design predictable error handling rather than relying on panics as routine control flow.\n\nSafe abstractions should be the default for application code. If a design seems to require raw pointers or unchecked buffer behavior, pause and ask why. Often a slice, iterator, checked access method, parser type, or owned result can express the same intent while preserving Rust's safe buffer model.",
  "narrationPoints": [
    "Safe Rust protects buffers through multiple reinforcing.",
    "The standard buffer abstractions carry structure with them.",
    "Safe access checks bounds.",
    "That distinction is important during security review.",
    "Safe abstractions should be the default for application.",
    "A service should still avoid panics on untrusted input."
  ]
};
