window.COURSE_MODULE = {
  "title": "Ownership, Borrowing, and Lifetimes",
  "graphicAlt": "Ownership identifies responsibility, borrowing separates shared reads from exclusive writes, and lifetimes constrain references to valid data.",
  "narration": "Rust's ownership model assigns responsibility for values. Each value has an owner, and when that owner goes out of scope, cleanup happens in a predictable way. That simple idea gives design clarity. Instead of asking whether many parts of the program might still be using a value, Rust encourages the code to show who owns it and when responsibility moves.\n\nBorrowing allows code to use a value without taking ownership. Shared references allow read access, while mutable references allow change under stricter rules. The separation between shared and mutable access is one of Rust's most important safety tools because it prevents many designs where code mutates data while other code assumes the data is stable.\n\nLifetimes describe relationships between references and the data they borrow. In everyday application code, developers do not always write lifetimes explicitly, but the concept is always present. The compiler checks that references do not outlive the values they point to. That feedback helps expose design questions early: who owns this data, how long should it live, and which component is responsible for cleanup?\n\nSecure Rust design treats compiler feedback as guidance rather than as an obstacle. Unnecessary cloning, global state, broad shared ownership, or unsafe workarounds can hide a design problem instead of solving it. Sometimes cloning is appropriate, and sometimes shared ownership is the right tool. The important habit is to choose those patterns deliberately and keep ownership understandable to future reviewers.",
  "narrationPoints": [
    "Rust's ownership model assigns responsibility for values.",
    "Borrowing allows code to use a value without taking.",
    "Lifetimes describe relationships between references.",
    "Secure Rust design treats compiler feedback as guidance.",
    "Each value has an owner,.",
    "That feedback helps expose design questions early: who owns."
  ]
};
