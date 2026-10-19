window.COURSE_MODULE = {
  "title": "Testing, Logging, Monitoring, and Incident Response",
  "graphicAlt": "Failure tests, sanitized logs and monitoring support a planned exposure response that rotates credentials, verifies consumers and fixes the leak path.",
  "narration": "Testing should cover secret handling behavior, not only successful database connections. Useful tests include missing secrets, invalid secrets, unsafe defaults, environment separation, redaction behavior, failed startup, and rotation-like refresh behavior where applicable. Secrets scanning can help detect credentials in code, configuration, notebooks, artifacts, and pipeline definitions, but findings still need triage and remediation ownership.\n\nSafe logging is essential. Database connection failures should provide enough sanitized detail for operators to diagnose environment, service, and timing, but logs should not include passwords, tokens, private keys, full sensitive connection strings, or unnecessary credential material. Redaction should be tested because logging libraries, exception handlers, database drivers, and frameworks can expose values in different formats.\n\nMonitoring should watch for unusual credential use. Database audit logs, authentication failures, unexpected source locations, unusual login times, new client identities, failed rotations, and broad query patterns may all matter depending on the system. Alerting on unexpected credential use is easier when credentials are separated by environment and purpose. Shared credentials make monitoring less precise because every system looks like the same caller.\n\nWhen a production database secret is confirmed exposed, treat it as potentially compromised until assessed. Incident response should identify scope, preserve evidence, revoke or rotate affected credentials, verify consumers on the replacement, review logs for unusual use, communicate with the right stakeholders, and fix the exposure path. The response should be calm and procedural. A good secrets program makes emergency rotation possible before the emergency happens.",
  "narrationPoints": [
    "Testing should cover secret handling behavior.",
    "Safe logging is essential.",
    "Monitoring should watch for unusual credential use.",
    "When a production database secret is confirmed exposed.",
    "Redaction should be tested.",
    "Alerting on unexpected credential use is easier."
  ]
};
