window.COURSE_MODULE = {
  "title": "What Linux Security Means",
  "graphicAlt": "Conceptual visual of Linux security as a lifecycle across privilege, configuration, patching, monitoring, and recovery.",
  "narration": "Linux security is the practice of operating Linux systems so required work can happen while unnecessary risk is reduced. The goal is not to make a server impossible to use, or to turn every workstation into a locked box with no business value. The goal is reliable operation with controlled exposure: the right users can do the right work, services run for a clear reason, software is maintained, activity is visible, and recovery is possible when something goes wrong.\n\nLinux appears in many places. It may run a web server, a cloud instance, a container host, a developer workstation, a network appliance, an embedded device, or a small homelab system. Those environments have different risk levels, but the fundamentals are familiar. Security depends on installation choices, configuration, accounts, file permissions, packages, services, SSH access, firewall rules, logs, backups, and the way changes are approved and validated.\n\nLeast privilege is a central theme. A user should not have more access than the role requires. A service should not run if nobody owns it or needs it. A port should not be reachable just because a package opened it. A file mode should match the purpose of the file, not convenience during setup. These decisions are small, but they compound into a security posture.\n\nLinux is powerful because administrators can change almost anything. That power requires discipline: inventory first, test changes, use a change window for important systems, document assumptions, keep rollback options, monitor results, and maintain backups. Secure operation is a lifecycle, not a single command, tool, or hardening checklist.",
  "narrationPoints": [
    "Linux security supports safe and reliable operation.",
    "Linux systems appear in servers, desktops, cloud, and containers.",
    "Security depends on configuration and maintenance.",
    "Least privilege, patching, logging, and backups matter.",
    "Secure operation is a lifecycle, not a one-time setup."
  ]
};
