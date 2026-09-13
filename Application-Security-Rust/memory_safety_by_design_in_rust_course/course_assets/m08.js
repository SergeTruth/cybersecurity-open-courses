window.COURSE_MODULE = {
  "title": "Testing, Tooling, and Review for Memory Safety",
  "graphicAlt": "Edge tests, fuzzing, tools, and review feed findings back into improved abstractions.",
  "narration": "The compiler is powerful, but it is not the only safety tool. Teams should test boundary cases, invalid input, empty input, oversized input, unusual encodings, state transitions, and concurrency behavior. Unit tests and integration tests verify intended behavior, while negative tests help confirm that invalid states are rejected safely.\n\nFuzzing concepts are useful defensively around parsers, deserializers, file formats, protocol handling, and other input-heavy code. The goal is to discover unexpected behavior before production does. Fuzzing does not replace design review, but it can reveal assumptions that ordinary examples and happy-path tests miss.\n\nTooling can support safer code. Linting, formatting, dependency review, and specialized runtime checks can improve consistency and visibility. Miri and sanitizer concepts are useful to understand at a defensive level, especially when unsafe code, FFI, or low-level boundaries are present. Teams do not need every tool in every project, but they should choose tools that match their risk profile.\n\nCode review should pay special attention to unsafe blocks, FFI, panics, indexing assumptions, lifetime workarounds, shared state, public API contracts, and concurrency behavior. Release readiness should include dependency records and review of build settings. Findings from tests, reviews, and incidents should feed back into safer patterns, not just one-time patches.\n\nThe strongest teams treat review findings as design feedback. If a bug keeps appearing around indexing, parsing, or shared state, the answer may be a better abstraction rather than another local fix. Over time, tests, tools, and reviews should make the safer pattern easier to choose than the fragile one.",
  "narrationPoints": [
    "The compiler is powerful.",
    "Fuzzing concepts are useful defensively around parsers.",
    "Tooling can support safer code.",
    "Code review should pay special attention to unsafe blocks.",
    "The strongest teams treat review findings as design.",
    "Teams should test boundary cases."
  ]
};
