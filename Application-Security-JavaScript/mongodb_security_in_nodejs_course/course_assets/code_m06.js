window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Authorization, Tenant Boundaries, and Data Exposure with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Read one tenant-owned document with a projection",
      "language": "javascript",
      "blurb": "Tenant identity comes from authenticated server context, while a scalar invoice ID and projection are fixed before the database call.",
      "code": "function scalarId(value, label = \"identifier\") {\n  if (typeof value !== \"string\" || !/^[A-Za-z0-9_-]{1,128}$/.test(value)) throw new TypeError(label + \" invalid\");\n  return value;\n}\nexport async function findInvoiceForCaller(collection, invoiceId, auth) {\n  scalarId(auth?.tenantId, \"authenticated tenant\"); scalarId(auth?.subjectId, \"authenticated subject\");\n  if (!auth?.subjectId || !auth?.tenantId || !Array.isArray(auth.permissions) || !auth.permissions.includes(\"invoice:read\")) throw new Error(\"forbidden\");\n  if (typeof invoiceId !== \"string\" || !/^[A-Za-z0-9_-]{1,64}$/.test(invoiceId)) {\n    throw new TypeError(\"invalid invoice id\");\n  }\n  return collection.findOne(\n    { _id: invoiceId, tenantId: auth.tenantId },\n    { projection: { _id: 1, number: 1, totalCents: 1, status: 1, createdAt: 1 } }\n  );\n}\n"
    },
    {
      "title": "Detect a tenant-scoped update miss",
      "language": "javascript",
      "blurb": "Authenticated tenant identity and a bounded invoice ID are required before the atomic tenant-scoped update; a zero match remains a generic result.",
      "code": "function scalarId(value, label = \"identifier\") {\n  if (typeof value !== \"string\" || !/^[A-Za-z0-9_-]{1,128}$/.test(value)) throw new TypeError(label + \" invalid\");\n  return value;\n}\nexport async function cancelTenantInvoice(collection, invoiceId, auth) {\n  scalarId(auth?.tenantId, \"authenticated tenant\"); scalarId(auth?.subjectId, \"authenticated subject\"); scalarId(invoiceId, \"invoice id\");\n  if (!auth?.subjectId || !/^[A-Za-z0-9_-]{1,64}$/.test(auth?.tenantId ?? \"\") ||\n      !Array.isArray(auth.permissions) || !auth.permissions.includes(\"invoice:cancel\")) throw new Error(\"forbidden\");\n  if (!/^[A-Za-z0-9_-]{1,64}$/.test(invoiceId ?? \"\")) throw new TypeError(\"invalid invoice id\");\n  const result = await collection.updateOne(\n    { _id: invoiceId, tenantId: auth.tenantId, status: \"open\" },\n    { $set: { status: \"cancelled\" }, $currentDate: { updatedAt: true } }\n  );\n  if (result.matchedCount !== 1) return { found: false };\n  return { found: true, changed: result.modifiedCount === 1 };\n}\n"
    }
  ]
};
