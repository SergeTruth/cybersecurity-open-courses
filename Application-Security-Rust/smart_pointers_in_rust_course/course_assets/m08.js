window.COURSE_MODULE = {
  "title": "API Design, Pin, Cow, and Review Patterns",
  "graphicAlt": "Simple API access is preferred; Cow supports borrow-or-own behavior, while Pin expresses location guarantees relevant to non-Unpin values.",
  "narration": "Smart pointer choice is part of API design. A function signature tells callers whether the API wants owned data, borrowed data, shared ownership, mutable access, thread-safe sharing, or a more specialized contract. If the signature uses a smart pointer, that pointer should express a real requirement.\n\nStart with owned values or borrows when they are sufficient. Passing `&T`, `&mut T`, or an owned value often communicates intent more clearly than exposing reference counting or interior mutability. Adding `Rc<T>` or `Arc<T>` to an API can force callers into a lifecycle model they did not otherwise need.\n\n`Cow` supports borrow-or-own behavior. It is useful when an API usually works with borrowed data but occasionally needs to allocate or modify a value. The defensive value of `Cow` is that it can avoid unnecessary allocation while still making the ownership transition explicit when mutation or ownership becomes necessary.\n\n`Pin` appears in advanced designs where a value must not move after it has been pinned, such as some async and low-level abstractions. At a conceptual level, `Pin` protects stable-location assumptions. It should be introduced because the design depends on those assumptions, not because it appears in examples or feels more advanced.\n\nReview should ask whether the pointer choice simplifies safety or hides confusion. Does the API actually need shared ownership? Does mutation need to be shared? Can ownership stay with the caller? Could a borrow express the contract better? Are cleanup and lifetime expectations documented?\n\nGood APIs make ownership easy to follow. They avoid exporting internal complexity unless callers must participate in that complexity. When smart pointers are necessary, document the lifecycle, mutation, concurrency, and cleanup expectations so callers and reviewers can reason about the contract without guessing.",
  "narrationPoints": [
    "Smart pointer choice is part of API design.",
    "Start with owned values or borrows when they are sufficient.",
    "`Cow` supports borrow-or-own behavior.",
    "`Pin` appears in advanced designs.",
    "Review should ask whether the pointer choice simplifies.",
    "Good APIs make ownership easy to follow."
  ]
};
