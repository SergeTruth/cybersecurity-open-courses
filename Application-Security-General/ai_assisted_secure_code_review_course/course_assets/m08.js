window.COURSE_MODULE = {
  "title": "Workflow Integration and Governance",
  "graphicAlt": "Pull requests and SAST/SCA results feed human triage, tracked decisions, and approval before merge, with privacy controls and a preserved audit trail.",
  "narration": "AI-assisted secure code review should fit into existing engineering workflows. In pull requests, it can help summarize the security-relevant change, generate review questions, compare the change to a checklist, or draft a finding for a human reviewer. For larger reviews, it can help organize notes by component, risk area, and evidence. The output should support the review process, not create a second undocumented process that developers cannot inspect or challenge.\n\nAI also pairs well with SAST and SCA results when used carefully. It can group similar findings, explain a tool result, suggest likely owners, or propose verification steps. But scanner output still needs triage, and AI summaries can accidentally hide important details. Keep links to original findings, affected files, versions, and evidence. Ticketing should distinguish verified vulnerabilities from hypotheses, accepted risk, false positives, and backlog hardening work.\n\nGovernance protects both the code and the review. Privacy controls should prevent secrets, credentials, customer data, and sensitive business logic from being sent to tools that are not approved for that data. Evidence notes should be clear enough for audit and repeatable enough for another reviewer to understand. Developers should receive practical, respectful explanations. Human approval remains required before merge, especially for AI-generated remediation. A mature workflow makes AI assistance visible, bounded, and accountable.",
  "narrationPoints": [
    "AI-assisted secure code review should fit into existing engineering workflows.",
    "AI also pairs well with SAST and SCA results when used carefully.",
    "Governance protects both the code and the review."
  ]
};
