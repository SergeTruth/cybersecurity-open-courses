window.COURSE_MODULE = {
  "title": "Instruction Hierarchy and Prompt Injection Defense",
  "graphicAlt": "Illustration for a lesson on instruction hierarchy and prompt injection defense for agents.",
  "narration": "Instruction hierarchy helps an agent distinguish trusted configuration from lower-trust content. System and developer instructions express application-controlled behavior. User prompts express goals within allowed boundaries. Retrieved text, uploaded files, tool outputs, emails, tickets, web pages, and memory entries are data sources. They may contain useful facts, but they should not be able to change the agent's permissions, rewrite tool policy, or authorize data access.\n\nPrompt injection risk appears when untrusted natural language influences the agent in unintended ways. Direct injection comes through user-provided text. Indirect injection can arrive through content the agent later reads or retrieves. The defense is not to memorize attack strings. The defense is to ensure untrusted content cannot gain authority just because it is present in context. Source labeling, provenance, context separation, and application-enforced policy all support that goal.\n\nPrompt wording helps guide behavior, but it is not a reliable security boundary by itself. A system prompt can tell the model not to follow instructions inside retrieved documents, and that is useful. But Python code still needs to enforce authorization, tool permissions, approval gates, data minimization, and output handling. Security-critical decisions should not depend on the model obeying a sentence when untrusted content is also competing for attention.\n\nContext minimization reduces pressure on the instruction hierarchy. The less irrelevant text the agent receives, the fewer opportunities there are for stale, misleading, or adversarial content to influence behavior. The application should include only the data needed for the task, filtered by user permissions and source authority. When high-impact actions are possible, the agent should move from suggestion to action only through explicit checks and review points.",
  "narrationPoints": [
    "Instruction hierarchy helps an agent distinguish trusted.",
    "Prompt injection risk appears.",
    "Prompt wording helps guide behavior.",
    "Context minimization reduces pressure on the instruction.",
    "Security-critical decisions should not depend on the model.",
    "The application should include only the data needed."
  ]
};
