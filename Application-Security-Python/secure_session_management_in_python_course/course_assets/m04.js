window.COURSE_MODULE = {
  "title": "Server-Side Sessions and Session Stores",
  "graphicAlt": "Protected minimal backend sessions refresh or invalidate according to current identity and lifecycle policy.",
  "narration": "Server-side sessions store authenticated state in backend storage and give the client a session identifier or reference. On each request, the application looks up the session, validates that it is still active, and uses the stored state to identify the subject and related context. This pattern can reduce what the browser carries, but it makes the session store a security-critical system.\n\nA session store might be database backed, cache backed, distributed across instances, or provided by framework infrastructure. The store needs access control, encryption or protection appropriate to the environment, monitoring, backup and recovery expectations, and predictable cleanup. If an attacker, misconfigured service, or overly broad support process can read or modify session records, authenticated state can be affected without touching the login flow.\n\nSession data should be minimized. Store what is needed to represent identity, session creation, expiration, renewal, and selected context. Avoid storing unnecessary secrets, full user profiles, sensitive business records, or data that can become stale and conflict with current authorization. When roles, permissions, MFA state, or account status changes, the session design should define whether session state is refreshed, invalidated, or rechecked.\n\nLifecycle control is essential for server-side sessions. Session identifiers should be protected and regenerated when authentication state changes in important ways. Sessions should be invalidated on logout, account disablement, high-risk recovery events, or other policy triggers where appropriate. Load balancing and session consistency matter in distributed systems because every backend that handles a request must reach the same conclusion about session validity.",
  "narrationPoints": [
    "Server-side sessions store authenticated state in backend.",
    "A session store might be database backed.",
    "Session data should be minimized.",
    "Lifecycle control is essential for server-side sessions.",
    "Avoid storing unnecessary secrets.",
    "When roles, permissions, MFA state, or account status."
  ]
};
