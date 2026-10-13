window.COURSE_MODULE = {
  "title": "Allocation, Initialization, and Failure Handling",
  "graphicAlt": "Checked allocation leads through initialization to ownership transfer; allocation failure stops, while partial initialization has its own cleanup path.",
  "narration": "Allocation can fail, and safe C treats that possibility as part of the design. A returned pointer must be checked before it is used. If allocation fails, the function should return a predictable error, preserve existing state where appropriate, and avoid using or releasing memory it does not own.\n\nAllocated storage and initialized objects are different concepts. Some allocation functions provide uninitialized bytes, and some provide zeroed bytes. Zero-initialization can be useful, but it is not always the same as a valid object state. The program still needs to establish invariants such as length, capacity, ownership flags, and nested pointer fields.\n\nPartially initialized objects deserve special attention. A constructor-style function may allocate the outer object, allocate several fields, open related resources, and then fail halfway through. The cleanup path must know which fields are valid and which should be ignored.\n\nPredictable failure handling keeps memory safety local. If a function either fully constructs an object or fully cleans up before returning failure, callers have a clean contract. If a function returns an ambiguous half-owned object, every caller must understand the partial state, which is fragile.\n\nReviewers should look for allocation checks, initialization order, cleanup on every failure path, and ownership transfer only after construction succeeds. Failure handling is not an afterthought; it is one of the main places heap safety is either preserved or lost.",
  "narrationPoints": [
    "Allocation can fail, and safe C treats that possibility as part of the design.",
    "The program still needs to establish invariants such as length, capacity, ownership flags, and nested pointer fields.",
    "The cleanup path must know which fields are valid and which should be ignored.",
    "If a function either fully constructs an object or fully cleans up before returning failure, callers have a clean contract.",
    "Reviewers should look for allocation checks, initialization order, cleanup on every failure path."
  ]
};
