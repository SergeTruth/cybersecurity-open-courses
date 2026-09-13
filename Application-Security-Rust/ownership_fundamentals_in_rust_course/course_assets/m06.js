window.COURSE_MODULE = {
  "title": "Ownership in Functions, Structs, and Enums",
  "graphicAlt": "Functions, structs, and state variants express ownership, with constructors assembling validated data before use.",
  "narration": "Ownership becomes visible when designing functions. A function that takes a value by ownership is saying it needs responsibility for that value. It may store the value, transform it into another owned value, send it to another component, or consume it as part of an operation. The caller should not expect to keep using the original owner afterward.\n\nA function that takes a reference is making a different promise. It only needs temporary access. A shared reference says read-only access is enough. A mutable reference says the function needs to change existing state but does not need to own it permanently. These signatures are contracts that help callers and reviewers understand the function's role.\n\nStructs also express ownership. A struct can own its fields, which is common when the value should be self-contained and easy to move. A struct can borrow fields with lifetimes, which can be efficient but requires careful relationship management. A struct can also hold smart pointers or shared ownership handles when the design truly needs them.\n\nEnums can carry owned data through state transitions. A state enum might own a pending request, a validated configuration, or a completed result. This can make impossible states harder to represent because each variant carries the data appropriate for that state. Ownership becomes part of the domain model rather than a separate housekeeping concern.\n\nConstructors and builder patterns can make ownership safer by validating input and assembling owned state before the rest of the program uses it. Instead of spreading partial assumptions across the codebase, a type can own its validated fields and expose clear methods. Good Rust APIs use ownership choices as part of the contract.",
  "narrationPoints": [
    "Ownership becomes visible when designing functions.",
    "A function that takes a reference is making a different.",
    "Structs also express ownership.",
    "Enums can carry owned data through state transitions.",
    "Constructors and builder patterns can make ownership safer.",
    "The caller should not expect to keep using the original."
  ]
};
