window.COURSE_MODULE = {
  "title": "Session Lifecycle",
  "graphicAlt": "Blank placeholder graphic for module 4, Session Lifecycle.",
  "narration": "Session security depends on the full lifecycle: creation, login, use, renewal, expiration, logout, and invalidation. A session may exist before login for anonymous state such as a shopping cart, then become authenticated after successful sign-in. That transition is security-sensitive. The application should avoid carrying risky assumptions across the boundary and should renew or rotate session state when authentication or privilege level changes.\n\nTimeouts define how long a session remains useful. An idle timeout ends a session after a period of inactivity. An absolute timeout ends a session after a maximum lifetime regardless of activity. Both controls reduce exposure from unattended browsers, forgotten devices, and stale authenticated state. The right values depend on application risk, user workflow, and regulatory expectations. High-risk administrative functions often need shorter lifetimes or step-up verification than low-risk browsing.\n\nLogout and invalidation must be real server-side events, not just removal of a local user interface indicator. When a user logs out, changes a password, loses privileges, enables MFA, disables an account, or reports suspicious activity, existing sessions may need to be ended, renewed, or reviewed. Concurrent sessions require policy decisions too. Some applications allow many active devices; others restrict or display them. Lifecycle management makes session state responsive to security events rather than treating login as a one-time decision.",
  "narrationPoints": [
    "Session security depends on the full lifecycle: creation, login, use, renewal, expiration, logout, and invalidation.",
    "Timeouts define how long a session remains useful.",
    "Logout and invalidation must be real server-side events, not just removal of a local user interface indicator."
  ]
};
