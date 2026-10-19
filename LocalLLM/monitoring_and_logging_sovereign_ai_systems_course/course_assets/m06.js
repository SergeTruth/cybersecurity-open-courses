window.COURSE_MODULE = {
  "title": "Audit Trails and Access Accountability",
  "graphicAlt": "Operational records explain failures while audit records connect identities, authority, permissions and exceptions to protected evidence.",
  "narration": "Audit trails are accountability records. They help answer who did what, when it happened, under which identity or authority, and what boundary decision was made. In sovereign AI systems, that may include user requests, service account actions, automation jobs, administrative changes, model access, data source access, exports, configuration updates, and policy exceptions.\n\nAudit logs are different from ordinary operational logs. Operational logs help troubleshoot behavior: a timeout, a failed worker, or a slow model load. Audit logs help explain responsibility and authorization: which user started a workflow, which service account accessed a source, who changed a model route, or who exported results.\n\nThe system should distinguish human users, services, administrators, and automation. A shared service account with broad privileges can make accountability weak unless actions are tied back to a workflow owner, job identity, or approval record. Admin activity deserves especially strong tracking because it may change access boundaries, logging rules, model versions, or retention settings.\n\nPermission decisions should be explainable after the fact. If a private RAG workflow allowed or denied source access, the audit record should support review without exposing more content than necessary. If an exception was granted, the reason and approver should be visible.\n\nAudit logs need protection. They should be access controlled, retained according to policy, resistant to tampering, and reviewed in a practical rhythm. Accountability fails when audit records are either missing or broadly exposed.",
  "narrationPoints": [
    "Audit trails are accountability records.",
    "Audit logs are different from ordinary operational logs.",
    "The system should distinguish human users, services, administrators, and automation.",
    "Permission decisions should be explainable after the fact.",
    "Audit logs need protection."
  ]
};
