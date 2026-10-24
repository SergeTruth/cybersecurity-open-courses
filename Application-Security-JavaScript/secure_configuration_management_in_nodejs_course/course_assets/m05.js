window.COURSE_MODULE = {
  "title": "Secure Defaults and Security-Critical Settings",
  "graphicAlt": "Production policy deliberately configures cookies, transport, authentication, browser behavior and request limits while excluding development shortcuts.",
  "narration": "Many core protections are configuration-driven. Authentication settings, session secrets, cookie attributes, JWT issuers and audiences, CORS origins, CSRF behavior, TLS and proxy settings, rate limits, request size limits, upload limits, logging levels, error verbosity, and admin feature toggles all influence security behavior. Defaults should be safe for production or require explicit production configuration. A missing setting should not quietly turn into a development convenience.\n\nExpress-style applications make the tradeoffs visible. A wildcard CORS value may be convenient locally, but risky in production. A cookie without Secure may work during HTTP development, but it is wrong behind production HTTPS. A debug route may help an engineer diagnose locally, but expose internals if deployed. Verbose errors, mock authentication, test accounts, relaxed cookie settings, broad proxy trust, and disabled request limits should be controlled, reviewed, and visible.\n\nConfiguration should distinguish public configuration, sensitive configuration, and secrets. A public frontend API base URL is different from a signing key. A feature flag name is different from a database password. Settings that weaken protection should require explicit justification and operational visibility. Secure defaults reduce the chance that one forgotten value turns production into a development-shaped system.",
  "narrationPoints": [
    "Authentication settings, session secrets, cookie attributes, JWT issuers and audiences, CORS origins, CSRF behavior, TLS and proxy settings, rate limits, request size limits, upload limits, logging levels, error verbosity, and admin feature toggles all influence security behavior.",
    "Verbose errors, mock authentication, test accounts, relaxed cookie settings, broad proxy trust, and disabled request limits should be controlled, reviewed, and visible.",
    "Settings that weaken protection should require explicit justification and operational visibility.",
    "Configuration should distinguish public configuration, sensitive configuration, and secrets.",
    "Defaults should be safe for production or require explicit production configuration.",
    "Secure defaults reduce the chance that one forgotten value turns production into a development-shaped system."
  ]
};
