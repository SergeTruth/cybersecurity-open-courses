window.COURSE_MODULE = {
  "title": "Values, Moves, Copies, and Drops",
  "graphicAlt": "Move transfers ownership, Copy duplicates simple values, Clone explicitly duplicates data, and Drop performs resource cleanup.",
  "narration": "In Rust, most values have one owner. When a value is assigned to another variable or passed into a function, ownership may move to the new binding. After that move, the old binding is no longer responsible for the value and cannot be used as if it still owned it. This rule prevents two parts of the program from both believing they are responsible for the same resource.\n\nMove semantics are common in everyday Rust. Passing a `String` into a function that takes ownership means the function now owns that `String`. Returning a value transfers ownership back to the caller. Assigning one owned value to another binding can make the original binding unusable. These behaviors make responsibility explicit instead of leaving cleanup ambiguous.\n\nSome simple types implement `Copy`. These values can be duplicated implicitly because copying them is predictable, inexpensive, and does not create confusing cleanup responsibility. Integers and booleans are common examples. The important concept is not the exact list of types, but the distinction between moving ownership and copying simple values.\n\n`Clone` is different because it is explicit. Cloning may allocate memory, duplicate data, or perform a deeper operation than a simple copy. A clone can be exactly the right design when two owners need independent values, but unnecessary cloning can hide unclear ownership design and add avoidable cost. Reviewers should ask whether a clone represents a real need or a workaround.\n\n`Drop` connects ownership to cleanup. When an owner goes out of scope, Rust can release resources associated with the value. That resource might be memory, a file handle, a network connection, a lock guard, or another cleanup responsibility. Understanding moves, copies, clones, and drops helps developers reason about what exists, who owns it, and when cleanup occurs.",
  "narrationPoints": [
    "In Rust, most values have one owner.",
    "Move semantics are common in everyday Rust.",
    "Some simple types implement `Copy`.",
    "`Clone` is different because it is explicit.",
    "`Drop` connects ownership to cleanup.",
    "Reviewers should ask whether a clone represents a real need."
  ]
};
