window.COURSE_MODULE = {
  "title": "Ownership and Single Responsible Cleanup",
  "graphicAlt": "Moving transfers cleanup responsibility, while borrowed access does not create a new cleanup owner.",
  "narration": "Rust's ownership model is built around responsibility. A value has an owner, and the owner is responsible for cleanup when the value goes out of scope. This is why ownership is not just a syntax concept. It is how Rust represents who has authority over a resource.\n\nWhen ownership moves, responsibility moves with it. A value passed into a function that takes ownership is no longer owned by the caller. A value moved into a struct field is now part of that struct's lifecycle. The previous binding is not allowed to continue behaving as though it still owns the value.\n\nBorrowing is equally important for double-free prevention. A borrowed reference can read or modify a value temporarily, but it does not take cleanup responsibility. That distinction lets code use values without creating another owner that might later try to release the same resource.\n\nFunction signatures should make cleanup responsibility visible. A function that accepts `T` may take ownership. A function that accepts `&T` borrows for reading. A function that accepts `&mut T` borrows for controlled modification. A function that returns `T` gives ownership back to the caller or transfers it onward.\n\nDefensive Rust design avoids ambiguous cleanup paths. Do not make callers guess whether a helper closes a handle, consumes a wrapper, or only borrows it. The more sensitive the resource, the more valuable it is for ownership transfer to be explicit in the type signature and documented in the API contract.",
  "narrationPoints": [
    "Rust's ownership model is built around responsibility.",
    "When ownership moves, responsibility moves with it.",
    "Borrowing is equally important for double-free prevention.",
    "Function signatures should make cleanup responsibility.",
    "Defensive Rust design avoids ambiguous cleanup paths.",
    "A value has an owner."
  ]
};
