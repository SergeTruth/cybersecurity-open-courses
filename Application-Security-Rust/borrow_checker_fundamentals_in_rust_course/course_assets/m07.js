window.COURSE_MODULE = {
  "title": "Collections, Iteration, and Borrow Conflicts",
  "graphicAlt": "Collection lookup, ending the read borrow, and modification are separated to avoid conflicting access.",
  "narration": "Collections are where many borrow checker lessons become practical. Borrowing one element from a vector, map, or string can prevent mutation of the collection while that borrow is active. That protection matters because changing a collection may move elements, resize storage, or invalidate assumptions about what a reference points to.\n\nIteration choices also communicate ownership and access. Iterating by value can consume values. Iterating by shared reference reads values without taking ownership. Iterating by mutable reference changes values in place. A loop should choose the access pattern that matches the work it actually performs.\n\nBorrow conflicts often happen when code tries to read from a collection and modify it in the same phase. For example, a function might look up an entry, keep a reference to it, and then try to insert or remove something from the same collection. The compiler rejects these patterns when the active reference would make the mutation unclear or unsafe.\n\nDefensive refactoring separates lookup from modification. First collect the information needed to decide what should happen. Then let the read borrow end. Finally perform the mutation. In other cases, use APIs that safely split access, borrow only the necessary field, or return an owned value that can outlive the collection borrow.\n\nAvoid reflexive cloning as the first response. Cloning can be right when independent ownership is truly needed, but it can also hide unclear data flow. Narrow borrow scopes, split phases, and clearer function boundaries often solve the problem while preserving the design intent. When cloning is chosen, it should be intentional and easy to explain.",
  "narrationPoints": [
    "Collections are where many borrow checker lessons become.",
    "Iteration choices also communicate ownership and access.",
    "Borrow conflicts often happen.",
    "Defensive refactoring separates lookup from modification.",
    "Avoid reflexive cloning as the first response.",
    "A loop should choose the access pattern that matches."
  ]
};
