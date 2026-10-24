window.COURSE_MODULE = {
  "title": "TypeScript as a Security Tool",
  "graphicAlt": "Unknown runtime data passes schema validation into narrow types supported by strict compiler settings and reviewed assertions.",
  "narration": "TypeScript helps API security by making developer intent visible. Types can show the shape of request objects after validation, the fields a service expects, the return type of a policy check, and the difference between a public response model and an internal database record. That clarity reduces accidental misuse.\n\nTypeScript does not, by itself, validate data arriving over HTTP. A request body, query value, path parameter, or header is runtime data from outside the program. The compiler cannot prove that a JSON payload from a client matches an interface unless the application checks it at runtime. This is why TypeScript types and validation schemas should work together.\n\nStrict compiler settings matter. Options such as strict null checks and no implicit any help reveal uncertainty early. The type unknown is often safer than any because it forces code to narrow a value before using it. Discriminated unions can make expected states explicit, and schema-derived types can reduce drift between runtime validation and compile-time assumptions.\n\nTeams should be careful with type assertions that silence uncertainty. An assertion can be useful at a trusted boundary, but frequent assertions around request data are a warning sign. Secure TypeScript API design uses types to document safe states, validation to create those states, and review to prevent broad types from hiding important risk.\n\nGood type design also improves collaboration. When route handlers, service functions, and response mappers use narrow types, reviewers can see what has already been checked and what still needs protection. This makes security expectations easier to pass from one engineer to another.",
  "narrationPoints": [
    "TypeScript helps API security by making developer intent visible.",
    "TypeScript does not, by itself, validate data arriving over HTTP.",
    "Strict compiler settings matter.",
    "Teams should be careful with type assertions that silence uncertainty.",
    "Good type design also improves collaboration."
  ]
};
