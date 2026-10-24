window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Raw SQL, TypedSQL, and Unsafe Query Boundaries with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Use Prisma tagged raw SQL for values",
      "language": "javascript",
      "blurb": "The tagged template keeps tenant and date values parameterized while the SQL structure remains static.",
      "code": "function scalarId(value, label = \"identifier\") {\n  if (typeof value !== \"string\" || !/^[A-Za-z0-9_-]{1,128}$/.test(value)) throw new TypeError(label + \" invalid\");\n  return value;\n}\nexport async function recentAuditRows(prisma, tenantId, since) {\n  scalarId(tenantId, \"authenticated tenant\");\n  if (!(since instanceof Date) || !Number.isFinite(since.valueOf())) throw new TypeError(\"invalid audit query\");\n  return prisma.$queryRaw`\n    SELECT id, action, created_at\n    FROM audit_events\n    WHERE tenant_id = ${tenantId} AND created_at >= ${since}\n    ORDER BY created_at DESC\n    LIMIT 100\n  `;\n}\n"
    },
    {
      "title": "Allowlist a dynamic raw-SQL identifier",
      "language": "javascript",
      "blurb": "When a column truly must vary, a public name maps to a fixed identifier before Prisma.sql composes the query.",
      "code": "function scalarId(value, label = \"identifier\") {\n  if (typeof value !== \"string\" || !/^[A-Za-z0-9_-]{1,128}$/.test(value)) throw new TypeError(label + \" invalid\");\n  return value;\n}\nexport async function aggregateMetric(prisma, Prisma, tenantId, metricName) {\n  scalarId(tenantId, \"authenticated tenant\");\n  const columns = new Map([[\"revenue\", Prisma.raw(\"total_cents\")], [\"tax\", Prisma.raw(\"tax_cents\")]]);\n  const column = columns.get(metricName);\n  if (!column) throw new TypeError(\"metric not allowed\");\n  const query = Prisma.sql`SELECT COALESCE(SUM(${column}), 0) AS value FROM orders WHERE tenant_id = ${tenantId}`;\n  return prisma.$queryRaw(query);\n}\n"
    }
  ]
};
