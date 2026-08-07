window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Logging, Monitoring, and Code Review through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Record a file decision without exposing the pathname",
      "language": "javascript",
      "blurb": "Telemetry requires a bounded primitive object identifier plus exact operation and outcome vocabularies, then emits only a frozen hash-based record without paths or content.",
      "code": "import { createHash } from \"node:crypto\";\nconst operations = new Set([\"read\", \"write\", \"delete\", \"download\"]);\nconst outcomes = new Set([\"allowed\", \"denied\"]);\nconst objectIdentity = /^[A-Za-z0-9](?:[A-Za-z0-9_-]{0,126}[A-Za-z0-9])?$/;\n\nexport function fileDecisionEvent(objectId, operation, outcome) {\n  if (typeof objectId !== \"string\" || !objectIdentity.test(objectId) ||\n      !operations.has(operation) || !outcomes.has(outcome)) {\n    throw new TypeError(\"validated file decision required\");\n  }\n  return Object.freeze({\n    event: \"file_decision\", operation, outcome,\n    objectHash: createHash(\"sha256\").update(objectId).digest(\"hex\").slice(0, 16)\n  });\n}\n"
    },
    {
      "title": "Register a real symlink-escape regression",
      "language": "javascript",
      "blurb": "The regression proves a regular in-root file opens, then creates an external target and an in-root junction and requires the canonical resolver to reject the link.",
      "code": "import test from \"node:test\";\nimport assert from \"node:assert/strict\";\nimport { mkdtemp, mkdir, writeFile, symlink, rm } from \"node:fs/promises\";\nimport { join } from \"node:path\";\nimport { tmpdir } from \"node:os\";\n\nexport function registerCanonicalEscapeTest(resolveFile) {\n  if (typeof resolveFile !== \"function\") {\n    throw new TypeError(\"canonical file resolver required\");\n  }\n  test(\"ordinary files open while an in-root link to outside is rejected\", async (context) => {\n    const root = await mkdtemp(join(tmpdir(), \"file-security-\"));\n    context.after(() => rm(root, { recursive: true, force: true }));\n    const base = join(root, \"base\");\n    const outside = join(root, \"outside\");\n    await mkdir(base);\n    await mkdir(outside);\n    await writeFile(join(base, \"safe\"), \"safe\");\n    await writeFile(join(outside, \"secret\"), \"x\");\n    const handle = await resolveFile(base, \"safe\");\n    if (typeof handle?.close === \"function\") await handle.close();\n    await symlink(outside, join(base, \"link\"), \"junction\");\n    await assert.rejects(() => resolveFile(base, \"link/secret\"));\n  });\n}"
    }
  ]
};
