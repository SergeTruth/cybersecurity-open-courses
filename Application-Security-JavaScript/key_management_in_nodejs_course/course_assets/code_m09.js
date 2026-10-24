window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Logging, Monitoring, Testing, and Incident Response with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Log key operations without key material",
      "language": "javascript",
      "blurb": "Audit records contain bounded identifiers and outcomes, never private keys, plaintext secrets, wrapped keys, or ciphertext bodies.",
      "code": "export function auditKeyOperation(logger, event) {\n  const allowedActions = new Set([\"create\", \"activate\", \"decrypt\", \"rotate\", \"revoke\", \"destroy\"]);\n  if (!allowedActions.has(event.action)) throw new TypeError(\"unknown key action\");\n  logger.info({ event: \"key_operation\", action: event.action,\n    keyId: String(event.keyId).slice(0, 64), actorId: String(event.actorId).slice(0, 64),\n    outcome: event.outcome === \"success\" ? \"success\" : \"failure\" });\n}\n"
    },
    {
      "title": "Contain a compromised key version",
      "language": "javascript",
      "blurb": "A trusted repository transaction commits containment and its durable outbox entry together. Repeated containment never restores revoked keys to use; the dispatcher delivers the unique job after commit.",
      "code": "function scalarId(value, label = \"identifier\") {\n  if (typeof value !== \"string\" || !/^[A-Za-z0-9][A-Za-z0-9._-]{2,63}$/.test(value)) throw new TypeError(label + \" invalid\");\n  return value;\n}\n\n// Trusted repository contract: the key CAS and unique outbox insert commit or roll back together.\n// An application-owned outbox dispatcher delivers the rewrap job after commit.\nexport async function containCompromisedKey(keyId, inventory, allowDecrypt) {\n  scalarId(keyId, \"key id\");\n  if (typeof allowDecrypt !== \"boolean\") throw new TypeError(\"explicit containment policy required\");\n  return inventory.transaction(async tx => {\n    const current = await tx.get(keyId);\n    if (!current || ![\"preactive\", \"active\", \"decrypt-only\", \"revoked\"].includes(current.state) ||\n        !Number.isSafeInteger(current.version) || current.version < 1) throw new Error(\"key not containable\");\n    const nextState = current.state === \"revoked\" || current.state === \"preactive\" || !allowDecrypt\n      ? \"revoked\" : \"decrypt-only\";\n    // Also CAS unchanged states: a concurrent revocation must invalidate this read.\n    const changed = await tx.compareAndSet(keyId, current.version,\n      { state: nextState, compromisedAt: current.compromisedAt ?? new Date().toISOString() });\n    if (changed !== true) throw new Error(\"key state changed; containment not applied\");\n    await tx.enqueueUnique(\"rewrap-key\", { keyId });\n    return nextState;\n  });\n}\n"
    }
  ]
};
