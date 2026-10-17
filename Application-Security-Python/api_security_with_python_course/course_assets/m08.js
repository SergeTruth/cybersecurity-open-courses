window.COURSE_MODULE = {
  "title": "Abuse Resistance, Testing, Logging, and Monitoring",
  "graphicAlt": "Expected success and expected denial tests feed safe event metadata, monitoring and continued review.",
  "narration": "Abuse resistance helps keep APIs reliable and harder to misuse. Rate limiting and throttling concepts can reduce excessive requests, guessing attempts, scraping pressure, and resource exhaustion. Quotas can protect expensive operations and partner integrations. Enumeration resistance at a high level means designing responses and workflows so attackers cannot easily learn which users, records, tokens, or resources exist from small differences in behavior. These controls complement authorization; they do not replace it.\n\nDependency hygiene matters because Python APIs rely on frameworks, schema libraries, authentication packages, database drivers, parsers, container images, and infrastructure components. Vulnerability scanning, dependency review, and secrets scanning help teams understand what they run and where risk may enter the system. Findings should be triaged based on actual exposure, usage, and compensating controls rather than blindly ignored or blindly applied.\n\nSecurity-focused tests should prove both success and refusal. Unit and integration tests can cover request validation, authentication, authorization, token validation, object access, tenant isolation, API contracts, file limits, webhook validation, and error behavior. Negative tests are especially valuable because they prove that invalid, unauthorized, expired, or out-of-policy requests fail safely. Test coverage should follow risk, especially around sensitive operations.\n\nLogging and monitoring make API security observable. Safe logs should capture useful security events without exposing secrets, tokens, full sensitive payloads, or regulated data unnecessarily. Audit events may include authentication failures, token validation failures, permission denials, administrative actions, exports, webhook processing, rate-limit events, and unusual traffic patterns. Incident response readiness means knowing which signals matter, where evidence lives, and how to investigate without making exposure worse.",
  "narrationPoints": [
    "Abuse resistance helps keep APIs reliable and harder.",
    "Dependency hygiene matters.",
    "Security-focused tests should prove both success.",
    "Logging and monitoring make API security observable.",
    "Quotas can protect expensive operations and partner.",
    "Vulnerability scanning, dependency review, and secrets."
  ]
};
