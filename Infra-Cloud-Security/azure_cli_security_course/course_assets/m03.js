window.COURSE_MODULE = {
  "title": "Identities, RBAC, Service Principals, and Least Privilege",
  "graphicAlt": "A job-specific identity is scoped to the resources it needs, with purpose, ownership, and ongoing access review to limit the impact of broad roles.",
  "narration": "Every Azure CLI command runs with an Azure identity. That identity may be a signed-in user, service principal, managed identity, workload identity, federated CI/CD identity, or another automation identity. The identity and its role assignments determine what the script can read, create, update, deploy, or administer. RBAC design is therefore central to Azure CLI security.\n\nPermissions should match the job. A reporting script should not use a deployment identity. A validation step should not need the same permissions as a production change. A rollback workflow should not automatically share broad owner-level permissions. Least privilege should consider tenant, subscription, resource group, resource, role, action, condition where available, environment, and time.\n\nRole assignment should be intentional and auditable. Teams should know which identities are used by which scripts, who owns them, what scope they have, and why that access is required. Broad Owner or Contributor access may make automation easy to start, but it makes mistakes and incidents harder to contain. Narrower scopes and purpose-specific identities make review and response much cleaner.\n\nAccess review is ongoing work. Automation identities can outlive the script that created them, and temporary exceptions can become permanent if nobody revisits them. Secure Azure CLI automation includes ownership, purpose, rotation or renewal expectations, revocation steps, and periodic review of stale access and overbroad role assignments.",
  "narrationPoints": [
    "Every Azure CLI command runs with an Azure identity.",
    "Permissions should match the job.",
    "Role assignment should be intentional and auditable.",
    "Access review is ongoing work."
  ]
};
