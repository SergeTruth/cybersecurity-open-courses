window.COURSE_MODULE = {
  "title": "Inputs, Protocols, and Defensive Parsing",
  "graphicAlt": "Incoming frames are bounded, parsed, and checked for state and permission before becoming device commands.",
  "narration": "Embedded devices process input from many places: UART, SPI, I2C, CAN, USB, BLE, radio packets, network messages, sensors, local buttons, update channels, debug commands, and cloud services. Some inputs are clearly external. Others feel internal but still cross trust or reliability boundaries.\n\nInput should be treated as unverified until it is parsed and validated. A frame can be well formed and still too large, out of sequence, unauthorized, inconsistent, inappropriate for the current mode, or invalid for the current state machine. Parsing confirms structure; validation confirms permission and meaning.\n\nDefensive firmware parsers use bounded buffers, length checks, framing checks, state validation, timeouts, and clear rejection behavior. They avoid panic-prone parsing paths in firmware flows, especially where malformed or unexpected input could disrupt service or device behavior.\n\nField relationships matter. A length may not match the payload. A command may be valid only after authentication, pairing, provisioning, or a mode transition. A sensor value may be syntactically valid but physically implausible. A retry value or timeout may parse but still exceed operational limits.\n\nA strong Rust pattern is to parse into a temporary representation, validate fields and state, then convert the result into domain types that represent validated messages. Downstream code should not keep reinterpreting raw bytes or raw primitives when the boundary has already made a decision.",
  "narrationPoints": [
    "Embedded devices process input from many places: UART.",
    "Input should be treated as unverified until it is parsed.",
    "Defensive firmware parsers use bounded buffers.",
    "Field relationships matter.",
    "A strong Rust pattern is to parse into a temporary.",
    "They avoid panic-prone parsing paths in firmware flows."
  ]
};
