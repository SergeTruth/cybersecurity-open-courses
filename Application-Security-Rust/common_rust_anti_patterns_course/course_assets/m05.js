window.COURSE_MODULE = {
  "title": "Weak Type Design and Primitive Obsession",
  "graphicAlt": "Raw inputs become validated domain types so distinct concepts cannot be casually mixed.",
  "narration": "Primitive obsession appears when meaningful domain concepts remain represented as raw strings, integers, booleans, tuples, or loosely structured maps long after parsing is complete. A `String` might mean a username, tenant identifier, path fragment, role, status, token label, or display name. A `u32` might mean a count, port, timeout, user ID, protocol field, or size limit.\n\nWhen too many concepts share the same primitive shape, accidental mixing becomes easier. The compiler can tell that two values are both strings, but it cannot know that one is a tenant ID and the other is a path component unless the code models those concepts. Validation also tends to become scattered, repeated, or forgotten.\n\nWeak type design leaves invalid states expressible. A boolean pair might allow impossible combinations. A stringly typed status might accept misspellings. A raw integer limit might be negative in one layer, too large in another, or measured in the wrong unit. These problems are not Rust-specific, but Rust gives teams excellent tools to reduce them.\n\nNewtypes make domain meaning visible while keeping representation simple. Enums model states, roles, modes, and finite choices. Validated constructors can ensure that a value meets range, format, unit, and policy requirements before it enters the core of the program. `Option` and `Result` can show absence and validation failure explicitly.\n\nA strong review question is whether a primitive still belongs at that layer. Raw input is normal at the boundary. Deeper in the system, important values should carry meaning. Good type design reduces scattered checks, makes invalid states harder to create, and gives security reviewers a clearer map of what the program believes to be true.",
  "narrationPoints": [
    "Primitive obsession appears.",
    "When too many concepts share the same primitive shape.",
    "Weak type design leaves invalid states expressible.",
    "Newtypes make domain meaning visible.",
    "A strong review question is whether a primitive still.",
    "A `u32` might mean a count."
  ]
};
