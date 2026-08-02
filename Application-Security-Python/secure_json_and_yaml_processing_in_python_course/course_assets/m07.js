window.COURSE_MODULE = {
  "title": "Resource Limits and Parser Robustness",
  "graphicAlt": "A deeply nested document and alias fan-out press against byte, node, depth, token, and document-count gauges, which stop parser work before memory or CPU budgets are exceeded.",
  "narration": "Parser robustness is about availability as well as correctness. Large payloads, deeply nested data, repeated structures, expensive conversions, and complex YAML features can consume memory, CPU, time, storage, or recursion depth. A parser that behaves correctly for small examples may still be unsafe if it accepts unbounded input in a production service.\n\nResource controls should be chosen near the boundary. API gateways, web frameworks, queues, file upload handlers, and application code may all provide places to enforce request body limits, file size limits, message size limits, timeout behavior, and nesting expectations. The controls should be documented and tested so developers know where oversized data is rejected.\n\nStreaming and incremental processing can be appropriate for intentionally large JSON data, but they are design choices, not automatic fixes. Streaming still needs validation strategy, error handling, partial failure behavior, and limits. YAML is often better kept small and configuration-oriented, because broad flexibility and deeply nested structures can become difficult to reason about.\n\nFail-safe error handling matters. Malformed, oversized, unsupported, or resource-intensive input should not crash the service, leak internals, leave partial state, or create confusing retries. Good parser error paths return controlled messages, record useful operational events, and avoid treating failure as success. Robust parsing makes the system predictable when inputs are ugly, not only when they are ideal.",
  "narrationPoints": [
    "A parser that behaves correctly for small examples may still be unsafe if it accepts unbounded input in a production service.",
    "The controls should be documented and tested so developers know where oversized data is rejected.",
    "Streaming and incremental processing can be appropriate for intentionally large JSON data, but they are design choices, not automatic fixes.",
    "Robust parsing makes the system predictable when inputs are ugly, not only when they are ideal.",
    "Good parser error paths return controlled messages, record useful operational events, and avoid treating failure as success.",
    "Streaming still needs validation strategy, error handling, partial failure behavior, and limits."
  ]
};
