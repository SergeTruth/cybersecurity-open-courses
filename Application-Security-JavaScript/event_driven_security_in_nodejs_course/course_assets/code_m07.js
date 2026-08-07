window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Safe Retries, Dead-Letter Queues, and Failure Handling with concrete, reviewable Node.js boundaries.",
  "codeExamples": [
    {
      "title": "Classify retries and cap backoff",
      "language": "javascript",
      "blurb": "Only transient failures retry, attempts are bounded, and exponential delay includes jitter without exceeding the service budget.",
      "code": "import { randomInt } from \"node:crypto\";\n\nfunction safeErrorCode(error) {\n  try { return typeof error?.code === \"string\" ? error.code : undefined; }\n  catch { return undefined; }\n}\n\nexport function retryDecision(error, attempt) {\n  const transient = new Set([\"ETIMEDOUT\", \"ECONNRESET\", \"DEPENDENCY_BUSY\"]);\n  if (!transient.has(safeErrorCode(error)) || !Number.isInteger(attempt) || attempt < 0 || attempt >= 5) {\n    return Object.freeze({ retry: false });\n  }\n  const ceilingMs = Math.min(30_000, 500 * 2 ** attempt);\n  return Object.freeze({\n    retry: true, delayMs: randomInt(Math.floor(ceilingMs / 2), ceilingMs + 1)\n  });\n}\n"
    },
    {
      "title": "Build a redacted dead-letter record",
      "language": "javascript",
      "blurb": "The dead-letter entry preserves routing and failure evidence but excludes the original secret-bearing payload.",
      "code": "const eventIdentifier = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,79}$/;\nconst errorIdentifier = /^[A-Z][A-Z0-9_]{0,39}$/;\n\nfunction safeErrorCode(error) {\n  try { return typeof error?.code === \"string\" ? error.code : undefined; }\n  catch { return undefined; }\n}\n\nexport function toDeadLetter(event, error, attempts) {\n  const eventId = event?.id;\n  const eventType = event?.type;\n  const errorCode = safeErrorCode(error);\n  if (typeof eventId !== \"string\" || !eventIdentifier.test(eventId) ||\n      typeof eventType !== \"string\" || !eventIdentifier.test(eventType) ||\n      typeof errorCode !== \"string\" || !errorIdentifier.test(errorCode) ||\n      !Number.isSafeInteger(attempts) || attempts < 0 || attempts > 100) {\n    throw new TypeError(\"dead-letter evidence invalid\");\n  }\n  return Object.freeze({\n    eventId, eventType, errorCode, attempts, failedAt: new Date().toISOString()\n  });\n}\n"
    }
  ]
};
