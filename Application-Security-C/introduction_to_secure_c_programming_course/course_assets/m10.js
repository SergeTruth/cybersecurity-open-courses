window.COURSE_MODULE = {
  "title": "Course Summary: A Secure C Baseline",
  "graphicAlt": "A repeatable secure C baseline validates input, tracks sizes, manages lifetime ownership, releases resources, and reviews and tests while avoiding undefined behavior and unsafe diagnostics.",
  "narration": "A practical secure C baseline starts with input and sizes. Treat input as untrusted until validated. Track buffer capacity and current length. Keep string termination explicit. Validate numeric values before they control allocation, indexing, copying, or loop bounds.\n\nManage ownership and lifetime deliberately. Know which object a pointer refers to, how long it remains valid, who owns dynamically allocated memory, and which path releases each resource. Keep cleanup behavior clear on success and failure paths.\n\nAvoid fragile assumptions. Keep format strings under program control, handle truncation explicitly, avoid undefined behavior, and review compiler and platform assumptions when code needs to be portable or security-sensitive.\n\nUse tooling as part of the workflow. Compiler warnings, static analysis, sanitizers, dependency review, and hardening options help find issues earlier. They do not replace careful design, but they make disciplined review more effective.\n\nFinally, test and review systematically. Exercise edge cases, oversized input, partial reads, allocation failures, malformed records, and cleanup paths. Review data flow, memory flow, resource ownership, logging, and failure behavior before release. Secure C programming is a repeatable engineering practice.",
  "narrationPoints": [
    "A practical secure C baseline starts with input and sizes.",
    "Manage ownership and lifetime deliberately.",
    "Avoid fragile assumptions.",
    "Use tooling as part of the workflow.",
    "Finally, test and review systematically."
  ]
};
