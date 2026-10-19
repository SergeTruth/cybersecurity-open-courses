window.COURSE_MODULE = {
  "title": "Session Security Failure Patterns",
  "graphicAlt": "Shared validation prevents exposed, stale or confused session context from becoming continued authority.",
  "narration": "Session problems often come from design shortcuts rather than one isolated bug. A development setting may become production behavior. A broad cookie scope may be copied between applications. A long session lifetime may be chosen for convenience and never revisited. A support tool may create sessions without the same lifecycle controls as the main login flow. These patterns are easier to prevent when session management is treated as shared security infrastructure.\n\nWeak session identifiers at a high level, exposed session values, unsafe cookie scope, missing invalidation, and overly long lifetime all increase risk. Sensitive data in session objects can also create exposure if session storage, logs, debugging tools, or support workflows are too broadly accessible. Client-side state should not be trusted merely because it is convenient. If the client can influence session meaning, the server must validate and constrain that influence.\n\nAuthorization can drift during a session. A user may sign in with one role, then lose access while the session continues. A tenant membership may be removed. A background job may keep using context from a time when access was allowed. A token may be renewed without rechecking the current permission model. Secure session management connects renewal and continued access to current identity and authorization state where the risk requires it.\n\nCross-tenant session confusion and inconsistent handling across services deserve special care. A session should not accidentally carry tenant context from one organization into another. Internal tools and admin paths should not use weaker session practices than customer-facing applications. Insecure development defaults, debug behavior, permissive cookies, and inconsistent route protections should be caught in code review and configuration review before production.",
  "narrationPoints": [
    "Session problems often come from design shortcuts rather.",
    "Weak session identifiers at a high level.",
    "Authorization can drift during a session.",
    "Cross-tenant session confusion and inconsistent handling.",
    "A broad cookie scope may be copied between applications.",
    "Client-side state should not be trusted merely."
  ]
};
