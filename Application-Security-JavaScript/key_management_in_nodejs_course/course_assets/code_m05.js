window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Key Storage, Secret Managers, and Access Control with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Load one versioned secret from a key manager",
      "language": "javascript",
      "blurb": "The caller requests an exact version and validates the returned metadata before exposing the secret to application code.",
      "code": "export async function loadDatabasePassword(secretManager, reference) {\n  if (!reference?.name || !reference?.version) throw new TypeError(\"versioned secret reference required\");\n  const result = await secretManager.access({ name: reference.name, version: reference.version });\n  if (result.version !== reference.version || !Buffer.isBuffer(result.value) || result.value.length < 16) {\n    throw new Error(\"secret manager returned invalid material\");\n  }\n  return result.value;\n}\n"
    },
    {
      "title": "Use an owned secret buffer under a no-retention contract",
      "language": "javascript",
      "blurb": "The helper copies manager-owned bytes, clears only its copy, and documents that the callback must not retain the buffer or derived secret material.",
      "code": "export async function withSecret(secretManager, reference, operation) {\n  const borrowed = await secretManager.access(reference);\n  if (!Buffer.isBuffer(borrowed)) throw new TypeError(\"secret must be a buffer\");\n  const owned = Buffer.from(borrowed);\n  try {\n    // Contract: operation must not retain owned or copy secret material beyond this call.\n    return await operation(owned);\n  } finally { owned.fill(0); }\n}\n"
    }
  ]
};
