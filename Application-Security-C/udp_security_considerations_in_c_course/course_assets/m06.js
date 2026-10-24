window.COURSE_MODULE = {
  "title": "Buffer Management and Truncation",
  "graphicAlt": "Receive buffer capacity bracket encloses all storage, received-length bracket only delivered data, parsed-length cursor only consumed bytes.",
  "narration": "UDP receive buffers should be sized deliberately for the protocol's expected datagrams. A buffer that is too small can hide important data. A buffer that is unbounded or chosen from untrusted input can create memory pressure. The service should define maximum accepted datagram size and allocate buffers accordingly.\n\nCode should detect and handle truncation according to the platform and API behavior. Some APIs provide flags or return information that indicate when the datagram did not fit. The program should use those signals when available and define a safe behavior for truncated input.\n\nA truncated datagram should not be parsed as though it were complete. If the header says fields are present but the buffer does not contain them, validation fails. If the payload is shorter than the format requires, the program should not guess the missing bytes or dispatch a partial request.\n\nBinary datagrams should not be treated as C strings unless the protocol explicitly defines text, encoding, and termination rules. Network data can contain zero bytes, non-text bytes, partial encodings, or no terminator. If a field needs to become a string, create a bounded and validated representation deliberately.\n\nBuffer capacity, received length, and parsed length should be tracked separately. Capacity is how much storage exists. Received length is how much data the API delivered. Parsed length is how much of that data has been consumed by the protocol parser. Keeping those facts separate prevents accidental use of uninitialized or incomplete data.",
  "narrationPoints": [
    "A buffer that is unbounded or chosen from untrusted input can create memory pressure.",
    "The program should use those signals when available and define a safe behavior for truncated input.",
    "If the header says fields are present but the buffer does not contain them, validation fails.",
    "Binary datagrams should not be treated as C strings unless the protocol explicitly defines text, encoding, and termination rules.",
    "Buffer capacity, received length, and parsed length should be tracked separately."
  ]
};
