window.COURSE_MODULE = {
  "title": "Lifetimes, Scope, and Valid References",
  "graphicAlt": "Borrowed references remain within their owner's valid lifetime; APIs can borrow input or return an owned value.",
  "narration": "Lifetimes describe how long references are valid relative to the data they borrow. The essential rule is simple: a reference must never outlive the value it points to. Rust uses lifetime reasoning to prevent references to data that has already been cleaned up or moved away from the context where the reference would be used.\n\nMost lifetime reasoning happens automatically through compiler inference. Developers do not annotate every reference in normal Rust code. When lifetime annotations appear, they are usually explaining relationships among inputs and outputs. They are not a way to force data to live longer than it actually does.\n\nA function signature with lifetime annotations might say that the returned reference is tied to one of the input references. That can be useful and precise, but it also means the caller must provide data that lives long enough. If the relationship is not true, the compiler should reject the design rather than allow a reference to become invalid.\n\nLifetime problems often point to unclear ownership choices. A function may be trying to return a reference to data it created locally. A struct may be borrowing data that would be simpler to own. A temporary value may not live as long as a caller expects. Instead of fighting the compiler, ask what ownership relationship the design is trying to express.\n\nSometimes the answer is to return owned data. Sometimes it is to borrow from an input more clearly. Sometimes it is to restructure state so the owner outlives the references that depend on it. Lifetimes are not a separate puzzle from design; they are Rust's way of making reference validity explicit.",
  "narrationPoints": [
    "Lifetimes describe how long references are valid relative.",
    "Most lifetime reasoning happens automatically through.",
    "A function signature with lifetime annotations might say.",
    "Lifetime problems often point to unclear ownership choices.",
    "Sometimes the answer is to return owned data.",
    "The essential rule is simple: a reference must never."
  ]
};
