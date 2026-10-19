window.COURSE_MODULE = {
  "title": "Expiration, Renewal, Logout, and Revocation",
  "graphicAlt": "Explicit lifetime and renewal rules connect risk events to supported session invalidation.",
  "narration": "Session lifetime is a risk and usability decision. Idle timeout ends a session after a period of inactivity. Absolute timeout ends a session after a maximum age regardless of activity. Renewal can extend a session when the user is active or when a token is refreshed. Remember-me functionality at a high level may intentionally extend convenience, but it should be designed with clear risk controls and user expectations.\n\nSessions must end predictably when risk changes. Logout should address the actual authenticated session or token state as appropriate, not merely hide a username or change a button label. Account disablement, password change, MFA reset, suspicious activity, administrative revocation, and privilege changes may all require invalidating or reducing existing session authority. The application should define these effects before incidents happen.\n\nRevocation is harder in some architectures than others. Server-side sessions can often be invalidated by changing stored state. Stateless tokens may remain valid until expiration unless the system uses revocation lists, short lifetimes, token versioning, or other invalidation strategies. The right answer depends on the risk, scale, and operational model. The important point is to avoid assuming that logout and revocation work unless the architecture supports them.\n\nPrivileged sessions need extra thought. Administrative actions, sensitive exports, credential changes, and security setting changes may justify shorter lifetimes, step-up authentication, stronger monitoring, or separate session state. Renewal should not silently preserve stale authorization forever. When sessions are renewed, the application should decide what identity, role, tenant, MFA, and risk context are still valid for continued access.",
  "narrationPoints": [
    "Session lifetime is a risk and usability decision.",
    "Sessions must end predictably when risk changes.",
    "Revocation is harder in some architectures than others.",
    "Privileged sessions need extra thought.",
    "Remember-me functionality at a high level may intentionally.",
    "Logout should address the actual authenticated session."
  ]
};
