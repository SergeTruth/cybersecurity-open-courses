window.COURSE_MODULE = {
  "title": "Course Summary and Key Takeaways",
  "graphicAlt": "Illustration for the course summary on AI agent security patterns in Python.",
  "narration": "AI agent security patterns in Python combine ordinary application security with controls for prompts, tools, retrieval, memory, outputs, and actions. Authentication, authorization, secrets, input validation, output validation, logging, monitoring, and incident response still matter. Agents add new pressure because natural-language content can shape tool use, retrieval, plans, and user decisions. The model is a component inside the system, not the system's authority.\n\nStrong designs define trust boundaries, enforce authorization in application code, scope tools, protect credentials, validate arguments, use approval gates, constrain execution, minimize data exposure, log safely, and monitor behavior. Untrusted text should be treated as data, not policy. Tool calls should go through wrappers that enforce structure and permission. Retrieval and memory should preserve provenance, tenant boundaries, retention rules, and deletion expectations.\n\nAgents can support useful automation, but they should not become unsupervised authorities over permissions, data access, business decisions, or high-impact actions. The application should decide what the agent can see, which tools it can request, how credentials are scoped, when a human must approve, and how outcomes are recorded. Sensitive workflows should move through explicit checks rather than generated text alone.\n\nThe goal is controlled, observable, least-privilege AI automation that remains useful while reducing the chance of unsafe behavior. Frameworks, model APIs, vector databases, and evaluation tools will change, but the durable principles remain stable: make authority explicit, keep permissions narrow, separate instructions from content, validate every boundary, constrain execution, and maintain the system as it evolves.",
  "narrationPoints": [
    "AI agent security patterns in Python combine ordinary.",
    "Strong designs define trust boundaries.",
    "Agents can support useful automation.",
    "The goal is controlled.",
    "Agents add new pressure.",
    "Untrusted text should be treated as data, not policy."
  ]
};
