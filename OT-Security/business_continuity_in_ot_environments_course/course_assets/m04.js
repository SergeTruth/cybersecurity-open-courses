window.COURSE_MODULE = {
  "title": "Recovery Objectives and Operational Priorities",
  "graphicAlt": "Blank course graphic placeholder",
  "narration": "A recovery time objective, or RTO, is a target for how quickly a system or process should be restored after disruption. A recovery point objective, or RPO, describes how much data or configuration change can be lost. Maximum tolerable downtime marks the point beyond which impact becomes unacceptable.\n\nThese objectives need OT interpretation. Restoring an HMI server in two hours does not mean the process can safely restart in two hours. Equipment may require inspection, utilities may need stabilization, logic may need validation, and upstream or downstream operations may not be ready.\n\nSafety-first decision-making sets boundaries around speed. A process should remain shut down or degraded when alarms, interlocks, field states, communications, or operator visibility cannot be trusted. Business pressure does not change those physical conditions.\n\nPrioritize restoration by process dependency. Foundational utilities, networks, time, identity, controllers, and operator visibility may need to recover before historians or reporting. The exact sequence varies by facility and should be engineered rather than copied from a generic checklist.\n\nObjectives should include people, spares, vendor response, and startup duration, not just backup restore time. Define who can authorize degraded operation, safe shutdown, technical recovery, and return to production. Escalation paths should resolve conflicts between safety, operations, and business needs.\n\nMake objectives testable. Exercises should measure actual restore and restart times, data loss, validation effort, and unmet prerequisites. If results do not meet the target, improve resources or revise the objective transparently rather than preserving an unrealistic promise.",
  "narrationPoints": [
    "A recovery time objective, or RTO, is a target for how quickly a system or process should be restored after disruption.",
    "These objectives need OT interpretation.",
    "Safety-first decision-making sets boundaries around speed.",
    "Prioritize restoration by process dependency.",
    "Objectives should include people, spares, vendor response, and startup duration, not just backup restore time.",
    "Make objectives testable."
  ]
};
