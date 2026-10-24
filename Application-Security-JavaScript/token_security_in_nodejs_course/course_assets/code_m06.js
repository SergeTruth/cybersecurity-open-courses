window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply OAuth, Access Tokens, and Refresh Tokens through distinct, reviewable JavaScript security boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Rotate a refresh-token family atomically",
      "language": "javascript",
      "blurb": "The store consumes one refresh token exactly once, creates its successor in the same transaction, and retains family identity for replay containment.",
      "code": "export async function rotateRefreshToken(store, presentedDigest, now = new Date()) {\n  return store.transaction(async (tx) => {\n    const current = await tx.consumeActive(presentedDigest, now);\n    if (!current) throw new Error(\"refresh token unavailable\");\n    const successor = await tx.createSuccessor({ familyId: current.familyId, subjectId: current.subjectId,\n      parentId: current.id, expiresAt: current.familyExpiresAt });\n    return { familyId: current.familyId, token: successor.plaintext };\n  });\n}\n"
    },
    {
      "title": "Revoke a token family after refresh replay",
      "language": "javascript",
      "blurb": "A consumed refresh token indicates replay; the workflow revokes the durable family and active sessions rather than issuing another successor.",
      "code": "export async function containRefreshReplay(store, tokenRecord, evidence) {\n  if (!tokenRecord?.familyId || tokenRecord.consumedAt == null) throw new TypeError(\"consumed refresh token required\");\n  await store.revokeFamily(tokenRecord.familyId, { reason: \"refresh-replay\", detectedAt: evidence.detectedAt });\n  await store.revokeSessions(tokenRecord.subjectId, { after: tokenRecord.issuedAt });\n  return { contained: true, familyId: tokenRecord.familyId };\n}\n"
    }
  ]
};
