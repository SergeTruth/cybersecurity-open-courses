window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply NoSQL Injection and Query Safety with concrete, reviewable Node.js boundaries. Run copied snippets independently as Node.js 22+ ES modules; see readme.md for dependencies and trusted adapter/authorization contracts. Offline checks do not replace live-service integration tests.",
  "codeExamples": [
    {
      "title": "Build a typed MongoDB account filter",
      "language": "javascript",
      "blurb": "The application constructs filter operators itself and never spreads request objects into a MongoDB query.",
      "code": "function scalarId(value, label = \"identifier\") {\n  if (typeof value !== \"string\" || !/^[A-Za-z0-9_-]{1,128}$/.test(value)) throw new TypeError(label + \" invalid\");\n  return value;\n}\nexport function accountSearchFilter(input, tenantId) {\n  // tenantId is supplied by authenticated server context.\n  scalarId(tenantId, \"tenant context\");\n  if (!input || typeof input !== \"object\" || Array.isArray(input) || Object.keys(input).length > 2 ||\n      Object.keys(input).some(key => ![\"status\", \"email\"].includes(key))) throw new TypeError(\"search object invalid\");\n  if (input.status !== undefined && ![\"active\", \"suspended\"].includes(input.status)) throw new TypeError(\"status invalid\");\n  if (input.email !== undefined && (typeof input.email !== \"string\" || !input.email || input.email.length > 254 ||\n      !/^[\\x21-\\x7e]+$/.test(input.email))) throw new TypeError(\"email search text invalid\");\n  const status = new Set([\"active\", \"suspended\"]).has(input?.status) ? input.status : null;\n  const email = typeof input?.email === \"string\" && input.email.length <= 254 ? input.email.toLowerCase() : null;\n  if (!tenantId || (!status && !email)) throw new TypeError(\"safe search term required\");\n  const filter = { tenantId };\n  if (status) filter.status = status;\n  if (email) filter.emailNormalized = email;\n  return filter;\n}\n"
    },
    {
      "title": "Construct an allowlisted aggregation pipeline",
      "language": "javascript",
      "blurb": "Pipeline stages and sort fields are application-owned; input supplies only validated scalar values.",
      "code": "function scalarId(value, label = \"identifier\") {\n  if (typeof value !== \"string\" || !/^[A-Za-z0-9_-]{1,128}$/.test(value)) throw new TypeError(label + \" invalid\");\n  return value;\n}\nconst sortFields = new Map([[\"recent\", \"createdAt\"], [\"amount\", \"totalCents\"]]);\n\nexport function orderSummaryPipeline({ tenantId, state, sort = \"recent\", limit = 25 }) {\n  // Do not pass a request object directly: inject its authenticated tenantId.\n  scalarId(tenantId, \"tenant context\");\n  const sortField = sortFields.get(sort);\n  if (!tenantId || ![\"open\", \"closed\"].includes(state) || !sortField) throw new TypeError(\"invalid summary input\");\n  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 100) throw new RangeError(\"invalid limit\");\n  return [{ $match: { tenantId, state } }, { $sort: { [sortField]: -1, _id: 1 } },\n    { $limit: limit }, { $project: { _id: 1, totalCents: 1, createdAt: 1 } }];\n}\n"
    }
  ]
};
