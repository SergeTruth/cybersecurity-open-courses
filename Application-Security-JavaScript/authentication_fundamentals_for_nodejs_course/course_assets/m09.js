window.COURSE_MODULE = {
  "title": "Secrets, Logging, Monitoring, and Deployment Controls",
  "graphicAlt": "Protected secrets support authentication while permitted event metadata reaches monitoring and credential material is excluded.",
  "narration": "Authentication systems depend on secrets: session secrets, token signing keys, OAuth client secrets, database credentials, API keys, encryption keys, and provider configuration. These values should come from secret managers or protected deployment configuration, not hardcoded source, committed .env files, container images, logs, or client-visible bundles. Rotation, revocation, environment separation, and least-privilege CI/CD access are part of authentication security, not optional cleanup tasks.\n\nLogs should capture security-relevant authentication events while avoiding sensitive credential material. Useful events include login success, login failure, MFA changes, password reset requests, token refresh, logout, account lockout, suspicious activity, and high-risk administrative authentication events. Logs should not expose passwords, session IDs, bearer tokens, reset tokens, authorization codes, one-time codes, or unnecessary personal data. Redaction and retention rules should be decided before an incident.\n\nMonitoring should make abuse and failure visible. Teams should watch for unusual login patterns, high failure rates, credential stuffing signals, unexpected administrative sign-ins, repeated recovery requests, token validation errors, and impossible-travel style indicators where appropriate. Production configuration should disable debug behavior and protect error responses from leaking authentication internals. Authentication security is not complete when the login route works; it must remain observable and supportable in production.",
  "narrationPoints": [
    "Authentication systems depend on secrets: session secrets.",
    "Logs should capture security-relevant authentication events.",
    "Monitoring should make abuse and failure visible.",
    "These values should come from secret managers or protected.",
    "Logs should not expose passwords.",
    "Redaction and retention rules should be decided."
  ]
};
