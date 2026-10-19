window.COURSE_MODULE = {
  "title": "What to Observe in AI Workflows",
  "graphicAlt": "Workflow mapping identifies metadata needs for model, retrieval, tool and infrastructure health.",
  "narration": "Before choosing what to log, map the AI workflow. A sovereign AI system may include a user interface, a local model server, a private API, model routing, private RAG retrieval, vector stores, document connectors, tool calls, queues, workers, storage, and output handling. Each component may need visibility, but not every component needs the same level of detail.\n\nStart with operational questions. Is the system working? Which model, version, configuration, and workflow handled the request? Did retrieval use the expected source set? Did a tool run, and did it require approval? Did the response fail, time out, or fall back to a degraded path? Can the team investigate later without exposing sensitive content unnecessarily?\n\nUser requests and responses are high-risk telemetry areas, so record metadata carefully. A structured event may capture request type, workflow name, model identifier, status, latency, and error category without storing the full prompt or output. For private RAG, record source decisions and eligibility without copying entire sensitive chunks by default.\n\nInfrastructure signals matter too. Monitor model load behavior, queue depth, worker failures, storage pressure, CPU and RAM use, accelerator or GPU pressure where available, disk space, network conditions, and slow dependencies. A model may appear unreliable when the real issue is an overloaded machine or a stuck document connector.\n\nGood observability follows the workflow end to end. It captures enough to operate, review, and improve the system while keeping telemetry aligned with privacy, ownership, and data boundary expectations.",
  "narrationPoints": [
    "Before choosing what to log, map the AI workflow.",
    "Start with operational questions.",
    "User requests and responses are high-risk telemetry areas, so record metadata carefully.",
    "Infrastructure signals matter too.",
    "Good observability follows the workflow end to end."
  ]
};
