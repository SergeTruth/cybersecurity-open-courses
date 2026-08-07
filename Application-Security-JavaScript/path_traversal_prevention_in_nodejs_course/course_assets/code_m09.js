window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Logging, Monitoring, and Code Review with concrete, reviewable Node.js boundaries.",
  "codeExamples": [
    {
      "title": "Test a symlink escape against the real filesystem",
      "language": "javascript",
      "blurb": "The regression proves an ordinary in-root file succeeds, then creates an internal link to an external directory and requires the canonical containment helper to reject it.",
      "code": "import test from \"node:test\";\nimport assert from \"node:assert/strict\";\nimport { mkdtemp, mkdir, writeFile, symlink, rm } from \"node:fs/promises\";\nimport { join } from \"node:path\";\nimport { tmpdir } from \"node:os\";\n\nexport function registerSymlinkEscapeTest(resolveContained) {\n  if (typeof resolveContained !== \"function\") {\n    throw new TypeError(\"canonical containment resolver required\");\n  }\n  test(\"ordinary contained files pass while an external link is rejected\", async (context) => {\n    const root = await mkdtemp(join(tmpdir(), \"path-test-\"));\n    context.after(() => rm(root, { recursive: true, force: true }));\n    const base = join(root, \"base\");\n    const outside = join(root, \"outside\");\n    await mkdir(base);\n    await mkdir(outside);\n    await writeFile(join(base, \"safe.txt\"), \"safe\");\n    await writeFile(join(outside, \"secret.txt\"), \"secret\");\n    assert.equal(await resolveContained(base, \"safe.txt\"), join(base, \"safe.txt\"));\n    await symlink(outside, join(base, \"link\"), \"junction\");\n    await assert.rejects(() => resolveContained(base, \"link/secret.txt\"));\n  });\n}"
    },
    {
      "title": "Log path decisions without disclosing paths",
      "language": "javascript",
      "blurb": "A factory captures a copied application-owned HMAC key; each event then accepts only bounded primitive paths and allowlisted decision reasons before emitting frozen telemetry.",
      "code": "import { createHmac } from \"node:crypto\";\n\nconst PATH_DECISIONS = new Set([\"allow\", \"deny\"]);\nconst PATH_REASONS = new Set([\n  \"approved\", \"lexical-traversal\", \"link-rejected\",\n  \"outside-root\", \"unsupported-platform\"\n]);\nconst MAXIMUM_PATH_BYTES = 4096;\n\nexport function createPathDecisionLogger(logKey) {\n  if (!Buffer.isBuffer(logKey) || logKey.length < 32 || logKey.length > 1024) {\n    throw new TypeError(\"application-owned path-log key required\");\n  }\n  const key = Buffer.from(logKey);\n  return function pathDecisionLog(decision, reason, suppliedPath) {\n    if (!PATH_DECISIONS.has(decision) || !PATH_REASONS.has(reason) ||\n        typeof suppliedPath !== \"string\" || suppliedPath.length < 1 ||\n        Buffer.byteLength(suppliedPath, \"utf8\") > MAXIMUM_PATH_BYTES ||\n        suppliedPath.includes(\"\\0\")) {\n      throw new TypeError(\"validated path decision required\");\n    }\n    const pathToken = createHmac(\"sha256\", key)\n      .update(suppliedPath, \"utf8\").digest(\"hex\").slice(0, 16);\n    return Object.freeze({ event: \"path_decision\", decision, reason, pathToken });\n  };\n}\n"
    }
  ]
};
