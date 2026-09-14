window.COURSE_MODULE = {
  "title": "Course Summary: Azure CLI Security Checklist",
  "graphicAlt": "Deliberate Azure automation confirms context, scopes RBAC, protects sessions, invokes commands safely, guards changes, and uses monitoring to improve.",
  "narration": "Azure CLI security is a repeatable engineering practice. Start with target validation. Confirm tenant, subscription, resource group, region, Azure cloud environment where relevant, identity, environment label, and resource target before action. Do not rely on accidental selected account state, inherited variables, or defaults that have not been checked.\n\nUse scoped RBAC and protect credentials. Match permissions to the script's actual job, separate read-only, deploy, rollback, and owner-level access, and prefer managed identity, workload identity, or federation where practical. Protect token caches, service principal credentials, CI/CD service connections, and environment variables. Rotate, revoke, and review access over time.\n\nInvoke the Azure CLI from Bash with fixed, reviewable patterns. Quote values, use arrays where useful, validate command groups, operations, resource IDs, subscriptions, regions, resource groups, paths, filters, and output destinations, and check exit status before trusting output. Parse JSON deliberately and write files only to approved locations.\n\nFinally, guard high-impact actions with policy checks, what-if or preview workflows, approvals, and rollback planning where available. Treat deletion, overwrite, public exposure, permission expansion, and encryption changes with extra care. Log safely, monitor activity and identity records, respond quickly to credential exposure or wrong-target changes, and improve scripts and roles through regular review.",
  "narrationPoints": [
    "Azure CLI security is a repeatable engineering practice.",
    "Use scoped RBAC and protect credentials.",
    "Invoke the Azure CLI from Bash with fixed, reviewable patterns.",
    "Finally, guard high-impact actions with policy checks, what-if or preview workflows, approvals, and rollback planning where available."
  ]
};
