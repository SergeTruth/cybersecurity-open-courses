window.COURSE_MODULE = {
  "title": "IAM, Service Accounts, Impersonation, and Least Privilege",
  "graphicAlt": "A caller must be allowed to impersonate a service account, whose scoped IAM permissions then limit resource actions; usage and access remain auditable.",
  "narration": "Every Google Cloud CLI command runs with an identity. That identity may be a signed-in user, service account, metadata-based identity, workload identity, federated CI/CD identity, or impersonated service account. The identity determines what the script can read, create, update, deploy, or administer. IAM design is therefore central to Google Cloud CLI security.\n\nPermissions should match the job. A reporting script should not use a deployment identity. A validation step should not need the same permissions as a production change. A rollback workflow should not automatically share broad owner-level permissions. Least privilege should consider organization, folder, project, resource, role, action, condition where available, environment, and time.\n\nService account impersonation can reduce service account key-file exposure when it is governed carefully. It should be intentional, auditable, and scoped to a clear purpose. Teams should understand who or what can impersonate a service account, which scripts use it, what that service account can do, and how usage is reviewed. Impersonation is not a shortcut around least privilege; it is a way to manage runtime access without spreading long-lived keys.\n\nAvoid broad shared Owner or Editor access in automation. Broad roles may make early scripting easier, but they make mistakes and incidents harder to contain. Each automation identity should have an owner, a documented purpose, a known usage location, and a review process. Stale roles, unused service accounts, and overbroad permissions should be cleaned up over time.",
  "narrationPoints": [
    "Every Google Cloud CLI command runs with an identity.",
    "Permissions should match the job.",
    "Service account impersonation can reduce service account key-file exposure when it is governed carefully.",
    "Avoid broad shared Owner or Editor access in automation."
  ]
};
