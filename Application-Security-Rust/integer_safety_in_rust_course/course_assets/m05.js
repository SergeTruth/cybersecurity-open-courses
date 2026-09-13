window.COURSE_MODULE = {
  "title": "Lengths, Indexes, Capacity, and Allocation",
  "graphicAlt": "Allocation sizing uses checked multiplication and addition, then policy limits before allocation.",
  "narration": "Integers often control memory behavior. Lengths, indexes, offsets, capacities, chunk sizes, page counts, and multiplication results can influence allocation and access patterns. Safe Rust prevents many memory-safety failures, but it does not automatically decide whether a size is reasonable or whether a value from input should be trusted.\n\n`usize` is the natural type for indexes and memory sizes, but a value becoming `usize` does not make it safe. A parsed protocol length, file size, query parameter, or database value should be validated before it becomes an allocation size or collection index. The context decides what range is allowed.\n\nLength and capacity are different concepts. Length describes current data. Capacity describes allocated space. Offset, index, element count, byte count, and record count are also different ideas. Mixing them can produce subtle bugs even in safe code, especially near parsers and buffer management.\n\nAllocation calculations deserve checked arithmetic. Adding header size to payload size, multiplying count by element size, or aligning a size upward can overflow before the allocation call sees the value. Defensive code checks the calculation and rejects impossible or excessive requests before allocating.\n\nResource exhaustion is a security and reliability concern even without memory corruption. Unbounded sizes can consume memory, CPU time, disk space, or queue capacity. Apply explicit limits, document them, test them, and fail safely when a request exceeds them. Safe Rust needs resource policy alongside memory safety.",
  "narrationPoints": [
    "Integers often control memory behavior.",
    "`usize` is the natural type for indexes and memory sizes.",
    "Length and capacity are different concepts.",
    "Allocation calculations deserve checked arithmetic.",
    "Resource exhaustion is a security and reliability concern.",
    "Apply explicit limits."
  ]
};
