window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Tokens, Sessions, and One-Time Links with concrete, reviewable Node.js boundaries.",
  "codeExamples": [
    {
      "title": "Size a one-time token from an entropy requirement",
      "language": "javascript",
      "blurb": "The calculation converts required bits to bytes explicitly and applies a minimum suitable for online bearer tokens.",
      "code": "import { randomBytes } from \"node:crypto\";\n\nexport function issueOneTimeToken(requiredBits = 192) {\n  if (!Number.isSafeInteger(requiredBits) || requiredBits < 128 || requiredBits > 512) throw new RangeError(\"unsupported entropy requirement\");\n  const bytes = Math.ceil(requiredBits / 8);\n  return randomBytes(bytes).toString(\"base64url\");\n}\n"
    },
    {
      "title": "Store only a one-time token digest",
      "language": "javascript",
      "blurb": "The record stores only a scoped SHA-256 digest, a bounded account identifier, and an immutable canonical expiry string under an application-owned lifetime ceiling.",
      "code": "import { createHash } from \"node:crypto\";\n\nexport function oneTimeTokenRecord(token, accountId, lifetimeMs = 15 * 60 * 1000) {\n  if (typeof token !== \"string\" || token.length < 22 || token.length > 1024) {\n    throw new TypeError(\"token length invalid\");\n  }\n  if (typeof accountId !== \"string\" || !/^[A-Za-z0-9_-]{1,128}$/.test(accountId)) {\n    throw new TypeError(\"account identity invalid\");\n  }\n  if (!Number.isSafeInteger(lifetimeMs) || lifetimeMs < 60_000 ||\n      lifetimeMs > 24 * 60 * 60 * 1000) {\n    throw new RangeError(\"token lifetime invalid\");\n  }\n  const expiresAtMs = Date.now() + lifetimeMs;\n  if (!Number.isSafeInteger(expiresAtMs)) throw new RangeError(\"token expiry invalid\");\n  const expiresAt = new Date(expiresAtMs).toISOString();\n  const digest = createHash(\"sha256\").update(\"password-reset\\0\").update(token).digest(\"hex\");\n  return Object.freeze({ digest, accountId, expiresAt, usedAt: null });\n}\n"
    }
  ]
};
