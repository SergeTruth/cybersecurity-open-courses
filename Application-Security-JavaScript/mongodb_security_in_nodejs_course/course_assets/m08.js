window.COURSE_MODULE = {
  "title": "Deployment Hardening, Network Exposure, Backups, and Auditing",
  "graphicAlt": "A database deployment is supported by scoped networking, separate roles, maintenance, tested protected backups and audited changes.",
  "narration": "Even strong application query design cannot protect a MongoDB deployment that is broadly exposed with weak access controls. Use private networking, IP access controls, firewalls, security groups, or platform-equivalent network restrictions. Enable access control and role-based access control with least privilege. Separate application users, administrator users, migration users, reporting users, human users, and emergency access paths where appropriate. Administrative access should require strong authentication and periodic review.\n\nKeep server versions, drivers, dependencies, base images, and deployment configuration current. Review configuration drift, emergency changes, manual console edits, and one-off operational fixes. They should leave evidence and be reconciled back into normal infrastructure management. Hardening is not a one-time checklist. It is the ongoing process of keeping the deployed database, the Node.js runtime, supporting images, and operational procedures aligned with the security model the team expects.\n\nBackups deserve the same protection as production data. They should be encrypted where appropriate, access-controlled, covered by retention policy, tested for restore, and monitored for failure. Audit logs and operational logs should capture security-relevant events without exposing sensitive data unnecessarily. Track administrative actions, privilege changes, unusual connection patterns, backup failures, restore activity, configuration changes, and suspicious access behavior. A recoverable and observable database is much easier to defend during an incident.",
  "narrationPoints": [
    "Even strong application query design cannot protect a MongoDB deployment that is broadly exposed with weak access controls.",
    "Keep server versions, drivers, dependencies, base images, and deployment configuration current.",
    "Audit logs and operational logs should capture security-relevant events without exposing sensitive data unnecessarily.",
    "Administrative access should require strong authentication and periodic review.",
    "They should be encrypted where appropriate, access-controlled, covered by retention policy, tested for restore, and monitored for failure.",
    "Backups deserve the same protection as production data."
  ]
};
