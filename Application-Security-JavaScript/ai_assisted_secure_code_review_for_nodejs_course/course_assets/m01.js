window.COURSE_MODULE = {
  "title": "Why AI-Assisted Secure Code Review Matters",
  "graphicAlt": "Changed code, dependencies and configuration feed AI suggestions that a human reviewer verifies before approval.",
  "narration": "Imagine a pull request for a Node.js service that looks ordinary at first glance. It adds two routes, changes middleware order, updates package-lock.json, and introduces a new environment variable. A human reviewer may focus on the route handler logic and miss the security story around authorization, dependency behavior, configuration, and runtime exposure. AI assistance can widen the review by summarizing changes, tracing related files, and generating targeted questions the reviewer might not have asked quickly on their own.\n\nSecure code review looks for weaknesses in design, implementation, configuration, and data flow. In Node.js projects, that means reviewing application code and the ecosystem around it: npm dependencies, asynchronous behavior, Express-style middleware, route protection, JSON parsing, secrets, error handling, and runtime configuration. AI can help surface suspicious patterns, draft remediation options, explain unfamiliar code, and compare a change against a checklist, but it can also miss context, invent a finding, overstate confidence, or suggest a fix that breaks the application.\n\nThe goal is not to let AI approve code. The goal is to make reviewers more systematic and better informed. A useful AI-assisted review starts with human scope, human security intent, and human accountability. Every meaningful finding should be tied to evidence: affected code, a data flow, a configuration setting, a dependency change, a test result, or a documented security requirement. AI is a review assistant, not a security authority.",
  "narrationPoints": [
    "Imagine a pull request for a Node.",
    "Secure code review looks for weaknesses in design.",
    "The goal is not to let AI approve code.",
    "A useful AI-assisted review starts with human scope.",
    "AI is a review assistant, not a security authority.",
    "AI assistance can widen the review by summarizing changes."
  ]
};
