window.COURSE_CODE_MODULE = {
  "title": "Code Examples: Validate Entry Points and Trace Sinks",
  "codeExamples": [
    {
      "title": "Parse an HTTP Boundary Without Coercion",
      "language": "javascript",
      "code": `function parseReportRequest(req) {
  const tenantId = req.params.tenantId;
  const format = req.query.format === undefined ? "json" : req.query.format;
  const archivedText = req.query.includeArchived;

  if (typeof tenantId !== "string" || !/^[a-z0-9_-]{3,40}$/.test(tenantId)) {
    throw new Error("tenantId is invalid");
  }
  if (typeof format !== "string" || !new Set(["json", "csv"]).has(format)) {
    throw new Error("format is not supported");
  }
  if (archivedText !== undefined && archivedText !== "true" && archivedText !== "false") {
    throw new Error("includeArchived must be true or false");
  }
  return { tenantId, format, includeArchived: archivedText === "true" };
}

app.get("/tenants/:tenantId/report", async (req, res) => {
  const input = parseReportRequest(req);
  const rows = await loadReportRows(input);
  res.json({ rows });
});
`
    },
    {
      "title": "Map Data Flow to Sensitive Sinks",
      "language": "javascript",
      "code": `const flow = [
  { step: "request.query.q", trust: "untrusted", context: "HTTP query" },
  { step: "parseSearchTerm", trust: "validated", context: "business value" },
  { step: "db.query parameter", trust: "bound value", context: "SQL interpreter" },
  { step: "res.render", trust: "encoded output", context: "HTML browser context" },
];

console.table(flow.map((step, index) => ({
  order: index + 1,
  ...step,
  requiredReview: step.context.includes("interpreter") || step.context.includes("HTML"),
})));
`
    },
    {
      "title": "Validate Webhook Semantics After Authenticity Checks",
      "language": "javascript",
      "code": `function parseWebhookMessage(body) {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    throw new Error("webhook body must be an object");
  }
  if (!new Set(["invoice.created", "invoice.paid"]).has(body.eventType)) {
    throw new Error("eventType is not allowed");
  }
  if (typeof body.accountId !== "string" || !/^[a-z0-9_]{8,32}$/.test(body.accountId)) {
    throw new Error("accountId is invalid");
  }
  return { eventType: body.eventType, accountId: body.accountId };
}

async function handleWebhook(rawBody, headers, replayStore) {
  /*
   * verifyWebhookAuthenticity is internal application code. It verifies the
   * MAC/signature over rawBody, selects the configured key, checks timestamp
   * freshness, and records the delivery ID in replayStore. None of these
   * decisions are copied from fields in the request JSON.
   */
  await verifyWebhookAuthenticity(rawBody, headers, replayStore);

  let body;
  try {
    body = JSON.parse(rawBody);
  } catch {
    throw new Error("webhook body is not valid JSON");
  }
  return parseWebhookMessage(body);
}
`
    }
  ]
};
