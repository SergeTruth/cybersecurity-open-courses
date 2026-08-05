window.COURSE_MODULE = {
  "title": "Course Summary: Binary Protocol Safety Habits",
  "graphicAlt": "A secure-protocol pipeline orders exact framing, checked decoding, version policy, authentication, replay defense, resource limits, fuzzing, and observability.",
  "narration": "Binary protocol security starts with a disciplined boundary mindset. Treat every byte as untrusted until framing, length checks, field parsing, state rules, and required trust checks have succeeded. Define message boundaries and limits before parsing deeply, and separate incomplete data from invalid data.\n\nMake parsing explicit. Check remaining bytes before every field read. Convert raw bytes into typed values deliberately. Validate endianness, signedness, numeric ranges, offsets, counts, and derived size calculations before using them for memory, indexing, state, or policy.\n\nKeep protocol state and compatibility visible. Accept only supported versions and features, reject unsupported behavior safely, and test state transitions. When authentication, integrity, or freshness matters, use approved mechanisms and act only after the message is trusted for the current context.\n\nFinally, bound resources and validate continuously. Limit memory, time, nesting, decompression, rates, and retries where relevant. Test malformed and boundary cases, use fuzzing defensively, monitor safe error categories, and review binary protocol parsers as security-critical C++ code. Small parsing assumptions can influence availability, memory safety, and trust decisions, so the habits should be part of normal design and code review for every release and maintenance cycle. That discipline keeps compact formats manageable and trustworthy as ownership changes later.",
  "narrationPoints": [
    "Binary protocol security starts with a disciplined boundary mindset.",
    "Define message boundaries and limits before parsing deeply, and separate incomplete data from invalid data.",
    "Validate endianness, signedness, numeric ranges, offsets, counts, and derived size calculations before using them for memory, indexing, state, or policy.",
    "When authentication, integrity, or freshness matters, use approved mechanisms and act only after the message is trusted for the current context.",
    "Limit memory, time, nesting, decompression, rates, and retries where relevant.",
    "Small parsing assumptions can influence availability, memory safety, and trust decisions, so the habits should be part of normal design and code review for every release and maintenance cycle."
  ]
};
