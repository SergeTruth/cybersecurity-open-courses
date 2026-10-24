window.COURSE_MODULE = {
  "title": "Message Validation and Format Discipline",
  "graphicAlt": "Datagram passes length bounds first, then version/type/field/state review, then dispatch.",
  "narration": "Every UDP datagram should be validated before it changes program state. The message boundary is available, but the contents are still external input. The receiver should confirm that the datagram is long enough, short enough, well-formed, and meaningful for the current protocol state.\n\nMinimum and maximum length checks should happen before reading headers or fields. A short datagram should not be interpreted as a complete header. An oversized datagram should not drive excessive allocation or processing. Length decisions should be tied to protocol policy, not only to buffer size.\n\nVersion fields, message types, flags, counters, embedded lengths, checksums, and payload formats should be checked according to the protocol contract. Unsupported versions or flags should be rejected or handled through a documented compatibility rule. A checksum or integrity field can support validation, but it does not replace bounds and format checks.\n\nUnsupported, malformed, truncated, oversized, or out-of-sequence messages should fail safely. That may mean ignoring the datagram, returning a small error response when appropriate, updating a diagnostic counter, or closing related state. It should not mean guessing missing fields or applying a state change from partial data.\n\nValidation should happen before allocation, copying, deep parsing, command dispatch, or generating large responses. Parser code should make protocol assumptions visible: which fields are required, which sizes are allowed, which message types are supported, and when the receiver is allowed to act.",
  "narrationPoints": [
    "The message boundary is available, but the contents are still external input.",
    "Length decisions should be tied to protocol policy, not only to buffer size.",
    "A checksum or integrity field can support validation, but it does not replace bounds and format checks.",
    "Unsupported, malformed, truncated, oversized, or out-of-sequence messages should fail safely.",
    "Validation should happen before allocation, copying, deep parsing, command dispatch, or generating large responses."
  ]
};
