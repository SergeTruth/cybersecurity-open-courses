window.COURSE_MODULE = {
  "title": "What MFA Integration Means in Python",
  "graphicAlt": "MFA strengthens authentication; session upgrade, authorization, recovery and safe observability remain distinct controls.",
  "narration": "Multi-factor authentication means requiring more than one type of proof before granting access or completing a sensitive action. In a Python application, that proof may come from something the user knows, something the user has, or something unlocked locally on a trusted device. The exact method may change over time, but the purpose is stable: increase confidence that the person or entity using the account is legitimate.\n\nMFA is related to authentication, authorization, session management, and account recovery, but it does not replace them. Authentication verifies identity. MFA strengthens that verification. Authorization decides what the verified identity may do. Session management carries authenticated state after verification. Recovery gives users a way back into accounts when normal factors are unavailable. A weak recovery or session design can undermine even strong MFA.\n\nPython applications appear in many forms: Flask and Django sites, FastAPI services, internal tools, admin portals, APIs, and service platforms. In any of these contexts, MFA integration is more than adding a second screen after password login. The application must know when MFA is required, what state exists before MFA succeeds, how success upgrades the session, and how MFA events are logged and monitored.\n\nMFA improves assurance, but it does not make every request safe. A user who completes MFA still needs authorization checks before accessing records, changing settings, approving workflows, or using administrative features. MFA should connect to identity, sessions, risk, recovery, logging, monitoring, and user experience. The goal is stronger identity assurance without creating brittle custom flows or frustrating users unnecessarily.",
  "narrationPoints": [
    "Multi-factor authentication means requiring more than one.",
    "MFA is related to authentication.",
    "Python applications appear in many forms: Flask and Django.",
    "MFA improves assurance.",
    "MFA should connect to identity.",
    "The application must know."
  ]
};
