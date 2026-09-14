window.COURSE_MODULE = {
  "title": "kubeconfig, Identities, RBAC, and Least Privilege",
  "graphicAlt": "Protected deployment credentials grant only task-specific RBAC within the intended namespace, with access review, rotation, and revocation.",
  "narration": "Kubernetes deployment scripts run with identities. That identity may come from a kubeconfig file, service account token, CI/CD runner, workload identity, platform identity, or managed deployment system. Whatever the source, the script's permissions are the permissions of that identity. If the identity is broad, the script has a broad blast radius.\n\nkubeconfig files, tokens, and service-account credentials should be treated as sensitive credentials. They should have owners, controlled storage, environment boundaries, rotation expectations, revocation paths, and access review. A kubeconfig copied into a shared workspace or a CI/CD variable scoped too broadly can become long-lived cluster access that is difficult to inventory.\n\nRBAC should match the deployment task. A script that validates manifests may only need read or dry-run style capabilities. A script that applies a release may need permission for specific resource types in a specific namespace. Rollback, secret-management, and administrative tasks may require different capabilities. Separating validate, plan, apply, rollback, and administration where practical helps prevent one script from becoming a general cluster administrator.\n\nEnvironment-specific access matters. A staging deployment identity should not automatically have production privileges. A production deployment identity should be tightly scoped and reviewed. Avoid broad cluster-admin deployment identities as a default. The goal is least privilege: enough access to perform the intended deployment safely, with credentials that can be reviewed, rotated, and revoked over time.",
  "narrationPoints": [
    "Kubernetes deployment scripts run with identities.",
    "kubeconfig files, tokens, and service-account credentials should be treated as sensitive credentials.",
    "RBAC should match the deployment task.",
    "Environment-specific access matters."
  ]
};
