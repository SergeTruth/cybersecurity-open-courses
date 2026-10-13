window.COURSE_MODULE = {
  "title": "Bounds, Sizes, and Heap Object Layout",
  "graphicAlt": "Checked element-count arithmetic creates a bounded allocation; logical length covers used cells while capacity covers the full storage.",
  "narration": "Heap memory safety depends on correct size tracking. A heap pointer does not automatically include the allocation size, the number of initialized elements, or the current logical length. That metadata must be stored and maintained by the program.\n\nByte counts and element counts are different units. Allocating space for elements requires multiplying the count by the element size, and that calculation must be checked before allocation. Copying, indexing, formatting, and parsing should use the correct unit for the operation.\n\nInteger overflow in allocation-size calculations can break safety assumptions. A wrapped size can request less memory than the program later treats as available. Defensive code validates counts, additions, multiplications, and conversions before memory is allocated or accessed.\n\nCurrent length and capacity also differ. Capacity is how much space the allocation can safely hold. Length is how much of that space currently contains meaningful data. Operations such as append, parse, read, and resize must update these values consistently.\n\nObject layout matters when a heap object contains headers, arrays, flexible trailing data, or nested allocations. Reviewers should check that every access stays within the object boundary that was actually allocated, not the boundary the code hoped to allocate.",
  "narrationPoints": [
    "A heap pointer does not automatically include the allocation size, the number of initialized elements.",
    "Allocating space for elements requires multiplying the count by the element size, and that calculation must be checked before allocation.",
    "A wrapped size can request less memory than the program later treats as available.",
    "Operations such as append, parse, read, and resize must update these values consistently.",
    "Reviewers should check that every access stays within the object boundary that was actually allocated."
  ]
};
