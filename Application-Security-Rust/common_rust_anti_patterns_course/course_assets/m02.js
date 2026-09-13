window.COURSE_MODULE = {
  "title": "Fighting Ownership and the Borrow Checker",
  "graphicAlt": "Repeated clones and tangled references contrast with clear ownership, narrow borrowing, and deliberate cloning.",
  "narration": "One common Rust anti-pattern is treating the borrow checker as an obstacle to silence instead of feedback to understand. Borrow checker errors can be frustrating, especially when porting code from another language or working inside a large function. But the error often points to a real design question: who owns this data, who only needs temporary access, who needs mutation, and how long should that access last?\n\nRepeated cloning is a frequent escape hatch. Cloning is not inherently wrong; independent ownership is sometimes exactly what the design needs. The problem appears when clones are added mainly to make errors disappear. That can hide expensive data movement, create confusing ownership stories, and make later reviewers wonder which copy is authoritative.\n\nOvercomplicated lifetime annotations can be another smell. Lifetimes describe relationships between references. They do not create ownership and they do not fix unclear data flow. If a function signature accumulates broad lifetimes that are hard to explain, the better move may be to simplify the API, return owned data, or split the operation into clearer phases.\n\nAdding `Rc`, `Arc`, or interior mutability too early can also turn a local ownership question into a global lifecycle problem. Shared ownership is useful when the relationship is truly shared. It is less useful when the real issue is a function doing too much, a borrow lasting too long, or a data structure mixing read and write responsibilities.\n\nDefensive refactoring narrows scopes, separates read and write phases, moves ownership at natural boundaries, and chooses borrows or owned values based on the actual responsibility of the function. In review, the question is not whether the code made the compiler quiet. The question is whether the ownership story became clearer.",
  "narrationPoints": [
    "One common Rust anti-pattern is treating the borrow checker.",
    "Repeated cloning is a frequent escape hatch.",
    "Overcomplicated lifetime annotations can be another smell.",
    "Adding `Rc`.",
    "Defensive refactoring narrows scopes.",
    "In review, the question is not whether the code made."
  ]
};
