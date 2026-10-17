window.COURSE_MODULE = {
  "title": "Testing, Logging, and Monitoring Authentication",
  "graphicAlt": "Successful and correctly refused authentication tests supply privacy-aware event evidence for monitoring and triage.",
  "narration": "Authentication controls need tests because small changes can affect many users and endpoints. Useful tests include successful login, failed login, password reset, MFA enrollment, MFA reset, session expiration, logout, token validation, invalid token handling, account lockout or throttling behavior, public endpoint access, and service account authentication. Negative tests are especially valuable because they show how the application behaves when identity proof is missing, malformed, expired, or inconsistent.\n\nCode review should ask where authentication is enforced, which routes are intentionally public, how identity claims are validated, how sessions are created and ended, how tokens are stored, and whether service-to-service calls are authenticated. Reviewers should also check that authentication is not confused with authorization. A caller may be authenticated and still not be allowed to perform a sensitive action.\n\nAuthentication logs support detection, troubleshooting, and incident response. Useful events include successful and failed logins, password resets, MFA changes, recovery activity, privileged account sign-ins, suspicious MFA activity, token anomalies at a high level, identity provider errors, and account lockouts. Logs should be privacy-aware and avoid recording passwords, tokens, recovery secrets, or unnecessary personal information.\n\nMonitoring turns logs into operational awareness. Spikes in failed logins, unusual geographic or device patterns, repeated recovery attempts, unexpected service account behavior, and privileged sign-ins outside normal patterns may require triage. Authentication is not a set-and-forget feature. It changes as users, libraries, providers, platforms, and threats change, so testing and monitoring must continue throughout the application lifecycle.",
  "narrationPoints": [
    "Authentication controls need tests.",
    "Code review should ask where authentication is enforced.",
    "Authentication logs support detection.",
    "Monitoring turns logs into operational awareness.",
    "Reviewers should also check that authentication is not.",
    "Logs should be privacy-aware and avoid recording passwords."
  ]
};
