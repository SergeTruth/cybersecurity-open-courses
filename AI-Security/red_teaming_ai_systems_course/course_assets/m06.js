window.COURSE_MODULE = {
  "title": "Evidence, Findings, and Severity",
  "graphicAlt": "Observed behavior is separated from potential system impact; likelihood and impact inform severity, supported by responsibly handled evidence.",
  "narration": "AI red team findings should be documented clearly and responsibly. A useful finding explains the scenario, affected component, observed behavior, potential impact, likelihood, severity, and recommended mitigation.\n\nEvidence should support the conclusion without exposing sensitive data or providing unnecessary misuse instructions. Reports should be specific enough for defenders and builders to act, but careful enough to avoid creating avoidable risk.\n\nGood findings separate observation from impact. The observation describes what happened during testing. The impact explains why it matters in the system's business, security, privacy, safety, or governance context.\n\nSeverity should reflect realistic likelihood and impact. A surprising model response may be lower severity if it cannot affect data or workflows. The same class of behavior may be higher severity if it can influence sensitive decisions, tool actions, or user trust.",
  "narrationPoints": [
    "AI red team findings should be documented clearly and responsibly.",
    "Evidence should support the conclusion without exposing sensitive data or providing unnecessary misuse instructions.",
    "Good findings separate observation from impact.",
    "Severity should reflect realistic likelihood and impact."
  ]
};
