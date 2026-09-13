window.COURSE_MODULE = {
  "title": "Borrowing in Functions, Structs, and APIs",
  "graphicAlt": "Function signatures specify reading, modification, or ownership transfer; structs may own or borrow their fields.",
  "narration": "Borrow checking is not only local to a line of code. It shapes API design. A function that accepts a shared reference says it only needs to read. A function that accepts a mutable reference says it needs controlled modification. A function that accepts an owned value says responsibility moves into the function.\n\nThose choices affect callers. If a function takes ownership, the caller cannot keep using the old owner unless the function returns something or the value implements a simple copy behavior. If a function borrows, the caller keeps ownership but must respect the borrow's duration. If a function mutably borrows, the caller gives temporary exclusive access.\n\nStructs make these relationships longer-lived. A struct with owned fields is usually straightforward because the struct controls cleanup for those fields. A struct with borrowed fields can be efficient, but it introduces lifetime relationships that every caller must satisfy. That can be appropriate, but it should be intentional and documented through the type design.\n\nGood APIs avoid surprising ownership transfer. If a function only needs to read a request, configuration object, path, or collection, a reference may be the right choice. If the function needs to store the value beyond the call, spawn work that owns it, or transform it into a new state, taking ownership may be clearer.\n\nThe borrow checker reinforces API honesty. It prevents a function from returning references that cannot remain valid and prevents callers from mutating values while a shared borrow is still active. Clear APIs make caller and callee responsibilities obvious, which improves maintainability and reviewability.",
  "narrationPoints": [
    "Borrow checking is not only local to a line of code.",
    "Those choices affect callers.",
    "Structs make these relationships longer-lived.",
    "Good APIs avoid surprising ownership transfer.",
    "The borrow checker reinforces API honesty.",
    "If a function borrows."
  ]
};
