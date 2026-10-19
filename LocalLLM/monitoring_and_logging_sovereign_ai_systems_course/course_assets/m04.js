window.COURSE_MODULE = {
  "title": "Metrics for Models, Servers, and Hardware",
  "graphicAlt": "Service and hardware signals combine to diagnose performance causes and inform operating decisions.",
  "narration": "Metrics help teams understand whether a sovereign AI system is healthy, slow, overloaded, unstable, or approaching a resource limit. Logs explain events, but metrics show patterns over time. They help operators decide whether to tune the workflow, resize resources, reduce load, split workloads, restart services, or change user expectations.\n\nCore service metrics include request latency, throughput, queue depth, error rate, timeout rate, retry count, model load time, failed generation, and degraded responses. For local or private model servers, model load behavior is often important because startup and reload time can dominate user experience.\n\nAI-specific metrics should be handled carefully. Context size, input and output length, token use at a high level, truncation events, retrieval counts, and response failures can all explain quality and performance issues. These metrics do not require storing full prompts or outputs by default.\n\nHardware metrics are often central in sovereign AI. CPU load, RAM pressure, accelerator utilization, GPU or VRAM pressure where available, disk space, disk throughput, network conditions, thermal behavior, and power constraints can all affect reliability. A model may look unreliable when the real cause is resource exhaustion.\n\nMetrics should support decisions. A dashboard with dozens of numbers is less useful than a small set of signals connected to operating questions. Can the system handle current load? Is quality being affected by resource pressure? Is a queue growing? Are failures concentrated in one model, source, or worker?",
  "narrationPoints": [
    "Metrics help teams understand whether a sovereign AI system is healthy, slow, overloaded, unstable, or approaching a resource limit.",
    "Core service metrics include request latency, throughput, queue depth, error rate, timeout rate, retry count, model load time, failed generation...",
    "AI-specific metrics should be handled carefully.",
    "Hardware metrics are often central in sovereign AI.",
    "Metrics should support decisions."
  ]
};
