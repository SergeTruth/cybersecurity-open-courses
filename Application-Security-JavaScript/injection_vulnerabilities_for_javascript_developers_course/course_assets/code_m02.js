window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Validate Entry Points and Trace Sinks",
  "codeExamples": [
    {
      "title": "Parse an HTTP Boundary Before Sensitive Use",
      "language": "javascript",
      "code": "function parseReportRequest(req) {\n  const tenantId = String(req.params.tenantId || \"\").trim();\n  const format = String(req.query.format || \"json\").trim();\n  const includeArchived = req.query.includeArchived === \"true\";\n\n  if (!/^[a-z0-9_-]{3,40}$/.test(tenantId)) {\n    throw new Error(\"tenantId is invalid\");\n  }\n  if (!new Set([\"json\", \"csv\"]).has(format)) {\n    throw new Error(\"format is not supported\");\n  }\n\n  return { tenantId, format, includeArchived };\n}\n\napp.get(\"/tenants/:tenantId/report\", async (req, res) => {\n  const input = parseReportRequest(req);\n  const rows = await loadReportRows(input);\n  res.json({ rows });\n});"
    },
    {
      "title": "Map Data Flow to Sensitive Sinks",
      "language": "javascript",
      "code": "const flow = [\n  { step: \"request.query.q\", trust: \"untrusted\", context: \"HTTP query\" },\n  { step: \"parseSearchTerm\", trust: \"validated\", context: \"business value\" },\n  { step: \"db.query parameter\", trust: \"bound value\", context: \"SQL interpreter\" },\n  { step: \"res.render\", trust: \"encoded output\", context: \"HTML browser context\" },\n];\n\nfunction describeFlow(flowSteps) {\n  return flowSteps.map((step, index) => ({\n    order: index + 1,\n    step: step.step,\n    context: step.context,\n    requiredReview: step.context.includes(\"interpreter\") || step.context.includes(\"HTML\"),\n  }));\n}\n\nconsole.table(describeFlow(flow));"
    },
    {
      "title": "Validate Webhook Messages Separately from HTTP Syntax",
      "language": "javascript",
      "code": "function parseWebhookMessage(body) {\n  if (typeof body !== \"object\" || body === null || Array.isArray(body)) {\n    throw new Error(\"webhook body must be an object\");\n  }\n\n  const eventType = body.eventType;\n  const accountId = body.accountId;\n\n  if (!new Set([\"invoice.created\", \"invoice.paid\"]).has(eventType)) {\n    throw new Error(\"eventType is not allowed\");\n  }\n  if (typeof accountId !== \"string\" || !/^[a-z0-9_]{8,32}$/.test(accountId)) {\n    throw new Error(\"accountId is invalid\");\n  }\n\n  return { eventType, accountId };\n}"
    }
  ]
};
