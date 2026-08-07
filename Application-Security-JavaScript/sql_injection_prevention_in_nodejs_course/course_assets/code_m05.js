window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Dynamic SQL, Identifiers, Sorting, and Allowlists through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Allowlist dynamic sort identifiers",
      "language": "javascript",
      "blurb": "Public sort names map to fixed SQL identifiers and direction keywords; unknown identifiers are rejected rather than quoted from user input.",
      "code": "const TENANT_ID = /^[A-Za-z0-9](?:[A-Za-z0-9_-]{0,126}[A-Za-z0-9])?$/;\nconst sorts = new Map([\n  [\"recent\", Object.freeze([\"created_at\", \"DESC\"])],\n  [\"amount\", Object.freeze([\"total_cents\", \"DESC\"])],\n  [\"number\", Object.freeze([\"invoice_number\", \"ASC\"])]\n]);\n\nexport function invoiceListQuery(sort, tenantId, limit) {\n  const choice = sorts.get(sort);\n  if (!choice || typeof tenantId !== \"string\" || !TENANT_ID.test(tenantId) ||\n      !Number.isSafeInteger(limit) || limit < 1 || limit > 100) {\n    throw new TypeError(\"invalid invoice list options\");\n  }\n  return Object.freeze({\n    text: \"SELECT id, invoice_number, total_cents FROM invoices WHERE tenant_id = $1 ORDER BY \" + choice[0] + \" \" + choice[1] + \" LIMIT $2\",\n    values: Object.freeze([tenantId, limit])\n  });\n}\n"
    },
    {
      "title": "Map report names to fixed aggregate expressions",
      "language": "javascript",
      "blurb": "The application selects complete SQL expressions from a catalog, while the tenant and date remain ordinary bound values.",
      "code": "const TENANT_ID = /^[A-Za-z0-9](?:[A-Za-z0-9_-]{0,126}[A-Za-z0-9])?$/;\nconst metrics = new Map([\n  [\"revenue\", \"COALESCE(SUM(total_cents), 0)\"],\n  [\"count\", \"COUNT(*)\"]\n]);\n\nexport function reportMetricQuery(metric, tenantId, since) {\n  const expression = metrics.get(metric);\n  const sinceMs = since instanceof Date ? since.getTime() : Number.NaN;\n  if (!expression || typeof tenantId !== \"string\" || !TENANT_ID.test(tenantId) ||\n      !Number.isFinite(sinceMs)) {\n    throw new TypeError(\"invalid metric request\");\n  }\n  const sinceTimestamp = new Date(sinceMs).toISOString();\n  return Object.freeze({\n    text: \"SELECT \" + expression +\n      \" AS value FROM orders WHERE tenant_id = $1 AND created_at >= $2\",\n    values: Object.freeze([tenantId, sinceTimestamp])\n  });\n}\n"
    }
  ]
};
