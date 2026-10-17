window.COURSE_MODULE = {
  "title": "Middleware, Route Protection, and Server-Side Enforcement",
  "graphicAlt": "Server middleware establishes verified identity before authorization can permit business logic; failed authentication stops.",
  "narration": "Authentication should be enforced by server-side middleware or guards that fail closed. A conceptual Express-style flow is straightforward: the request arrives, authentication middleware validates a session or credential, a verified identity context is attached to the request, authorization checks evaluate the requested action, and the handler performs business logic. The authentication code should be boring, centralized, testable, and difficult to accidentally bypass.\n\nRoute protection should be consistent across APIs, pages, admin features, and background endpoints. Public, authenticated, privileged, and service-only routes should be clearly separated. Middleware should attach identity context only after validation succeeds. Avoid relying on client-side checks, hidden UI elements, route naming conventions, unverified request fields, or assumptions that a frontend is the only caller. Server-side enforcement is the trusted boundary.\n\nAuthentication must be followed by authorization. A valid identity is not automatically allowed to perform every action. Tests and code review should look for missing middleware, inconsistent guards, routes mounted outside protected routers, handlers that trust decoded but unvalidated tokens, and routes that use client-provided identity fields. The point is not clever authentication code; the point is predictable request handling that makes bypasses hard to introduce accidentally.",
  "narrationPoints": [
    "Authentication should be enforced by server-side middleware.",
    "Route protection should be consistent across APIs.",
    "Authentication must be followed by authorization.",
    "The authentication code should be boring.",
    "Public, authenticated, privileged, and service-only routes.",
    "Middleware should attach identity context only."
  ]
};
