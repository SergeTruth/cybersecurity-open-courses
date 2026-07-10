window.COURSE_MODULE = {
  "title": "Authorization and Access Control",
  "graphicAlt": "Blank placeholder graphic for module 5, Authorization and Access Control.",
  "narration": "Authorization answers a different question from authentication. Authentication identifies the actor. Authorization decides what that actor is allowed to do. A user may be logged in and still not be allowed to view another customer record, modify an invoice, approve a payment, change tenant settings, or call an administrative API. Confusing authentication with authorization is one of the most common application security mistakes.\n\nAccess control needs to be enforced server-side. Client-side controls can hide buttons, simplify workflows, or reduce accidental misuse, but they cannot be the security boundary because users can alter requests. Role-based access control is useful for broad categories such as user, manager, auditor, and administrator. Object-level authorization checks whether this particular actor can access this particular record. Function-level authorization checks whether the actor can perform this action at all. Mature applications often need all three.\n\nLeast privilege keeps access narrow. Service accounts, background jobs, API tokens, administrators, support tools, and integrations should have only the permissions they need. Reviewers should look for direct object references, missing ownership checks, overbroad admin routes, inconsistent policy enforcement, and authorization decisions that rely on request parameters controlled by the client. A strong access control design centralizes policy where possible, tests negative cases, and treats every sensitive operation as something that must be authorized, not merely routed.",
  "narrationPoints": [
    "Authorization answers a different question from authentication.",
    "Access control needs to be enforced server-side.",
    "Least privilege keeps access narrow."
  ]
};
