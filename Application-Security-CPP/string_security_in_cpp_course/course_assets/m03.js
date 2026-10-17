window.COURSE_MODULE = {
  "title": "Length, Capacity, Bounds, and Termination",
  "graphicAlt": "String size, available capacity, byte and character counts, and terminator requirements are checked separately before use.",
  "narration": "Many string defects come from confusing concepts that sound similar. Size is the current number of elements in a string. Capacity is storage that may be available without reallocation. A buffer length is the amount of memory available to write into. A string length is the amount of meaningful data. Those values may be related, but they are not interchangeable.\n\nByte count and character count can also differ. In many encodings, one visible character may require multiple bytes. A limit expressed in bytes may be appropriate for storage or protocol size, while a limit expressed in characters may be appropriate for display or policy. Code should name which limit it is enforcing.\n\nNull termination needs the same care. A C API may require a null-terminated string, while a length-aware API may accept data with embedded null characters. A null terminator can be missing, appear earlier than expected, or be irrelevant for binary data. Defensive code does not assume that a terminator proves a buffer is safe or complete.\n\nBounds should be checked before indexing, copying, formatting, or converting. Truncation should not happen silently unless it is an explicit and documented behavior. If truncation is allowed, the code should make clear whether it preserves valid encoding, whether it changes security meaning, and whether the operator needs to know it occurred.\n\nThe practical rule is to carry length information alongside data and validate it before use. Avoid APIs that require guessing how much data is present when a safer, length-aware option is available.",
  "narrationPoints": [
    "A buffer length is the amount of memory available to write into.",
    "A limit expressed in bytes may be appropriate for storage or protocol size, while a limit expressed in characters may be appropriate for display or policy.",
    "A C API may require a null-terminated string, while a length-aware API may accept data with embedded null characters.",
    "If truncation is allowed, the code should make clear whether it preserves valid encoding, whether it changes security meaning, and whether the operator needs to know it occurred.",
    "Truncation should not happen silently unless it is an explicit and documented behavior.",
    "The practical rule is to carry length information alongside data and validate it before use."
  ]
};
