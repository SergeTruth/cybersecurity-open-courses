window.COURSE_MODULE = {
  "title": "RAII, Error Handling, and Cleanup",
  "graphicAlt": "RAII file-owner flow showing descriptor acquisition, move-only transfer, reads and writes, explicit result reporting, and one cleanup path that closes correctly after success, early return, or exception.",
  "narration": "C++ file handling should lean on RAII. File stream objects, scoped handle wrappers, and custom resource owners make cleanup part of object lifetime instead of a checklist repeated in every branch. When a function returns early, throws, or rejects malformed input, owned file resources should still close predictably.\n\nRAII does not mean errors stop mattering. For input, a close failure may not affect much. For output, flushing or closing can be part of the operation's correctness. If the program must know that data reached the destination according to its durability requirements, that result needs to be checked through the appropriate API and reflected in the error model.\n\nError handling should preserve useful state and useful information without oversharing. Developer diagnostics may need a category, operation name, and correlation identifier. User-facing messages usually need less detail. Sensitive paths, file contents, credentials, and internal system layout should not leak through routine errors or logs. Redaction should happen before data reaches broad log sinks.\n\nCleanup policy should cover success, failure, parsing errors, exceptions, cancellation, and shutdown. Temporary files may need removal, output files may need preservation for investigation, and locks or handles may need deterministic release. The secure engineering goal is not simply to make the compiler accept the code. It is to make resource ownership and failure behavior boring, predictable, and reviewable.",
  "narrationPoints": [
    "File stream objects, scoped handle wrappers, and custom resource owners make cleanup part of object lifetime instead of a checklist repeated in every branch.",
    "When a function returns early, throws, or rejects malformed input, owned file resources should still close predictably.",
    "For input, a close failure may not affect much.",
    "Sensitive paths, file contents, credentials, and internal system layout should not leak through routine errors or logs.",
    "Error handling should preserve useful state and useful information without oversharing.",
    "Cleanup policy should cover success, failure, parsing errors, exceptions, cancellation, and shutdown."
  ]
};
