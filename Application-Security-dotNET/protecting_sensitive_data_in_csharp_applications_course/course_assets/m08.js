window.COURSE_MODULE = {
  "title": "Authorization, Tenancy, and Least Privilege",
  "graphicAlt": "Bullet summary graphic for Authorization, Tenancy, and Least Privilege.",
  "narration": "Sensitive data protection requires access control, not only encryption. Encryption can protect data at rest or in transit, but it does not decide who may read a record, download an export, view a tenant, approve a workflow, or run an administrative report.\n\nAuthentication identifies the caller. Authorization decides what data or action that caller may access. Resource-level checks may need ownership, tenant membership, role, claim, scope, subscription, record status, or business-rule evaluation. The right check depends on the resource and operation.\n\nTenant IDs and user IDs supplied by clients must be checked against trusted server-side data and validated identity. A request parameter should not become the authority for which tenant or user data is returned. Server-side authorization should make the data boundary explicit.\n\nLeast privilege should apply to application users, service identities, database accounts, support tools, background jobs, and administrators. A background job that reads every tenant, a support tool with broad export rights, or a database account with unnecessary write access can expose more data than the main user interface.\n\nUI hiding, route naming, obscurity, or client-side checks are not server-side data protection. Support and administrative access should be logged, reviewed, and limited to legitimate operational need. Sensitive data access should be explainable after the fact.",
  "narrationPoints": [
    "Sensitive data protection requires access control, not only encryption.",
    "The right check depends on the resource and operation.",
    "Tenant IDs and user IDs supplied by clients must be checked against trusted server-side data and validated identity.",
    "Least privilege should apply to application users, service identities, database accounts, support tools, background jobs, and administrators.",
    "Support and administrative access should be logged, reviewed, and limited to legitimate operational need."
  ]
};
