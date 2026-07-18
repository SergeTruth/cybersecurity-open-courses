window.COURSE_MODULE = {
  "title": "Arrays, Bounds, and Pointer Arithmetic",
  "graphicAlt": "Bullet summary graphic for Arrays, Bounds, and Pointer Arithmetic.",
  "narration": "Arrays represent contiguous elements, but C does not automatically preserve array length in every expression. When an array is passed to a function, it often decays to a pointer to its first element. The callee may receive an address without receiving the capacity information needed for safe access.\n\nPointer arithmetic is defined only within the same array object, including the one-past-the-end position for comparison or loop termination. The one-past pointer is useful as a boundary marker, but it is not a valid object to dereference. Moving a pointer outside the array object loses the defined relationship the language provides.\n\nElement counts and byte counts must not be confused. A count of characters, integers, structure elements, or bytes means different things. Conversions between element counts and byte sizes should be reviewed for arithmetic overflow, object size, and destination capacity.\n\nBounds checks should be based on the destination capacity, the current length, and the operation being performed. A copy, append, parse, transform, or null-termination step may need different checks. The fact that a source buffer is a certain size does not prove that the destination can receive it.\n\nFunction contracts should carry capacity and length together when buffers are involved. They should also specify whether a pointer may be null, whether the buffer is mutable, whether the length includes a terminator, and who owns the data. Those details make array reasoning visible instead of implicit.",
  "narrationPoints": [
    "Arrays represent contiguous elements, but C does not automatically preserve array length in every expression.",
    "The one-past pointer is useful as a boundary marker, but it is not a valid object to dereference.",
    "Conversions between element counts and byte sizes should be reviewed for arithmetic overflow, object size, and destination capacity.",
    "Bounds checks should be based on the destination capacity, the current length, and the operation being performed.",
    "Function contracts should carry capacity and length together when buffers are involved."
  ]
};
