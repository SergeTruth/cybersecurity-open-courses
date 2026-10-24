window.COURSE_MODULE = {
  "title": "Incremental Parsing and Buffer Management",
  "graphicAlt": "A buffer distinguishes consumed input, unconsumed input and free space while partial parser state stays bounded.",
  "narration": "Many protocol parsers receive input incrementally. A network service may read a few bytes now and more bytes later. An event loop may return whenever data is available. A peer may disconnect in the middle of a message. A robust parser treats these as normal conditions rather than exceptional surprises.\n\nBuffers need explicit accounting. Capacity is how much storage exists. Used length is how many bytes currently hold input. Consumed length is how much the parser has already processed. Remaining space is what can safely accept more data. Mixing these facts can lead to incorrect parsing or memory safety problems.\n\nPartial input should leave parser state consistent. If the parser needs more bytes, it should remember exactly what has been received and what is still required. If input is rejected, it should discard or reset state according to protocol rules. If the peer disconnects, partial state should be cleaned up predictably.\n\nOverlong or incomplete messages should not cause unbounded buffering. The parser needs maximum message size and timeout expectations so it does not keep accumulating data forever. When limits are exceeded, the failure path should release resources and leave the session in a defined state.\n\nBinary payloads should not be treated as C strings unless the protocol explicitly defines text, termination, and encoding rules. A message can contain zero bytes, unterminated data, or fields that are valid binary but invalid text. If text is required, create a bounded, validated representation deliberately.",
  "narrationPoints": [
    "A robust parser treats these as normal conditions rather than exceptional surprises.",
    "Used length is how many bytes currently hold input.",
    "If input is rejected, it should discard or reset state according to protocol rules.",
    "When limits are exceeded, the failure path should release resources and leave the session in a defined state.",
    "Binary payloads should not be treated as C strings unless the protocol explicitly defines text, termination, and encoding rules."
  ]
};
