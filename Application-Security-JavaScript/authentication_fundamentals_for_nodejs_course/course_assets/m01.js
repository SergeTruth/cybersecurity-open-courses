window.COURSE_MODULE = {
  "title": "Why Authentication Matters in Node.js",
  "graphicAlt": "Identity verification supplies the identity used by separate authorization, auditing and lifecycle decisions.",
  "narration": "Authentication answers a foundational question for every protected request: who is this requester? A Node.js application may start with a simple login form, then add REST APIs, mobile clients, admin screens, service integrations, background workers, and external identity providers. As the application grows, authentication becomes the starting point for every later security decision. If identity is wrong, authorization, auditing, account state, and incident response all become unreliable.\n\nAuthentication failure can lead to account takeover, unauthorized access, data exposure, fraudulent actions, and confusing incident response. The risk is not limited to the login route. Authentication state flows through sessions, cookies, tokens, API keys, service credentials, password reset, MFA reset, route protection, logs, and operational alerts. A bug in any part of that lifecycle can weaken the trust the rest of the application places in a request.\n\nAuthentication is different from authorization. Authentication establishes identity; authorization decides what that identity may do. A user can be signed in and still be blocked from an admin route, another tenant's data, or a high-risk action. Authentication must be enforced consistently on the server side, not assumed from client behavior, hidden buttons, route names, or user-provided fields. Treat authentication as a lifecycle, not just a password check.",
  "narrationPoints": [
    "Authentication answers a foundational question for every.",
    "Authentication failure can lead to account takeover.",
    "Authentication is different from authorization.",
    "Authentication must be enforced consistently on the server.",
    "Treat authentication as a lifecycle.",
    "As the application grows."
  ]
};
