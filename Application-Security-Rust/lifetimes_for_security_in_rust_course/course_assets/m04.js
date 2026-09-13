window.COURSE_MODULE = {
  "title": "Returning References and Avoiding Dangling Data",
  "graphicAlt": "Returning a view of caller-owned data and returning owned data are valid patterns; returning a reference to an expired local value is blocked.",
  "narration": "Returning a reference is safe only when the referenced data will remain valid for the caller. That means the caller must have access to an owner that outlives the returned reference. If the owner disappears when the function ends, the reference cannot be valid outside the function.\n\nA function cannot safely return a reference to a local temporary value that is cleaned up when the function returns. Rust rejects this pattern in safe code because it would give the caller a reference to data that no longer exists. That rejection is a feature, not a limitation.\n\nReturned references often borrow from input data. In that design, the function is not creating a new long-lived value. It is selecting, slicing, or exposing part of data that the caller already owns. The signature should make that relationship clear so the caller knows the reference is tied to the input.\n\nThis is common in defensive parsing and validation code. A helper might return a borrowed view into a trusted input buffer, but only if the caller continues to own that buffer. If the helper builds a normalized value, stores it for later, or sends it across a task boundary, an owned return is usually easier to reason about.\n\nIf no valid owner will remain after the function returns, the function should return owned data instead. That may involve constructing a new string, object, collection, or result value that the caller can own. Returning owned data is often simpler and safer than forcing a borrowed relationship that does not match the real design.\n\nThis is a major security benefit of Rust's lifetime model. Safe Rust prevents stale references before runtime. In review, the question is straightforward: what owns the data behind the returned reference, and can that owner truly outlive every use of the reference?",
  "narrationPoints": [
    "Returning a reference is safe only.",
    "A function cannot safely return a reference to a local.",
    "Returned references often borrow from input data.",
    "This is common in defensive parsing and validation code.",
    "If no valid owner will remain.",
    "This is a major security benefit of Rust's lifetime model."
  ]
};
