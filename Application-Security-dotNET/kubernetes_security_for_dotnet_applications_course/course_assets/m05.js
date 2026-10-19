window.COURSE_MODULE = {
  "title": "Service Accounts, RBAC, and Workload Identity",
  "graphicAlt": "Workloads receive narrowly scoped Kubernetes API permissions only when required, while cloud access uses separate identity and policy.",
  "narration": "A Kubernetes service account represents the identity a pod uses to interact with the Kubernetes API unless the workload is configured otherwise. For .NET developers, the important question is whether the application needs Kubernetes API access at all. Many web apps, APIs, and background services do not.\n\nIf an application does not need Kubernetes API access, it should not receive broad permissions by default. Avoid assumptions that the default service account is harmless, and avoid broad ClusterRoleBindings for ordinary application workloads. The workload identity should match the real operational need.\n\nWhen a .NET application does need API access, RBAC should grant the minimum verbs and resources required in the narrowest practical namespace scope. Reading one ConfigMap, listing one resource type, or updating one status field are different permission levels and should be reviewed as separate decisions.\n\nService account tokens, mounted credentials, and projected tokens should be treated as sensitive. They can grant access to cluster resources according to their permissions. Token audience, expiration, mounting behavior, and logging exposure deserve direct review.\n\nAuthorization to cloud services and authorization to the Kubernetes API are separate decisions. Workload identity or cloud identity integration can let applications access cloud services without embedding long-lived credentials, but those permissions still need ownership, review, and environment separation.",
  "narrationPoints": [
    "A Kubernetes service account represents the identity a pod uses to interact with the Kubernetes API unless the workload is configured otherwise.",
    "If an application does not need Kubernetes API access, it should not receive broad permissions by default.",
    "Token audience, expiration, mounting behavior, and logging exposure deserve direct review.",
    "Service account tokens, mounted credentials, and projected tokens should be treated as sensitive.",
    "Authorization to cloud services and authorization to the Kubernetes API are separate decisions."
  ]
};
