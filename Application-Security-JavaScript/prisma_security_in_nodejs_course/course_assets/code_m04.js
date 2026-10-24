window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Query Safety and Runtime Input Validation with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Construct a Prisma where object from validated scalars",
      "language": "javascript",
      "blurb": "The application owns every operator and relation traversal; request objects are never spread into where.",
      "code": "function scalarId(value, label = \"identifier\") {\n  if (typeof value !== \"string\" || !/^[A-Za-z0-9_-]{1,128}$/.test(value)) throw new TypeError(label + \" invalid\");\n  return value;\n}\nexport function orderWhere(input, tenantId) {\n  scalarId(tenantId, \"authenticated tenant\");\n  if (!input || typeof input !== \"object\" || Array.isArray(input) || Object.keys(input).some(k => ![\"state\", \"customerId\", \"minimumCents\"].includes(k))) throw new TypeError(\"search object invalid\");\n  const states = new Set([\"OPEN\", \"PAID\", \"CANCELLED\"]);\n  if (!tenantId || !states.has(input?.state)) throw new TypeError(\"invalid order search\");\n  const where = { tenantId, state: input.state };\n  if (input.customerId !== undefined) where.customerId = scalarId(input.customerId, \"customer id\");\n  if (input.minimumCents !== undefined) {\n    if (!Number.isSafeInteger(input.minimumCents) || input.minimumCents < 0) throw new RangeError(\"invalid minimum\");\n    where.totalCents = { gte: input.minimumCents };\n  }\n  return where;\n}\n"
    },
    {
      "title": "Bound Prisma pagination and ordering",
      "language": "javascript",
      "blurb": "Public sort names map to fixed Prisma orderBy objects, and take stays within a service limit.",
      "code": "const orderings = new Map([\n  [\"recent\", [{ createdAt: \"desc\" }, { id: \"asc\" }]],\n  [\"total\", [{ totalCents: \"desc\" }, { id: \"asc\" }]]\n]);\n\nexport function orderListArgs(input) {\n  const orderBy = orderings.get(input?.sort ?? \"recent\");\n  const raw = input?.limit ?? 25;\n  const take = typeof raw === \"number\" ? raw : typeof raw === \"string\" && /^(?:[1-9]\\d{0,2})$/.test(raw) ? Number(raw) : NaN;\n  if (!orderBy || !Number.isSafeInteger(take) || take < 1 || take > 100) throw new TypeError(\"invalid list options\");\n  return { orderBy: orderBy.map(field => ({ ...field })), take, select: { id: true, state: true, totalCents: true, createdAt: true } };\n}\n"
    }
  ]
};
