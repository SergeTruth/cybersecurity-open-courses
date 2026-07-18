window.COURSE_MODULE = {
  "title": "Tooling, Automation, and Workflow Integration",
  "graphicAlt": "Draft visual summary for Tooling, Automation, and Workflow Integration",
  "narration": "LM Studio becomes more powerful when local models connect to scripts, coding tools, document workflows, compatible API clients, and controlled automation. Integration can save time, but it also changes the risk profile because the model may influence files, commands, records, or business decisions.\n\nStart with low-risk tasks. Drafting a summary, reformatting notes, generating test ideas, or classifying non-sensitive sample text is safer than allowing an unreviewed workflow to change important files or send information elsewhere. Keep human review in the loop while the workflow proves itself.\n\nTool access should be narrow. If an integration reads files, writes files, calls APIs, or uses project data, define exactly what it can access and why. A local model should not receive broad permissions simply because it is local. Access boundaries are part of responsible engineering.\n\nSeparate experiments from production-like work. A quick prototype can be useful, but if other people rely on it, the workflow needs documentation, version notes, test prompts, data rules, and an owner. Experimental integrations should be easy to disable or remove.\n\nDocument each integration. Explain the purpose, model choice, data allowed, tools connected, expected output, review process, and retirement plan. That record helps future maintainers audit, update, or safely shut down the workflow. If a tool can touch project files or scripts, the permission boundary should be narrow and easy to inspect. Good integration work favors clear limits over surprising convenience.",
  "narrationPoints": [
    "LM Studio becomes more powerful when local models connect to scripts, coding tools, document workflows, compatible API clients, and controlled...",
    "Start with low-risk tasks.",
    "Tool access should be narrow.",
    "Separate experiments from production-like work.",
    "Document each integration."
  ]
};
