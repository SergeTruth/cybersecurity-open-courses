window.COURSE_MODULE = {
  "title": "Course Summary and Practical Checklist",
  "graphicAlt": "Flow inventory, control review, boundary tests and monitoring repeat throughout the authentication lifecycle, with identity distinct from action permission.",
  "narration": "Authentication establishes identity; authorization controls actions. Safe Node.js authentication starts with clear identity types and trust boundaries before choosing libraries or writing middleware. Store password verifiers safely. Defend login and recovery flows against abuse. Protect browser sessions with secure cookies, HTTPS, lifecycle controls, and CSRF defenses where appropriate. Validate tokens completely before trusting claims. Use OAuth and OpenID Connect through well-maintained libraries and clear provider configuration.\n\nTreat MFA and account recovery as high-risk lifecycle features, not as side screens. Enforce authentication server-side through consistent middleware or guards. Protect authentication secrets and avoid leaking tokens through logs, URLs, repositories, support artifacts, or client-side code. Monitor authentication events and review authentication changes during pull requests, CI/CD, and deployment review. Authentication work spans code, configuration, operations, and incident response.\n\nA practical first week plan is enough to start improving. Inventory authentication flows, including login, logout, password reset, MFA reset, token refresh, service credentials, and admin authentication. Review password hashing settings and libraries. Check cookie attributes and HTTPS assumptions. Validate JWT handling against issuer, audience, signature, expiration, and intended use. Identify unprotected routes. Review OAuth configuration. Protect secrets. Remove token logging. Add monitoring for high-risk events.",
  "narrationPoints": [
    "Authentication establishes identity; authorization controls.",
    "Treat MFA and account recovery as high-risk lifecycle.",
    "A practical first week plan is enough to start improving.",
    "Protect browser sessions with secure cookies.",
    "Validate tokens completely before trusting claims.",
    "Use OAuth and OpenID Connect through well-maintained."
  ]
};
