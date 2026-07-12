window.COURSE_MODULE = {
  "title": "Preventing Common Python Security Issues",
  "graphicAlt": "Blank placeholder graphic for Python validation and common security issues",
  "narration": "Input validation helps reduce common Python security issues, but it must be paired with safe APIs and authorization. Injection risk appears when untrusted data is interpreted as part of a query, command, expression, template, or protocol. Validation can reject unexpected input, but parameterized database calls, safe library functions, and structured APIs are still required.\n\nPath traversal happens when input influences file paths outside intended directories. A safe design normalizes and resolves paths, checks that the result stays inside an approved base directory, and avoids trusting raw filenames. File upload handling should also restrict size, type, storage location, and later access. Validation reduces risk, but storage and serving decisions matter too.\n\nUnsafe deserialization is risky because attacker-controlled data may be processed in dangerous ways by a deserializer. Avoid unsafe formats and loaders for untrusted input, and prefer simple data formats with explicit validation. Command injection risk should be handled by avoiding shell interpretation where possible, using argument arrays or safe APIs, and validating values against narrow expectations.\n\nMass assignment and business logic abuse show that validation is not only about syntax. A request may be valid JSON but still contain fields the user should not control. A workflow step may be well formed but not allowed in the current state. Python applications should pair validation with authorization, field allow lists, explicit update models, and safe state transitions. Validation is one layer in a larger defensive design.",
  "narrationPoints": [
    "Input validation helps reduce common Python security issues, but it must be paired with safe APIs and authorization.",
    "Path traversal happens when input influences file paths outside intended directories.",
    "Unsafe deserialization is risky because attacker-controlled data may be processed in dangerous ways by a deserializer.",
    "Mass assignment and business logic abuse show that validation is not only about syntax.",
    "Do not coerce arbitrary objects into trusted strings, and resolve subprocess executables from trusted application state.",
    "The application owns report-program identity; the update caller owns database commit and rollback."
  ]
};
