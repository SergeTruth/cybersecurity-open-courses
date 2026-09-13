window.COURSE_MODULE = {
  "title": "Ownership, References, and Validity Relationships",
  "graphicAlt": "Borrowed views depend on an owner, and compile-time lifetime relationships are not runtime timers.",
  "narration": "A reference is only meaningful because some value exists for it to refer to. That value has an owner. The owner is responsible for cleanup when the value goes out of scope. A borrower may read or modify the value through a reference, but the borrower does not control the lifetime of the owned value.\n\nShared references allow read-only access to borrowed data. Mutable references allow controlled modification. In both cases, the reference depends on the owner keeping the value alive for the duration of the borrow. Lifetimes describe that relationship at compile time.\n\nA lifetime is not a countdown timer and it is not a runtime object. It is a way for Rust to reason about validity. The compiler is not measuring seconds. It is checking whether the owner of the data is guaranteed to live long enough for the reference that uses it.\n\nThis distinction helps developers design APIs. A function that borrows from an input should make that relationship clear. A function that creates new data and returns it may need to return owned data. A struct that stores references should show, through its type, that it cannot outlive the data it references.\n\nSecurity and reliability improve when owner and borrower responsibilities are visible. Hidden assumptions about who owns data and how long references remain valid are hard to review. Clear lifetimes, clear ownership, and clear function signatures turn those assumptions into engineering evidence.",
  "narrationPoints": [
    "A reference is only meaningful.",
    "Shared references allow read-only access to borrowed data.",
    "A lifetime is not a countdown timer and it is not a runtime.",
    "This distinction helps developers design APIs.",
    "Security and reliability improve.",
    "The owner is responsible for cleanup."
  ]
};
