window.COURSE_MODULE = {
  "title": "Authentication Architecture and Trust Boundaries",
  "graphicAlt": "A backend authentication gate validates identity across a boundary before supplying context to protected handlers, while public routes stay explicit.",
  "narration": "Authentication architecture includes login flows, registration flows, password reset flows, identity provider integration, callback endpoints, redirects, cookies, headers, API boundaries, frontend and backend boundaries, and authentication middleware. These pieces should work together as one clear system. If every route, worker, or service invents its own identity checks, reviewers cannot easily tell which requests are authenticated, which claims are trusted, and which paths are accidental exceptions.\n\nTrust boundaries are central to authentication. A browser request crossing into a Python backend is not automatically trustworthy. A header set by a client should not be treated like a header set by a trusted proxy. A claim from a validated identity token is different from a form field named role. A callback from an identity provider is different from an arbitrary redirect request. Good architecture labels these boundaries and validates identity information at the point where trust changes.\n\nAuthentication decisions should be centralized where practical, explicit in code, and hard to bypass accidentally. Middleware, framework-supported decorators, dependency injection, route guards, and shared identity services can all help when used consistently. The exact mechanism varies by framework, but the goal is the same: sensitive handlers should not need to guess whether identity was established correctly somewhere else.\n\nArchitecture should also account for failure and edge cases. What happens when the identity provider is unavailable? What happens when a callback is malformed? Which endpoints are intentionally public? How are service-to-service calls authenticated? Where is authentication state stored? Clear answers make the system testable. They also prevent developers from adding one-off checks that work in the happy path but fail under pressure.",
  "narrationPoints": [
    "Authentication architecture includes login flows.",
    "Trust boundaries are central to authentication.",
    "Authentication decisions should be centralized.",
    "Architecture should also account for failure and edge cases.",
    "These pieces should work together as one clear system.",
    "A header set by a client should not be treated like."
  ]
};
