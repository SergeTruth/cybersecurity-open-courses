window.COURSE_MODULE = {
  "title": "What Session Management Means",
  "graphicAlt": "A session carries authenticated state while separate authorization controls each action.",
  "narration": "Session management is the work of maintaining authenticated state after a user, client, service, or workload has been verified. Login is a moment in time. A session is the continuing representation of that authenticated state across requests, pages, API calls, redirects, and sometimes background activity. In Python applications, that state may be carried through cookies, server-side session stores, signed values, bearer tokens, refresh tokens, or framework-specific abstractions.\n\nIt helps to separate login, authentication, authorization, session state, and tokens. Authentication verifies identity. Authorization decides what that identity may do. Session state preserves the fact that authentication already happened and usually carries enough context for later requests. Tokens may represent authentication, delegated access, or service identity depending on the design. Confusing these concepts can create systems where a valid session is treated as permission for too much.\n\nPython session management appears in many contexts: Flask and Django applications, FastAPI services, admin tools, internal portals, automation systems, API clients, and background services. The framework changes, but the design questions remain stable. Where does authenticated state live? Who can read or modify it? How long does it last? How is it renewed? How does it end? What happens when identity, role, device, or risk changes?\n\nWeak session management can undermine strong authentication. A well-protected password flow does not help if sessions never expire, cookies are exposed unnecessarily, logout only changes the user interface, or tokens remain valid after account disablement. Secure session design must consider browsers, APIs, cookies, tokens, storage, expiration, renewal, revocation, authorization, logging, monitoring, and incident response as one connected system.",
  "narrationPoints": [
    "Session management is the work of maintaining authenticated.",
    "separate login, authentication, authorization, session.",
    "Python session management appears in many contexts: Flask.",
    "Weak session management can undermine strong authentication.",
    "Secure session design must consider browsers.",
    "Login is a moment in time."
  ]
};
