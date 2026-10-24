window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Testing, Code Review, Logging, Monitoring, and CI/CD with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Record safe standard Prisma query telemetry",
      "language": "javascript",
      "blurb": "The standard QueryEvent is reduced to a duration bucket; SQL text and parameters are discarded, while model and operation require separate extension instrumentation.",
      "code": "export function prismaQueryMetric(event) {\n  const duration = event?.duration;\n  if (typeof duration !== \"number\" || !Number.isFinite(duration) || duration < 0) throw new TypeError(\"invalid Prisma query duration\");\n  return { event: \"prisma_query\",\n    durationBucket: duration < 10 ? \"lt10ms\" : duration < 100 ? \"lt100ms\" : \"gte100ms\" };\n}\n"
    },
    {
      "title": "Test tenant scope through a Prisma repository",
      "language": "javascript",
      "blurb": "A recording client proves that authenticated tenant context reaches the final where clause and sensitive fields stay unselected.",
      "code": "import test from \"node:test\";\nimport assert from \"node:assert/strict\";\n\nexport function registerPrismaScopeTest(findPublicAccount) {\n  test(\"account query is tenant scoped\", async () => {\n    let args;\n    const prisma = { account: { findFirst: async (value) => { args = value; return null; } } };\n    await findPublicAccount(prisma, \"acct-1\", \"tenant-9\");\n    assert.deepEqual(args.where, { id: \"acct-1\", tenantId: \"tenant-9\" });\n    assert.equal(args.select.passwordHash, undefined);\n  });\n}\n"
    }
  ]
};
