window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Using Keys Safely in Node.js Crypto APIs with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Sign data with an approved key type",
      "language": "javascript",
      "blurb": "The boundary requires an Ed25519 private KeyObject and refuses PEM strings passed through unrelated APIs.",
      "code": "import { sign } from \"node:crypto\";\n\nexport function signReleaseManifest(manifestBytes, privateKey) {\n  if (privateKey?.type !== \"private\" || privateKey.asymmetricKeyType !== \"ed25519\") {\n    throw new TypeError(\"Ed25519 private key required\");\n  }\n  return sign(null, manifestBytes, privateKey);\n}\n"
    },
    {
      "title": "Verify before parsing a signed manifest",
      "language": "javascript",
      "blurb": "Signature verification covers the exact bytes; JSON parsing and semantic validation happen only after authenticity succeeds.",
      "code": "import { verify } from \"node:crypto\";\n\nexport function verifyReleaseManifest(bytes, signature, publicKey) {\n  if (publicKey?.type !== \"public\" || publicKey.asymmetricKeyType !== \"ed25519\") return null;\n  if (!verify(null, bytes, publicKey, signature)) return null;\n  const value = JSON.parse(bytes.toString(\"utf8\"));\n  if (!value?.releaseId || !Array.isArray(value.artifacts)) throw new TypeError(\"invalid manifest\");\n  return value;\n}\n"
    }
  ]
};
