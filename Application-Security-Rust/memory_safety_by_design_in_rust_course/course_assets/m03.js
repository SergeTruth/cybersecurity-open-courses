window.COURSE_MODULE = {
  "title": "Designing Types That Represent Valid States",
  "graphicAlt": "Validated constructors create distinct domain types, and explicit state variants replace ambiguous flags.",
  "narration": "Memory safety is stronger when the program's types represent reality accurately. Rust lets developers move checks closer to the point where data is created, parsed, or accepted from a boundary. Instead of letting raw strings, integers, or loosely related flags spread through the codebase, teams can create types that carry domain meaning.\n\nNewtypes are useful when two values share the same primitive representation but should not be interchangeable. A user identifier, tenant identifier, path label, and request identifier may all look like strings, but they may follow different validation rules and carry different security meaning. Giving them separate types reduces accidental mixups and makes interfaces clearer.\n\nEnums can model states and transitions without relying on scattered boolean flags. A connection, job, or parser may have a small set of meaningful states. Encoding those states directly makes impossible combinations harder to represent. Option represents absence explicitly, and Result represents failure explicitly, so downstream code must acknowledge those cases instead of relying on hidden assumptions.\n\nConstructors and parsers can validate data once and return a type that later code can trust. This reduces repeated checks, lowers ambiguity, and makes invalid states harder to express. Type-driven design does not replace validation, but it gives validation a home. The result is downstream code that is simpler, safer, and easier to review.\n\nThis pattern also improves maintenance. When a requirement changes, reviewers can look for the type or constructor that owns the rule instead of searching for scattered conditionals. Memory safety and correctness both benefit when the codebase has obvious places where assumptions are created, enforced, and documented.",
  "narrationPoints": [
    "Memory safety is stronger.",
    "Newtypes are useful.",
    "Enums can model states and transitions without relying on.",
    "Constructors and parsers can validate data once and return.",
    "This pattern also improves maintenance.",
    "Option represents absence explicitly."
  ]
};
