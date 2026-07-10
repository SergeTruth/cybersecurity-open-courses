window.COURSE_MODULE = {
  "title": "Abuse Cases and Failure Scenarios",
  "graphicAlt": "Abuse case workflow showing untrusted content, model interpretation, tool request, validation, approval, logging, and mitigation.",
  "narration": "After identifying threats, teams should write concrete abuse cases. Abstract labels are useful for organizing work, but they are not enough to drive practical design decisions.\n\nInstead of only writing prompt injection, describe what could happen in the workflow. For example, untrusted content could influence a summary, a model-assisted workflow could request an action outside the user's intent, a coding assistant could suggest unsafe code, or retrieved content could affect recommendations in a way the team did not expect.\n\nOther failure scenarios include a model output being passed into another system without validation, a tool receiving broader permissions than needed, sensitive text appearing in logs, or stored memory preserving information longer than intended.\n\nAbuse cases make the threat model actionable because they connect risks to real workflows. They help teams decide what to test, where human approval is required, which logs are useful, and which controls should block or limit unsafe outcomes.",
  "narrationPoints": [
    "After identifying threats, teams should write concrete abuse cases.",
    "Instead of only writing prompt injection, describe what could happen in the workflow.",
    "Other failure scenarios include a model output being passed into another system without validation, a tool receiving broader permissions than...",
    "Abuse cases make the threat model actionable because they connect risks to real workflows."
  ]
};
