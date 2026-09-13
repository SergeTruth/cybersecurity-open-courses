window.COURSE_MODULE = {
  "title": "Inputs, Protocols, and Defensive Parsing",
  "graphicAlt": "Parsed protocol input must also pass length, mode/state, and permission checks before reaching device actions as a domain type.",
  "narration": "Firmware often processes input from sensors, UART, SPI, I2C, CAN, USB, BLE, radio packets, local buttons, update channels, debug commands, network messages, or cloud services. Some of these inputs are clearly external. Others feel internal but still cross reliability or trust boundaries.\n\nInput should be treated as unverified until it is parsed and validated. A message can be syntactically valid and still be too large, out of order, inconsistent with other fields, unauthorized for the current mode, or unsafe for the current device state. Parsing confirms representation. Validation confirms meaning and permission.\n\nDefensive Rust firmware uses bounded buffers, explicit parser boundaries, length checks, framing checks, field validation, state-machine validation, and timeouts. Device-facing parsing should avoid panic-prone paths because invalid input should not make timing, availability, or device state unpredictable.\n\nProtocol state matters. A command may only be valid after provisioning. A field may be allowed only in a maintenance mode. A sensor value may be plausible only within a physical range. A firmware update command may require a state transition before it can influence storage. These relationships should be validated deliberately.\n\nA strong pattern is to convert valid input into domain types after validation. Downstream code can then work with reviewed meaning rather than raw bytes and primitives. The boundary becomes easier to test, and later tasks do not need to rediscover which checks have already happened.",
  "narrationPoints": [
    "Firmware often processes input from sensors.",
    "Input should be treated as unverified until it is parsed.",
    "Defensive Rust firmware uses bounded buffers.",
    "Protocol state matters.",
    "A strong pattern is to convert valid input into domain.",
    "Device-facing parsing should avoid panic-prone paths."
  ]
};
