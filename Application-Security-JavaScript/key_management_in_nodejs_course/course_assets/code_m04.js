window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Secure Key Generation and Entropy with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Generate an AES-256 key as a KeyObject",
      "language": "javascript",
      "blurb": "Node creates algorithm-sized material as a secret KeyObject, avoiding text encoding while remaining explicit that this in-process key is exportable.",
      "code": "import { generateKey } from \"node:crypto\";\nimport { promisify } from \"node:util\";\nconst generateKeyAsync = promisify(generateKey);\n\nexport async function createAes256Key() {\n  return generateKeyAsync(\"aes\", { length: 256 });\n}\n"
    },
    {
      "title": "Generate an Ed25519 signing pair",
      "language": "javascript",
      "blurb": "The algorithm selects its own parameters, avoiding improvised entropy lengths and incompatible curve settings.",
      "code": "import { generateKeyPair } from \"node:crypto\";\nimport { promisify } from \"node:util\";\nconst generatePair = promisify(generateKeyPair);\n\nexport async function createSigningKeyPair() {\n  const { publicKey, privateKey } = await generatePair(\"ed25519\");\n  return { publicKey, privateKey };\n}\n"
    }
  ]
};
