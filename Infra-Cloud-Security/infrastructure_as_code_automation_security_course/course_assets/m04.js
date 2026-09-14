window.COURSE_MODULE = {
  "title": "State Files, Plans, and Change Visibility",
  "graphicAlt": "Protected state records existing infrastructure, while a reviewed plan exposes proposed changes; both inform whether an apply matches approved intent.",
  "narration": "Many IaC workflows use state to map code to real infrastructure. State can contain resource identifiers, configuration values, outputs, endpoints, dependencies, relationships, and sometimes secret-adjacent data. Even when state does not contain a direct credential, it can reveal enough about the environment to be sensitive operational data.\n\nState storage should be protected deliberately. Remote state backends should use access controls, encryption where appropriate, locking, versioning, and audit logs when the platform supports them. Locking helps prevent overlapping changes. Versioning can help recover from mistakes. Auditability helps teams understand who read or changed state and when.\n\nPlans are also security-relevant because they show what automation intends to change. A plan can reveal replacements, deletions, permission changes, public exposure, encryption changes, logging changes, resource movement, or drift reconciliation. Reviewing a plan before a high-impact apply helps teams catch surprises while there is still time to stop.\n\nA safe workflow avoids blind production applies. Reviewers should understand the intended change, the environment, the identity that will apply it, and the risky parts of the plan. When drift exists, reconciliation should be controlled rather than automatic in sensitive environments. State and plans together provide visibility: what exists, what will change, and whether the change matches the approved intent.",
  "narrationPoints": [
    "Many IaC workflows use state to map code to real infrastructure.",
    "State storage should be protected deliberately.",
    "Plans are also security-relevant because they show what automation intends to change.",
    "A safe workflow avoids blind production applies."
  ]
};
