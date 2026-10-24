window.COURSE_MODULE = {
  "title": "Error Handling and Safe Failure",
  "graphicAlt": "Only fully validated messages create trusted objects; failures release temporary resources and return defined safe errors.",
  "narration": "Parser failure is part of normal operation. Input may be malformed, unsupported, incomplete, too large, out of sequence, or no longer relevant. The parser should be designed so those failures leave application state predictable.\n\nFail closed when required validation does not pass. If the parser cannot prove the message satisfies the protocol contract, it should not produce a trusted object or trigger a state-changing action. Continuing with guessed defaults makes the failure harder to reason about and harder to review.\n\nAvoid building trusted objects from partially validated input. It is safer to keep raw input and temporary decoded fields separate until the full message has passed the relevant checks. Once validation succeeds, the parser can construct a trusted representation for later code.\n\nCleanup should release temporary allocations, buffers, and session resources after parse failure. That includes parser state, queued output, partially built objects, timers, and connection-specific resources. Clean failure paths matter for long-running services because small leaks can become operational problems over time.\n\nError responses should provide useful protocol behavior without leaking sensitive internal details. A peer may need to know that a message was rejected, but it usually does not need stack details, memory layout, private configuration, or authorization internals. Repeated parse failures should also be handled consistently so the service remains reliable.",
  "narrationPoints": [
    "The parser should be designed so those failures leave application state predictable.",
    "Continuing with guessed defaults makes the failure harder to reason about and harder to review.",
    "Once validation succeeds, the parser can construct a trusted representation for later code.",
    "Cleanup should release temporary allocations, buffers, and session resources after parse failure.",
    "Error responses should provide useful protocol behavior without leaking sensitive internal details."
  ]
};
