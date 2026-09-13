window.COURSE_MODULE = {
  "title": "Course Summary: Rust Buffer Safety Checklist",
  "graphicAlt": "Buffer safety uses safe access, validated parsing, bounded resources, and reviewed low-level boundaries.",
  "narration": "Eliminating buffer overflows in Rust is a layered engineering practice. Start with safe Rust abstractions: arrays, vectors, slices, strings, byte slices, checked access, iterators, and pattern matching. These tools carry length and validity information that raw buffer handling often loses.\n\nTreat parsing as a trust boundary. Validate input length, encoding, delimiters, record structure, supported values, and version expectations before data drives indexing, allocation, file paths, database operations, or downstream requests. Convert raw input into validated domain types where that makes the application easier to reason about.\n\nControl resource use. Buffer overflow prevention is not enough if a safe program can still allocate without limit or spend unbounded time on malformed input. Review length and capacity assumptions, integer conversions, maximum sizes, timeouts, and failure behavior.\n\nKeep unsafe and FFI boundaries small, documented, and tested. Review pointer validity, buffer length contracts, ownership transfer, allocation and deallocation responsibility, alignment, initialization, and callback behavior. Wrap low-level behavior in safe APIs that prevent ordinary callers from violating the buffer contract.\n\nFinally, maintain buffer safety over time. Test empty, short, oversized, malformed, and invalid-encoding inputs. Add regression tests after fixes. Review dependencies and parser libraries. Watch operational failures. The goal is not just to avoid one old class of bug, but to build Rust software where buffer boundaries remain visible, validated, and safe by design.",
  "narrationPoints": [
    "Eliminating buffer overflows in Rust is.",
    "Treat parsing as a trust boundary.",
    "Control resource use.",
    "Keep unsafe and FFI boundaries small.",
    "Finally, maintain buffer safety over time.",
    "Buffer overflow prevention is not enough if a safe program."
  ]
};
