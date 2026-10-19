window.COURSE_MODULE = {
  "title": "Testing, Logging, and Monitoring Sessions",
  "graphicAlt": "Positive and negative session tests pair with safe telemetry and practiced revocation.",
  "narration": "Session controls need tests because they are easy to break during ordinary application changes. Useful tests include login and logout tests, session lifecycle tests, idle and absolute expiration tests, renewal tests, revocation tests, role-change tests, account-disable tests, password-change effects, MFA-reset effects, token validation tests, and CSRF-related tests at a high level. Negative tests should confirm that missing, expired, malformed, or revoked session state is denied.\n\nCode review should ask where authenticated state is created, where it is stored, how it is protected, how long it lasts, how it is renewed, and how it is invalidated. Reviewers should check whether session state is minimized, whether cookie settings match the application model, whether token validation is centralized, and whether authorization is rechecked before sensitive actions. The review should include APIs, background jobs, admin tools, and internal portals, not only the main login page.\n\nSession logging should support investigation without exposing secrets. Useful events include login, logout, session renewal, failed validation, revocation, account disablement effects, privileged session creation, unusual session activity, token validation failures, and changes to security settings. Logs should avoid passwords, cookies, bearer tokens, refresh tokens, recovery secrets, and unnecessary personal or regulated data. Correlation identifiers can help connect session events across services without dumping sensitive values.\n\nMonitoring turns session events into operational awareness. Unusual session activity, repeated failed validations, unexpected refresh patterns, privileged session events, account recovery followed by sensitive actions, or activity after disablement may deserve attention. Incident response readiness depends on knowing how to invalidate sessions, trace session activity, preserve useful evidence, and communicate impact. Session management should be tested and monitored as the application evolves, not only during initial implementation.",
  "narrationPoints": [
    "Session controls need tests.",
    "Code review should ask.",
    "Session logging should support investigation.",
    "Monitoring turns session events into operational awareness.",
    "Negative tests should confirm that missing.",
    "The review should include APIs."
  ]
};
