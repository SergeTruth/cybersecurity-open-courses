window.COURSE_MODULE = {
  "title": "Least Privilege for Database Credentials",
  "graphicAlt": "Runtime, reporting and migration accounts have distinct approved access and ownership review.",
  "narration": "Least privilege means each database credential has only the access needed for its approved purpose. A runtime application account, read-only reporting account, migration account, administrative account, background worker account, and data pipeline account may need different privileges. Combining all of those functions into one broad administrator credential may be convenient, but it makes every exposure more damaging and every audit trail less useful.\n\nRuntime access should be separated from maintenance access. A web service that reads and writes application records usually should not have schema ownership, broad administrative capabilities, or unrestricted access to unrelated databases. Migration credentials may need schema-change privileges, but they should be limited to migration workflows and protected with strong operational controls. Reporting credentials may be read-only and restricted to approved views or datasets.\n\nTenant, customer, and data-domain boundaries should influence credential design. In some systems, application logic enforces tenant isolation while the database account has broad table access. In other systems, separate schemas, databases, views, or accounts can reduce blast radius. The right model depends on architecture, but the principle is consistent: credentials should not grant access that the workload has no business using.\n\nEach credential should have an owner, a consumer, a purpose, and a review cadence. Service accounts and workload identity concepts can help tie database access to a specific application or job rather than a person or shared password. Avoiding broad administrator credentials in application runtimes makes rotation, incident response, and monitoring easier. When privilege is narrow, a mistake is less likely to become a system-wide data event.",
  "narrationPoints": [
    "Least privilege means each database credential has only.",
    "Runtime access should be separated from maintenance access.",
    "Tenant, customer, and data-domain boundaries should.",
    "Each credential should have an owner.",
    "Migration credentials may need schema-change privileges.",
    "A web service that reads and writes application records."
  ]
};
