window.COURSE_MODULE = {
  "title": "State Machines and Command Dispatch",
  "graphicAlt": "Framed validated commands must also satisfy protocol state and authorization before dispatch.",
  "narration": "Many protocols are stateful. They have setup, negotiation, authentication, authorization, normal operation, shutdown, and error states. Not every message is valid in every state. A parser that checks only structure but ignores state can hand later code a command that is well-formed but not allowed now.\n\nThe state machine should be explicit where it matters. State names, allowed transitions, and error behavior should be visible in the code. This makes it easier to review whether a message is allowed before the parser dispatches it to application logic.\n\nA structurally valid message may still be invalid for the current state. For example, a request that is valid during normal operation may not be valid during setup. A message that is valid after authorization may not be valid before authorization. The parser should check both format and state before action.\n\nCommand dispatch should happen only after framing, field validation, state checks, and authorization checks succeed. Dispatch is the point where input begins to affect application behavior. Reaching that point should require all relevant gates to pass.\n\nThe parser should handle unexpected sequence, repeated-looking messages, duplicates, and disconnects predictably at a defensive level. Predictability is the goal. The service should not preserve partial trust after a failed transition, and it should not let state-changing operations run from partially parsed data.",
  "narrationPoints": [
    "A parser that checks only structure but ignores state can hand later code a command that is well-formed but not allowed now.",
    "State names, allowed transitions, and error behavior should be visible in the code.",
    "The parser should check both format and state before action.",
    "Command dispatch should happen only after framing, field validation, state checks, and authorization checks succeed.",
    "The parser should handle unexpected sequence, repeated-looking messages, duplicates, and disconnects predictably at a defensive level."
  ]
};
