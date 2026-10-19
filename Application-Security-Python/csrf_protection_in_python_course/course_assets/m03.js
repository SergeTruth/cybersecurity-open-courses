window.COURSE_MODULE = {
  "title": "CSRF Tokens and Framework Middleware",
  "graphicAlt": "Framework protection supplies a token that the server validates before a state change, rejecting missing or invalid tokens first.",
  "narration": "The most common CSRF defense is a server-generated token that is tied to the user's session or request context and validated when a state-changing request arrives. The token helps prove that the request came through a page or client flow prepared by the application, not merely from any browser request carrying a cookie.\n\nPython frameworks and extensions often provide middleware, decorators, form helpers, or request validation hooks that implement this pattern. In most applications, the safest starting point is to use the established framework protection rather than inventing a custom token system. Mature framework features usually handle details that are easy to miss, such as token binding, generation, validation, error behavior, and integration with forms.\n\nConsistency is as important as the token itself. Protection should cover every route that changes state and depends on browser session authentication. If a token is required for one settings form but not for a neighboring custom endpoint, the application still has a gap. Teams should review route coverage whenever new forms, admin actions, and session-bound APIs are added.\n\nMissing, invalid, or expired tokens should fail safely. The application should reject the state-changing action before performing it, return a clear but restrained error, and avoid leaking token values or sensitive request contents in logs. A CSRF token failure is a control working as designed; the failure path should be as deliberate as the success path.",
  "narrationPoints": [
    "The most common CSRF defense is a server-generated token.",
    "Python frameworks and extensions often provide middleware.",
    "Consistency is as important as the token itself.",
    "Missing, invalid, or expired tokens should fail safely.",
    "In most applications.",
    "Protection should cover every route that changes state."
  ]
};
