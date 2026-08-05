window.COURSE_MODULE = {
  "title": "Human Oversight and Approval Gates",
  "narration": "Certain agent actions should require human approval before execution. Examples include access changes, financial transactions, sensitive communications, destructive operations, production changes, data sharing, or actions with legal or safety consequences. The required oversight should reflect the impact, reversibility, uncertainty, and sensitivity of the resource involved.\n\nAn approval gate should provide meaningful context rather than a generic confirmation. The reviewer should see the exact proposed action, target, relevant data, reason, expected effect, and any important uncertainty. Approval must occur before execution, and the system should bind it to the reviewed parameters so the agent cannot silently substitute a different action afterward.\n\nRisk tiers help balance control with productivity. Reading public documentation, displaying help, or preparing a draft may not need the same review as sending, deleting, purchasing, merging, or changing access. Organizations can automate well-bounded, reversible tasks while placing deliberate human judgment at transitions where consequences become significant.\n\nIf approval is missing, denied, or expired, the workflow should stop safely. It should not seek another tool to bypass the decision or quietly reduce safeguards. Highly sensitive environments may require separation of duties or a second approver. Approval logs should record who reviewed what, when the decision occurred, and which exact action was permitted.",
  "narrationPoints": [
    "Certain agent actions should require human approval before execution.",
    "An approval gate should provide meaningful context rather than a generic confirmation.",
    "Risk tiers help balance control with productivity.",
    "If approval is missing, denied, or expired, the workflow should stop safely."
  ],
  "graphicAlt": "Blank white placeholder image for the human oversight and approval gate module."
};
