window.COURSE_MODULE = {
  "title": "Input Handling and Validation",
  "graphicAlt": "Consistent normalization is followed by shape, meaning and permission checks before a protected action, using one interpretation for validation and use.",
  "narration": "Input handling is one of the most important trust boundaries in a Go application. HTTP parameters, JSON bodies, form values, headers, cookies, CLI arguments, files, environment variables, message queue events, database records, and data from other services can all be missing, malformed, stale, oversized, or inappropriate for the current action.\n\nA safe pattern is to parse before use. Code should define expected formats, allowed values, length limits, numeric bounds, array sizes, content types, and required fields. Parsing should happen close to the boundary, before business logic, database operations, file operations, authorization decisions that depend on request data, or calls to downstream services.\n\nValidation has more than one layer. Shape validation asks whether the data is present and well formed. Meaning validation asks whether the value is allowed for the workflow. Permission validation asks whether the current caller may use that value for this action. A path, account ID, tenant ID, file name, or status value may have a valid format and still be wrong for the current caller.\n\nNormalization needs care. Trimming whitespace, changing case, decoding values, cleaning paths, parsing dates, and translating encodings should be done consistently so validation and later use agree about what the value means. For files and paths, code should be especially clear about base directories, allowed names, and which operations are permitted.\n\nRejection behavior should also be predictable. Callers need safe, understandable errors, while logs should help operators investigate without recording sensitive input unnecessarily. Consistent validation makes failures easier to handle and reduces surprising behavior between endpoints, jobs, and services.",
  "narrationPoints": [
    "Input handling is one of the most important trust boundaries in a Go application.",
    "A safe pattern is to parse before use.",
    "Validation has more than one layer.",
    "Normalization needs care.",
    "Rejection behavior should also be predictable."
  ]
};
