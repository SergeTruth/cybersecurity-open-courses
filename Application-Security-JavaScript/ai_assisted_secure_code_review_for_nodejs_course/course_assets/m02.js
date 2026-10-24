window.COURSE_MODULE = {
  "title": "Review Scope, Context, and Threat Modeling",
  "graphicAlt": "Caller, route, data and deployment context frame focused questions about a changed service.",
  "narration": "AI performs better when the reviewer provides useful boundaries. A broad prompt like, is this secure, usually produces broad reassurance or generic advice. A stronger review prompt defines the changed files, affected routes, data stores, dependencies, secrets, roles, permissions, and deployment context. The assistant needs to know what changed and why the change matters, but the reviewer also needs to decide what should not be shared, especially when code or logs contain sensitive data.\n\nContext matters because a function that looks safe in isolation may become risky when connected to a route, tenant boundary, identity provider, database query, queue consumer, or production secret. For Node.js applications, review context should include framework conventions, route registration, middleware order, authentication flow, authorization model, validation approach, error-handling pattern, and runtime configuration. The reviewer can ask the AI to trace how request.user is created, whether a route bypasses a guard, or whether a response returns internal fields.\n\nThreat modeling does not need to be heavy to be useful. For each meaningful change, ask who can call this code, what data it handles, what authority it exercises, what dependency or configuration changed, and what could go wrong. Those questions turn AI assistance from a vague security opinion into a focused review process. The assistant can help enumerate paths and assumptions, but the reviewer remains responsible for deciding which threats are realistic in the actual system.",
  "narrationPoints": [
    "AI performs better.",
    "Context matters because a function that looks safe.",
    "Threat modeling does not need to be heavy to be useful.",
    "A stronger review prompt defines the changed files.",
    "Those questions turn AI assistance from a vague security.",
    "The assistant needs to know what changed and why the change."
  ]
};
