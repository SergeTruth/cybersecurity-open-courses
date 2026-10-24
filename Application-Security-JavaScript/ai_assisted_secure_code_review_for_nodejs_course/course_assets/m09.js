window.COURSE_MODULE = {
  "title": "Workflow Integration for Pull Requests and CI/CD",
  "graphicAlt": "Targeted AI questions and normal CI controls provide evidence for human approval and improve team standards.",
  "narration": "AI-assisted review should support pull request review, not bypass it. A practical workflow begins when the developer opens a pull request and describes the security-relevant intent of the change. AI can summarize changed routes, configuration, dependencies, tests, and possible security questions. The reviewer then asks targeted prompts, validates findings, and decides which comments are worth raising. The goal is to reduce blind spots and review fatigue, not to flood developers with generic warnings.\n\nCI/CD should continue to run normal controls: tests, linting, static analysis, dependency scanning, secret scanning, policy checks, and deployment gates. AI can help interpret output, draft remediation guidance, suggest tests, and organize findings, but automated tools remain necessary evidence sources. High-risk changes may still require security-owner review, architecture review, or approval gates, especially when they affect authentication, authorization, secrets, public APIs, or production deployment behavior.\n\nTeams should document review criteria so AI-assisted comments align with local standards. A reusable prompt template can ask for scope, trust boundaries, Node.js review priorities, evidence requirements, and verification steps. Recurring findings should feed back into secure coding guidance, helper libraries, route templates, middleware patterns, and test examples. AI assistance becomes more valuable when it reinforces the team's engineering system instead of acting as a one-off reviewer with no memory of standards.",
  "narrationPoints": [
    "AI-assisted review should support pull request review.",
    "CI/CD should continue to run normal controls: tests.",
    "Teams should document review criteria.",
    "The goal is to reduce blind spots and review fatigue.",
    "A reusable prompt template can ask for scope.",
    "js review priorities."
  ]
};
