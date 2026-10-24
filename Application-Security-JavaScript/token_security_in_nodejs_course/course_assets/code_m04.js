window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Opaque Tokens, API Keys, and Stored Token Digests through distinct, reviewable JavaScript security boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Store only a digest of an opaque API token",
      "language": "javascript",
      "blurb": "The record keeps a versioned pepper identifier and HMAC digest, allowing lookup and rotation without persisting the bearer credential itself.",
      "code": "import { createHmac } from \"node:crypto\";\nexport function opaqueTokenRecord(token, pepper, pepperId) {\n  if (typeof token !== \"string\" || typeof pepperId !== \"string\" || !/^[A-Za-z0-9._-]{1,64}$/.test(pepperId) || !/^[A-Za-z0-9_-]{40,200}$/.test(token) || !Buffer.isBuffer(pepper) || pepper.length < 32) throw new TypeError(\"strong token and pepper required\");\n  return { digest: createHmac(\"sha256\", pepper).update(token, \"utf8\").digest(\"hex\"), pepperId, createdAt: new Date().toISOString() };\n}\n"
    },
    {
      "title": "Verify an opaque token in constant time",
      "language": "javascript",
      "blurb": "The verifier recomputes the versioned digest, compares equal-length bytes with timingSafeEqual, and checks revocation and expiration independently.",
      "code": "import { createHmac, timingSafeEqual } from \"node:crypto\";\nexport function verifyOpaqueToken(token, record, resolvePepper, now = Date.now()) {\n  if (typeof token !== \"string\" || !/^[A-Za-z0-9_-]{40,200}$/.test(token) ||\n      typeof record?.digest !== \"string\" || !/^[a-f0-9]{64}$/i.test(record.digest) ||\n      typeof record.pepperId !== \"string\" || !record.pepperId ||\n      typeof record.expiresAt !== \"string\" || !Number.isFinite(now)) return false;\n  const expiresAt = Date.parse(record.expiresAt);\n  if (record.revokedAt != null || !Number.isFinite(expiresAt) || expiresAt <= now) return false;\n  // Provider failures remain operational errors, not authentication success.\n  const pepper = resolvePepper(record.pepperId);\n  if (!Buffer.isBuffer(pepper) || pepper.length < 32) throw new Error(\"pepper policy invalid\");\n  const actual = createHmac(\"sha256\", pepper).update(token, \"utf8\").digest();\n  return timingSafeEqual(actual, Buffer.from(record.digest, \"hex\"));\n}\n"
    }
  ]
};
