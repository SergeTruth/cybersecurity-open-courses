window.COURSE_MODULE = {
  "title": "Designing APIs That Prevent Buffer Misuse",
  "graphicAlt": "Encapsulated buffers expose slices, iterators, and owned results so callers do not coordinate unsafe loose buffer parameters.",
  "narration": "Good APIs prevent misuse before it starts. Instead of passing raw indexes, raw lengths, and unrelated buffers around loosely, Rust code can use types that represent validated input, slices that carry length, iterators that control traversal, and result types that express failure.\n\nValidated input types are especially useful at parser boundaries. Once a raw message, path, identifier, or size field has been checked, converting it into a domain type prevents every downstream caller from repeating the same validation. The type communicates that the value has crossed a trust boundary under specific rules.\n\nSlices and iterators can carry bounds naturally. A function that accepts a slice receives both a view of the data and its length. A function that accepts an iterator can process values without knowing or trusting manual index arithmetic. These shapes often reduce the need for callers to coordinate separate buffers, lengths, and positions.\n\nEncapsulation protects internal buffers and invariants. A type can own its buffer and expose operations that maintain valid state. Callers do not need to know the internal capacity, offset, or partially parsed structure. They interact with safe methods that either succeed or return clear errors.\n\nOwned results can be safer than caller-managed output buffers when the ownership and size relationship would otherwise be hard to express. Caller-managed buffers may be appropriate for performance-sensitive boundaries, but they require clear contracts. Defensive API design makes the safe path natural and the risky path explicit.",
  "narrationPoints": [
    "Good APIs prevent misuse before it starts.",
    "Validated input types are especially useful at parser.",
    "Slices and iterators can carry bounds naturally.",
    "Encapsulation protects internal buffers and invariants.",
    "Owned results can be safer than caller-managed output.",
    "Instead of passing raw indexes."
  ]
};
