window.COURSE_MODULE = {
  "title": "Course Summary: A Secure Kubernetes Baseline for .NET",
  "graphicAlt": "Application and platform teams share a baseline for image manifests, least privilege, controlled runtime flow and safe production operations.",
  "narration": "A secure Kubernetes baseline for .NET starts by treating manifests as part of application security. Use trusted images, review image references, and make labels, ports, probes, volumes, service accounts, resource settings, and runtime controls visible before release.\n\nRun pods with least privilege and non-root runtime where possible. Align pod security settings with platform policy, plan writable paths, separate Secrets and ConfigMaps, and use least-privilege service accounts and RBAC. Do not give a workload Kubernetes API access unless it needs it.\n\nControl ingress, TLS, internal service exposure, NetworkPolicies, readiness, liveness, startup behavior, graceful shutdown, resource requests, resource limits, and backpressure. The application and cluster settings should agree on how work enters, runs, scales, and stops.\n\nFinally, keep production operations safe. Redact logs, govern diagnostics, review supply chain controls, use admission policy where appropriate, plan rollback, and maintain incident response steps. Kubernetes security for .NET is strongest when application developers and platform teams share the same baseline.",
  "narrationPoints": [
    "A secure Kubernetes baseline for .NET starts by treating manifests as part of application security.",
    "Align pod security settings with platform policy, plan writable paths, separate Secrets and ConfigMaps, and use least-privilege service accounts and RBAC.",
    "The application and cluster settings should agree on how work enters, runs, scales, and stops.",
    "Redact logs, govern diagnostics, review supply chain controls, use admission policy where appropriate, plan rollback, and maintain incident response steps.",
    "Kubernetes security for .NET is strongest when application developers and platform teams share the same baseline."
  ]
};
