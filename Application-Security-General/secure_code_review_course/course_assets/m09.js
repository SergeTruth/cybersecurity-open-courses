window.COURSE_MODULE = {
  "title": "Course Summary and Key Takeaways",
  "narration": "Secure code review helps teams find security weaknesses before they become production risk. It is most effective when reviewers understand the application purpose, architecture, data flows, trust boundaries, sensitive operations, and deployment context. Without that context, review can become a noisy checklist. With context, review becomes targeted engineering analysis.\n\nStrong reviews combine preparation, data-flow tracing, trust-boundary analysis, secure coding knowledge, tool-assisted review, and practical remediation. Reviewers should follow untrusted data from entry points to sensitive sinks, verify that authentication and authorization are enforced server-side, check how secrets and sensitive data are handled, and examine operational paths such as logging, files, integrations, retries, and errors.\n\nEvidence and communication matter as much as detection. Vague warnings rarely produce durable fixes. A useful finding explains what code path is affected, why the behavior matters, what risk it creates, and how the team can reduce that risk. Reviewers should focus on context, impact, and clear guidance rather than blame or volume.\n\nThe goal is not perfect code. The goal is repeatable, defensible improvement in how software handles data, identity, permissions, secrets, errors, dependencies, and security-sensitive actions. A mature secure review practice teaches patterns, validates fixes, improves standards, and helps teams build safer software over time.",
  "graphicAlt": "Repeatable secure review combines context, boundary tracing, control verification, actionable evidence and validated improvement.",
  "narrationPoints": [
    "Secure code review helps teams find security weaknesses before they become production risk.",
    "Strong reviews combine preparation, data-flow tracing, trust-boundary analysis, secure coding knowledge, tool-assisted review, and practical remediation.",
    "Evidence and communication matter as much as detection.",
    "The goal is not perfect code."
  ]
};
