window.COURSE_MODULE = {
  "title": "Course Summary: AWS CLI Security Checklist",
  "graphicAlt": "Secure AWS CLI automation validates targets, limits authority, executes predictably, observes results, guards risky changes, and plans recovery.",
  "narration": "AWS CLI security is a repeatable engineering practice. Start with target validation. Confirm the expected account, region, profile, role, environment, and resource target before action. Do not rely on accidental default profiles, inherited regions, stale SSO sessions, or CI/CD variables that have not been checked. Stop before a command reaches the wrong environment.\n\nUse scoped IAM and protect credentials. Match permissions to the script's job, separate read-only, deploy, rollback, and administrative access, and prefer temporary or federated access where practical. Protect credential files, SSO sessions, environment variables, CI/CD secrets, and runtime metadata. Rotate, revoke, and review automation access over time.\n\nInvoke the AWS CLI from Bash with fixed, reviewable patterns. Quote values, use arrays where useful, validate services, operations, ARNs, regions, profiles, paths, filters, and output destinations, and check exit status before trusting output. Parse JSON deliberately, handle empty and unexpected responses, and write files only to approved locations.\n\nFinally, guard high-impact actions. Use previews, dry runs, simulations, diffs, or change sets where available. Require approvals for production actions, treat deletion, overwrite, public exposure, permission expansion, and encryption changes with extra care, and plan rollback before change. Log safely, monitor audit records, respond quickly to credential exposure or wrong-target changes, and improve scripts and roles through regular review.",
  "narrationPoints": [
    "AWS CLI security is a repeatable engineering practice.",
    "Use scoped IAM and protect credentials.",
    "Invoke the AWS CLI from Bash with fixed, reviewable patterns.",
    "Finally, guard high-impact actions."
  ]
};
