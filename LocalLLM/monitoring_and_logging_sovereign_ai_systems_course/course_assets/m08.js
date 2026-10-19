window.COURSE_MODULE = {
  "title": "Dashboards and Operational Reviews",
  "graphicAlt": "Audience-relevant trend reviews produce decisions, assigned work and improvements to monitoring.",
  "narration": "Dashboards turn telemetry into a shared operating picture. They should be designed for decisions, not decoration. A useful dashboard connects system health to workflow purpose: whether the AI service is available, whether requests are succeeding, whether latency is acceptable, whether retrieval is healthy, and whether resource pressure is changing.\n\nDifferent audiences may need different views. Operators may focus on service health, queue depth, model loading, hardware pressure, and failures. Privacy and governance reviewers may focus on logging modes, audit exceptions, retention status, export activity, and access patterns. Engineering leads may watch usage trends, cost signals, backlog items, and recurring reliability problems.\n\nA dashboard is only the start. Operational reviews turn data into action. A weekly or monthly review might identify stale debug logging, repeated failures in a connector, a model server that needs tuning, a workflow with unclear ownership, or retention rules that no longer match policy. The outcome should be notes, backlog items, owners, and follow-up dates.\n\nTrends often matter more than isolated numbers. A single slow request may be unimportant, while a steady rise in latency, storage use, queue depth, or audit exceptions may reveal a larger issue. Reviews help teams see gradual drift before it becomes an incident.\n\nGood review habits make sovereign AI operations more accountable. They connect telemetry to maintenance, privacy, governance, and continuous improvement instead of leaving metrics to sit unread.",
  "narrationPoints": [
    "Dashboards turn telemetry into a shared operating picture.",
    "Different audiences may need different views.",
    "A dashboard is only the start.",
    "Trends often matter more than isolated numbers.",
    "Good review habits make sovereign AI operations more accountable."
  ]
};
