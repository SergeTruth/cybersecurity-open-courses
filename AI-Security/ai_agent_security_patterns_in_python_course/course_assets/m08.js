window.COURSE_MODULE = {
  "title": "Testing, Logging, Monitoring, and Incident Response",
  "graphicAlt": "Illustration for a lesson on testing, logging, monitoring, and incident response for agents.",
  "narration": "Agent security needs ongoing testing because prompts, models, tools, retrieval sources, and workflows change. Threat modeling and abuse-case review help identify which actions are sensitive, which data sources are untrusted, where authorization is enforced, and which failure modes matter most. Tool permission review should be part of any change that adds a capability, expands credentials, changes retrieval scope, or modifies approval behavior.\n\nRegression tests should cover prompts, retrieval, memory, and tool workflows. Useful tests can check authorization before retrieval, argument validation before tool execution, denied actions, approval gates, memory isolation, stale content handling, and safe output formatting. Evaluation datasets can be used defensively to track whether the agent remains aligned with expected behavior across model or prompt changes, without relying on manual spot checks alone.\n\nLogging should make agent behavior understandable without exposing unnecessary sensitive data. Logs may include prompts, retrieval events, tool calls, approvals, denials, outputs, and validation results. Redaction, data minimization, retention limits, and access controls are essential because these records can contain personal data, secrets, source code, customer information, or sensitive business context. Audit trails should clearly show who requested an action, what the model proposed, what policy allowed or denied, and what the system executed.\n\nMonitoring and incident response turn controls into operations. Watch for unusual tool use, repeated denials, sensitive-data access, retrieval anomalies, cost spikes, unexpected destinations, memory changes, provider failures, and repeated unsafe requests. Incident response should cover prompt injection, data leakage, unsafe actions, memory contamination, tool misuse, and provider outages. After an incident, update prompts, policies, tests, logs, tool scopes, and runbooks so the agent gets safer over time.",
  "narrationPoints": [
    "Agent security needs ongoing testing.",
    "Regression tests should cover prompts.",
    "Logging should make agent behavior understandable.",
    "Monitoring and incident response turn controls.",
    "Tool permission review should be part of any change.",
    "Incident response should cover prompt injection."
  ]
};
