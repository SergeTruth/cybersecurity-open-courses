window.COURSE_MODULE = {
  "title": "Human Approval and Action Controls",
  "graphicAlt": "Human approval workflow showing an agent proposed action, intent, data used, expected impact, review, and approval decision.",
  "narration": "Not every agent action should be automatic. Human approval can reduce risk for sensitive operations such as sending external messages, deleting data, changing permissions, modifying production systems, purchasing services, updating code, or accessing sensitive records.\n\nApproval workflows should be meaningful, not cosmetic. Users should be able to see what the agent intends to do, why it intends to do it, what data will be used, and what impact the action may have. The approval should happen before the sensitive action occurs.\n\nThe system should also distinguish low-risk help from high-risk execution. Drafting a message, summarizing a ticket, or suggesting a change is different from sending, closing, merging, deleting, or changing access. Those transitions need deliberate control points.\n\nWhen something goes wrong, the system should fail safely and limit damage rather than continuing blindly. Safe failure can include stopping the workflow, asking for review, reducing available tools, recording the event, and giving security teams enough context to investigate.",
  "narrationPoints": [
    "Not every agent action should be automatic.",
    "Human approval can reduce risk for sensitive operations such as sending external messages, deleting data, changing permissions, modifying production systems, purchasing services, updating code.",
    "Approval workflows should be meaningful, not cosmetic.",
    "Users should be able to see what the agent intends to do, why it intends to do it, what data will be used, and.",
    "The approval should happen before the sensitive action occurs.",
    "The system should also distinguish low-risk help from high-risk execution."
  ]
};
