window.COURSE_MODULE = {
  "title": "Course Summary and Practical Checklist",
  "graphicAlt": "A repeatable cycle of scope, protected prompts, flow tracing and verification rests on human accountability and retained evidence.",
  "narration": "AI-assisted secure code review can improve coverage, consistency, and speed, but only when reviewers keep judgment and accountability. Start by defining scope before asking for analysis: changed files, routes, middleware, dependencies, secrets, configuration, roles, data stores, and deployment context. Provide enough context for useful review while protecting sensitive code, secrets, customer data, and proprietary logs. Treat reviewed code and logs as untrusted material, not as instructions for the assistant to follow.\n\nFor Node.js applications, focus review on the places where security behavior is assembled: routes, middleware order, authentication, authorization, validation, data access, output shaping, error handling, logging, dependencies, secrets, and runtime configuration. Ask AI to trace flows and identify assumptions, then validate the results with code evidence, tests, trusted tools, and human reasoning. Do not accept broad reassurance as proof of security.\n\nA useful first-week plan is modest and practical. Create a secure review prompt template, define Node.js review priorities, add rules for secret handling in prompts, review recent pull requests for object-level authorization issues, confirm scanner coverage, and agree on how AI-generated findings are validated before approval. The most important habit is evidence: if a finding matters, it should point to code, configuration, data flow, tests, scanner output, or a documented requirement.\n\nAI works best as a disciplined assistant inside a disciplined workflow. It can summarize, question, compare, draft, and explain. It should not certify, approve, or replace reviewers. Keep assessment, approval, and accountability with the engineering and security team, and use AI to make that team sharper rather than less responsible.",
  "narrationPoints": [
    "AI-assisted secure code review can improve coverage.",
    "A useful first-week plan is modest and practical.",
    "AI works best as a disciplined assistant inside.",
    "Start by defining scope.",
    "Provide enough context for useful review.",
    "Ask AI to trace flows and identify assumptions."
  ]
};
