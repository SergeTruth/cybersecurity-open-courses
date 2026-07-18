window.COURSE_MODULE = {
  "title": "Evaluation Order, Side Effects, and Undefined Behavior",
  "graphicAlt": "Bullet summary graphic for Evaluation Order, Side Effects, and Undefined Behavior.",
  "narration": "C does not evaluate every subexpression in the intuitive left-to-right order developers may assume. Sequencing rules define when side effects are complete relative to other evaluations. If an expression modifies an object and reads or modifies it again without defined sequencing, the program can leave the defined rules of the language.\n\nCompact expressions can be appealing, but they are often harder to review. A statement that increments, indexes, assigns, calls a function, and reads a value in one expression may hide ordering assumptions. Security-sensitive C code benefits from clear statements where each side effect is visible.\n\nUndefined behavior can also come from out-of-bounds access, invalid pointer use, signed overflow, invalid shifts, uninitialized reads, lifetime violations, and data races. The common theme is that the implementation is not required to preserve the result a developer expected.\n\nOptimizers can assume undefined behavior does not happen and transform code accordingly. That means a program may appear stable with one compiler flag and behave differently with another. The correct response is not to fight the optimizer, but to write code whose assumptions are inside the language rules.\n\nDefensive review favors simple sequencing, checked arithmetic, clear lifetime boundaries, explicit initialization, and small expressions with one obvious purpose. Readability is not just style; it is a way to make memory-model assumptions visible.",
  "narrationPoints": [
    "Sequencing rules define when side effects are complete relative to other evaluations.",
    "Compact expressions can be appealing, but they are often harder to review.",
    "Undefined behavior can also come from out-of-bounds access, invalid pointer use, signed overflow, invalid shifts, uninitialized reads.",
    "Optimizers can assume undefined behavior does not happen and transform code accordingly.",
    "Defensive review favors simple sequencing, checked arithmetic, clear lifetime boundaries, explicit initialization."
  ]
};
