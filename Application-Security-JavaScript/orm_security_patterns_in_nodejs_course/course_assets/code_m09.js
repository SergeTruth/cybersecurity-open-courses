window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Code Review, Logging, Monitoring, and CI/CD with concrete, reviewable Node.js boundaries.",
  "codeExamples": [
    {
      "title": "Instrument ORM operations without values",
      "language": "javascript",
      "blurb": "Hooks record model, operation, outcome, and a duration bucket while dropping SQL text and bound parameters.",
      "code": "const operations = new Set([\"find\", \"insert\", \"update\", \"delete\", \"transaction\"]);\nconst modelName = /^[A-Za-z][A-Za-z0-9_]{0,47}$/;\nconst maximumMeasuredDurationMs = 24 * 60 * 60 * 1000;\n\nexport function ormMetric({ model, operation, durationMs, failed } = {}) {\n  if (typeof model !== \"string\" || !modelName.test(model) || !operations.has(operation) ||\n      !Number.isSafeInteger(durationMs) || durationMs < 0 || durationMs > maximumMeasuredDurationMs ||\n      typeof failed !== \"boolean\") {\n    throw new TypeError(\"validated ORM operation evidence required\");\n  }\n  return Object.freeze({\n    event: \"orm_operation\", model, operation, outcome: failed ? \"failure\" : \"success\",\n    durationBucket: durationMs < 10 ? \"lt10ms\" : durationMs < 100 ? \"lt100ms\" : \"gte100ms\"\n  });\n}\n"
    },
    {
      "title": "Test transaction rollback after the debit",
      "language": "javascript",
      "blurb": "The regression observes both mutation attempts, injects the credit failure after the debit, and confirms that the transaction restores both balances.",
      "code": "import test from \"node:test\";\nimport assert from \"node:assert/strict\";\n\nexport function registerTransferRollbackTest(transfer) {\n  if (typeof transfer !== \"function\") throw new TypeError(\"transfer function required\");\n  test(\"credit failure rolls back an observed debit\", async () => {\n    const balances = new Map([[\"a\", 1000], [\"b\", 1000]]);\n    const calls = [];\n    const orm = {\n      transaction: async (operation) => {\n        const before = new Map(balances);\n        const tx = {\n          LOCK: { UPDATE: \"UPDATE\" },\n          Wallet: {\n            findOne: async ({ where }) => ({\n              balanceCents: balances.get(where.id),\n              update: async ({ balanceCents }) => {\n                calls.push({ id: where.id, balanceCents });\n                if (where.id === \"b\") throw new Error(\"credit failed\");\n                balances.set(where.id, balanceCents);\n              }\n            })\n          }\n        };\n        try { return await operation(tx); }\n        catch (error) {\n          balances.clear();\n          for (const [id, balance] of before) balances.set(id, balance);\n          throw error;\n        }\n      }\n    };\n    await assert.rejects(\n      () => transfer(orm, \"tenant-1\", \"a\", \"b\", 500), /credit failed/\n    );\n    assert.deepEqual(calls, [\n      { id: \"a\", balanceCents: 500 },\n      { id: \"b\", balanceCents: 1500 }\n    ]);\n    assert.equal(balances.get(\"a\"), 1000);\n    assert.equal(balances.get(\"b\"), 1000);\n  });\n}"
    }
  ]
};
