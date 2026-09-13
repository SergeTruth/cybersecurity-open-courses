window.COURSE_MODULE = {
  "title": "Ownership, References, and Borrowing Basics",
  "graphicAlt": "Three contracts show ownership transfer, shared read access, and temporary exclusive mutation.",
  "narration": "Borrowing only makes sense against the background of ownership. A value has an owner, and that owner is responsible for cleanup when the value goes out of scope. Borrowing lets another part of the program use the value temporarily without becoming the owner. The original owner remains responsible for the value's lifetime.\n\nA shared reference provides read-only access. A function that receives a shared reference is saying it can do its job by inspecting the value. It does not need to store the value permanently, consume it, or mutate it. That keeps the caller's ownership intact and makes the function easier to compose with other code.\n\nA mutable reference provides controlled write access. It lets a function change a value owned somewhere else without taking permanent responsibility for that value. This is useful for updating state, appending to buffers, modifying collections, and performing transformations where the caller should keep the same owned value afterward.\n\nFunction signatures are access contracts. A parameter of an owned type says the function takes responsibility for the value. A shared reference says the function needs read access. A mutable reference says the function needs to change something in place. These choices tell callers and reviewers what kind of relationship the function requires.\n\nDefensive Rust code uses the least powerful form that fits the job. If a function only needs to read, it should not take ownership. If it needs temporary mutation, it should not require a clone or a full ownership transfer. Precise borrowing reduces unnecessary copies and makes data flow easier to review.",
  "narrationPoints": [
    "Borrowing only makes sense against the background.",
    "A shared reference provides read-only access.",
    "A mutable reference provides controlled write access.",
    "Function signatures are access contracts.",
    "Defensive Rust code uses the least powerful form that fits.",
    "A value has an owner."
  ]
};
