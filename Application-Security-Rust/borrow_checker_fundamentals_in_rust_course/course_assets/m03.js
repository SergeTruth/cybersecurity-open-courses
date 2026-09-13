window.COURSE_MODULE = {
  "title": "Shared Access, Mutable Access, and Aliasing",
  "graphicAlt": "Ordinary borrowing allows shared reads or exclusive mutable access, shown as separate alternatives.",
  "narration": "Rust's borrowing rules are often summarized as many shared references or one mutable reference. The rule is not arbitrary. It captures a practical safety expectation: read access can be shared, but mutation needs to be exclusive and clear. This keeps code from observing data through one path while another path changes it unexpectedly.\n\nMany shared references can exist at the same time because shared references provide read-only access. If several functions or scopes are only reading the same value, the value remains stable for all of them. That makes shared borrowing useful for formatting, validation, comparison, logging decisions, and other inspection work.\n\nA mutable reference is different because it represents the right to change the value. Rust requires that mutable access be exclusive during the borrow. The exclusive rule helps prevent ambiguous aliasing, where multiple paths point to the same value and at least one path can mutate it. Without discipline, those patterns are difficult to review and easy to misuse.\n\nThe borrow checker enforces read/write separation. If shared access is still active, Rust will not allow a mutable borrow of the same value. If mutable access is active, Rust will not allow additional aliases that could observe or interfere with the mutation. The goal is not inconvenience; it is clarity around who may do what.\n\nWhen code runs into aliasing errors, the design may need adjustment. Separate read phases from write phases. Reduce how long references are held. Move data out when ownership is actually needed. Use helper functions that borrow only the necessary fields. These refactorings make access patterns visible instead of hidden inside a tangled scope.",
  "narrationPoints": [
    "Rust's borrowing rules are often summarized as many shared.",
    "Many shared references can exist at the same time.",
    "A mutable reference is different.",
    "The borrow checker enforces read/write separation.",
    "When code runs into aliasing errors.",
    "Without discipline, those patterns are difficult to review."
  ]
};
