window.COURSE_MODULE = {
  "title": "Identity, Trust Boundaries, and Authentication Flows",
  "graphicAlt": "Provider identity crosses a boundary into local account mapping, state checks, session handling and authorization.",
  "narration": "Authentication design starts by identifying who or what can call the application. Human users, administrators, service accounts, machine clients, mobile apps, browser sessions, third-party integrations, webhook providers, and background workers are not interchangeable. Each identity type has a different trust boundary, credential type, lifecycle, and audit expectation. A customer login, admin dashboard, webhook receiver, and internal worker calling an API should not all be treated as the same flow.\n\nMap the trust boundaries between browsers, mobile apps, APIs, reverse proxies, identity providers, databases, caches, and external services. Decide which component authenticates the requester and which component consumes that result. For example, an identity provider may validate a user login, but the Node.js application still maps that external identity to a local account, checks account state, creates or validates a session, and enforces local authorization policy.\n\nAvoid spreading authentication decisions inconsistently across routes, controllers, middleware, and helper functions. The application should document the identity source, token issuer, session storage, credential type, account state checks, and failure behavior for each major flow. A simple boundary map helps reviewers ask useful questions before implementation: where is identity established, where is it trusted, what happens when it expires, and how does the rest of the request pipeline know validation succeeded?",
  "narrationPoints": [
    "Authentication design starts by identifying who or what can.",
    "Map the trust boundaries between browsers.",
    "Avoid spreading authentication decisions inconsistently.",
    "A customer login.",
    "For example, an identity provider may validate a user login.",
    "The application should document the identity source."
  ]
};
