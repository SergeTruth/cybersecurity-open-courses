window.COURSE_MODULE = {
  "title": "Role and Permission Patterns",
  "graphicAlt": "Understandable roles map to precise permissions for scoped tasks, with review of temporary and stale access.",
  "narration": "Roles are useful because people can understand them. Developer, analyst, billing administrator, support agent, project owner, and tenant administrator are easier to reason about than hundreds of raw checks. Permissions are useful because software needs precision. A mature pattern maps roles to specific permissions such as read report, update project, approve request, export invoice, manage users, or rotate integration secrets.\n\nOverbroad administrator roles are risky because they grant more access than users or services usually need. It may be convenient to assign full administrator access during development or support, but broad standing privilege increases the impact of mistakes and compromise. Scoped roles, temporary access, just-in-time concepts, and explicit administrative permissions can reduce exposure while still supporting operations.\n\nRole explosion is the opposite failure mode. If every exception becomes a new role, the model becomes impossible to review. Permissions should have clear names, clear owners, and clear reasons to exist. Roles should be understandable to humans but precise enough for code. Environment-specific roles should be handled carefully so development, staging, and production access do not drift into unsafe patterns.\n\nAccess review keeps role and permission models healthy. Users change jobs, services change responsibilities, projects end, and temporary exceptions become stale. Reviews should ask whether roles still match business responsibilities, whether permissions are too broad, whether administrative access is justified, and whether service accounts have only the access they need. Good role design is not static; it is maintained through policy, review, and evidence.",
  "narrationPoints": [
    "Roles are useful because people can understand them.",
    "Overbroad administrator roles are risky.",
    "Role explosion is the opposite failure mode.",
    "Access review keeps role and permission models healthy.",
    "If every exception becomes a new role.",
    "Permissions should have clear names."
  ]
};
