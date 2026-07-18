window.COURSE_MODULE = {
  "title": "Agent Architecture and Trust Boundaries",
  "graphicAlt": "Illustration for a lesson on agent architecture and trust boundaries.",
  "narration": "A secure agent architecture names every source of instruction, data, identity, credential, and action. Users provide prompts and goals. System and developer instructions define trusted application behavior. Retrieved documents, uploaded files, conversation history, memory, tool outputs, model responses, logs, external APIs, identity providers, databases, queues, and background jobs all participate in the workflow. Each component has a different authority level, and secure design keeps those levels visible.\n\nTrust boundaries are crossed whenever data, instructions, credentials, or control moves between components with different authority. A user prompt is not the same as a system instruction. A retrieved document is not the same as policy. A memory entry is not necessarily current truth. A model response is not an approved action. A tool output may be useful evidence, but it may still be incomplete, stale, or scoped to a specific account. These distinctions shape what the agent is allowed to trust and what it may do next.\n\nUntrusted text should be treated as data rather than policy. A document, email, ticket, webpage, or uploaded file can contain language that looks like instructions to the model, but it should not be allowed to redefine permissions, grant tool access, disable logging, or override approval gates. Source labeling and provenance make this distinction practical. They help the application and the user understand where content came from and how much authority it should have.\n\nAgent architecture should also make responsibility explicit. Who owns the agent, the tool credentials, the retrieval sources, the memory store, the approval policy, and the incident response path? Which service is responsible for authorization? Which component records audit events? Which process reviews tool changes? When responsibility is explicit, agent security becomes a maintainable engineering system instead of a set of hopeful prompts.",
  "narrationPoints": [
    "A secure agent architecture names every source.",
    "Trust boundaries are crossed whenever data.",
    "Untrusted text should be treated as data rather than policy.",
    "Agent architecture should also make responsibility explicit.",
    "They help the application and the user understand.",
    "A document, email, ticket, webpage, or uploaded file can."
  ]
};
