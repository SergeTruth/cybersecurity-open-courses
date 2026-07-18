window.COURSE_MODULE = {
  "title": "Course Summary: A Linux Security Operating Routine",
  "graphicAlt": "Conceptual visual of a repeatable Linux security operating routine.",
  "narration": "Linux security fundamentals become useful when they become a repeatable operating routine. Start with inventory. Know which systems exist, who owns them, what purpose they serve, what data they handle, which users and service accounts depend on them, and what recovery expectations apply. A system without an owner is difficult to secure because nobody can approve risk, validate changes, or accept exceptions.\n\nThen reduce unnecessary privilege and exposure. Review users, groups, sudo access, root practices, service accounts, file owners, file modes, services, daemons, processes, and open ports. The goal is not to remove everything. The goal is to match access and behavior to the system's purpose. Least privilege should apply to people, services, files, and network reachability.\n\nMaintain trusted software. Use approved repositories, track packages, remove unused components carefully, and apply patches through a process that includes testing, backups, change windows, and rollback planning. Secure remote access with controlled paths, justified SSH exposure, documented firewall rules, and monitoring. Enable logs, protect them, retain them long enough to be useful, and review high-value signals such as authentication, sudo, service changes, and package activity.\n\nFinally, keep improving. Test restores, validate hardening changes, document assumptions, review exceptions, and adjust baselines as systems change. Linux security is not one command, one scan, or one checklist. It is disciplined operation across identity, configuration, software, network exposure, monitoring, backups, and recovery. Practical habits repeated consistently are what make Linux systems safer and more reliable.",
  "narrationPoints": [
    "Inventory systems, owners, and purpose first.",
    "Limit privilege, permissions, services, and exposure.",
    "Maintain trusted software and updates.",
    "Monitor logs and protect remote access.",
    "Back up, validate, and improve continuously."
  ]
};
