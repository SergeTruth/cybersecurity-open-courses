window.COURSE_MODULE = {
  "title": "Integer Safety and Allocation Size Calculations",
  "graphicAlt": "Bullet summary graphic for Integer Safety and Allocation Size Calculations.",
  "narration": "Integer mistakes can turn a seemingly correct buffer check into an unsafe operation. Sizes, lengths, indexes, offsets, counts, and allocation requests are usually represented as integers. If those integers are wrong, the buffer decision is wrong.\n\nSize calculations often involve multiplication, addition, casts, signed and unsigned conversion, and boundary checks. A calculation may combine an element count, element size, terminator space, header size, or alignment requirement. Each step should be reviewed before the result is trusted.\n\nAllocation size calculations must be checked for overflow before memory is allocated. If a calculated size wraps or is truncated into a smaller type, the program may allocate less memory than later code expects. The later copy or formatting operation may then write beyond the allocation that was actually created.\n\nSigned and unsigned conversions can change comparisons and boundary checks. A negative value may become a very large unsigned value. A large unsigned value may not fit into a signed destination. These conversions should be deliberate, validated, and close to the boundary where the decision is made.\n\nNumeric validation belongs before allocation, indexing, pointer arithmetic, and copying. Negative values, huge values, maximum values, zero, one, and near-boundary values should be included in tests because they often reveal hidden assumptions.\n\nUse appropriate types for sizes and indexes, such as size_t where appropriate, while still validating conversions and limits. A type choice helps express intent, but it does not replace range checks or careful arithmetic.",
  "narrationPoints": [
    "Integer mistakes can turn a seemingly correct buffer check into an unsafe operation.",
    "Size calculations often involve multiplication, addition, casts, signed and unsigned conversion, and boundary checks.",
    "Allocation size calculations must be checked for overflow before memory is allocated.",
    "Numeric validation belongs before allocation, indexing, pointer arithmetic, and copying.",
    "A type choice helps express intent, but it does not replace range checks or careful arithmetic."
  ]
};
