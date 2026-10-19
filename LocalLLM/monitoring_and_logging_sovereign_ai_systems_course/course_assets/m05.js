window.COURSE_MODULE = {
  "title": "Request Tracing and Context Visibility",
  "graphicAlt": "Correlation connects model, retrieval, tool approval and outcome metadata without copying full sensitive context.",
  "narration": "Tracing connects events across an AI workflow. A single user action may pass through a web interface, authentication layer, model router, retrieval service, vector store, document connector, tool approval step, local model server, output formatter, and audit service. Without correlation, each component sees only its own fragment of the story.\n\nRequest IDs and correlation IDs make investigation possible. They help operators connect a user action to model calls, retrieval operations, tool calls, approval steps, retries, timeouts, and response status. A trace can show where latency occurred, which dependency failed, or why the workflow returned a degraded result.\n\nFor private RAG systems, tracing should be privacy-aware. It can record which source groups were considered, which filters were applied, which documents or chunks were eligible, and how many were used without storing full sensitive content unnecessarily. The goal is to understand retrieval decisions without turning traces into another source copy.\n\nContext-window visibility is also important. Operators may need to know prompt size, retrieved material count, omitted context, truncation events, formatting failures, and whether a response had enough evidence. These signals help diagnose bad answers while preserving restraint.\n\nTool-call traces should capture intent, target category, result status, approval state, and error category. They should not expose sensitive arguments by default. Good tracing makes sovereign AI workflows explainable while keeping the monitoring system aligned with privacy and governance boundaries.",
  "narrationPoints": [
    "Tracing connects events across an AI workflow.",
    "Request IDs and correlation IDs make investigation possible.",
    "For private RAG systems, tracing should be privacy-aware.",
    "Context-window visibility is also important.",
    "Tool-call traces should capture intent, target category, result status, approval state, and error category."
  ]
};
