window.COURSE_MODULE = {
  "title": "Authorization Requirements and Access Models",
  "graphicAlt": "Business requirements guide role, attribute and relationship model choices that express a least-privilege, default-deny policy.",
  "narration": "Access models should come from business rules before they become code. A team should be able to explain who needs access, which operations they perform, which resources they affect, and what conditions limit that access. Framework convenience can help implementation, but it should not define the policy by accident. If the business rule is that project members can update their own project tasks but only billing administrators can export invoices, the code should express that distinction clearly.\n\nCommon building blocks include roles, permissions, groups, scopes, claims, ownership, tenant membership, team membership, and relationships. A role might represent a job function. A permission might represent a specific action. A group might aggregate users. A scope or claim may carry authorization-relevant information in an identity or token workflow. Ownership and relationship-based access at a high level answer questions such as whether this user belongs to this project, manages this team, or owns this resource.\n\nRole-based access control, attribute-based access control, relationship-based access control, and policy-based access concepts are design tools. RBAC is understandable and useful, but it can become too broad or too fragmented. Attribute-based rules can express context, such as tenant, department, sensitivity, or workflow state, but require good data quality. Relationship-based rules are powerful for collaborative applications. Policy-based approaches can improve consistency when rules need to be shared across services.\n\nLeast privilege and default deny are the safest baseline. Access should be denied unless a clear policy allows it, and permissions should be no broader than the role, task, or service needs. The model should be understandable to humans and precise enough for software enforcement. If nobody can explain why a permission exists, who owns it, how it is reviewed, and which actions it allows, the model will be hard to operate safely.",
  "narrationPoints": [
    "Access models should come from business rules.",
    "Common building blocks include roles.",
    "Role-based access control.",
    "Least privilege and default deny are the safest baseline.",
    "Framework convenience can help implementation.",
    "A scope or claim may carry authorization-relevant."
  ]
};
