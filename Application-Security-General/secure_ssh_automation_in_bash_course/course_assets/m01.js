window.COURSE_MODULE = {
  "title": "Why Secure SSH Automation in Bash Matters",
  "graphicAlt": "An unattended SSH job connects a scoped identity to a verified destination and known action with a checked result.",
  "narration": "SSH automation in Bash is common because it fits naturally into operational work. A short script can connect to remote hosts, run maintenance tasks, copy files, collect diagnostics, restart services, deploy artifacts, or trigger remote workflows. That flexibility is useful, but it also means a small script can reach across system boundaries and change real infrastructure.\n\nThe security concern is not SSH itself. SSH is a normal and valuable administration channel. The concern is unattended automation that runs with powerful credentials, trusts the wrong host, builds remote commands loosely, transfers sensitive files carelessly, or fails in ways that operators cannot see. Those problems are design problems, not reasons to avoid automation altogether.\n\nSecure SSH automation makes remote actions intentional. The script should know which host it is contacting, which identity it is using, what permissions that identity has, which command or transfer is allowed, and how success or failure will be reported. Reviewers should be able to understand those decisions without reconstructing hidden shell behavior.\n\nScope matters. A job-specific identity that can perform one deployment task is easier to reason about than a shared privileged key that works everywhere. A managed known-hosts process is safer than casual trust prompts or verification bypasses. Logs that show target, action, result, and time are more useful than silent success or raw sensitive output.\n\nThe defensive goal is reliable remote work without hidden risk. Bash and SSH can remain simple and practical, but the automation around them should be verified, scoped, observable, and maintained over time.",
  "narrationPoints": [
    "SSH automation in Bash is common because it fits naturally into operational work.",
    "SSH is a normal and valuable administration channel.",
    "Reviewers should be able to understand those decisions without reconstructing hidden shell behavior.",
    "A job-specific identity that can perform one deployment task is easier to reason about than a shared privileged key that works everywhere.",
    "The defensive goal is reliable remote work without hidden risk.",
    "A short script can connect to remote hosts, run maintenance tasks, copy files, collect diagnostics, restart services, deploy artifacts, or trigger remote workflows."
  ]
};
