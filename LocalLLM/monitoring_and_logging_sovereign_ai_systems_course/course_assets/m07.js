window.COURSE_MODULE = {
  "title": "Alerts, Anomalies, and Incident Signals",
  "graphicAlt": "Meaningful signals become tuned, minimally detailed alerts connected to an owner and investigation context.",
  "narration": "Alerts are useful only when they lead to action. A sovereign AI monitoring system should identify conditions that require human attention, such as service-down states, repeated model load failures, rising timeout rates, queue backlogs, storage exhaustion, retrieval connector failures, unusual request volume, runaway jobs, or policy exceptions.\n\nAnomalies can reveal operational drift. A sudden increase in requests, unexpected data source access, rapid storage growth, repeated retries, new error patterns, or a sharp change in hardware pressure may indicate misconfiguration, misuse, an integration loop, or a workflow that has outgrown its original design. Keep the analysis defensive and focused on safe administration.\n\nAlert quality matters. If thresholds are too quiet, teams learn about problems from users or incidents. If thresholds are too noisy, teams learn to ignore the alert channel. Start with high-value signals, route them to the right owner, and tune them with real operating experience.\n\nEvery important alert should have a clear investigation path. The alert should link to relevant dashboards, logs, traces, runbooks, owners, and recent changes. It should explain what condition triggered, what impact may exist, and what first steps are reasonable.\n\nIncident signals should also respect privacy. Alert payloads do not need full prompts, outputs, or sensitive data by default. They need enough context to start a responsible investigation without spreading protected information through notification systems.",
  "narrationPoints": [
    "Alerts are useful only when they lead to action.",
    "Anomalies can reveal operational drift.",
    "Alert quality matters.",
    "Every important alert should have a clear investigation path.",
    "Incident signals should also respect privacy."
  ]
};
