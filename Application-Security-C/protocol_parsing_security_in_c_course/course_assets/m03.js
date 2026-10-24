window.COURSE_MODULE = {
  "title": "Framing, Boundaries, and Message Structure",
  "graphicAlt": "Incremental reads form a bounded complete frame before dispatch, with incomplete payloads retained for more input.",
  "narration": "Framing is the parser's first structural job. A stream protocol does not necessarily deliver complete application messages in one read. The parser must know how to identify the start and end of each message before it can safely interpret the contents.\n\nDatagram protocols preserve message boundaries, but that does not remove validation. A datagram still has a size, source context, message type, version, and payload. The receiver still needs to decide whether the datagram is long enough, short enough, supported, and valid for the current state.\n\nDelimiters, length prefixes, fixed headers, and payload boundaries should be validated before deeper parsing. A delimiter must be found within a reasonable limit. A length prefix must fit the available input and configured maximums. A fixed header must be complete before its fields are used.\n\nA complete header does not automatically mean the complete message is available. The header may declare a payload that has not arrived yet, or it may declare a size outside policy. The parser should treat the header as a claim that still needs to be checked against actual bytes and limits.\n\nThe parser should identify a complete message before dispatching commands or modifying application state. That ordering prevents partial messages from becoming partial actions. It also keeps protocol behavior predictable when data arrives in pieces, batches, or unusual boundaries.",
  "narrationPoints": [
    "The parser must know how to identify the start and end of each message before it can safely interpret the contents.",
    "Datagram protocols preserve message boundaries, but that does not remove validation.",
    "A length prefix must fit the available input and configured maximums.",
    "The parser should treat the header as a claim that still needs to be checked against actual bytes and limits.",
    "The parser should identify a complete message before dispatching commands or modifying application state."
  ]
};
