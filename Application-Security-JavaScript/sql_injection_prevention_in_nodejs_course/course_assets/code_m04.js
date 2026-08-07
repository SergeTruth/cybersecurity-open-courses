window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply ORMs, Query Builders, and Raw SQL Boundaries through distinct, reviewable JavaScript security boundaries.",
  "codeExamples": [
    {
      "title": "Construct an ORM query from validated structure",
      "language": "javascript",
      "blurb": "The application owns the where shape, selected attributes, ordering, and limit while authenticated context and validated scalars supply values.",
      "code": "const TENANT_ID = /^[A-Za-z0-9](?:[A-Za-z0-9_-]{0,126}[A-Za-z0-9])?$/;\nconst INVOICE_STATUSES = new Set([\"draft\", \"open\", \"paid\", \"void\"]);\n\nfunction permissionSet(value) {\n  if (!Array.isArray(value)) {\n    throw new TypeError(\"validated permission array required\");\n  }\n  const length = value.length;\n  if (!Number.isSafeInteger(length) || length > 128) {\n    throw new TypeError(\"validated permission array required\");\n  }\n  const permissions = Array.from({ length }, (_, index) => value[index]);\n  if (new Set(permissions).size !== permissions.length ||\n      permissions.some((permission) => typeof permission !== \"string\" ||\n        !/^[a-z][a-z0-9-]*(?::[a-z][a-z0-9-]*){1,3}$/.test(permission))) {\n    throw new TypeError(\"validated permission array required\");\n  }\n  return new Set(permissions);\n}\n\nexport async function listInvoices(Invoice, auth, request) {\n  const rawFindAllCapability = Invoice?.findAll;\n  const findAll = typeof rawFindAllCapability === \"function\"\n    ? rawFindAllCapability.bind(Invoice)\n    : null;\n  const tenantId = auth?.tenantId;\n  const permissionValues = auth?.permissions;\n  const limit = request?.limit;\n  const status = request?.status;\n  if (!findAll || typeof tenantId !== \"string\" || !TENANT_ID.test(tenantId) ||\n      !permissionSet(permissionValues).has(\"invoice:list\")) {\n    throw new Error(\"forbidden\");\n  }\n  if (!request || typeof request !== \"object\" || Array.isArray(request) ||\n      !Number.isSafeInteger(limit) || limit < 1 || limit > 100 ||\n      typeof status !== \"string\" || !INVOICE_STATUSES.has(status)) {\n    throw new TypeError(\"invalid invoice-list request\");\n  }\n  return findAll({\n    where: { tenantId, status },\n    attributes: [\"id\", \"number\", \"status\", \"totalCents\"],\n    order: [[\"createdAt\", \"DESC\"]],\n    limit\n  });\n}\n"
    },
    {
      "title": "Confine unavoidable raw SQL behind one adapter",
      "language": "javascript",
      "blurb": "The raw boundary exposes a narrow operation with fixed SQL and bound values instead of allowing callers to submit arbitrary query fragments.",
      "code": "const TENANT_ID = /^[A-Za-z0-9](?:[A-Za-z0-9_-]{0,126}[A-Za-z0-9])?$/;\n\nexport function auditQueryAdapter(database) {\n  const rawQueryCapability = database?.query;\n  const query = typeof rawQueryCapability === \"function\"\n    ? rawQueryCapability.bind(database)\n    : null;\n  if (!query) throw new TypeError(\"database adapter required\");\n  return Object.freeze({\n    recentForTenant: async (tenantId, since) => {\n      const sinceMs = since instanceof Date ? since.getTime() : Number.NaN;\n      if (typeof tenantId !== \"string\" || !TENANT_ID.test(tenantId) ||\n          !Number.isFinite(sinceMs)) {\n        throw new TypeError(\"audit query input invalid\");\n      }\n      return query(\n        \"SELECT id, action, created_at FROM audit_events WHERE tenant_id = ? AND created_at >= ? ORDER BY created_at DESC LIMIT 100\",\n        [tenantId, new Date(sinceMs)]\n      );\n    }\n  });\n}\n"
    }
  ]
};
