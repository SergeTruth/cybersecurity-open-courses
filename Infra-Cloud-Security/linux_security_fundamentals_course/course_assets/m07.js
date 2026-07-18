window.COURSE_MODULE = {
  "title": "Logs, Monitoring, and Audit Trails",
  "graphicAlt": "Conceptual visual of Linux logs, audit trails, authentication events, monitoring, and alert review.",
  "narration": "Logs help administrators and analysts understand what happened on a Linux system. They may record authentication attempts, sudo use, service starts and stops, kernel messages, package changes, scheduled tasks, application errors, firewall decisions, and security alerts. Without logs, teams are often left guessing. With useful logs, they can build a timeline, troubleshoot failures, confirm changes, and support investigation.\n\nAuthentication and sudo events are especially valuable. Failed logins, unexpected successful logins, new privileged access, repeated sudo failures, or administrative activity outside a normal change window can all deserve review. These signals do not automatically prove misuse. They help analysts ask better questions, compare activity with approved changes, and identify when a system needs closer attention.\n\nMonitoring turns logs and system signals into operational awareness. It can help detect disk pressure, service failures, unexpected process behavior, configuration drift, package changes, time synchronization problems, backup failures, and suspicious activity. Monitoring should be tuned to the system's purpose. A noisy alert that nobody owns is less useful than a small set of signals with clear response expectations.\n\nLogs are also sensitive. They may contain usernames, IP addresses, application data, paths, errors, and details that reveal how a system works. Logs need retention, protection, and review. They should not be writable by unnecessary users, deleted too quickly, or exposed broadly. A good audit trail supports troubleshooting, accountability, and recovery because it records what changed, when it changed, and who or what performed the action.",
  "narrationPoints": [
    "Logs help explain system activity and changes.",
    "Authentication and sudo events are high-value signals.",
    "Monitoring helps detect failures and suspicious activity.",
    "Logs need retention, protection, and review.",
    "Audit trails support troubleshooting and investigation."
  ]
};
