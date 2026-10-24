window.COURSE_MODULE = {
  "title": "Testing, Fuzzing, Logging, and Review",
  "graphicAlt": "Corpus tests, bounded fuzzing, sanitizers and review examine parser transitions and safe failure behavior.",
  "narration": "Parser tests should cover more than successful messages. Useful cases include empty input, short input, malformed headers, unsupported versions, oversized fields, inconsistent lengths, unexpected state transitions, repeated operations, and disconnects. These cases confirm that failure behavior is intentional.\n\nCorpus tests help preserve behavior for known valid and invalid samples. As the parser evolves, the corpus gives developers a stable set of examples that should continue to pass or fail in known ways. This is especially useful when protocol compatibility matters.\n\nFuzzing can support robustness testing by exercising unusual combinations of fields, sizes, message boundaries, and state transitions. At a high level, it helps discover assumptions that normal tests miss. Fuzzing is strongest when paired with clear limits, sanitizers, and a harness that treats crashes, leaks, hangs, and unexpected accepts as useful signals.\n\nRuntime sanitizers and static analysis can reveal memory safety, arithmetic, and unchecked-value issues during testing and review. These tools do not replace design, but they often find places where the implementation does not match the intended validation model.\n\nLogs should help diagnose parser behavior without dumping secrets, full sensitive payloads, or misleading trust assumptions. Code review should trace raw input through framing, decoding, validation, state checks, dispatch, cleanup, and error handling. That trace is the practical proof that the parser boundary is enforced.",
  "narrationPoints": [
    "Useful cases include empty input, short input, malformed headers, unsupported versions, oversized fields.",
    "As the parser evolves, the corpus gives developers a stable set of examples that should continue to pass or fail in known ways.",
    "Fuzzing is strongest when paired with clear limits, sanitizers, and a harness that treats crashes, leaks, hangs.",
    "Runtime sanitizers and static analysis can reveal memory safety, arithmetic, and unchecked-value issues during testing and review.",
    "Logs should help diagnose parser behavior without dumping secrets, full sensitive payloads."
  ]
};
