window.COURSE_MODULE = {
  "title": "Node.js Security Review Priorities",
  "graphicAlt": "Review follows the request through middleware and handlers and also examines dependencies and runtime settings.",
  "narration": "Node.js security review is not only about individual functions. Many risks appear in the connections between route definitions, middleware, dependencies, configuration, and runtime behavior. A practical AI-assisted review should inspect route registration, middleware order, authentication checks, authorization checks, input validation, output shaping, error handling, logging, and configuration. Ask the assistant to follow the request flow from route registration through middleware into the handler and then into the database or external service.\n\nMiddleware order is security-relevant because the same route can be safe or unsafe depending on what runs before it. A body parser, authentication guard, rate limiter, CORS policy, tenant resolver, or error handler may protect some routes and not others. AI can help compare route groups, identify inconsistent guard usage, and find paths that look similar but behave differently. The reviewer should confirm those findings against the actual framework behavior and test coverage.\n\nNode.js review should also include package.json, package-lock.json, install scripts, dependency additions, environment variables, and runtime flags. A pull request that changes CORS, debug mode, cookie settings, trusted proxy configuration, request size limits, or production error handling can alter the security boundary without touching a vulnerable-looking function. AI can summarize these changes and generate review questions, but scanner results, package metadata, and configuration assumptions should be verified through trusted tooling and source evidence.",
  "narrationPoints": [
    "Middleware order is security-relevant.",
    "js security review is not only about individual functions.",
    "A body parser.",
    "The reviewer should confirm those findings against.",
    "js review should also include package.",
    "A practical AI-assisted review should inspect route."
  ]
};
