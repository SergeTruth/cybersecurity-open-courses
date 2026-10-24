window.COURSE_MODULE = {
  "title": "Dependencies, Secrets, and Configuration Review",
  "graphicAlt": "Dependency, secret-lifecycle and environment evidence converge in a verified runtime review.",
  "narration": "Node.js risk does not live only in application code. npm dependencies are part of the application's security posture, and dependency changes can introduce new runtime behavior, transitive packages, install scripts, or known vulnerabilities. AI can summarize package additions, lockfile movement, and scripts that deserve attention, but it should not replace dependency scanning, package review, or trusted advisory sources. Treat AI output as a way to focus review, not as proof that the dependency tree is safe.\n\nSecrets handling belongs in secure code review. Review hardcoded credentials, committed .env files, token logging, weak session secrets, JWT signing keys, OAuth client secrets, API keys, cloud credentials, and npm tokens. AI can help search for patterns and explain where a secret might flow, but reviewers should avoid pasting real secrets into prompts. Findings should identify the affected file or configuration path and explain how the secret could be exposed, misused, or made difficult to rotate.\n\nRuntime configuration can change security behavior as much as code. Review CORS settings, debug mode, trusted proxy settings, TLS assumptions, cookie flags, request size limits, production error handling, and feature flags that alter access control. Configuration that is acceptable in development may be unsafe in production. A good AI prompt asks for environment-specific review: what would be risky if this setting reached production, and what evidence should confirm the intended environment boundary.",
  "narrationPoints": [
    "Secrets handling belongs in secure code review.",
    "Runtime configuration can change security behavior as much.",
    "Treat AI output as a way to focus review.",
    "AI can help search for patterns and explain.",
    "AI can summarize package additions.",
    "Review hardcoded credentials, committed."
  ]
};
