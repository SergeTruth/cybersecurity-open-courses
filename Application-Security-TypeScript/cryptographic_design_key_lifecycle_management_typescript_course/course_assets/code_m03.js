window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These Node.js built-ins provide cryptographic generation. The excerpt generates no persistent key store and does not implement encryption or a token-delivery workflow.",
  "codeExamples": [
    {
      "title": "Generate for the intended role",
      "language": "typescript",
      "blurb": "The AES example generates a 256-bit KeyObject for an approved AES-based design; this does not select a mode or establish nonce policy. The token contains 32 random bytes encoded as base64url. Its encoding adds no security. Do not log keys or tokens; protect their storage and delivery.",
      "code": "import { generateKeySync, randomBytes, randomUUID } from \"node:crypto\";\n\nconst dataKey = generateKeySync(\"aes\", { length: 256 });\nconst resetToken = randomBytes(32).toString(\"base64url\");\nconst recordId = randomUUID();\n\n// dataKey is sensitive; a KeyObject is not a lifecycle system.\n// recordId is an identifier, not a universal AES key or nonce.\n// Math.random() is not suitable for these security values."
    },
    {
      "title": "Own nonce allocation across the key's lifetime",
      "language": "typescript",
      "blurb": "Conceptual allocator contract. It must satisfy the selected construction's nonce size, per-key uniqueness, and usage limits across every writer, restart, and restore. Merely providing an API with this name does not guarantee those properties. Prefer a vetted high-level service that owns this responsibility.",
      "code": "const nonce = await noncePolicy.allocateFor(activeKey.materialIdentity);\n// Random schemes need collision and usage budgets.\n// Counter schemes need durable coordination and recovery rules.\n// Renaming a key version does not create new key material.\n// Store the nonce in the approved encrypted-record representation."
    }
  ]
};
