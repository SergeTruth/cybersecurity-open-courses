window.COURSE_MODULE = {
  "title": "Inputs, Protocols, and State Machines",
  "graphicAlt": "Fast interrupt capture feeds bounded scheduled parsing and state validation before a device action.",
  "narration": "RTIC firmware often processes input from UART, SPI, I2C, CAN, USB, BLE, radio packets, sensors, local controls, maintenance commands, update channels, or network services. Some inputs arrive through interrupts. Others arrive through scheduled tasks or peripheral drivers. All should be treated as unverified until validated.\n\nA message can be syntactically well formed and still be too large, out of sequence, inconsistent with other fields, not allowed in the current mode, or inappropriate for the current device state. Parsing confirms structure. Validation confirms meaning, permission, and timing context.\n\nDefensive RTIC designs separate fast capture from heavier validation work. Interrupt-facing code should do the minimum necessary to preserve data and signal work. More expensive parsing, validation, logging, and state transitions should be bounded and scheduled in a way that does not disrupt time-critical behavior.\n\nState machines help make protocol flow reviewable. They show which commands are valid in which modes, what transitions are allowed, and how invalid input is rejected. Domain types can represent validated messages so downstream tasks do not continue passing raw buffers and primitive values around.\n\nFirmware paths should avoid panic-prone parsing. Invalid input should produce clear rejection, controlled recovery, or safe degraded behavior. The goal is not to accept every input. The goal is to reject bad input without making timing, availability, or device state unpredictable.",
  "narrationPoints": [
    "RTIC firmware often processes input from UART.",
    "A message can be syntactically well formed and still be too.",
    "Defensive RTIC designs separate fast capture from heavier.",
    "State machines help make protocol flow reviewable.",
    "Firmware paths should avoid panic-prone parsing.",
    "All should be treated as unverified until validated."
  ]
};
