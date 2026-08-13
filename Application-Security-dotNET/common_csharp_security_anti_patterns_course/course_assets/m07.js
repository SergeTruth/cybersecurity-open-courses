window.COURSE_MODULE = {
  "title": "Token, Cookie, and Credential Handling Mistakes",
  "graphicAlt": "Bullet summary graphic for Token, Cookie, and Credential Handling Mistakes.",
  "narration": "Tokens, cookies, API keys, and credentials are not ordinary strings. In many systems, possession of a bearer value can grant access until it expires or is revoked. That means storage, transport, logging, display, and support handling all matter.\n\nAvoid placing tokens or credentials in URLs, query strings, browser storage, logs, screenshots, analytics, crash reports, copied links, or frontend configuration. These locations are often retained, synchronized, shared, or sent to systems that were not intended to hold credentials.\n\nCookies need deliberate review of Secure, HttpOnly, SameSite, domain, path, lifetime, sliding expiration, and CSRF behavior. These settings should match the application architecture and user workflows. A cookie that is convenient for a demo may be too broadly scoped for production.\n\nA valid token or API key does not authorize every operation. The server still needs to check identity, scope, tenant, resource ownership, subscription, role, policy, and workflow state as appropriate. Authentication material proves something about the caller; authorization decides what the caller may do.\n\nCredential lifecycle should be designed before there is an emergency. Token lifetimes, refresh behavior, logout, revocation, rotation, key rollover, monitoring, and response procedures all affect how quickly exposed or stale credentials can be contained.\n\nAvoid confusing CORS, authentication, authorization, and CSRF protection. They solve different problems. A system can have a restrictive CORS policy and still have weak authorization. It can have strong authentication and still need CSRF protection for browser-based state-changing actions.",
  "narrationPoints": [
    "Storage, transport, logging, display, and support handling all matter.",
    "Avoid placing tokens or credentials in URLs, query strings, browser storage, logs, screenshots, analytics, crash reports, copied links, or frontend configuration.",
    "A cookie that is convenient for a demo may be too broadly scoped for production.",
    "A valid token or API key does not authorize every operation.",
    "Avoid confusing CORS, authentication, authorization, and CSRF protection."
  ]
};
