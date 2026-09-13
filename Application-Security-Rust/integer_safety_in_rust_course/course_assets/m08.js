window.COURSE_MODULE = {
  "title": "Protocols, Serialization, FFI, and Unsafe Boundaries",
  "graphicAlt": "Protocol and FFI numeric contracts require explicit width, signedness, byte order, units, and validated Rust representations.",
  "narration": "Protocols, file formats, serialized messages, databases, and FFI often impose numeric representations that differ from internal Rust types. A field may be fixed-width, signed, unsigned, little-endian, big-endian, optional, versioned, or measured in a specific unit. Those details are part of the security contract.\n\nBinary formats and protocol fields should be reviewed for width, signedness, endianness, unit, and valid range. A length field in bytes is different from a count of records. A version field is different from a user-controlled limit. A signed external value may not safely map to an unsigned internal value without validation.\n\nSerialization boundaries should validate before internal use. Deserializing a number into a Rust type does not automatically mean the value is valid for the operation. A database row, JSON field, binary message, or configuration file can still carry a value outside the domain's allowed range.\n\nCross-language boundaries add another layer because C, platform APIs, device SDKs, and native libraries may use different integer widths or signedness assumptions. A type that looks like a length in one language may not match the size or range expected by Rust. FFI wrappers should document the mapping.\n\nUnsafe and FFI wrappers should translate external numbers into validated Rust domain types as early as possible. Document valid ranges, size relationships, length fields, allocation limits, conversion behavior, and ownership implications. The more clearly the wrapper defines numeric contracts, the less every caller has to rediscover them.",
  "narrationPoints": [
    "Protocols, file formats, serialized messages, databases,.",
    "Binary formats and protocol fields should be reviewed.",
    "Serialization boundaries should validate.",
    "Cross-language boundaries add another layer.",
    "Unsafe and FFI wrappers should translate external numbers.",
    "A version field is different from a user-controlled limit."
  ]
};
