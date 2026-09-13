window.COURSE_MODULE = {
  "title": "Unsafe Shortcuts and FFI Assumptions",
  "graphicAlt": "A safe API encloses a small unsafe core with explicit contracts, tests, and a narrow FFI boundary.",
  "narration": "`unsafe` Rust is not automatically wrong. It exists because some valid systems work cannot be fully checked by the compiler. The anti-pattern is treating `unsafe` as a convenience switch when ordinary Rust feels restrictive. Unsafe code asks the programmer to uphold rules that the compiler cannot fully verify, so the responsibility boundary must be explicit.\n\nA safety comment should not merely say that an operation is safe. It should explain the conditions that make it valid: pointer alignment, lifetime, initialization, aliasing, ownership, mutability, thread access, allocation responsibility, and any assumptions about external code. If the assumptions cannot be stated clearly, the unsafe block is not ready for review.\n\nFFI boundaries add even more contracts. Code crossing into C, platform APIs, device SDKs, or other language runtimes may depend on pointer validity, string encoding, buffer length, callback lifetime, allocation and deallocation ownership, error conventions, and whether functions are safe to call from multiple threads. These are design facts, not comments to add later.\n\nThe most reviewable unsafe code is small, justified, documented, and tested. It should be isolated near the boundary that requires it, surrounded by safe abstractions where possible, and supported by tests that exercise normal, edge, and failure cases. The safe wrapper should prevent ordinary callers from violating the assumptions required by the unsafe internals.\n\nA defensive review asks why unsafe is necessary, what invariant it relies on, how that invariant is established, how it is preserved over time, and what would break if the external API changes. Unsafe code should be rare enough and clear enough that reviewers can spend real attention on it.",
  "narrationPoints": [
    "`unsafe` Rust is not automatically wrong.",
    "A safety comment should not merely say that an operation is.",
    "FFI boundaries add even more contracts.",
    "The most reviewable unsafe code is small.",
    "A defensive review asks why unsafe is necessary.",
    "Unsafe code asks the programmer to uphold rules."
  ]
};
