window.COURSE_MODULE = {
  "title": "Testing, Logging, and Review",
  "graphicAlt": "Allowed and denied test evidence, privacy-aware event records and privilege reviews feed deliberate policy improvements.",
  "narration": "Authorization must be tested because the rules change as the application evolves. Useful tests include unit tests for policy functions, integration tests for routes and APIs, negative tests for denied actions, role matrix tests, tenant boundary tests, object-level access tests, service-to-service authorization tests, and regression tests after policy changes. Happy-path tests are not enough. The important question is often whether the wrong subject is denied.\n\nCode review should ask direct questions. Where is authorization enforced? Is the check server-side? Does it verify the action and the specific resource? Does it apply to list endpoints, exports, bulk actions, background jobs, and administrative paths? Are tenant boundaries enforced in queries as well as object views? Are hidden buttons being mistaken for security? Are scopes, claims, and roles interpreted from trusted sources?\n\nLogging supports accountability and incident response. Access-denied events, privileged actions, permission changes, role assignments, tenant administration, administrative overrides, unusual service account access, and sensitive exports may all be worth recording. Logs should be privacy-aware and should not expose secrets, tokens, regulated data, or unnecessary sensitive content. Good logs help teams understand whether policy is working and whether suspicious activity needs investigation.\n\nMonitoring and review keep authorization healthy over time. Unusual access patterns, repeated denied requests, sudden permission changes, unexpected cross-tenant attempts, and privileged activity outside normal workflows may require triage. Access reviews help remove stale privilege. Authorization is not finished when the first check is written. It remains an engineering, operational, and governance practice throughout the life of the application.",
  "narrationPoints": [
    "Authorization must be tested.",
    "Code review should ask direct questions.",
    "Logging supports accountability and incident response.",
    "Monitoring and review keep authorization healthy over time.",
    "Does it verify the action and the specific resource?",
    "Logs should be privacy-aware and should not expose secrets."
  ]
};
