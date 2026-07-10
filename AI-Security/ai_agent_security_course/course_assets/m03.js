window.COURSE_MODULE = {
  "title": "Common Agent Threats",
  "graphicAlt": "Threat map for AI agents showing prompt injection, indirect prompt injection, tool misuse, memory risk, data leakage, and multi-agent influence.",
  "narration": "AI agents can face many threat types. Prompt injection may manipulate the model into ignoring intended instructions or misusing tools. Indirect prompt injection may hide malicious instructions inside documents, web pages, emails, tickets, repository content, or retrieved knowledge.\n\nTool misuse may cause the agent to call APIs or perform actions that were not intended. Excessive permissions may allow small mistakes to become major incidents. Memory poisoning may corrupt stored context, preferences, notes, or task history that the agent later relies on.\n\nData leakage may occur if the agent retrieves, summarizes, or shares information in the wrong context. Multi-agent systems can introduce additional risks when one agent influences another, delegates work poorly, or passes along untrusted content as if it were trusted.\n\nThese threats should be analyzed through the full system. The useful question is not only whether the model can be influenced. It is what data, tools, approvals, memory, and downstream workflows can be reached if influence occurs.",
  "narrationPoints": [
    "AI agents can face many threat types.",
    "Prompt injection may manipulate the model into ignoring intended instructions or misusing tools.",
    "Indirect prompt injection may hide malicious instructions inside documents, web pages, emails, tickets, repository content, or retrieved knowledge.",
    "Tool misuse may cause the agent to call APIs or perform actions that were not intended.",
    "Excessive permissions may allow small mistakes to become major incidents.",
    "Memory poisoning may corrupt stored context, preferences, notes, or task history that the agent later relies on."
  ]
};
