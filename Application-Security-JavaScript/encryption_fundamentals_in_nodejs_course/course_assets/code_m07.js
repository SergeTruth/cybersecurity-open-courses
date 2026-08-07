window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Passwords, Secrets, and What Not to Encrypt with concrete, reviewable Node.js boundaries.",
  "codeExamples": [
    {
      "title": "Hash passwords with scrypt instead of encrypting them",
      "language": "javascript",
      "blurb": "Password verification needs a slow, salted one-way construction rather than reversible encryption.",
      "code": "import { randomBytes, scrypt as scryptCallback } from \"node:crypto\";\nimport { promisify } from \"node:util\";\nconst scrypt = promisify(scryptCallback);\nconst parameters = { N: 131072, r: 8, p: 1, maxmem: 256 * 1024 * 1024 };\n\nexport async function hashPassword(password) {\n  if (typeof password !== \"string\" || password.length < 12 || Buffer.byteLength(password, \"utf8\") > 1024) throw new TypeError(\"password policy failed\");\n  const salt = randomBytes(16);\n  const derived = await scrypt(password, salt, 32, parameters);\n  return \"scrypt$131072$8$1$\" + salt.toString(\"base64url\") + \"$\" + Buffer.from(derived).toString(\"base64url\");\n}\n"
    },
    {
      "title": "Verify a stored scrypt password record",
      "language": "javascript",
      "blurb": "The parser requires a primitive bounded record, rejects unsupported parameters and noncanonical Base64URL before expensive work, and compares the derived value in constant time.",
      "code": "import { scrypt as scryptCallback, timingSafeEqual } from \"node:crypto\";\nimport { promisify } from \"node:util\";\nconst scrypt = promisify(scryptCallback);\nconst parameters = { N: 131072, r: 8, p: 1, maxmem: 256 * 1024 * 1024 };\nconst MAXIMUM_PASSWORD_RECORD_BYTES = 256;\n\nfunction decodeCanonicalBase64Url(text, expectedBytes) {\n  if (typeof text !== \"string\" || !/^[A-Za-z0-9_-]+$/.test(text)) return null;\n  const decoded = Buffer.from(text, \"base64url\");\n  if (decoded.length !== expectedBytes || decoded.toString(\"base64url\") !== text) return null;\n  return decoded;\n}\n\nexport async function verifyPassword(password, record) {\n  if (typeof password !== \"string\" || Buffer.byteLength(password, \"utf8\") > 1024 ||\n      typeof record !== \"string\" || Buffer.byteLength(record, \"utf8\") > MAXIMUM_PASSWORD_RECORD_BYTES) {\n    return false;\n  }\n  const parts = record.split(\"$\");\n  if (parts.length !== 6) return false;\n  const [name, n, r, p, saltText, hashText] = parts;\n  if (name !== \"scrypt\" || n !== \"131072\" || r !== \"8\" || p !== \"1\") return false;\n  const salt = decodeCanonicalBase64Url(saltText, 16);\n  const expected = decodeCanonicalBase64Url(hashText, 32);\n  if (!salt || !expected) return false;\n  const actual = Buffer.from(await scrypt(password, salt, 32, parameters));\n  return timingSafeEqual(actual, expected);\n}\n"
    }
  ]
};
