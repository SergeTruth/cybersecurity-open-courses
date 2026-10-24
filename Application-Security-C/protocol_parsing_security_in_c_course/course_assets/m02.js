window.COURSE_MODULE = {
  "title": "Protocol Contracts and Parser Assumptions",
  "graphicAlt": "Explicit protocol rules distinguish accepted messages, malformed input and unsupported cases.",
  "narration": "A protocol contract defines what messages exist, which versions are supported, which fields are required, which fields are optional, how lengths are encoded, what flags mean, what ordering is valid, and what should happen when input does not match the contract. A parser is the executable version of that contract.\n\nParser assumptions should be visible rather than hidden in scattered conditionals. Named constants, small validation helpers, clear state names, and direct error paths make it easier to understand what the parser believes. If the protocol rules are buried in pointer arithmetic and one-off comparisons, review becomes guesswork.\n\nUnknown versions, unsupported message types, reserved flags, and optional fields need defined behavior. Sometimes the safest answer is to reject the message. Sometimes compatibility calls for ignoring a field or returning an explicit unsupported response. The important point is that the behavior is chosen deliberately.\n\nRequired fields must be checked before use. A parser should not read a field because a later step expects it to exist. It should first confirm that the message is long enough, that the field belongs to the message type, and that the value is acceptable for the current protocol version.\n\nIt can also be useful to distinguish malformed input from valid but unsupported input. Malformed input violates the structure. Unsupported input may be structurally correct but outside what this implementation supports. That distinction can improve diagnostics and interoperability while keeping the parser strict where it matters.",
  "narrationPoints": [
    "A protocol contract defines what messages exist, which versions are supported, which fields are required, which fields are optional.",
    "If the protocol rules are buried in pointer arithmetic and one-off comparisons, review becomes guesswork.",
    "Sometimes compatibility calls for ignoring a field or returning an explicit unsupported response.",
    "A parser should not read a field because a later step expects it to exist.",
    "Unsupported input may be structurally correct but outside what this implementation supports."
  ]
};
