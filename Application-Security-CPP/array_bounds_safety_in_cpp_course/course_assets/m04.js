window.COURSE_MODULE = {
  "title": "Indexing, Iteration, and Range-Based Access",
  "graphicAlt": "Three loop forms compare a fragile inclusive index, a checked half-open range, and range-based iteration that avoids manual end arithmetic.",
  "narration": "Many array defects come from ordinary loop logic. A termination condition uses the wrong comparison. A loop assumes there is at least one element. The last valid element is confused with the count of elements. A size is captured before a container changes. These are everyday mistakes, which is exactly why patterns matter.\n\nOff-by-one errors usually appear near boundaries. Zero elements, one element, exactly the maximum allowed size, and just-beyond-limit values deserve explicit attention. A loop that works for a typical middle-sized collection may still be wrong for an empty range or a range with one valid item.\n\nRange-based loops and standard algorithms reduce unnecessary index handling. If the code only needs to visit each element, an index may not be needed. Removing the index removes the need to reason about start value, end value, increment, signedness, and whether the index still belongs to the accessed container.\n\nWhen indexing is required, check the index before access and keep it tied to the container being accessed. Avoid deriving an index from one container and applying it to another unless the relationship is explicit and validated. If a function accepts an index, its contract should state the valid range and failure behavior.\n\nSigned and unsigned interactions deserve careful review. Container sizes often use unsigned types, while application indexes, deltas, or parsed values may be signed. A negative value should be rejected before it crosses into an unsigned size or index path. Clear conversion points make the code easier to trust.\n\nGood iteration code is boring in the best way. It makes the range obvious, handles empty input deliberately, avoids hidden conversion surprises, and uses named helper functions when the range rule is important enough to repeat.",
  "narrationPoints": [
    "Many array defects come from ordinary loop logic.",
    "A size is captured before a container changes.",
    "Range-based loops and standard algorithms reduce unnecessary index handling.",
    "When indexing is required, check the index before access and keep it tied to the container being accessed.",
    "Container sizes often use unsigned types, while application indexes, deltas, or parsed values may be signed.",
    "Good iteration code is boring in the best way."
  ]
};
