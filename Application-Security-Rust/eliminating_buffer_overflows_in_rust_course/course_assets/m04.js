window.COURSE_MODULE = {
  "title": "Strings, Bytes, Encoding, and Parsing Boundaries",
  "graphicAlt": "Raw bytes become text only after UTF-8 validation; byte spans and character boundaries are distinct.",
  "narration": "Rust separates text from bytes in a way that supports defensive programming. A `String` owns valid UTF-8 text. An `&str` borrows valid UTF-8 text. A byte slice may contain arbitrary data. Treating arbitrary bytes as text before validation creates confusion about length, encoding, delimiters, and character boundaries.\n\nThis distinction matters because text length and byte length are not always the same concept. Code that slices text as if every character were one byte can be wrong. Safe Rust protects memory, but the application still needs correct parsing and validation so text operations match the protocol, file format, or business rule being implemented.\n\nFile input, network input, protocol messages, command-line arguments, and serialized data should be treated as untrusted until parsed. A parser boundary should validate length, format, encoding, delimiters, record structure, and supported values before data is used for indexing, allocation, file paths, database operations, or downstream requests.\n\nParser boundaries are security boundaries. They are the place where raw input becomes structured application data. Defensive code should keep raw bytes near the boundary, convert them into validated domain types, and avoid letting untrusted strings or slices drift through the application without context.\n\nGood parser design also defines safe failure. Invalid encoding, truncated data, extra delimiters, oversized fields, missing terminators, and unsupported versions should produce predictable errors. That makes the application more reliable and reduces pressure to add unsafe shortcuts around difficult inputs.",
  "narrationPoints": [
    "Rust separates text from bytes in a way that supports.",
    "This distinction matters.",
    "File input, network input, protocol messages, command-line.",
    "Parser boundaries are security boundaries.",
    "Good parser design also defines safe failure.",
    "Invalid encoding, truncated data, extra delimiters."
  ]
};
