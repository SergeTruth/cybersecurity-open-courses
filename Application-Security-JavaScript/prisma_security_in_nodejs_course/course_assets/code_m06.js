window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Authorization, Tenant Boundaries, and Field Exposure with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Scope selected tenant-owned Prisma read operations",
      "language": "javascript",
      "blurb": "The extension names tenant-owned models and scopes only findMany and findFirst; writes, aggregates, raw SQL, and nested operations require separate boundaries.",
      "code": "function scalarId(value, label = \"identifier\") {\n  if (typeof value !== \"string\" || !/^[A-Za-z0-9_-]{1,128}$/.test(value)) throw new TypeError(label + \" invalid\");\n  return value;\n}\nfunction tenantReads(tenantId) {\n  return {\n    async findMany({ args, query }) { return query({ ...args, where: { AND: [args.where ?? {}, { tenantId }] } }); },\n    async findFirst({ args, query }) { return query({ ...args, where: { AND: [args.where ?? {}, { tenantId }] } }); }\n  };\n}\n\nexport function forTenantReads(prisma, tenantId) {\n  // Supply this context only from trusted authentication middleware.\n  scalarId(tenantId, \"tenant context\");\n  return prisma.$extends({ query: { account: tenantReads(tenantId), note: tenantReads(tenantId) } });\n}\n"
    },
    {
      "title": "Authorize a Prisma object read by subject",
      "language": "javascript",
      "blurb": "Tenant scoping and object ownership are separate checks; the selected record contains no private fields.",
      "code": "function scalarId(value, label = \"identifier\") {\n  if (typeof value !== \"string\" || !/^[A-Za-z0-9_-]{1,128}$/.test(value)) throw new TypeError(label + \" invalid\");\n  return value;\n}\nexport async function readPrivateNote(prisma, noteId, auth) {\n  scalarId(auth?.subjectId, \"authenticated subject\"); scalarId(auth?.tenantId, \"authenticated tenant\");\n  scalarId(noteId, \"note id\");\n  const note = await prisma.note.findFirst({ where: { id: noteId, tenantId: auth.tenantId },\n    select: { id: true, ownerId: true, title: true, body: true, updatedAt: true } });\n  if (!note || note.ownerId !== auth.subjectId) return null;\n  return { id: note.id, title: note.title, body: note.body, updatedAt: note.updatedAt };\n}\n"
    }
  ]
};
