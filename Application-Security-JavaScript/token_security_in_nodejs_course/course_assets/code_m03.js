window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Secure Token Generation and Entropy through distinct, reviewable JavaScript security boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Generate a high-entropy URL-safe bearer token",
      "language": "javascript",
      "blurb": "The token uses 256 bits from Node's cryptographic generator and base64url encoding without reducing entropy through a custom alphabet or modulo operation.",
      "code": "import { randomBytes } from \"node:crypto\";\nexport function generateBearerToken() {\n  return randomBytes(32).toString(\"base64url\");\n}\n"
    },
    {
      "title": "Use UUIDs only for public token record identity",
      "language": "javascript",
      "blurb": "A random UUID provides a public database identifier while a separate secret capability carries authentication authority.",
      "code": "import { randomBytes, randomUUID } from \"node:crypto\";\nexport function newTokenRecordIdentity() {\n  return { recordId: randomUUID(), secret: randomBytes(32).toString(\"base64url\") };\n}\n"
    }
  ]
};
