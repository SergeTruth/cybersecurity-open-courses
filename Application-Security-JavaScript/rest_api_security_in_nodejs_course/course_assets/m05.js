window.COURSE_MODULE = {
  "title": "Input Validation, Parsing, and Data Handling",
  "graphicAlt": "Security diagram for REST API Security in NodeJS, Input Validation, Parsing, and Data Handling, showing the protected asset, trust boundary, enforcing component, and verification path with arrows from untrusted input to controlled output.",
  "narration": "Every value arriving at an API boundary is untrusted until validated. JSON bodies, query parameters, path parameters, headers, cookies, and uploaded content can all shape behavior. Validation is not just about preventing crashes. It protects assumptions. A handler should know which fields are expected, which types and formats are allowed, which values are required, which lengths and ranges are acceptable, and which fields should be rejected or ignored.\n\nNodeJS APIs often benefit from schema validation middleware, explicit request models, and allowlisted update fields. These patterns make the contract visible and reduce accidental mass assignment, where a client sends extra fields that the server writes because they happen to match database properties. For update operations, the API should choose which fields may change rather than accepting an arbitrary object. For uploads and request bodies, size limits protect memory, storage, and downstream processors.\n\nSafe data handling continues after validation. Database access should use parameterized queries, safe ORM patterns, or query builders that keep data separate from query structure. Handlers should avoid string-built queries and avoid using untrusted input to select hidden fields, internal filters, or administrative behavior. Validation, parameterization, authorization, and business-rule checks solve different problems. A predictable API uses all of them where they fit.",
  "narrationPoints": [
    "JSON bodies, query parameters, path parameters, headers, cookies, and uploaded content can all shape behavior.",
    "For uploads and request bodies, size limits protect memory, storage, and downstream processors.",
    "Database access should use parameterized queries, safe ORM patterns, or query builders that keep data separate from query structure.",
    "Handlers should avoid string-built queries and avoid using untrusted input to select hidden fields, internal filters, or administrative behavior.",
    "NodeJS APIs often benefit from schema validation middleware, explicit request models, and allowlisted update fields.",
    "Validation, parameterization, authorization, and business-rule checks solve different problems."
  ]
};
