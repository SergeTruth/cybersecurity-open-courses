window.COURSE_MODULE = {
  "title": "Numeric Fields, Endianness, and Range Checks",
  "graphicAlt": "Protocol numbers pass explicit byte-order, range and arithmetic checks before allocation or memory access.",
  "narration": "Protocol numeric fields often define exact widths, signedness, and byte order. A field may be a 16-bit unsigned network-order value, a 32-bit length, a sequence number, a count, or an identifier. The parser should decode those fields deliberately from bytes rather than relying on host layout or casts.\n\nEndianness is part of the protocol contract. If the protocol defines a byte order, the parser should apply it consistently on every platform. Directly interpreting raw bytes through local C types hides that decision and can introduce portability and alignment problems.\n\nLengths, counts, offsets, sequence numbers, and identifiers require range checks. A length may be syntactically present but too large for the configured maximum. A count may be reasonable by itself but impossible when multiplied by element size. An offset may point inside a buffer while the range it describes extends beyond it.\n\nAllocation and indexing math must account for overflow before use. Multiplying counts by element sizes, adding headers to payload lengths, and advancing parser positions should be checked before allocating, copying, or deriving pointers. The safe calculation comes before the memory operation.\n\nValues that cannot be represented safely in local parser types should be rejected or handled through a defined safe path. This is especially important when a protocol uses wider integers than the platform can comfortably use for memory sizes. Clear limits are better than accidental conversion.",
  "narrationPoints": [
    "Protocol numeric fields often define exact widths, signedness, and byte order.",
    "If the protocol defines a byte order, the parser should apply it consistently on every platform.",
    "An offset may point inside a buffer while the range it describes extends beyond it.",
    "Allocation and indexing math must account for overflow before use.",
    "Values that cannot be represented safely in local parser types should be rejected or handled through a defined safe path."
  ]
};
