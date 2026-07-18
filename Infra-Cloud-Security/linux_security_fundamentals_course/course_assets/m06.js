window.COURSE_MODULE = {
  "title": "Remote Access and Host Network Controls",
  "graphicAlt": "Conceptual visual of protected SSH, controlled administration paths, host firewall rules, and network exposure.",
  "narration": "Remote access is one of the most important Linux security topics because it is how administrators often reach servers, cloud instances, and appliances. SSH is common, reliable, and powerful. That also makes it a high-value path. SSH access should be restricted, monitored, and justified. The organization should know which users can connect, which authentication methods are approved, which networks can reach the service, and how activity is logged.\n\nStrong remote administration is not only about one setting. It includes unique user accounts, limited sudo access, protected keys or credentials, timely removal of access, and review of privileged groups. Where the environment supports it, teams may use controlled administration paths such as VPNs, bastion hosts, management networks, allowlists, or multifactor authentication. The right design depends on the system and risk, so changes should be tested before production rollout.\n\nHost firewalls reduce unnecessary exposure. A firewall should support intended communication and block traffic that has no business purpose. The key question is practical: what should this host accept, from where, and why? Host-level controls should align with cloud security groups, network firewalls, application requirements, and monitoring. Contradictory rules and undocumented exceptions make future troubleshooting harder.\n\nRemote access and network controls must be documented and validated. A rule that looks secure but blocks backups, monitoring, or emergency support can damage availability. A rule that looks convenient but exposes administration broadly increases risk. Good practice combines least privilege, controlled paths, logs, tested firewall behavior, clear ownership, change windows, and rollback plans.",
  "narrationPoints": [
    "Remote access is a high-value security path.",
    "SSH should be restricted, monitored, and justified.",
    "Host firewalls reduce unnecessary exposure.",
    "Administrative access should use controlled paths.",
    "Network controls must be documented and tested."
  ]
};
