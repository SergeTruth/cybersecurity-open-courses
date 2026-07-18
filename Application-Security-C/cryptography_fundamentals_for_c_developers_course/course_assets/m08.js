window.COURSE_MODULE = {
  "title": "Crypto API Integration in C",
  "graphicAlt": "Draft visual summary for Crypto API Integration in C",
  "narration": "Crypto API integration in C is where many practical problems appear. The library may be correct, but the application still controls buffer sizes, memory ownership, initialization, cleanup, error handling, and thread usage. Treat cryptographic calls as security-sensitive control points, not as ordinary utility functions.\n\nEvery return value matters. A function may report success, failure, verification failure, insufficient output space, invalid input, partial progress, or an internal library error. If code ignores the result, it may continue with uninitialized output, unauthenticated data, missing randomness, invalid signatures, or a failed key operation.\n\nBuffers should be managed explicitly. Know the required input size, maximum output size, actual output length, ownership, and cleanup responsibility. Avoid assuming that binary data is null-terminated text. Avoid copying sensitive material into more buffers than necessary, and keep plaintext and key material exposure limited.\n\nPartial failure should leave the program in a defined state. If encryption, verification, signing, hashing, or key loading fails, the application should release temporary resources, avoid using incomplete output, and report a safe error. Continuing in a degraded or ambiguous state undermines the design.\n\nUse library-provided secure comparison functions where available for comparing MACs, tags, signatures, or other verification values. Ordinary comparisons may have behavior that is not intended for security checks. The correct helper and comparison length should come from the library documentation.\n\nThread-safety and lifecycle expectations should be reviewed. Some contexts are reusable, some are per-operation, some require global initialization, and some have locking or reference-counting rules. Tests should cover cleanup, repeated operations, concurrent use where supported, and failure paths.",
  "narrationPoints": [
    "Crypto API integration in C is.",
    "Every return value matters.",
    "Buffers should be managed explicitly.",
    "Partial failure should leave the program in a defined state.",
    "Use library-provided secure comparison functions.",
    "Thread-safety and lifecycle expectations should be reviewed."
  ]
};
