window.COURSE_MODULE = {
  "title": "Course Summary: A Secure Minimal API Baseline",
  "graphicAlt": "A secure Minimal API baseline combines organized routes, explicit access control, input validation, shaped responses, and production review.",
  "narration": "A secure Minimal API baseline starts with organization. Keep endpoints grouped by purpose and sensitivity so policy is visible. Use route groups, names, tags, and metadata to make public, tenant, internal, administrative, and operational surfaces easier to inspect.\n\nAuthenticate explicitly and authorize with clear group and endpoint policy. Authentication identifies the caller. Authorization decides what the caller may do. Group-level rules improve consistency, but sensitive endpoints still need individual review, especially when records, tenants, exports, configuration, or administrative workflows are involved.\n\nTreat bound input as untrusted. Parameter binding creates handler parameters from route, query, header, body, form, service, or custom sources, but it does not prove the data is safe. Use DTOs to define input boundaries, avoid broad domain-model binding, validate required fields and business rules, and use filters carefully for reusable checks.\n\nShape responses and errors deliberately. Use response DTOs to avoid exposing internal fields, keep error responses useful but limited, use consistent status codes, and preserve detailed diagnostics in protected logs rather than client-facing responses.\n\nFinally, review cross-cutting controls and production exposure. CORS, CSRF prevention, rate limits, request body limits, security headers, OpenAPI documentation, logging, monitoring, and deployment settings all affect Minimal API security. Minimal code can still support a strong baseline when the team keeps security decisions explicit, consistent, and operationally visible.",
  "narrationPoints": [
    "A secure Minimal API baseline starts with organization.",
    "Authenticate explicitly and authorize with clear group and endpoint policy.",
    "Treat bound input as untrusted.",
    "Shape responses and errors deliberately.",
    "Finally, review cross-cutting controls and production exposure."
  ]
};
