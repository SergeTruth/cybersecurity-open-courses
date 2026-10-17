window.COURSE_MODULE = {
  "title": "Sessions, Cookies, and Authentication State",
  "graphicAlt": "Sign-in establishes minimal session state used across later requests, with controlled renewal, expiry and invalidation after relevant account changes.",
  "narration": "Login is an event, but a session is ongoing authenticated state. After a user signs in, the application needs a secure way to remember that identity across requests. Python web applications may use server-side sessions, signed cookies at a high level, framework session stores, or identity-provider-backed session patterns. Whatever the mechanism, a valid session can represent a user long after the original password or identity provider step succeeded.\n\nCookie security matters because browser sessions often depend on cookies. Secure cookie attributes can help control how cookies are transmitted and accessed in browser contexts. Session cookies should be protected from unnecessary exposure, scoped carefully, and aligned with the application's deployment model. Session data should be minimized: store what is needed to represent identity and session state, not unnecessary secrets, full profiles, or sensitive business data.\n\nSession expiration, renewal, logout, and invalidation are design decisions. A session that lasts too long increases risk if the session is misused. A session that expires too aggressively may harm usability and encourage workarounds. Role changes, password changes, account recovery, device trust changes, and administrative events may need to affect existing sessions. Logout should be clear about which local and provider-side state is ended.\n\nSession fixation and CSRF concepts at a high level remind developers that authentication state can be misused if lifecycle and request protections are weak. The defensive lesson is to regenerate or protect session identifiers where appropriate, pair state-changing actions with suitable request protections, and test session behavior under real workflows. Session security is the bridge between initial authentication and every authenticated action that follows.",
  "narrationPoints": [
    "Login is an event.",
    "Cookie security matters.",
    "Session expiration, renewal, logout, and invalidation.",
    "Session fixation and CSRF concepts at a high level remind.",
    "Python web applications may use server-side sessions.",
    "Session cookies should be protected from unnecessary."
  ]
};
