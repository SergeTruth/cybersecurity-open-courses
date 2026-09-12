window.COURSE_CODE_MODULE = {
  "title": "Idempotency needs an atomic shared-store contract",
  "codeIntro": "Conceptual TypeScript for a local database effect. The adapter provides a unique key on tenant, operation type, and idempotency key. Authorization and input validation precede this code.",
  "codeExamples": [
    {
      "title": "Commit claim, local effect, and result together",
      "language": "typescript",
      "blurb": "claimOrReadCompleted must use database uniqueness and conflict handling. It either owns a new claim or returns the committed matching record after a competing transaction completes. It must never allow two owners. Database retry handling may rerun the whole transaction.",
      "code": "return db.transaction(async tx => {\n  const claim = await tx.claimOrReadCompleted({\n    tenantId: auth.tenantId,\n    operation: \"create-order\",\n    idempotencyKey,\n    inputFingerprint\n  });\n  if (!claim.isOwner) {\n    if (claim.inputFingerprint !== inputFingerprint) {\n      throw new IdempotencyConflictError();\n    }\n    return claim.result;\n  }\n  const order = await tx.createOrder(validatedInput);\n  await tx.completeClaim(claim.id, order);\n  return order;\n});\n// All writes above are local to this database transaction.\n// Remote effects require provider idempotency or a durable\n// workflow; an outbox still needs duplicate-safe delivery."
    }
  ]
};
