window.COURSE_MODULE = {
  "title": "Automation and Scripts",
  "graphicAlt": "Blank placeholder graphic for DFIR automation and scripts",
  "narration": "Automation can make DFIR work faster and more consistent, but only when it is prepared and tested before the incident. Repeatable collection scripts can gather approved logs, system information, process lists, configuration data, and selected artifacts in a consistent format. Parsing utilities can normalize evidence, extract fields, or convert exports into a timeline-friendly structure. The benefit is repeatability, not cleverness.\n\nTriage checklists and environment setup scripts are also useful. A checklist can guide responders through early questions, required approvals, preservation steps, and initial scope decisions. Setup scripts can prepare analysis workstations with expected folders, dependencies, and verified tool versions. These small efficiencies matter when the team is tired, the incident is moving, and mistakes are easy to make.\n\nValidation is essential. Scripts should be tested with sample data, known-good cases, and realistic edge cases. They should fail safely, preserve original evidence, log their actions, and make outputs easy to review. A script that silently skips errors or overwrites evidence is dangerous. A script that records what it did, where outputs went, and what errors occurred is much easier to trust.\n\nAvoid destructive or untested automation during incidents. Do not run a new cleanup script against production systems just because it seems convenient. Do not collect broadly without considering privacy, business impact, or authority. Automation should have safe defaults, clear scope, and human review. In DFIR, speed helps only when the output remains reliable and the response remains controlled.",
  "narrationPoints": [
    "Automation can make DFIR work faster and more consistent, but only when it is prepared and tested before the incident.",
    "Triage checklists and environment setup scripts are also useful.",
    "Validation is essential.",
    "Avoid destructive or untested automation during incidents."
  ]
};
