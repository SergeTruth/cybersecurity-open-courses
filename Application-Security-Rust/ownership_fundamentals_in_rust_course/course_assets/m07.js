window.COURSE_MODULE = {
  "title": "Collections, Strings, Slices, and Iteration",
  "graphicAlt": "Owned strings and vectors contrast with borrowed text and slices; iteration can read, modify, or consume values.",
  "narration": "Collections and strings are where many developers first feel Rust ownership in everyday work. `String` owns growable UTF-8 text. `&str` is a borrowed view of text owned somewhere else. Choosing between them is not just syntax. It communicates whether a function needs to own text or only read a view of it.\n\n`Vec<T>` owns a sequence of values. A slice borrows a view into an array, vector, or string-like region of data. Passing a slice can be an excellent API choice when a function only needs to inspect a range of values without taking ownership of the whole collection. Passing an owned vector can be appropriate when the function needs to consume, store, or transform the collection.\n\nIteration also reflects ownership. Iterating by value consumes or moves values when the type requires it. Iterating by shared reference reads values without taking them. Iterating by mutable reference changes values in place. The right choice depends on what the loop is responsible for doing, not on habit.\n\nUnnecessary clones often appear when ownership feels confusing. A clone can make the compiler error go away, but it may also hide the fact that an API is asking for ownership when it only needs a borrow, or that a scope is holding a borrow too long. Reviewers should ask whether the clone represents a real independent value or an avoidable workaround.\n\nAt the same time, owned data is not bad. Sometimes returning or storing owned values makes a design clearer, safer, and easier to maintain than threading borrowed references through many layers. Practical Rust design balances efficiency with clarity. The goal is intentional ownership, not the fewest possible allocations at any cost.",
  "narrationPoints": [
    "Collections and strings are where many developers first.",
    "`Vec<T>` owns a sequence of values.",
    "Iteration also reflects ownership.",
    "Unnecessary clones often appear.",
    "At the same time, owned data is not bad.",
    "Reviewers should ask whether the clone represents a real."
  ]
};
