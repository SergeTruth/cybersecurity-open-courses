window.COURSE_MODULE = {
  "title": "Resource Limits and Availability",
  "graphicAlt": "Early size, complexity and time limits bound parsing work and support backpressure and controlled cleanup.",
  "narration": "Protocol parsers need resource limits because input can be malformed, oversized, repeated, slow, or unexpectedly complex. A parser with no limits can spend too much memory, CPU, queue space, or session state on input that should have been rejected early.\n\nUseful limits include maximum message size, field count, nesting depth, queue depth, session count, output size, and processing time. These limits should be chosen for the protocol and deployment environment, then enforced consistently. Documentation helps operators understand what the parser will accept and what it will reject.\n\nBasic validation should happen before expensive work. Check that a message is plausible, complete, supported, and within size limits before allocating large buffers, performing expensive transformations, touching storage, or dispatching application actions.\n\nDo not allocate memory directly from untrusted length or count fields without checks and configured limits. A field may be syntactically valid but operationally too large. Allocation, indexing, copying, and loop bounds should all follow validated and bounded values.\n\nTimeouts, backpressure, and controlled disconnect behavior help preserve availability. A slow peer should not hold parser resources forever. A full queue should fail predictably. A session that violates the protocol should release resources. Availability is part of parser security, especially for long-running services and embedded systems.",
  "narrationPoints": [
    "Protocol parsers need resource limits because input can be malformed, oversized, repeated, slow.",
    "Documentation helps operators understand what the parser will accept and what it will reject.",
    "Check that a message is plausible, complete, supported, and within size limits before allocating large buffers.",
    "Do not allocate memory directly from untrusted length or count fields without checks and configured limits.",
    "Availability is part of parser security, especially for long-running services and embedded systems."
  ]
};
