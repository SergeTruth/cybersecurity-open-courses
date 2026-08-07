window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Keys, IVs, Nonces, Salts, and Tags with concrete, reviewable Node.js boundaries.",
  "codeExamples": [
    {
      "title": "Generate algorithm-sized encryption material",
      "language": "javascript",
      "blurb": "The constants come from the selected AES-256-GCM construction: a 32-byte key, 12-byte nonce, and 16-byte tag.",
      "code": "import { randomBytes } from \"node:crypto\";\n\nexport const AES_256_KEY_BYTES = 32;\nexport const GCM_NONCE_BYTES = 12;\nexport const GCM_TAG_BYTES = 16;\n\nexport function newAesGcmMaterial() {\n  return { key: randomBytes(AES_256_KEY_BYTES), nonce: randomBytes(GCM_NONCE_BYTES) };\n}\n"
    },
    {
      "title": "Validate an encryption envelope at the boundary",
      "language": "javascript",
      "blurb": "The fixed AES-256-GCM algorithm, canonical key identifier and Base64URL fields, exact nonce and tag sizes, and a pre-decode ciphertext ceiling reject malformed or oversized envelopes.",
      "code": "const canonicalBase64Url = /^[A-Za-z0-9_-]+$/;\nconst keyIdPattern = /^[A-Za-z0-9._-]{1,128}$/;\n\nfunction decodeCanonical(value, field, maximumBytes) {\n  if (typeof value !== \"string\" ||\n      value.length > Math.ceil(maximumBytes * 4 / 3) + 2 ||\n      !canonicalBase64Url.test(value)) {\n    throw new TypeError(\"invalid \" + field + \" encoding\");\n  }\n  const decoded = Buffer.from(value, \"base64url\");\n  if (decoded.toString(\"base64url\") !== value) throw new TypeError(\"noncanonical \" + field + \" encoding\");\n  return decoded;\n}\n\nexport function decodeAesGcmEnvelope(input, maxCiphertextBytes = 1024 * 1024) {\n  if (!Number.isSafeInteger(maxCiphertextBytes) || maxCiphertextBytes < 1 || maxCiphertextBytes > 16 * 1024 * 1024) {\n    throw new RangeError(\"ciphertext limit invalid\");\n  }\n  const keyId = input?.kid;\n  const ciphertextText = input?.ciphertext;\n  if (input?.alg !== \"A256GCM\" || typeof keyId !== \"string\" || !keyIdPattern.test(keyId) ||\n      typeof ciphertextText !== \"string\" ||\n      ciphertextText.length > Math.ceil(maxCiphertextBytes * 4 / 3)) {\n    throw new TypeError(\"invalid A256GCM envelope\");\n  }\n  const nonce = decodeCanonical(input.nonce, \"nonce\", 12);\n  const tag = decodeCanonical(input.tag, \"tag\", 16);\n  const ciphertext = decodeCanonical(ciphertextText, \"ciphertext\", maxCiphertextBytes);\n  if (nonce.length !== 12 || tag.length !== 16 || ciphertext.length < 1 || ciphertext.length > maxCiphertextBytes) {\n    throw new TypeError(\"invalid A256GCM envelope\");\n  }\n  return { algorithm: \"A256GCM\", keyId, nonce, tag, ciphertext };\n}\n"
    }
  ]
};
