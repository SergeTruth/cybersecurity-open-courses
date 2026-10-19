window.COURSE_MODULE = {
  "title": "Retention, Governance, and Evidence Handling",
  "graphicAlt": "Telemetry categories receive purpose-based access, controlled exports and evidence handling, and policy-based retention and deletion.",
  "narration": "Telemetry is data, and it needs lifecycle governance. Logs, metrics, traces, audit records, dashboards, exports, review notes, and incident evidence may all reveal information about users, source systems, prompts, outputs, model behavior, workflows, and operational decisions. Treating telemetry as disposable or harmless creates privacy and governance risk.\n\nRetention rules define how long different records remain. Routine operational logs may have one retention period. Audit records may need another. Debug records, prompt samples, investigation exports, and incident evidence may require stricter access, shorter retention, or formal handling. The goal is to keep enough evidence for accountability and troubleshooting without preserving unnecessary sensitive content forever.\n\nAccess control is essential. People who operate infrastructure may not need full prompt details. Reviewers may need audit summaries but not raw outputs. Incident responders may need temporary elevated access with approval and documentation. Telemetry access should match role, purpose, and sensitivity.\n\nGovernance should define what may be logged, what must be redacted, who may inspect it, how exports are controlled, how deletion works, and how backups handle telemetry. These rules should be understandable to engineers before workflows go live.\n\nEvidence handling matters during incidents, audits, model reviews, and compliance conversations. A well-designed telemetry lifecycle preserves accountability without turning observability into a permanent copy of sensitive AI activity.",
  "narrationPoints": [
    "Telemetry is data, and it needs lifecycle governance.",
    "Retention rules define how long different records remain.",
    "Access control is essential.",
    "Governance should define what may be logged, what must be redacted, who may inspect it, how exports are controlled, how deletion works, and how...",
    "Evidence handling matters during incidents, audits, model reviews, and compliance conversations."
  ]
};
