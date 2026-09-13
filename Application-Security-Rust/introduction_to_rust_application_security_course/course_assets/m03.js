window.COURSE_MODULE = {
  "title": "Input Validation and Data Handling",
  "graphicAlt": "External sources pass through parsing and validation before becoming domain types used by application operations.",
  "narration": "Rust makes it easier to represent valid states, but the application still has to decide what valid means. Input can arrive through HTTP requests, files, command-line arguments, environment variables, queues, serialized messages, databases, user interfaces, or other services. Until the application validates that input, it should be treated as untrusted.\n\nGood Rust design uses explicit types, parsing boundaries, validation functions, and clear rejection behavior. A string from outside the process should not quietly become a trusted path, resource identifier, authorization decision, query parameter, or downstream request. When possible, convert raw input into domain-specific types after validation, so later code receives values that already carry clearer meaning.\n\nSerialization and deserialization deserve special attention because they often sit at trust boundaries. Data that crosses services, persists over time, or comes from a queue may not match the assumptions of the current code. Versioning, missing fields, unexpected values, and overly permissive deserialization can all create security and reliability problems even in memory-safe code.\n\nA secure Rust application avoids scattering hidden assumptions across the codebase. It validates paths before file access, resource IDs before selection, request fields before authorization or business logic, and outbound values before downstream calls. Rejection should be clear, safe, and consistent. Invalid data should not produce vague behavior, excessive error detail, or accidental fallback to a risky default.",
  "narrationPoints": [
    "Rust makes it easier to represent valid states.",
    "Good Rust design uses explicit types.",
    "Serialization and deserialization deserve special attention.",
    "A secure Rust application avoids scattering hidden.",
    "Until the application validates that input.",
    "A string from outside the process should not quietly become."
  ]
};
