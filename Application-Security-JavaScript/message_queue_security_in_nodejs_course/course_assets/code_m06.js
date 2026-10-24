window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Idempotency, Duplicates, Ordering, and Replay with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Apply a queued command with a durable inbox",
      "language": "javascript",
      "blurb": "The inbox claim and inventory mutation occur in one transaction, so rollback preserves a legitimate retry after failure.",
      "code": "export async function reserveOnce(database, message) {\n  return database.transaction(async (tx) => {\n    const fresh = await tx.inbox.insertIfAbsent({ consumer: \"inventory\", messageId: message.messageId });\n    if (!fresh) return { duplicate: true };\n    await tx.inventory.reserve(message.payload.sku, message.payload.quantity);\n    await tx.inbox.complete(message.messageId);\n    return { duplicate: false };\n  });\n}\n"
    },
    {
      "title": "Enforce per-aggregate message ordering",
      "language": "javascript",
      "blurb": "A compare-and-set sequence record rejects stale and out-of-order commands without relying on delivery order from unrelated partitions.",
      "code": "export async function acceptNextSequence(sequenceStore, aggregateId, supplied) {\n  if (!Number.isSafeInteger(supplied) || supplied < 1) throw new TypeError(\"invalid sequence\");\n  const current = await sequenceStore.get(aggregateId);\n  const expected = (current ?? 0) + 1;\n  if (supplied !== expected) return { accepted: false, expected };\n  const updated = await sequenceStore.compareAndSet(aggregateId, current, supplied);\n  return { accepted: updated, expected: updated ? supplied + 1 : expected };\n}\n"
    }
  ]
};
