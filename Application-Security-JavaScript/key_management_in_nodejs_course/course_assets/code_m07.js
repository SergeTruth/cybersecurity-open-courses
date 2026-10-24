window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Rotation, Versioning, and Envelope Encryption with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Encrypt with the active key version",
      "language": "javascript",
      "blurb": "New ciphertext records the active key identifier while older decrypt-only keys remain available for reads.",
      "code": "export async function encryptWithKeyRing(plaintext, keyRing, encrypt) {\n  const active = await keyRing.active(\"customer-data\");\n  if (active?.state !== \"active\" || typeof active.id !== \"string\" || !active.id) {\n    throw new Error(\"no active encryption key\");\n  }\n  const payload = await encrypt(plaintext, active.key);\n  if (!payload || typeof payload !== \"object\" || Array.isArray(payload)) {\n    throw new TypeError(\"invalid encryption result\");\n  }\n  return { ...payload, keyId: active.id };\n}\n"
    },
    {
      "title": "Rotate wrapped data keys without re-encrypting data",
      "language": "javascript",
      "blurb": "Envelope rotation unwraps with the recorded old version and wraps the same data key with the new key manager version.",
      "code": "export async function rewrapDataKey(record, keyManager, newKeyId) {\n  const dataKey = await keyManager.unwrapKey(record.keyId, record.wrappedKey);\n  try {\n    return { ...record, keyId: newKeyId, wrappedKey: await keyManager.wrapKey(newKeyId, dataKey) };\n  } finally { dataKey.fill(0); }\n}\n"
    }
  ]
};
