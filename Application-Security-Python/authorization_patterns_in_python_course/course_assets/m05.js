window.COURSE_MODULE = {
  "title": "Object-Level and Tenant Authorization",
  "graphicAlt": "The same tenant-and-ownership policy filters list results and authorizes exact object operations before disclosure or change.",
  "narration": "Object-level authorization checks whether a caller can access a specific record, file, tenant, project, report, or other resource. Function-level authorization asks whether the caller can perform an action at all. Both are necessary. A user may have permission to view projects generally, but only for projects where they are a member. A support agent may be allowed to view customer cases, but only within assigned queues or approved support workflows.\n\nTenant and organization boundaries are high-value rules. In a multi-tenant application, one tenant should not receive another tenant's records, files, exports, administrative settings, or background job results. Tenant checks should apply to read, write, list, export, import, search, bulk actions, background processing, and administrative overrides. A route that works for one object should not accidentally become a cross-tenant data path when a caller changes an identifier.\n\nOwnership, team membership, project membership, shared resources, and administrative override rules should be explicit. Sharing is common in collaborative applications, but sharing rules need clear scope. Administrative overrides should be narrow, logged, and justified. Database query filtering can help by limiting what records are returned in the first place, but data filtering should match the same policy used for single-object actions.\n\nInsecure direct object reference concepts at a high level describe cases where a caller reaches a resource they should not access by changing an identifier or path. The defensive answer is not to hide identifiers. It is to verify every sensitive operation against the current subject, requested action, specific resource, and relevant context. Every object-level decision should be testable with allowed and denied users.",
  "narrationPoints": [
    "Object-level authorization checks whether a caller can.",
    "Tenant and organization boundaries are high-value rules.",
    "Ownership, team membership, project membership, shared.",
    "Insecure direct object reference concepts at a high level.",
    "In a multi-tenant application.",
    "Tenant checks should apply to read."
  ]
};
