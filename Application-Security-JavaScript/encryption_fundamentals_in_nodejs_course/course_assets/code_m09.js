window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Errors, Logging, Testing, and Code Review with concrete, reviewable Node.js boundaries.",
  "codeExamples": [
    {
      "title": "Map decryption failures to one safe error",
      "language": "javascript",
      "blurb": "Callers receive a stable error code while detailed cryptographic failures stay out of client responses and routine logs.",
      "code": "export class ProtectedDataError extends Error {\n  constructor() { super(\"protected data could not be read\"); this.code = \"PROTECTED_DATA_INVALID\"; }\n}\n\nexport async function safelyDecrypt(envelope, decrypt, audit) {\n  if (typeof decrypt !== \"function\" || typeof audit !== \"function\") {\n    throw new TypeError(\"decryption and audit adapters required\");\n  }\n  const suppliedKeyId = envelope?.kid;\n  const auditKeyId = typeof suppliedKeyId === \"string\" &&\n    /^[A-Za-z0-9._:-]{1,64}$/.test(suppliedKeyId)\n    ? suppliedKeyId : \"unknown\";\n  try { return await decrypt(envelope); }\n  catch {\n    const safeError = new ProtectedDataError();\n    try {\n      await audit({ event: \"decrypt_failed\", keyId: auditKeyId });\n    } catch (auditError) {\n      const combined = new AggregateError([safeError, auditError], safeError.message);\n      combined.code = safeError.code;\n      throw combined;\n    }\n    throw safeError;\n  }\n}\n"
    },
    {
      "title": "Test that tampering never returns plaintext",
      "language": "javascript",
      "blurb": "The regression first proves the original envelope decrypts, then flips decoded ciphertext and tag bytes, re-encodes each canonical field, and requires authenticated decryption to reject both changes.",
      "code": "import test from \"node:test\";\nimport assert from \"node:assert/strict\";\n\nfunction changedCanonicalField(value, field) {\n  if (typeof value !== \"string\" || !/^[A-Za-z0-9_-]+$/.test(value)) {\n    throw new TypeError(field + \" must be canonical Base64URL\");\n  }\n  const bytes = Buffer.from(value, \"base64url\");\n  if (bytes.length < 1 || bytes.toString(\"base64url\") !== value) {\n    throw new TypeError(field + \" must be canonical Base64URL\");\n  }\n  bytes[0] ^= 1;\n  return bytes.toString(\"base64url\");\n}\n\nexport function registerTamperTests(seal, open) {\n  if (typeof seal !== \"function\" || typeof open !== \"function\") {\n    throw new TypeError(\"seal and open functions required\");\n  }\n  test(\"ciphertext and tag tampering fail closed\", async () => {\n    const original = await seal(\"classified\");\n    const plaintext = await open(original);\n    assert.equal(Buffer.isBuffer(plaintext) ? plaintext.toString(\"utf8\") : plaintext,\n      \"classified\");\n    for (const field of [\"ciphertext\", \"tag\"]) {\n      const changed = {\n        ...original,\n        [field]: changedCanonicalField(original?.[field], field)\n      };\n      await assert.rejects(async () => open(changed));\n    }\n  });\n}"
    }
  ]
};
