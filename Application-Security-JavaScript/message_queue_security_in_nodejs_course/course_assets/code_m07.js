window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Retries, Poison Messages, and Dead-Letter Queues with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Bound poison-message retries",
      "language": "javascript",
      "blurb": "Headers are treated as untrusted input; retry count and delay are capped before republishing.",
      "code": "export function nextRetry(headers, errorCode) {\n  const raw = headers?.[\"x-attempts\"] ?? 0;\n  const attempts = typeof raw === \"number\" ? raw : typeof raw === \"string\" && /^(?:0|[1-9]\\d{0,2})$/.test(raw) ? Number(raw) : NaN;\n  const retryable = new Set([\"DEPENDENCY_TIMEOUT\", \"BROKER_UNAVAILABLE\"]);\n  if (!Number.isSafeInteger(attempts) || attempts < 0 || attempts >= 4 || !retryable.has(errorCode)) {\n    return { destination: \"dead-letter\", attempts: Number.isSafeInteger(attempts) ? attempts : 0 };\n  }\n  return { destination: \"retry\", attempts: attempts + 1, delayMs: Math.min(20_000, 1000 * 2 ** attempts) };\n}\n"
    },
    {
      "title": "Preserve safe dead-letter evidence",
      "language": "javascript",
      "blurb": "The dead-letter record stores bounded identifiers and a classification, not the complete message body or stack trace.",
      "code": "export function deadLetterEvidence(message, error, attempts) {\n  return Object.freeze({\n    messageId: String(message?.messageId ?? \"missing\").slice(0, 80),\n    messageType: String(message?.type ?? \"unknown\").slice(0, 80),\n    classification: String(error?.code ?? \"UNCLASSIFIED\").slice(0, 40),\n    attempts: Math.max(0, Math.min(Number(attempts) || 0, 100)),\n    recordedAt: new Date().toISOString()\n  });\n}\n"
    }
  ]
};
