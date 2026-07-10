window.COURSE_MODULE = {
  "title": "Testing and Operational Practices",
  "graphicAlt": "AI application threat model showing users, documents, retrieval, tools, data stores, tests, monitoring, and update loop.",
  "narration": "Prompt injection defenses should be tested before and after deployment. Testing should be safe, scoped, and defensive, with the goal of validating trust boundaries, controls, approvals, monitoring, and data exposure assumptions.\n\nTesting may include reviewing how the model handles untrusted documents, verifying tool permissions, checking approval workflows, confirming that sensitive data is not exposed unnecessarily, and ensuring output validation blocks unsafe downstream use.\n\nTeams should also monitor production behavior, review incidents and near misses, update threat models, and improve controls as new patterns emerge. Prompt injection risk changes as prompts, models, tools, retrieval sources, data, and user workflows change.\n\nPrompt injection is not a one-time checklist item. It is an ongoing AI application security concern that requires design, testing, monitoring, response, and continuous improvement.",
  "narrationPoints": [
    "Prompt injection defenses should be tested before and after deployment.",
    "Testing may include reviewing how the model handles untrusted documents, verifying tool permissions, checking approval workflows, confirming t...",
    "Teams should also monitor production behavior, review incidents and near misses, update threat models, and improve controls as new patterns em...",
    "Prompt injection is not a one-time checklist item."
  ]
};
