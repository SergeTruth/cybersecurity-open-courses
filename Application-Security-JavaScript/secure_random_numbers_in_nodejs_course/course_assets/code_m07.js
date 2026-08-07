window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Salts, Nonces, IVs, and Algorithm Requirements with concrete, reviewable Node.js boundaries.",
  "codeExamples": [
    {
      "title": "Generate an algorithm-specific AES-GCM nonce",
      "language": "javascript",
      "blurb": "The helper names its construction and returns exactly the 96-bit nonce recommended for GCM, not an arbitrary generated constant.",
      "code": "import { randomBytes } from \"node:crypto\";\n\nexport const AES_GCM_NONCE_BYTES = 12;\nexport function newAesGcmNonce() { return randomBytes(AES_GCM_NONCE_BYTES); }\n"
    },
    {
      "title": "Generate a password-hashing salt",
      "language": "javascript",
      "blurb": "A fresh 128-bit salt is generated for each password record; salts need uniqueness, not secrecy.",
      "code": "import { randomBytes } from \"node:crypto\";\n\nexport const PASSWORD_SALT_BYTES = 16;\nexport function newPasswordSalt() { return randomBytes(PASSWORD_SALT_BYTES); }\n\nexport function encodePasswordSalt(salt) {\n  if (!Buffer.isBuffer(salt) || salt.length !== PASSWORD_SALT_BYTES) throw new TypeError(\"invalid salt\");\n  return salt.toString(\"base64url\");\n}\n"
    }
  ]
};
