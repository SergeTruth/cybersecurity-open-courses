window.COURSE_MODULE = {
  "title": "Course Summary and Key Takeaways",
  "graphicAlt": "Blank placeholder image for the course summary on authorization fundamentals.",
  "narration": "Authorization determines what authenticated subjects can do to protected resources under specific conditions. It is different from authentication, and access decisions should never be trusted merely because a user is logged in. Subjects, resources, actions, and context give teams a practical language for describing who can do what, to which object, and why.\n\nStrong authorization depends on explicit models, least privilege, default deny, separation of duties, object-level checks, tenant boundaries, server-side enforcement, and safe policy architecture. RBAC, ABAC, ReBAC, scopes, claims, groups, roles, and entitlements are tools for design. They work only when the application uses them consistently and reviewers can understand the resulting decisions.\n\nAPIs, services, workloads, and delegated access need the same level of care as human user interfaces. Internal traffic should not automatically be trusted. Gateways can help, but application-layer enforcement still matters where business objects, tenant boundaries, and sensitive actions are understood. Authorization context must be carried safely across services and jobs.\n\nThe goal is not simply to block users. The goal is predictable, appropriate, auditable access aligned with business and security risk. Testing, logging, monitoring, governance, and review keep authorization healthy as systems change. Mature authorization programs make access clear enough to operate and strong enough to trust.",
  "narrationPoints": [
    "Authorization determines what authenticated subjects can do to protected resources under specific conditions.",
    "Strong authorization depends on explicit models, least privilege, default deny, separation of duties, object-level checks, tenant boundaries,...",
    "APIs, services, workloads, and delegated access need the same level of care as human user interfaces.",
    "The goal is not simply to block users."
  ]
};
