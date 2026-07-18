window.COURSE_MODULE = {
  "title": "Identity, Authorization, and Least Privilege",
  "graphicAlt": "Illustration for a lesson on identity, authorization, and least privilege for AI agents.",
  "narration": "Agent systems need a clear identity model. A request may involve a human user, an application service account, delegated access to another system, a workload identity, or a tool credential. The design must answer whether an action runs as the user, as the application, as a specific service account, or as a constrained delegation of user authority. Without that clarity, audit trails become confusing and permissions tend to expand until the agent can do far more than the workflow requires.\n\nAuthorization should happen before retrieval and before tool use. If a user is not allowed to read a document, the agent should not retrieve it into context. If a user is not allowed to update a record, the model should not be able to reach a tool that updates it on the user's behalf. Object-level access control, tenant boundaries, organization membership, role checks, and resource ownership should be enforced in Python code or trusted services outside the model.\n\nLeast privilege means the agent receives only the permissions, tools, data, and credentials needed for its approved task. Broad credentials may feel flexible during development, but they enlarge the blast radius of misconfiguration, prompt injection, model error, or operator mistake. Scoped credentials, permission narrowing, destination controls, short-lived access, read-only modes, and default-deny behavior help keep agent authority aligned with business intent.\n\nEvery sensitive action should verify subject, action, resource, and context outside the model. Who is requesting the action? What action is being requested? Which resource is affected? Which tenant or organization owns it? What policy applies now? What approval is required? The model can draft or recommend, but the application should enforce these decisions. That separation is the backbone of safe agent automation.",
  "narrationPoints": [
    "Agent systems need a clear identity model.",
    "Authorization should happen.",
    "Least privilege means the agent receives only.",
    "Every sensitive action should verify subject.",
    "If a user is not allowed to read a document.",
    "The model can draft or recommend."
  ]
};
