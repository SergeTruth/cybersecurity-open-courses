window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Code Review, Logging, and Monitoring through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Test child lifecycle cancellation with a recording double",
      "language": "javascript",
      "blurb": "The regression confirms the recording child is still active before abort, then verifies that abort reaches the isolated child adapter and rejects the pending operation.",
      "code": "import test from \"node:test\";\nimport assert from \"node:assert/strict\";\n\nexport function registerChildCancellationTest(run, adapter) {\n  if (typeof run !== \"function\" || !adapter || adapter.cancelled !== false) {\n    throw new TypeError(\"recording child adapter must begin active\");\n  }\n  test(\"aborted request cancels child\", async () => {\n    const controller = new AbortController();\n    const pending = run(adapter, { signal: controller.signal });\n    await Promise.resolve();\n    assert.equal(adapter.cancelled, false);\n    controller.abort();\n    await assert.rejects(pending);\n    assert.equal(adapter.cancelled, true);\n  });\n}"
    },
    {
      "title": "Create a secret-safe child diagnostic",
      "language": "javascript",
      "blurb": "The diagnostic accepts exact own-data close evidence, validates canonical operation and job identifiers plus a closed exit-or-signal state, and emits only bounded hashed telemetry.",
      "code": "import { createHash } from \"node:crypto\";\nconst operationNames = new Set([\"archive-list\", \"thumbnail\", \"report-render\"]);\nconst signalNames = new Set([\"SIGABRT\", \"SIGHUP\", \"SIGINT\", \"SIGKILL\", \"SIGTERM\"]);\nconst resultFields = new Set([\"code\", \"signal\"]);\nconst jobIdentity = /^[A-Za-z0-9](?:[A-Za-z0-9_-]{0,126}[A-Za-z0-9])?$/;\n\nfunction exactDataRecord(value, fields) {\n  if (!value || typeof value !== \"object\" || Array.isArray(value) ||\n      ![Object.prototype, null].includes(Object.getPrototypeOf(value))) return null;\n  const descriptors = Object.getOwnPropertyDescriptors(value);\n  const keys = Reflect.ownKeys(descriptors);\n  if (keys.length !== fields.size || keys.some((key) =>\n      typeof key !== \"string\" || !fields.has(key) ||\n      !descriptors[key].enumerable || !(\"value\" in descriptors[key]))) return null;\n  return Object.freeze(Object.fromEntries(\n    keys.map((key) => [key, descriptors[key].value])\n  ));\n}\n\nexport function childDiagnostic(operation, jobId, result) {\n  const selected = exactDataRecord(result, resultFields);\n  if (!operationNames.has(operation) || typeof jobId !== \"string\" ||\n      !jobIdentity.test(jobId) || !selected) {\n    throw new TypeError(\"validated child diagnostic required\");\n  }\n  const code = selected.code;\n  const signal = selected.signal;\n  const signaled = code === null && signalNames.has(signal);\n  const exited = Number.isSafeInteger(code) && code >= 0 && code <= 255 && signal === null;\n  if (!signaled && !exited) throw new TypeError(\"child close result invalid\");\n  return Object.freeze({\n    event: \"child_complete\", operation,\n    jobHash: createHash(\"sha256\").update(jobId).digest(\"hex\").slice(0, 12),\n    outcome: signaled ? \"signaled\" : code === 0 ? \"success\" : \"failed\"\n  });\n}\n"
    }
  ]
};
