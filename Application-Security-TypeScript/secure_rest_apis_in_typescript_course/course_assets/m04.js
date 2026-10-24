window.COURSE_MODULE = {
  "title": "Authentication and Session Boundaries",
  "graphicAlt": "Server token verification establishes trusted caller context for a separate authorization decision and protected lifecycle.",
  "narration": "Authentication answers the question, who is calling this API? The caller might be a human user through a browser, a mobile app, a service account, a scheduled job, or another internal system. A secure API needs a clear model for those identities so routes do not confuse user actions with machine actions or administrative tasks with ordinary requests.\n\nSessions and tokens need care throughout their lifecycle. APIs should verify tokens on the server side, check expected issuer and audience values where applicable, respect expiration, and handle revocation or rotation according to the system design. Bearer tokens should be treated as sensitive data because possession of the token can represent access within its scope and lifetime.\n\nAuthentication data should not leak through logs, error messages, traces, or API responses. A failed login or invalid token response can be useful without revealing credential details or internal verification rules. Structured logs can record safe event information, such as a correlation identifier and high-level reason, without storing raw secrets.\n\nAuthentication is not authorization. Knowing who called does not automatically answer what they may do. The API should establish an authenticated identity, attach trusted context to the request, and then pass that context to authorization policy. This separation keeps identity proof and permission decisions understandable and reviewable.\n\nSession boundaries should also be visible in operations. Teams should know which routes accept user sessions, which accept service credentials, and which are reserved for internal jobs. That inventory helps with monitoring, incident response, and safer key rotation when credentials change.",
  "narrationPoints": [
    "Authentication answers the question, who is calling this API?",
    "Sessions and tokens need care throughout their lifecycle.",
    "Authentication data should not leak through logs, error messages, traces, or API responses.",
    "Authentication is not authorization.",
    "Session boundaries should also be visible in operations."
  ]
};
