window.COURSE_MODULE = {
  "title": "IAM Identities, Roles, and Least Privilege",
  "graphicAlt": "Reporting, deployment, and recovery use distinct job-specific roles bounded by allowed actions, resources, and duration.",
  "narration": "Every AWS CLI command runs with an AWS identity. That identity might be an IAM user, IAM role, federated session, SSO session, instance role, container role, workload identity, service role, or CI/CD role. The identity determines what the script can read, create, update, publish, or administer. IAM design is therefore central to AWS CLI security.\n\nPermissions should match the job. A reporting script should not use a deployment role. A validation step should not need the same permissions as a production change. A read-only inventory workflow should not share access with an administrative workflow. Least privilege should consider service, action, resource, condition, environment, and duration. The narrower the role, the easier it is to understand and contain.\n\nRole assumption should be intentional and auditable. The script should make clear which role it expects to use and for what purpose. Teams should understand whether a role is meant for read-only reporting, deployment, rollback, incident response, or administration. Approval expectations and access boundaries can help keep higher-risk roles from becoming ordinary defaults.\n\nAvoid broad shared administrator credentials in AWS CLI automation. Shared high-privilege access makes mistakes harder to attribute and incidents harder to contain. Each automation role should have an owner, a documented purpose, a known usage location, and a review process. Stale roles and unused permissions should be cleaned up over time so automation access does not quietly expand.",
  "narrationPoints": [
    "Every AWS CLI command runs with an AWS identity.",
    "Permissions should match the job.",
    "Role assumption should be intentional and auditable.",
    "Avoid broad shared administrator credentials in AWS CLI automation."
  ]
};
