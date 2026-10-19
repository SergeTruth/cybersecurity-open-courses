window.COURSE_MODULE = {
  "title": "MFA Architecture and Trust Boundaries",
  "graphicAlt": "Backend verification and explicit policy keep partial-login state separate from protected authenticated access.",
  "narration": "An MFA architecture connects several components: the user browser or client, the Python backend, an identity provider, an MFA service, authenticator apps, hardware-backed authenticators, passkeys or platform authenticators, session stores, token stores, recovery workflows, and administrative support workflows. Each component contributes to the identity decision, but each component also introduces a trust boundary that must be understood.\n\nTrust boundaries exist between user input and server-side verification, between identity claims and application sessions, between MFA verification results and protected actions, and between support workflows and account state. A client saying that MFA succeeded is not the same as the backend verifying a trusted result. A claim from an identity provider needs validation before the application relies on it. A recovery action needs evidence and auditability.\n\nMFA decisions should be explicit and centralized where practical. If some routes require MFA through middleware, others check a flag manually, and admin paths use a separate convention, developers will struggle to know which actions are protected. A better pattern is to define clear policy points for enrollment, verification, session upgrade, step-up authentication, and recovery. The exact Python framework can vary; the architecture should remain understandable.\n\nA good architecture also separates partial login from full authentication. After a user enters a password but before MFA succeeds, the application may need temporary state to continue the challenge. That state should not grant ordinary access. It should be narrow, short-lived, tied to the correct user and session, and protected from reuse. Clear state transitions make MFA harder to bypass accidentally and easier to test.",
  "narrationPoints": [
    "An MFA architecture connects several components: the user.",
    "Trust boundaries exist between user input and server-side.",
    "MFA decisions should be explicit and centralized.",
    "A good architecture also separates partial login from full.",
    "Each component contributes to the identity decision.",
    "The exact Python framework can vary; the architecture."
  ]
};
