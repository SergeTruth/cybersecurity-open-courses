window.COURSE_MODULE = {
  "title": "Ownership, Moves, and Drop Semantics",
  "graphicAlt": "Moving a non-Copy value transfers responsibility to a new owner; the old binding cannot be used and Drop handles cleanup at ownership end.",
  "narration": "Rust's ownership model gives each value a responsible owner. The owner determines when the value is available and when cleanup happens. When the owner goes out of scope, Rust runs drop behavior for that value. This gives ordinary safe code predictable cleanup without manual free calls.\n\nWhen a non-Copy value is moved, ownership transfers to a new binding, field, return value, or function parameter. The original binding can no longer be used as if it still owns the value. That rule prevents two parts of the program from both believing they are responsible for the same resource.\n\nMove semantics are a major use-after-free defense. If a value has been handed off, Rust does not allow the old owner to continue using it. Instead of letting stale access continue, the compiler forces the developer to choose a clear design: borrow temporarily, transfer ownership, clone intentionally, or return ownership later.\n\n`Drop` connects ownership to cleanup. It can release memory, close files, release sockets, unlock guards, decrement reference counts, or perform other structured cleanup when ownership ends. Reviewers should understand drop behavior for types that manage important resources, especially around error paths and partial initialization.\n\nDefensive Rust programming treats moves and drops as design signals. Ownership transfer should be intentional. Cleanup should be predictable. APIs should make it clear whether a caller is giving up a value, borrowing it temporarily, or receiving an owned result. That clarity is what prevents stale lifecycle assumptions.",
  "narrationPoints": [
    "Rust's ownership model gives each value a responsible owner.",
    "When a non-Copy value is moved.",
    "Move semantics are a major use-after-free defense.",
    "`Drop` connects ownership to cleanup.",
    "Defensive Rust programming treats moves and drops as design.",
    "When the owner goes out of scope."
  ]
};
