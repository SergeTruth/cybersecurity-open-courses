window.COURSE_MODULE = {
  "title": "Borrowing, Lifetimes, and Valid References",
  "graphicAlt": "Borrowed access remains within a valid owner's lifetime, with owned returns when no durable owner remains.",
  "narration": "Borrowing allows code to use a value without taking ownership. A shared reference permits read-only access. A mutable reference permits controlled modification. In both cases, the borrower receives access, but the original owner remains responsible for the value's lifetime and cleanup.\n\nLifetimes describe how long references are valid relative to the data they borrow. A reference must not outlive the owner of that data. This is one of the core reasons safe Rust eliminates ordinary use-after-free errors: the compiler checks the relationship before the program runs.\n\nBorrow checker messages can feel strict, but they often identify a real lifecycle ambiguity. A function may be trying to return a reference to data that will disappear. A task may be trying to hold a borrowed value too long. A scope may be mixing mutation and shared access in a way that obscures who can use the value.\n\nReturning references requires special care. A returned reference must point to data that remains valid for the caller. If the reference is tied to an input, the function signature should make that relationship clear. If no valid owner will remain after the function returns, the function should return owned data instead.\n\nIn security review, ask what owns the data behind each reference. Ask whether that owner outlives every use. Ask whether a reference crosses async, thread, callback, or FFI boundaries. Good lifetime design makes those answers visible instead of relying on tribal knowledge.",
  "narrationPoints": [
    "Borrowing allows code to use a value without taking.",
    "Lifetimes describe how long references are valid relative.",
    "Borrow checker messages can feel strict.",
    "Returning references requires special care.",
    "In security review.",
    "A reference must not outlive the owner of that data."
  ]
};
