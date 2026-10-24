window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Observability, Testing, CI/CD, and Incident Response with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Record low-cardinality queue metrics",
      "language": "javascript",
      "blurb": "Metrics label only the known queue and outcome; message IDs, tenant IDs, and payload fields stay out of label sets.",
      "code": "const queues = new Set([\"orders\", \"fulfillment\", \"billing\"]);\nconst outcomes = new Set([\"ack\", \"retry\", \"dead-letter\"]);\n\nexport function recordDeliveryMetric(metrics, queue, outcome, seconds) {\n  if (typeof seconds !== \"number\" || !Number.isFinite(seconds) || seconds < 0) throw new TypeError(\"duration invalid\");\n  if (!queues.has(queue) || !outcomes.has(outcome)) throw new TypeError(\"metric label rejected\");\n  metrics.counter(\"queue_deliveries_total\", { queue, outcome }).inc();\n  metrics.histogram(\"queue_handler_seconds\", { queue }).observe(Math.max(0, Math.min(seconds, 300)));\n}\n"
    },
    {
      "title": "Enforce a readiness deadline with cooperative cancellation",
      "language": "javascript",
      "blurb": "The broker ping contract returns exactly true for readiness and honors AbortSignal cancellation. All other results fail closed; the deadline race bounds the caller wait, not a non-cooperative adapter.",
      "code": "export async function queueReadiness(broker, timeoutMs = 1000) {\n  if (!Number.isInteger(timeoutMs) || timeoutMs < 10 || timeoutMs > 10_000) throw new RangeError(\"invalid readiness timeout\");\n  const controller = new AbortController();\n  let timer;\n  const ping = Promise.resolve().then(() => broker.ping({ signal: controller.signal })).then(value => value === true, () => false);\n  const deadline = new Promise((resolve) => {\n    timer = setTimeout(() => { controller.abort(); resolve(false); }, timeoutMs);\n  });\n  try {\n    const ready = await Promise.race([ping, deadline]);\n    return { status: ready ? 200 : 503, body: { ready } };\n  } finally { clearTimeout(timer); }\n}\n"
    }
  ]
};
