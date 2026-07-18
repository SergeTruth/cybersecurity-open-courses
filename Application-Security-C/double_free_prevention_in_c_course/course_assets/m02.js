window.COURSE_MODULE = {
  "title": "Ownership as the First Control",
  "graphicAlt": "Bullet summary graphic for Ownership as the First Control.",
  "narration": "Ownership is the first control for preventing double-free defects. Every dynamically allocated object needs a clear cleanup authority: the code that is responsible for releasing it exactly once. If that authority is vague, every caller, callee, and container becomes a possible second cleanup path.\n\nCaller-owned memory means the caller keeps release responsibility after passing the pointer. Callee-owned memory means the receiving function owns cleanup, either because it created the object or because ownership was transferred. A borrowed reference allows temporary use, but it does not give the borrower permission to free or retain the object beyond the agreed lifetime.\n\nOwnership should be visible in API names, comments, data structure layout, and review conventions. Function names such as create, destroy, attach, detach, borrow, clone, or release can help when they are used consistently. Documentation should explain whether the function consumes a pointer, stores it, returns a new allocation, or simply observes it.\n\nData structures also need ownership design. A field may own a buffer, borrow an external value, or point into another object. Those cases should not look identical in the code if they have different cleanup rules. Naming and comments can make the difference reviewable.\n\nA useful review question is simple: who frees this object? If two answers seem possible, the design is not clear enough. If no answer is visible, the design is not complete enough. Double-free prevention begins when cleanup authority is explicit.",
  "narrationPoints": [
    "Ownership is the first control for preventing double-free defects.",
    "Callee-owned memory means the receiving function owns cleanup, either because it created the object or because ownership was transferred.",
    "Ownership should be visible in API names, comments, data structure layout, and review conventions.",
    "A field may own a buffer, borrow an external value, or point into another object.",
    "If two answers seem possible, the design is not clear enough."
  ]
};
