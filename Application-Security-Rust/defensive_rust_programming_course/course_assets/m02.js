window.COURSE_MODULE = {
  "title": "Type-Driven Design and Valid States",
  "graphicAlt": "Distinct domain types prevent accidental interchange, and explicit states make workflow intent visible.",
  "narration": "Defensive Rust starts with representing the problem clearly. Types are not just containers for data; they are a way to express what the program believes is valid. A raw string or integer can carry almost any meaning. A domain type can carry a much narrower meaning, and that narrower meaning makes misuse easier to notice during review.\n\nNewtypes are useful when values share a primitive representation but should not be interchangeable. User IDs, tenant IDs, file names, tokens, paths, and request identifiers may all appear as strings in external input, but they usually have different validation rules and different security meaning. Giving them separate types helps the compiler and the reviewer see mistakes sooner.\n\nEnums can model states, modes, and intent without scattering flags across the codebase. A job can be pending, running, completed, or failed. A request can be unauthenticated, authenticated, or authorized for a specific action. Encoding meaningful states directly prevents impossible combinations from being represented casually.\n\nOption and Result are also defensive design tools. Option makes absence explicit, so callers cannot pretend a value always exists. Result makes failure explicit, so code has to decide how to handle it. Constructors and parsers can validate data at the boundary and return domain types that downstream code can trust.\n\nThis approach reduces repeated checks and makes review easier. Instead of asking whether every call site remembered the same validation rule, reviewers can look at where a type is constructed and what it guarantees. Clear data models turn defensive programming from scattered caution into enforceable structure.",
  "narrationPoints": [
    "Defensive Rust starts with representing the problem clearly.",
    "Newtypes are useful.",
    "Enums can model states.",
    "Option and Result are also defensive design tools.",
    "This approach reduces repeated checks and makes review.",
    "A domain type can carry a much narrower meaning."
  ]
};
