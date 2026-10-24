window.COURSE_MODULE = {
  "title": "Course Summary: Parser-Safe C Habits",
  "graphicAlt": "Complete framing, bounded fields and state checks separate protocol bytes from authorized application dispatch.",
  "narration": "Parser-safe C starts by treating protocol input as untrusted until framing, field validation, numeric checks, and state checks succeed. A message becomes meaningful only after the parser proves that it satisfies the protocol contract.\n\nKeep raw bytes, decoded fields, validated messages, and trusted application objects clearly separated. This separation prevents partially checked input from leaking into business logic and gives reviewers a way to inspect each transition.\n\nParse incrementally with explicit buffer capacity, used length, consumed length, and remaining input state. Handle partial reads, incomplete messages, overlong messages, rejected input, and disconnects as normal conditions. Binary payloads should remain bytes unless text rules are explicit.\n\nValidate lengths, counts, offsets, flags, versions, and command types before use. Check arithmetic before allocation, indexing, copying, or pointer movement. A message that is structurally correct still needs state and authorization checks before dispatch.\n\nFinally, bound resource use and fail safely when input violates the protocol contract. Use tests, fuzzing, sanitizers, static analysis, logging discipline, and review as layered support. Good parsers are not just clever decoders; they are reliable boundaries between external bytes and trusted application behavior.",
  "narrationPoints": [
    "Parser-safe C starts by treating protocol input as untrusted until framing, field validation, numeric checks.",
    "Keep raw bytes, decoded fields, validated messages, and trusted application objects clearly separated.",
    "Parse incrementally with explicit buffer capacity, used length, consumed length, and remaining input state.",
    "Check arithmetic before allocation, indexing, copying, or pointer movement.",
    "Finally, bound resource use and fail safely when input violates the protocol contract."
  ]
};
