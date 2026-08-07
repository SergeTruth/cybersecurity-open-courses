window.COURSE_MODULE = {
  "title": "Local Development and .env File Hygiene",
  "graphicAlt": "Control-and-evidence diagram for Local Development and .env File Hygiene in Secrets Management in Node.js, linking each security decision to the protected asset, the enforcing component, the failure state, and the observable verification signal.",
  "narration": "Local development will rarely be perfectly clean, and .env files are common in Node.js projects. The goal is not to pretend they never exist. The goal is to make them less dangerous. Real .env files should stay out of source control. The repository should provide an .env.example file or documented configuration names with safe placeholder values, not production credentials. Developers should know which variables are required without copying live secrets into Git.\n\nLocal secrets should be different from staging and production secrets. Use low-privilege development credentials and avoid production access on developer machines whenever possible. Developer laptops are real risk locations: shell history, editor plugins, local logs, backups, malware, browser extensions, scripts, and support tools can all expose values. Sharing secrets through chat, screenshots, tickets, email, pasted terminal output, or copied stack traces creates more uncontrolled copies.\n\nWorkflow discipline matters. Use pre-commit scanning, repository secret scanning, and periodic Git history review to reduce accidental exposure. Make local credentials easy to rotate so a leak does not become a crisis. When a secret reaches a commit, a ticket, or a shared log, assume it may need rotation rather than just deleting the latest copy. Local development should be fast, but it should not quietly become the place where production trust boundaries disappear.",
  "narrationPoints": [
      "The repository should provide an .env.example file or documented configuration names with safe placeholder values, not production credentials.",
      "Local secrets should be different from staging and production secrets.",
      "Local development should be fast, but it should not quietly become the place where production trust boundaries disappear.",
      "Local development will rarely be perfectly clean, and .env files are common in Node.js projects.",
      "Real .env files should stay out of source control.",
      "Use low-privilege development credentials and avoid production access on developer machines whenever possible."
  ]
};
