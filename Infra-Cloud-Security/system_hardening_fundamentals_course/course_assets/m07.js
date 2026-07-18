window.COURSE_MODULE = {
  "title": "Logging, Monitoring, Backups, and Recovery",
  "graphicAlt": "Conceptual visual of logs, endpoint alerts, backups, recovery tests, and operational visibility.",
  "narration": "Hardening is incomplete without visibility and recovery. System logs, authentication logs, process and service events, endpoint alerts, configuration changes, backup status, and update results help teams understand what changed and what happened. Logs are especially important when troubleshooting a failed change, investigating suspicious activity, or confirming that a baseline is actually applied.\n\nMonitoring should produce actionable signals. Endpoint protection alerts, failed authentication patterns, unexpected service changes, disabled agents, backup failures, low disk space, and repeated update failures all deserve attention. The goal is not to collect every possible event forever. The goal is to give administrators, SOC analysts, and system owners enough evidence to detect problems and respond responsibly.\n\nBackups protect against mistakes, hardware failure, ransomware, corrupted updates, and bad changes. A backup that has never been restored is only an assumption. Recovery testing proves whether files, images, configuration, keys, and documentation are usable when pressure is real. Backup readiness should match system criticality: a production server and an ordinary workstation may need different recovery objectives.\n\nVisibility and recovery make hardening safer to operate. If a change causes trouble, logs can explain the failure and backups can support rollback. If endpoint protection detects a problem, responders need enough context to act. System hardening should improve prevention, detection, and recovery together rather than focusing only on configuration.",
  "narrationPoints": [
    "Logs show activity, changes, and failures.",
    "Endpoint alerts need review and response.",
    "Backups protect against failure and bad changes.",
    "Recovery tests prove backups are usable.",
    "Visibility and recovery make hardening safer."
  ]
};
