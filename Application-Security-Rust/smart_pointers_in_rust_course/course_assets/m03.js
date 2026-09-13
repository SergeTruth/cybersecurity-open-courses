window.COURSE_MODULE = {
  "title": "Box<T> and Owned Indirection",
  "graphicAlt": "Box owns one heap value; moving the owning handle preserves its single ownership path and cleanup follows the owner.",
  "narration": "`Box<T>` is the most straightforward Rust smart pointer. It stores a value on the heap and gives that value one clear owner. The owner can move, pass, return, or store the box, but the boxed value still has a single ownership path. That simplicity makes `Box<T>` easier to reason about than reference counting or interior mutability.\n\nOwned heap indirection is useful when a type needs a stable size at compile time, such as recursive structures where a value contains another value of the same logical shape. A box can also be useful for large values that should not be moved around by value, or for APIs that need owned indirection without shared ownership.\n\n`Box<T>` also appears with trait objects, where code owns a value through a trait interface rather than a concrete type. Used carefully, this can make plugin-like or strategy-style APIs easier to express while keeping ownership clear. The caller owns the boxed object, and cleanup follows the owner.\n\nWhen the owner of a `Box<T>` goes out of scope, the boxed value is dropped. There is no reference count and no hidden group of owners. Reviewers can follow the owner to understand when cleanup should happen, which is why `Box<T>` is often a good first smart pointer to consider.\n\nDefensive Rust design usually starts with ordinary ownership, borrowing, or `Box<T>` before adding shared ownership. If a value does not need multiple owners, do not add reference counting. If it does not need runtime mutation rules, do not add interior mutability. Simple ownership is often the safest and most maintainable design.",
  "narrationPoints": [
    "`Box<T>` is the most straightforward Rust smart pointer.",
    "Owned heap indirection is useful.",
    "`Box<T>` also appears with trait objects.",
    "When the owner of a `Box<T>` goes out of scope.",
    "Defensive Rust design usually starts with ordinary.",
    "A box can also be useful for large values that should not."
  ]
};
