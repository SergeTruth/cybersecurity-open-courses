window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Node.js Randomness APIs with concrete, reviewable Node.js boundaries.",
  "codeExamples": [
    {
      "title": "Generate a URL-safe secret token",
      "language": "javascript",
      "blurb": "Thirty-two random bytes provide 256 bits before encoding; base64url changes representation without adding entropy.",
      "code": "import { randomBytes } from \"node:crypto\";\n\nexport function newSecretToken() {\n  return randomBytes(32).toString(\"base64url\");\n}\n"
    },
    {
      "title": "Generate a public UUID identifier",
      "language": "javascript",
      "blurb": "randomUUID is suitable for non-secret uniqueness; callers must not treat the identifier itself as authorization.",
      "code": "import { randomUUID } from \"node:crypto\";\n\nexport function newPublicJobId() {\n  return { id: randomUUID(), createdAt: new Date().toISOString() };\n}\n"
    }
  ]
};
