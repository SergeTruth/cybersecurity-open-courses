window.COURSE_MODULE = {
  "title": "Course Summary: UDP-Safe C Habits",
  "graphicAlt": "Five main stages: intended exposure -> action trust checks -> validate complete datagram -> bounded work/state/response -> protected/redacted operation.",
  "narration": "UDP-safe C starts by treating every datagram as untrusted input. The message boundary is useful, but it does not prove that the sender is expected, the content is valid, or the requested action is allowed. Validation and trust decisions still belong in the application.\n\nRestrict endpoint exposure and avoid relying on source address alone for trust. Binding choices, interface selection, deployment controls, and service privileges all shape who can reach the UDP listener. Source information is useful, but authorization should follow the application's trust model and requested action.\n\nValidate datagram size, structure, type, state, and protocol consistency before use. Check minimum and maximum lengths before reading fields. Detect truncation where possible. Reject unsupported, malformed, duplicated, reordered, or out-of-sequence messages according to protocol rules.\n\nTrack buffer capacity and received length carefully. Treat binary datagrams as bytes unless the protocol defines text rules. Limit work, state, and response size so unexpected traffic does not consume disproportionate resources. Availability is a security property for UDP services.\n\nFinally, use appropriate transport protection, logging discipline, testing, tooling, and review. UDP behavior should remain predictable under noise, loss, repetition, malformed input, and deployment changes. That predictability is the mark of mature defensive network code.",
  "narrationPoints": [
    "The message boundary is useful, but it does not prove that the sender is expected, the content is valid.",
    "Source information is useful, but authorization should follow the application's trust model and requested action.",
    "Validate datagram size, structure, type, state, and protocol consistency before use.",
    "Treat binary datagrams as bytes unless the protocol defines text rules.",
    "UDP behavior should remain predictable under noise, loss, repetition, malformed input, and deployment changes."
  ]
};
