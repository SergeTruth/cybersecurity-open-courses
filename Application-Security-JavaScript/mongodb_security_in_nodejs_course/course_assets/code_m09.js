window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Code Review, CI/CD, and Monitoring with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Redact MongoDB command-monitoring events",
      "language": "javascript",
      "blurb": "Monitoring records command name, database, duration, and outcome while excluding filters, update documents, credentials, and returned data.",
      "code": "export function commandMetric(event) {\n  const allowed = new Set([\"find\", \"insert\", \"update\", \"delete\", \"aggregate\", \"commitTransaction\"]);\n  const command = allowed.has(event.commandName) ? event.commandName : \"other\";\n  return { event: \"mongodb_command\", command, database: String(event.databaseName ?? \"unknown\").slice(0, 40),\n    durationBucket: event.duration < 10 ? \"lt10ms\" : event.duration < 100 ? \"lt100ms\" : \"gte100ms\",\n    outcome: event.failure ? \"failure\" : \"success\" };\n}\n"
    },
    {
      "title": "Test that every invoice query carries tenant scope",
      "language": "javascript",
      "blurb": "A recording collection verifies the exact filter and projection without requiring a live database.",
      "code": "import test from \"node:test\";\nimport assert from \"node:assert/strict\";\n\nexport function registerTenantQueryTest(findInvoiceForCaller) {\n  test(\"invoice read includes authenticated tenant\", async () => {\n    let recorded;\n    const collection = { findOne: async (...args) => { recorded = args; return null; } };\n    await findInvoiceForCaller(collection, \"invoice-7\", { subjectId: \"user-2\", tenantId: \"tenant-3\", permissions: [\"invoice:read\"] });\n    assert.deepEqual(recorded[0], { _id: \"invoice-7\", tenantId: \"tenant-3\" });\n    assert.equal(recorded[1].projection.taxId, undefined);\n  });\n}\n"
    }
  ]
};
