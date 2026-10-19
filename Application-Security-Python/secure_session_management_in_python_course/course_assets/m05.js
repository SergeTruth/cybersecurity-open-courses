window.COURSE_MODULE = {
  "title": "Token-Based Sessions and APIs",
  "graphicAlt": "A token must be valid for its intended service and action, with protected refresh and separate authorization.",
  "narration": "APIs and distributed applications often use token-based sessions or token-based authentication. A bearer token at a high level grants access to whoever presents it within its validity and scope. Access tokens may be short lived and used for API calls. Refresh tokens may be used to obtain new access tokens. API keys and service tokens may represent clients, integrations, or workloads rather than human users.\n\nToken validation must be precise. Depending on the design, the application may need to verify validity, issuer, audience, expiration, signature or integrity, token type, intended use, scopes, and claims. A token being present is not enough. A token meant for one service should not automatically be accepted by another. A token with identity information should not be treated as permission for every action.\n\nToken storage decisions depend on client type and risk. A browser application, server-rendered Python app, backend service, CLI tool, mobile client, and background worker have different storage constraints. Long-lived tokens require careful protection, rotation, revocation, and monitoring. Refresh tokens deserve particular care because they can extend access over time. Logs, error messages, telemetry, and support tools should not expose tokens.\n\nAPI authentication and browser session management are related but not interchangeable. Cookies may be well suited to some browser flows. Bearer tokens may be appropriate for API and service calls. Service-to-service sessions may use workload identity or service accounts. In every case, token presence does not replace authorization checks. After the caller is authenticated, the application still needs to verify whether that caller may perform the requested action on the requested resource.",
  "narrationPoints": [
    "APIs and distributed applications often use token-based.",
    "Token validation must be precise.",
    "Token storage decisions depend on client type and risk.",
    "API authentication and browser session management.",
    "A bearer token at a high level grants access to whoever.",
    "A token meant for one service should not automatically."
  ]
};
