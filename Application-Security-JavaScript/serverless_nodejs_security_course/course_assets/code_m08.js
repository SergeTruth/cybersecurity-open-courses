window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Runtime Limits, Concurrency, Retries, and Idempotency with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Claim serverless idempotency in durable storage",
      "language": "javascript",
      "blurb": "A conditional write creates a lease keyed by authenticated operation identity; an absent ID is rejected rather than stored as undefined.",
      "code": "export async function claimInvocation(store, operationId, owner, now = Date.now()) {\n  if (typeof operationId !== \"string\" || typeof owner !== \"string\" || !/^[A-Za-z0-9_-]{1,128}$/.test(owner) ||\n      !Number.isSafeInteger(now) || now < 0 || now > Number.MAX_SAFE_INTEGER - 86_400_000 || !/^[a-z0-9-]{16,80}$/i.test(operationId)) throw new TypeError(\"valid operation id required\");\n  const leaseUntil = now + 30_000;\n  const claimed = await store.putIfAbsentOrExpired({ operationId, owner, leaseUntil, expiresAt: now + 24 * 60 * 60 * 1000 });\n  return claimed ? { status: \"claimed\", leaseUntil } : { status: \"duplicate-or-running\" };\n}\n"
    },
    {
      "title": "Complete an externally idempotent effect with durable state",
      "language": "javascript",
      "blurb": "The effect service durably deduplicates the stable operation key, while failures remain recorded instead of blindly releasing a claim after an uncertain commit.",
      "code": "export async function runIdempotentInvocation(store, effectClient, operationId, owner) {\n  const claim = await store.claim(operationId, owner);\n  if (!claim) return { duplicate: true };\n  try {\n    const result = await effectClient.perform({ idempotencyKey: operationId });\n    await store.complete(operationId, owner, { resultRef: result.id });\n    return { duplicate: false, result };\n  } catch (error) {\n    await store.fail(operationId, owner, { retryable: true, effectKey: operationId });\n    throw error;\n  }\n}\n"
    }
  ]
};
